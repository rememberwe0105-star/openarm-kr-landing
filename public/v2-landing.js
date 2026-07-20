(function(){if(!document.querySelector('script[data-mv]')){var m=document.createElement('script');m.type='module';m.src='https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';m.setAttribute('data-mv','1');document.head.appendChild(m);}})();

  // particle network
  var cv=document.getElementById('net'),cx=cv.getContext('2d'),W,H,P=[];
  function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;}
  rs();addEventListener('resize',rs);
  var N=Math.min(80,Math.floor(innerWidth/18));
  for(var i=0;i<N;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
  var mp={x:-999,y:-999};
  function draw(){
    cx.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
      cx.beginPath();cx.arc(p.x,p.y,1.4,0,6.28);cx.fillStyle='rgba(0,200,255,.55)';cx.fill();}
    for(var a=0;a<P.length;a++)for(var b=a+1;b<P.length;b++){
      var dx=P[a].x-P[b].x,dy=P[a].y-P[b].y,d=dx*dx+dy*dy;
      if(d<16000){cx.strokeStyle='rgba(0,200,255,'+(.16*(1-d/16000))+')';cx.lineWidth=1;
        cx.beginPath();cx.moveTo(P[a].x,P[a].y);cx.lineTo(P[b].x,P[b].y);cx.stroke();}}
    for(var k=0;k<P.length;k++){var ex=P[k].x-mp.x,ey=P[k].y-mp.y,ed=ex*ex+ey*ey;
      if(ed<30000){cx.strokeStyle='rgba(0,200,255,'+(.5*(1-ed/30000))+')';cx.lineWidth=1;
        cx.beginPath();cx.moveTo(P[k].x,P[k].y);cx.lineTo(mp.x,mp.y);cx.stroke();}}
    requestAnimationFrame(draw);
  }
  draw();
  // gripper cursor follow + open/close
  var grip=document.getElementById('grip'),dot=document.getElementById('dot'),jawL=document.getElementById('jawL'),jawR=document.getElementById('jawR');
  var mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my,t=0,grab=0,grabT=0;
  addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;mp.x=e.clientX;mp.y=e.clientY;});
  addEventListener('mousedown',function(){grabT=1;});addEventListener('mouseup',function(){grabT=0;});
  (function loop(){if(!document.body.contains(grip))return;
    gx+=(mx-gx)*0.16;gy+=(my-gy)*0.16;t+=0.05;grab+=(grabT-grab)*0.2;
    var open=(Math.sin(t)*0.5+0.5)*3*(1-grab)+grab*-1.5; // idle breathing, closes on click
    jawL.setAttribute('transform','translate('+(-open)+',0)');
    jawR.setAttribute('transform','translate('+(open)+',0)');
    grip.style.transform='translate('+(gx-32)+'px,'+(gy-48)+'px)';
    dot.style.transform='translate('+(mx-3)+'px,'+(my-3)+'px)';
    requestAnimationFrame(loop);
  })();
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting)en.target.classList.add('in');});},{threshold:.15});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});



// --- OpenArm 2.0 모델 재질: 알루미늄 메탈릭으로 (흰색 무광 개선) ---
(function(){
  function styleModel(mv){
    try{
      var mats=mv.model&&mv.model.materials;if(!mats)return;
      mats.forEach(function(m){
        if(m.pbrMetallicRoughness){
          m.pbrMetallicRoughness.setBaseColorFactor([0.74,0.78,0.83,1.0]);
          if(m.pbrMetallicRoughness.setMetallicFactor)m.pbrMetallicRoughness.setMetallicFactor(0.9);
          if(m.pbrMetallicRoughness.setRoughnessFactor)m.pbrMetallicRoughness.setRoughnessFactor(0.32);
        }
      });
    }catch(e){}
  }
  var tries=0;
  var iv=setInterval(function(){
    var mvs=document.querySelectorAll('model-viewer');
    if(mvs.length){clearInterval(iv);
      mvs.forEach(function(mv){if(mv.model)styleModel(mv);mv.addEventListener('load',function(){styleModel(mv);});});
    }
    if(++tries>40)clearInterval(iv);
  },250);
})();
