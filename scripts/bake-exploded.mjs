// Bake OpenArm 2.0 right-arm exploded-view data from openarm-2.glb.
//
// The GLB has no part segmentation (8 appearance meshes). We recover physical
// parts as connected triangle components (weld vertices by position, union-find
// over triangle edges), compute a chain-aware explosion displacement per part
// (spread along the arm's PCA axis + radial separation of concentric parts),
// merge tiny hardware (screws) into their nearest parent, keep only the right
// arm, recenter to the arm center, and write a compact indexed binary + a part
// table JSON for label anchoring.
//
// Run: node scripts/bake-exploded.mjs
// Out: public/models/arm-exploded.bin  public/models/arm-exploded.json

import fs from 'node:fs';
import path from 'node:path';

const SRC = 'public/models/openarm-2.glb';
const OUT_BIN = 'public/models/arm-exploded.bin';
const OUT_JSON = 'public/models/arm-exploded.json';
const QUANT = 0.05;      // mm weld tolerance
const SCREW_VERTS = 50;  // components smaller than this ride with a parent part
const ARM_X = 10;        // right arm = component centroid x > ARM_X
const ALONG_K = 0.95;    // explosion spread along the chain axis
const PERP_K = 72;       // radial separation of concentric parts (mm)
const GRIPPER_ALONG = 95; // gripper = the positive-along end of the chain (jaws, wrist-roll motors, camera)
const GRIP_ALONG_K = 1.4;   // gripper explosion spread along its own axis
const GRIP_PERP_K = 40;     // gripper radial separation (mm) — larger so central parts (housing, camera) don't clump
// per-part choreography overrides (ids stable while GRIPPER_ALONG=95): 2-finger gripper + wrist camera
// the camera = lens (#39) + its body box (#60); they move as one unit and stay seated on
// the housing (#56) so the camera never splits apart or drifts off the casing.
const CAM_IDS = [39, 60], HOUSING_ID = 56, FINGER_IDS = [17, 22];
const CAM_LIFT = 26;    // lens+box eased slightly off the housing to highlight the camera (stay together)
const FINGER_OPEN = 34; // each finger spreads this far along the opening (world-X) axis
const RELAX_RADIUS_K = 0.62; // effective part radius = half-bbox-diagonal × this (collision relaxation)
const RELAX_ITERS = 160;     // relaxation passes pushing overlapping parts apart at full explode

const buf = fs.readFileSync(SRC);
if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error('not a GLB');
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.subarray(20, 20 + jsonLen).toString('utf8'));
const binStart = 20 + jsonLen + 8;
const bin = buf.subarray(binStart, binStart + buf.readUInt32LE(20 + jsonLen));
const BV = gltf.bufferViews, AC = gltf.accessors;
const COMP = { 5120:1,5121:1,5122:2,5123:2,5125:4,5126:4 };
const NUM = { SCALAR:1, VEC2:2, VEC3:3, VEC4:4 };
function readAccessor(ai) {
  const a = AC[ai], bv = BV[a.bufferView];
  const cs = COMP[a.componentType], nc = NUM[a.type];
  const base = (bv.byteOffset||0) + (a.byteOffset||0);
  const stride = bv.byteStride || cs*nc;
  const out = new Float64Array(a.count*nc);
  for (let i=0;i<a.count;i++) for (let c=0;c<nc;c++){
    const o = base + i*stride + c*cs;
    let v;
    switch(a.componentType){
      case 5126: v=bin.readFloatLE(o);break; case 5125: v=bin.readUInt32LE(o);break;
      case 5123: v=bin.readUInt16LE(o);break; case 5121: v=bin.readUInt8(o);break;
      case 5122: v=bin.readInt16LE(o);break; case 5120: v=bin.readInt8(o);break;
    }
    out[i*nc+c]=v;
  }
  return out;
}

// ---- weld + union-find over all triangles ----
const parent=[]; const find=a=>{while(parent[a]!==a){parent[a]=parent[parent[a]];a=parent[a];}return a;};
const uni=(a,b)=>{a=find(a);b=find(b);if(a!==b)parent[a]=b;};
const vmap=new Map(); const wx=[],wy=[],wz=[]; let wc=0;
const key=(x,y,z)=>Math.round(x/QUANT)+'_'+Math.round(y/QUANT)+'_'+Math.round(z/QUANT);
const weld=(x,y,z)=>{const k=key(x,y,z);let id=vmap.get(k);if(id===undefined){id=wc++;vmap.set(k,id);parent[id]=id;wx[id]=x;wy[id]=y;wz[id]=z;}return id;};
const triW=[]; // welded ids per triangle corner
for (const m of gltf.meshes) for (const p of m.primitives) {
  const pos = readAccessor(p.attributes.POSITION);
  const idx = p.indices!=null ? readAccessor(p.indices) : null;
  const vid = new Int32Array(pos.length/3);
  for (let i=0;i<pos.length;i+=3) vid[i/3]=weld(pos[i],pos[i+1],pos[i+2]);
  const n = idx?idx.length:pos.length/3;
  for (let i=0;i<n;i+=3){
    const a=vid[idx?idx[i]:i], b=vid[idx?idx[i+1]:i+1], c=vid[idx?idx[i+2]:i+2];
    uni(a,b); uni(b,c); triW.push(a,b,c);
  }
}
const nTri = triW.length/3;

// ---- component stats ----
const comp=new Map();
for (let i=0;i<wc;i++){const r=find(i);let e=comp.get(r);if(!e){e={n:0,sx:0,sy:0,sz:0,root:r,minx:1e9,miny:1e9,minz:1e9,maxx:-1e9,maxy:-1e9,maxz:-1e9};comp.set(r,e);}
  e.n++;e.sx+=wx[i];e.sy+=wy[i];e.sz+=wz[i];
  if(wx[i]<e.minx)e.minx=wx[i];if(wx[i]>e.maxx)e.maxx=wx[i];
  if(wy[i]<e.miny)e.miny=wy[i];if(wy[i]>e.maxy)e.maxy=wy[i];
  if(wz[i]<e.minz)e.minz=wz[i];if(wz[i]>e.maxz)e.maxz=wz[i];}
comp.forEach(e=>{e.cx=e.sx/e.n;e.cy=e.sy/e.n;e.cz=e.sz/e.n;});

// ---- right-arm center + PCA axis ----
let rc={x:0,y:0,z:0,n:0};
comp.forEach(e=>{if(e.cx>ARM_X){rc.x+=e.cx;rc.y+=e.cy;rc.z+=e.cz;rc.n++;}});
rc.x/=rc.n;rc.y/=rc.n;rc.z/=rc.n;
let cxx=0,cxy=0,cxz=0,cyy=0,cyz=0,czz=0;
comp.forEach(e=>{if(e.cx>ARM_X&&e.n>=SCREW_VERTS){const dx=e.cx-rc.x,dy=e.cy-rc.y,dz=e.cz-rc.z,w=e.n;cxx+=w*dx*dx;cxy+=w*dx*dy;cxz+=w*dx*dz;cyy+=w*dy*dy;cyz+=w*dy*dz;czz+=w*dz*dz;}});
let vx=1,vy=0.2,vz=0.3;
for(let it=0;it<80;it++){const nx=cxx*vx+cxy*vy+cxz*vz,ny=cxy*vx+cyy*vy+cyz*vz,nz=cxz*vx+cyz*vy+czz*vz,l=Math.hypot(nx,ny,nz)||1;vx=nx/l;vy=ny/l;vz=nz/l;}
const ax={x:vx,y:vy,z:vz};

// ---- select the gripper / wrist-end cluster (most-negative along the arm) ----
comp.forEach(e=>{e.along=(e.cx-rc.x)*ax.x+(e.cy-rc.y)*ax.y+(e.cz-rc.z)*ax.z;});
const grip=[...comp.values()].filter(e=>e.cx>ARM_X && e.along>GRIPPER_ALONG);
const gBig=grip.filter(e=>e.n>=SCREW_VERTS);

// local center + PCA axis of just the gripper cluster
const grc={x:0,y:0,z:0}; let gw=0;
gBig.forEach(e=>{grc.x+=e.cx*e.n;grc.y+=e.cy*e.n;grc.z+=e.cz*e.n;gw+=e.n;});
grc.x/=gw;grc.y/=gw;grc.z/=gw;
let mxx=0,mxy=0,mxz=0,myy=0,myz=0,mzz=0;
gBig.forEach(e=>{const dx=e.cx-grc.x,dy=e.cy-grc.y,dz=e.cz-grc.z,w=e.n;mxx+=w*dx*dx;mxy+=w*dx*dy;mxz+=w*dx*dz;myy+=w*dy*dy;myz+=w*dy*dz;mzz+=w*dz*dz;});
let gx=1,gy=0.3,gz=0.2;
for(let it=0;it<80;it++){const nx=mxx*gx+mxy*gy+mxz*gz,ny=mxy*gx+myy*gy+myz*gz,nz=mxz*gx+myz*gy+mzz*gz,l=Math.hypot(nx,ny,nz)||1;gx=nx/l;gy=ny/l;gz=nz/l;}
const gax={x:gx,y:gy,z:gz};

// ---- chain-aware displacement for the compact gripper assembly ----
grip.forEach(e=>{
  const dx=e.cx-grc.x,dy=e.cy-grc.y,dz=e.cz-grc.z;
  const al=dx*gax.x+dy*gax.y+dz*gax.z;
  let px=dx-al*gax.x,py=dy-al*gax.y,pz=dz-al*gax.z;
  let pl=Math.hypot(px,py,pz); if(pl<1){px=0;py=1;pz=0;pl=1;} px/=pl;py/=pl;pz/=pl;
  e.disp=[gax.x*al*GRIP_ALONG_K+px*GRIP_PERP_K, gax.y*al*GRIP_ALONG_K+py*GRIP_PERP_K, gax.z*al*GRIP_ALONG_K+pz*GRIP_PERP_K];
  e.galong=al;
});

// ---- assign ids along the gripper chain ----
grip.sort((a,b)=>a.galong-b.galong);
const partId=new Map(); grip.forEach((e,i)=>partId.set(e.root,i));
const gripRoots=new Set(grip.map(e=>e.root));

// ---- special-part choreography: camera flies clear, 2-finger gripper opens ----
const byId=new Map(); grip.forEach(e=>byId.set(partId.get(e.root),e));
const hou=byId.get(HOUSING_ID), box=byId.get(CAM_IDS[1]);
if(hou&&box){ // camera (lens+body) moves as one unit: ride the housing + a slight lift outward to highlight it
  let dx=box.cx-hou.cx,dy=box.cy-hou.cy,dz=box.cz-hou.cz;const l=Math.hypot(dx,dy,dz)||1;
  const d=[hou.disp[0]+dx/l*CAM_LIFT, hou.disp[1]+dy/l*CAM_LIFT, hou.disp[2]+dz/l*CAM_LIFT];
  for(const id of CAM_IDS){const p=byId.get(id); if(p) p.disp=d.slice();}
}
const fingers=FINGER_IDS.map(id=>byId.get(id)).filter(Boolean);
if(fingers.length===2){ // spread the two fingers apart along their separation (world-X) axis
  const midX=(fingers[0].cx+fingers[1].cx)/2;
  for(const f of fingers){const s=f.cx<midX?-1:1;f.disp=[f.disp[0]+s*FINGER_OPEN, f.disp[1], f.disp[2]];}
}

// ---- collision relaxation: push overlapping parts apart until the fully-exploded view has no overlaps ----
// camera (lens+body) is one rigid body so it stays together; screws re-ride their parent afterwards.
const rad=e=>0.5*Math.hypot(e.maxx-e.minx,e.maxy-e.miny,e.maxz-e.minz)*RELAX_RADIUS_K;
const camParts=CAM_IDS.map(id=>byId.get(id)).filter(Boolean);
const camRoots=new Set(camParts.map(e=>e.root));
const bodies=[];
for(const e of gBig){ if(camRoots.has(e.root)) continue;
  bodies.push({parts:[e],cx:e.cx,cy:e.cy,cz:e.cz,dx:e.disp[0],dy:e.disp[1],dz:e.disp[2],r:rad(e)}); }
if(camParts.length){
  let mnx=1e9,mny=1e9,mnz=1e9,mx=-1e9,my=-1e9,mz=-1e9,sx=0,sy=0,sz=0,sn=0;
  for(const e of camParts){mnx=Math.min(mnx,e.minx);mny=Math.min(mny,e.miny);mnz=Math.min(mnz,e.minz);mx=Math.max(mx,e.maxx);my=Math.max(my,e.maxy);mz=Math.max(mz,e.maxz);sx+=e.cx*e.n;sy+=e.cy*e.n;sz+=e.cz*e.n;sn+=e.n;}
  bodies.push({parts:camParts,cx:sx/sn,cy:sy/sn,cz:sz/sn,dx:camParts[0].disp[0],dy:camParts[0].disp[1],dz:camParts[0].disp[2],r:0.5*Math.hypot(mx-mnx,my-mny,mz-mnz)*RELAX_RADIUS_K});
}
for(let it=0;it<RELAX_ITERS;it++){
  for(let i=0;i<bodies.length;i++)for(let j=i+1;j<bodies.length;j++){
    const a=bodies[i],b=bodies[j];
    let dx=(b.cx+b.dx)-(a.cx+a.dx),dy=(b.cy+b.dy)-(a.cy+a.dy),dz=(b.cz+b.dz)-(a.cz+a.dz);
    let d=Math.hypot(dx,dy,dz);const minD=a.r+b.r;
    if(d<minD){ if(d<1e-3){dx=1;dy=0;dz=0;d=1;} const p=(minD-d)*0.25; dx/=d;dy/=d;dz/=d;
      a.dx-=dx*p;a.dy-=dy*p;a.dz-=dz*p; b.dx+=dx*p;b.dy+=dy*p;b.dz+=dz*p; }
  }
}
for(const bd of bodies) for(const e of bd.parts) e.disp=[bd.dx,bd.dy,bd.dz];
grip.forEach(e=>{if(e.n<SCREW_VERTS){let best=null,bd=1e18;for(const a of gBig){const dx=a.cx-e.cx,dy=a.cy-e.cy,dz=a.cz-e.cz,dd=dx*dx+dy*dy+dz*dz;if(dd<bd){bd=dd;best=a;}}if(best)e.disp=best.disp.slice();}});

// ---- build compact indexed geometry (gripper only), recentered to grc ----
const remap=new Map(); const P=[],D=[],PID=[]; let V=0;
const getV=(wid,root)=>{let id=remap.get(wid);if(id===undefined){id=V++;remap.set(wid,id);
  P.push(wx[wid]-grc.x,wy[wid]-grc.y,wz[wid]-grc.z);
  const e=comp.get(find(root)); D.push(e.disp[0],e.disp[1],e.disp[2]); PID.push(partId.get(find(root)));}
  return id;};
const IDX=[];
for(let t=0;t<nTri;t++){
  const r=find(triW[t*3]);
  if(!gripRoots.has(r)) continue; // gripper cluster only
  const a=getV(triW[t*3],r), b=getV(triW[t*3+1],r), c=getV(triW[t*3+2],r);
  IDX.push(a,b,c);
}
const T=IDX.length/3;

// ---- write binary ----
const headerBytes=6*4;
const posBytes=V*3*4, dispBytes=V*3*4, pidBytes=(V*2+3&~3), idxBytes=T*3*4;
const total=headerBytes+posBytes+dispBytes+pidBytes+idxBytes;
const ab=new ArrayBuffer(total); const dv=new DataView(ab); let o=0;
dv.setUint32(o,0x4f414558,true);o+=4; // 'OAEX'
dv.setUint32(o,1,true);o+=4;
dv.setUint32(o,V,true);o+=4;
dv.setUint32(o,T,true);o+=4;
dv.setUint32(o,grip.length,true);o+=4;
dv.setUint32(o,0,true);o+=4; // reserved
for(let i=0;i<P.length;i++){dv.setFloat32(o,P[i],true);o+=4;}
for(let i=0;i<D.length;i++){dv.setFloat32(o,D[i],true);o+=4;}
for(let i=0;i<PID.length;i++){dv.setUint16(o,PID[i],true);o+=2;} o=headerBytes+posBytes+dispBytes+pidBytes;
for(let i=0;i<IDX.length;i++){dv.setUint32(o,IDX[i],true);o+=4;}
fs.writeFileSync(OUT_BIN, Buffer.from(ab));

// ---- part table JSON (recentered to the gripper) for label anchoring ----
const parts=grip.map((e,i)=>({
  id:i, verts:e.n,
  center:[+(e.cx-grc.x).toFixed(1),+(e.cy-grc.y).toFixed(1),+(e.cz-grc.z).toFixed(1)],
  size:[+(e.maxx-e.minx).toFixed(1),+(e.maxy-e.miny).toFixed(1),+(e.maxz-e.minz).toFixed(1)],
  disp:[+e.disp[0].toFixed(2),+e.disp[1].toFixed(2),+e.disp[2].toFixed(2)],
  along:+e.galong.toFixed(1),
}));
fs.writeFileSync(OUT_JSON, JSON.stringify({
  source:SRC, quant:QUANT, mode:"gripper", gripperCenter:[+grc.x.toFixed(1),+grc.y.toFixed(1),+grc.z.toFixed(1)],
  axis:[+gax.x.toFixed(4),+gax.y.toFixed(4),+gax.z.toFixed(4)],
  vertexCount:V, triangleCount:T, partCount:grip.length, parts,
}, null, 1));

console.log(`components(total)=${comp.size} gripperParts=${grip.length} (along<${GRIPPER_ALONG})`);
console.log(`baked V=${V} T=${T}  bin=${(total/1048576).toFixed(2)}MB`);
console.log(`gripper parts (verts>=120), along order:`);
parts.filter(p=>p.verts>=120).forEach(p=>console.log(`  #${p.id} verts=${p.verts} size=${p.size.join('x')} along=${p.along} ctr=${p.center.join(',')}`));
