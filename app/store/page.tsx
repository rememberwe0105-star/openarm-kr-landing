"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CSS = `:root{
  --d-bg:#FFFFFF; --d-bg2:#F6F8FB; --d-txt:#0A0D14; --d-mut:#52525B; --d-line:rgba(10,13,20,.09); --d-line2:rgba(10,13,20,.15);
  --l-bg:#F6F8FB; --l-surf:#FFFFFF; --l-txt:#0C1220; --l-mut:#5A6678; --l-line:#E6EBF1; --l-line2:#D3DBE6;
  --cy:#3A56FF; --cy-deep:#2438C9; --cy-soft:#6F83FF;
  --shadow:0 1px 2px rgba(16,24,40,.04),0 10px 28px -10px rgba(16,24,40,.14); --shadow-lg:0 2px 6px rgba(16,24,40,.05),0 28px 60px -16px rgba(16,24,40,.22);
  --sans:var(--font-inter),'Inter',system-ui,sans-serif; --mono:var(--font-jetbrains-mono),'JetBrains Mono',monospace;
}
.oas{font-family:var(--sans);background:var(--l-bg);color:var(--l-txt);-webkit-font-smoothing:antialiased;line-height:1.6;min-height:100vh}
.oas *{box-sizing:border-box;margin:0;padding:0}
.oas a{color:inherit;text-decoration:none}
.oas .wrap{max-width:1200px;margin:0 auto;padding:0 32px;position:relative}
.oas .mono{font-family:var(--mono)}

.oas nav{position:sticky;top:0;z-index:30;background:rgba(255,255,255,.82);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--d-line)}
.oas .nav-in{max-width:1200px;margin:0 auto;padding:0 32px;height:68px;display:flex;align-items:center;justify-content:space-between}
.oas .logo{font-weight:800;font-size:20px;letter-spacing:-.02em;color:var(--d-txt)}.oas .logo b{color:var(--cy)}
.oas .nav-r{display:flex;align-items:center;gap:12px}
.oas .langbtn{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--d-txt);border:1px solid var(--d-line2);background:transparent;padding:8px 13px;border-radius:999px;cursor:pointer;transition:.2s}
.oas .langbtn:hover{border-color:var(--cy);color:var(--cy)}
.oas .cartbtn{display:flex;align-items:center;gap:9px;border:1px solid var(--d-line2);padding:9px 18px;border-radius:999px;font-weight:700;font-size:13px;cursor:pointer;position:relative;color:var(--d-txt);font-family:var(--mono)}
.oas .cartbtn:hover{border-color:var(--cy);color:var(--cy)}
.oas .cnt{position:absolute;top:-8px;right:-8px;background:var(--cy);color:#fff;font-size:11px;font-weight:800;width:22px;height:22px;border-radius:50%;display:none;align-items:center;justify-content:center;box-shadow:0 0 10px rgba(58,86,255,.5)}

.oas .head{background:var(--d-bg);color:var(--d-txt);padding:72px 0 60px;border-bottom:1px solid var(--d-line);position:relative;overflow:hidden}
.oas .head::after{content:"";position:absolute;width:900px;height:900px;left:50%;top:-440px;transform:translateX(-50%);background:radial-gradient(circle,rgba(58,86,255,.14),transparent 62%);pointer-events:none}
.oas .head .eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--cy-deep);display:inline-flex;align-items:center;gap:8px;margin-bottom:16px;background:rgba(58,86,255,.07);border:1px solid rgba(58,86,255,.18);border-radius:999px;padding:7px 15px}
.oas .head .eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--cy)}
.oas .back{font-size:13px;color:var(--d-mut);font-weight:600;margin-bottom:18px;display:inline-block}.oas .back:hover{color:var(--cy)}
.oas .head h1{font-size:clamp(34px,5vw,58px);font-weight:900;letter-spacing:-.04em;margin-bottom:14px;position:relative}
.oas .head h1 span{color:var(--cy)}
.oas .head p{color:var(--d-mut);font-size:17px;max-width:60ch;position:relative}
.oas .estnote{margin-top:18px;display:inline-block;font-family:var(--mono);font-size:12px;color:var(--cy-soft);background:rgba(58,86,255,.06);border:1px solid var(--d-line);padding:9px 14px;border-radius:8px;position:relative;line-height:1.5}

.oas .prod{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center;padding:70px 0;border-bottom:1px solid var(--l-line)}
.oas .prod.rev .pmedia{order:2}
.oas .pmedia{position:relative;aspect-ratio:4/3;border:1px solid var(--l-line2);border-radius:22px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(140deg,#eef2f6,#dde5ed);box-shadow:var(--shadow-lg)}
.oas .pmedia img{width:100%;height:100%;object-fit:contain;padding:26px}
.oas .pmedia.mv{background:radial-gradient(circle at 50% 38%,#eef2fb,#e2e8f4 78%);border-color:var(--d-line2)}
.oas .pmedia.mv model-viewer{width:100%;height:100%;background:transparent}
.oas .pmedia.dark{background:radial-gradient(circle at 50% 38%,#eef2fb,#e2e8f4 78%);border-color:var(--d-line2)}
.oas .pbadge{position:absolute;top:16px;left:18px;background:var(--cy);color:#fff;font-family:var(--mono);font-size:11px;font-weight:700;padding:6px 13px;border-radius:999px;z-index:2;letter-spacing:.04em;box-shadow:0 6px 16px -6px rgba(58,86,255,.5)}
.oas .scode{position:absolute;bottom:14px;left:20px;font-family:var(--mono);font-size:10px;letter-spacing:.14em;color:rgba(10,13,20,.35);z-index:2}
.oas .pmedia:not(.mv):not(.dark) .scode{color:#9aa7b5}
.oas .mvhint{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:10px;color:var(--d-mut);border:1px solid var(--d-line);padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.75);z-index:2}
.oas .pcat{font-family:var(--mono);font-size:11px;color:var(--cy-deep);letter-spacing:.18em;margin-bottom:12px}
.oas .pinfo h2{font-size:clamp(26px,3vw,38px);font-weight:800;letter-spacing:-.025em;line-height:1.1;margin-bottom:14px}
.oas .price{font-family:var(--mono);font-size:30px;color:var(--l-txt);font-weight:700;margin-bottom:4px;letter-spacing:-.02em}
.oas .price small{font-size:14px;color:var(--l-mut);font-weight:500;font-family:var(--sans)}
.oas .ship{display:inline-flex;align-items:center;gap:7px;font-size:13px;color:var(--cy-deep);font-weight:600;margin-bottom:18px}
.oas .ship::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--cy);box-shadow:0 0 8px var(--cy)}
.oas .ship.tbd{color:var(--l-mut)}.oas .ship.tbd::before{background:var(--l-mut);box-shadow:none}
.oas .pdesc{color:var(--l-mut);font-size:15px;line-height:1.7;margin-bottom:22px;white-space:pre-line;word-break:keep-all}
.oas .opt{display:flex;align-items:center;gap:12px;border:1px solid var(--l-line2);border-radius:12px;padding:13px 16px;margin-bottom:18px;cursor:pointer;transition:.2s;max-width:460px;background:var(--l-surf)}
.oas .opt:hover{border-color:var(--cy-deep)}
.oas .opt input{width:18px;height:18px;accent-color:var(--cy-deep)}
.oas .opt .ot{font-weight:600;font-size:14px}
.oas .opt .op{margin-left:auto;font-family:var(--mono);color:var(--cy-deep);font-weight:700;font-size:13px}
.oas .addbtn{width:100%;max-width:460px;border:1px solid var(--l-line2);background:var(--l-surf);color:var(--l-txt);font-family:var(--sans);font-weight:700;font-size:15px;padding:15px;border-radius:12px;cursor:pointer;transition:.22s}
.oas .addbtn:hover{border-color:var(--cy-deep)}
.oas .addbtn.solid{background:var(--cy);color:#fff;border-color:var(--cy);box-shadow:0 8px 26px rgba(58,86,255,.28)}
.oas .addbtn.solid:hover{background:var(--cy-soft);transform:translateY(-1px)}
@media(max-width:820px){.oas .prod,.oas .prod.rev{grid-template-columns:1fr;gap:26px;padding:48px 0}.oas .prod.rev .pmedia{order:-1}}

.oas .overlay{position:fixed;inset:0;background:rgba(2,4,8,.55);opacity:0;pointer-events:none;transition:.3s;z-index:40;backdrop-filter:blur(2px)}
.oas .overlay.on{opacity:1;pointer-events:auto}
.oas .drawer{position:fixed;top:0;right:0;height:100%;width:404px;max-width:92vw;background:#fff;color:var(--d-txt);border-left:1px solid var(--d-line2);box-shadow:-10px 0 50px rgba(10,13,20,.14);transform:translateX(100%);transition:.35s;z-index:50;display:flex;flex-direction:column}
.oas .drawer.on{transform:none}
.oas .dh{padding:22px 24px;border-bottom:1px solid var(--d-line);display:flex;justify-content:space-between;align-items:center}
.oas .dh h3{font-size:17px;font-weight:800}.oas .dh .mono{color:var(--cy);font-size:12px;letter-spacing:.1em}
.oas .dx{cursor:pointer;font-size:24px;color:var(--d-mut);line-height:1}.oas .dx:hover{color:var(--cy)}
.oas .ditems{flex:1;overflow-y:auto;padding:14px 24px}
.oas .dempty{text-align:center;color:var(--d-mut);padding:50px 0;font-size:14px;font-family:var(--mono)}
.oas .di{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 0;border-bottom:1px solid var(--d-line)}
.oas .di .dn{font-weight:600;font-size:14px}
.oas .di-r{display:flex;align-items:center;gap:10px}
.oas .di .dp{font-family:var(--mono);font-weight:700;color:var(--cy-soft);font-size:14px}
.oas .di .drm{cursor:pointer;color:var(--d-mut);font-size:18px}.oas .di .drm:hover{color:#ff6b6b}
.oas .dfoot{padding:22px 24px;border-top:1px solid var(--d-line)}
.oas .dtot{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;color:var(--d-mut)}
.oas .dtot b{font-family:var(--mono);font-size:22px;color:var(--cy)}
.oas .dnote{font-size:11px;color:var(--d-mut);font-family:var(--mono);margin-bottom:16px;line-height:1.5}
.oas .checkout{width:100%;background:var(--cy);color:#fff;font-weight:800;font-size:16px;padding:15px;border:none;border-radius:12px;cursor:pointer;box-shadow:0 8px 24px rgba(58,86,255,.35)}
.oas .checkout:hover{background:var(--cy-soft)}
.oas .modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(2,4,8,.6);opacity:0;pointer-events:none;transition:.3s;z-index:60;backdrop-filter:blur(3px)}
.oas .modal.on{opacity:1;pointer-events:auto}
.oas .mbox{background:#fff;color:var(--d-txt);border:1px solid var(--d-line2);border-radius:22px;max-width:540px;width:100%;max-height:90vh;overflow-y:auto;padding:32px;box-shadow:0 30px 80px rgba(10,13,20,.16);position:relative}
.oas .mbox h3{font-size:22px;font-weight:800;margin-bottom:6px}
.oas .mx{position:absolute;top:16px;right:20px;font-size:26px;color:var(--d-mut);cursor:pointer;line-height:1}.oas .mx:hover{color:var(--cy)}
.oas .mbox .msub{color:var(--d-mut);font-size:14px;margin-bottom:20px}
.oas .msummary{border:1px solid var(--d-line);border-radius:12px;padding:16px;margin-bottom:18px;font-size:13px;background:rgba(58,86,255,.03)}
.oas .msummary .mrow{display:flex;justify-content:space-between;padding:4px 0;color:var(--d-mut)}
.oas .msummary .mtot{border-top:1px solid var(--d-line);margin-top:6px;padding-top:8px;color:var(--d-txt);font-weight:800}
.oas .msummary .mtot span:last-child{color:var(--cy)}
.oas .frow{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.oas .field{margin-bottom:14px}
.oas .field label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--d-mut);margin-bottom:7px;text-transform:uppercase}
.oas .field input,.oas .field textarea{width:100%;background:#f6f8fb;border:1px solid var(--d-line2);border-radius:10px;padding:12px 14px;color:var(--d-txt);font-family:var(--sans);font-size:15px;outline:none}
.oas .field input:focus,.oas .field textarea:focus{border-color:var(--cy);background:#fff;box-shadow:0 0 0 3px rgba(58,86,255,.15)}
.oas .field input::placeholder,.oas .field textarea::placeholder{color:#9aa3b2}
.oas .agree{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;color:var(--d-mut);margin:6px 0 18px}
.oas .agree input{margin-top:3px;accent-color:var(--cy)}.oas .agree b{color:var(--d-txt)}
.oas .submit{width:100%;background:var(--cy);color:#fff;font-weight:800;font-size:16px;padding:15px;border:none;border-radius:12px;cursor:pointer;box-shadow:0 8px 24px rgba(58,86,255,.35)}
.oas .submit:hover{background:var(--cy-soft)}
.oas .cbox{background:var(--l-surf);color:var(--l-txt);border:1px solid var(--l-line2);border-radius:22px;max-width:880px;width:100%;max-height:90vh;overflow-y:auto;padding:30px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.4)}
.oas .cbox h3{font-size:22px;font-weight:800;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--l-line)}
.oas .cbox .mx{color:var(--l-mut)}.oas .cbox .mx:hover{color:var(--cy-deep)}
.oas .cam-top{display:grid;grid-template-columns:300px 1fr;gap:26px;margin-bottom:22px}
.oas .cam-main{background:#fff;border:1px solid var(--l-line);border-radius:14px;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;overflow:hidden}
.oas .cam-main img{width:100%;height:100%;object-fit:contain;padding:24px;mix-blend-mode:multiply}
.oas .cam-thumbs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:10px}
.oas .cam-thumb{background:#fff;border:2px solid var(--l-line);border-radius:12px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;transition:.2s}
.oas .cam-thumb.on{border-color:var(--cy-deep)}
.oas .cam-thumb img{width:100%;height:38px;object-fit:contain;mix-blend-mode:multiply}
.oas .cam-thumb span{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--l-mut)}
.oas .cam-thumb.on span{color:var(--cy-deep)}
.oas .cam-info h4{font-size:18px;font-weight:800;margin-bottom:8px;white-space:pre-line}
.oas .cam-info > p{font-size:13px;color:var(--l-mut);line-height:1.6;margin-bottom:14px;white-space:pre-line}
.oas .cam-opts h5{font-size:13px;font-weight:800;margin:16px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--l-line)}
.oas .cam-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.oas .cam-opt{display:flex;align-items:center;gap:11px;border:1.5px solid var(--l-line2);border-radius:12px;padding:13px 14px;cursor:pointer;transition:.2s}
.oas .cam-opt:hover{border-color:var(--cy-deep)}
.oas .cam-opt b{display:block;font-size:14px;font-weight:700}
.oas .cam-opt small{font-family:var(--mono);font-size:11px;color:var(--l-mut)}
.oas .cam-radio,.oas .cam-check{width:20px;height:20px;border:2px solid var(--l-line2);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:.2s}
.oas .cam-radio{border-radius:50%}.oas .cam-check{border-radius:6px}
.oas .cam-radio.on,.oas .cam-check.on{border-color:var(--cy-deep);background:var(--cy-deep)}
.oas .cam-radio.on::after{content:"";width:8px;height:8px;border-radius:50%;background:#fff}
.oas .cam-check.on::after{content:"✓";color:#fff;font-size:13px;font-weight:800}
.oas .cam-specs-h{font-size:15px;font-weight:800;margin:8px 0 12px}
.oas .cam-tablewrap{overflow-x:auto;border:1px solid var(--l-line);border-radius:12px;margin-bottom:22px}
.oas .cam-table{width:100%;border-collapse:collapse;font-size:12.5px;min-width:560px}
.oas .cam-table th,.oas .cam-table td{padding:10px 13px;text-align:left;border-bottom:1px solid var(--l-line)}
.oas .cam-table thead th{background:var(--l-bg);font-family:var(--mono);font-size:11px;text-transform:uppercase;color:var(--l-mut);font-weight:700}
.oas .cam-table tbody td:first-child{font-weight:700;color:var(--l-mut);background:#fafbfc;white-space:nowrap}
.oas .cam-table tbody tr:last-child td{border-bottom:none}
.oas .cam-foot{display:flex;justify-content:flex-end;gap:12px;border-top:1px solid var(--l-line);padding-top:20px}
.oas .cam-cancel{padding:12px 22px;border:1px solid var(--l-line2);background:var(--l-surf);border-radius:11px;font-weight:700;font-size:14px;cursor:pointer}
.oas .cam-cancel:hover{background:var(--l-bg)}
.oas .cam-add{padding:12px 26px;border:none;border-radius:11px;font-weight:800;font-size:14px;cursor:pointer;background:var(--cy);color:#fff;box-shadow:0 8px 24px rgba(58,86,255,.3)}
.oas .cam-add:disabled{background:var(--l-line2);color:var(--l-mut);cursor:not-allowed;box-shadow:none}
.oas .cam-add:not(:disabled):hover{background:var(--cy-soft)}
@media(max-width:680px){.oas .cam-top{grid-template-columns:1fr}.oas .cam-grid{grid-template-columns:1fr}}
.oas footer{background:var(--d-bg);color:var(--d-mut);font-family:var(--mono);font-size:12px;text-align:center;padding:30px 0 40px;border-top:1px solid var(--d-line)}
.oas footer b{color:var(--cy)}
@media(max-width:480px){.oas .frow{grid-template-columns:1fr}.oas .drawer{width:100%;max-width:100%}.oas .mbox{padding:24px 20px}}`;

const mvTag = (src: string, alt: string, orbit = "25deg 72deg auto", fov = "") =>
  `<model-viewer src="${src}" camera-controls touch-action="pan-y" auto-rotate auto-rotate-delay="500" rotation-per-second="18deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" shadow-softness="0.8" exposure="1.05" environment-image="/models/studio-env.png" tone-mapping="aces" camera-orbit="${orbit}" ${fov} loading="lazy" alt="${alt}"></model-viewer>`;

function buildHTML(t: Record<string, string>, lang: "ko" | "en") {
  const UP = "https://cdn.shopify.com/s/files/1/0719/7982/7417/files/Upgrade_kit_fig_1N.png?v=1779094011";
  return `
<nav><div class="nav-in">
  <a href="/" class="logo">OpenArm<b>.</b></a>
  <div class="nav-r">
    <button class="langbtn" onclick="window.__oaToggleLang&&window.__oaToggleLang()">${lang === "ko" ? "EN" : "한국어"}</button>
    <div class="cartbtn" onclick="openDrawer()"><span>CART</span><span class="cnt" id="cnt">0</span></div>
  </div>
</div></nav>

<div class="head"><div class="wrap">
  <a class="back" href="/">← ${t.back}</a>
  <div class="eyebrow">Store</div>
  <h1>OpenArm <span>Store</span></h1>
  <p>${t.head_p}</p>
  <div class="estnote">${t.estnote}</div>
</div></div>

<div class="wrap">

  <!-- OpenArm 2.0 -->
  <div class="prod">
    <div class="pmedia mv"><span class="pbadge">${t.b_now}</span><span class="scode">// UNIT_2.0</span>${mvTag("/models/openarm-2.glb", "OpenArm 2.0", "25deg 72deg auto", 'field-of-view="32deg"')}<span class="mvhint">${t.drag}</span></div>
    <div class="pinfo">
      <div class="pcat">// ROBOTS</div>
      <h2>OpenArm 2.0 Bimanual</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship">${t.ship_2_0}</div>
      <div class="pdesc">${t.d_2_0}</div>
      <label class="opt"><input type="checkbox" id="camopt"/><span class="ot">${t.cam_opt}</span></label>
      <button class="addbtn solid" onclick="add('OpenArm 2.0',0,document.getElementById('camopt').checked)">${t.add_inq}</button>
    </div>
  </div>

  <!-- OpenArm Cell -->
  <div class="prod rev">
    <div class="pmedia mv"><span class="pbadge">${t.b_oct}</span><span class="scode">// MOD_CELL</span>${mvTag("/models/openarm-cell.glb", "OpenArm Cell", "30deg 72deg auto")}<span class="mvhint">${t.drag}</span></div>
    <div class="pinfo">
      <div class="pcat">// EVALUATION</div>
      <h2>OpenArm Cell</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship">${t.ship_cell}</div>
      <div class="pdesc">${t.d_cell}</div>
      <button class="addbtn" onclick="add('OpenArm Cell',0,false)">${t.add_inq}</button>
    </div>
  </div>

  <!-- OpenArm KER -->
  <div class="prod">
    <div class="pmedia dark"><span class="pbadge">${t.b_soon}</span><span class="scode">// MOD_KER</span><img src="https://docs.openarm.dev/assets/images/ker-086043e0d7a5b11dd872d6f997f37ce4.gif" alt="OpenArm KER"/></div>
    <div class="pinfo">
      <div class="pcat">// TELEOP</div>
      <h2>OpenArm KER</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship tbd">${t.ship_ker}</div>
      <div class="pdesc">${t.d_ker}</div>
      <button class="addbtn" onclick="add('OpenArm KER',0,false)">${t.add_inq}</button>
    </div>
  </div>

  <!-- Upgrade Kit -->
  <div class="prod rev">
    <div class="pmedia"><span class="pbadge">${t.b_11user}</span><span class="scode">// UPGRADE_KIT</span><img src="${UP}" alt="OpenArm 1.1 → 2.0 Upgrade Kit"/></div>
    <div class="pinfo">
      <div class="pcat">// UPGRADE</div>
      <h2>${t.up_t}</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship tbd">${t.ship_inq}</div>
      <div class="pdesc">${t.d_up}</div>
      <label class="opt"><input type="checkbox" id="upcamopt"/><span class="ot">${t.cam_opt}</span></label>
      <button class="addbtn" onclick="add('${lang === "en" ? "1.1 → 2.0 Upgrade Kit" : "1.1 → 2.0 업그레이드 키트"}',0,document.getElementById('upcamopt').checked)">${t.add_inq}</button>
    </div>
  </div>

  <!-- OpenArm 1.1 Follower -->
  <div class="prod">
    <div class="pmedia"><span class="pbadge">${t.b_stock}</span><span class="scode">// FOLLOWER_1.1</span><img src="/images/products/follower_clean.png" alt="OpenArm Follower Dual Arm V1.1"/></div>
    <div class="pinfo">
      <div class="pcat">// ROBOTS · 1.1</div>
      <h2>OpenArm Follower Dual Arm 1.1</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship tbd">${t.ship_inq}</div>
      <div class="pdesc">${t.d_follower}</div>
      <button class="addbtn" onclick="add('OpenArm Follower Dual Arm 1.1',0,false)">${t.add_inq}</button>
    </div>
  </div>

  <!-- OpenArm 1.1 Leader -->
  <div class="prod rev">
    <div class="pmedia"><span class="pbadge">${t.b_stock}</span><span class="scode">// LEADER_1.1</span><img src="/images/products/leader_clean.png" alt="OpenArm Leader Dual Arm V1.1"/></div>
    <div class="pinfo">
      <div class="pcat">// ROBOTS · 1.1</div>
      <h2>OpenArm Leader Dual Arm 1.1</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship tbd">${t.ship_inq}</div>
      <div class="pdesc">${t.d_leader}</div>
      <button class="addbtn" onclick="add('OpenArm Leader Dual Arm 1.1',0,false)">${t.add_inq}</button>
    </div>
  </div>

  <!-- Camera Package -->
  <div class="prod">
    <div class="pmedia"><span class="pbadge">${t.b_acc}</span><span class="scode">// CAMERA_PKG</span><img src="/images/products/d435if_camera.png" alt="OpenArm Camera Package"/></div>
    <div class="pinfo">
      <div class="pcat">// ACCESSORIES</div>
      <h2>${t.cam_t}</h2>
      <div class="price" style="font-size:23px">${t.inquire}</div>
      <div class="ship tbd">${t.ship_inq}</div>
      <div class="pdesc">${t.d_cam}</div>
      <button class="addbtn" onclick="openCam()">${t.cam_select} →</button>
    </div>
  </div>

</div>

<footer>OPENARM · <b>LIBERTRON</b> · ${t.footer}</footer>

<div class="overlay" id="ov" onclick="closeAll()"></div>
<aside class="drawer" id="drawer">
  <div class="dh"><h3>${t.cart_h} <span class="mono">// CART</span></h3><span class="dx" onclick="closeDrawer()">×</span></div>
  <div class="ditems" id="ditems"></div>
  <div class="dfoot">
    <div class="dtot"><span>${t.total}</span><b id="dtot">—</b></div>
    <div class="dnote">${t.cart_note}</div>
    <button class="checkout" onclick="openModal()">${t.checkout} →</button>
  </div>
</aside>

<div class="modal" id="modal"><div class="mbox">
  <span class="mx" onclick="closeAll()">×</span>
  <h3>${t.modal_h}</h3>
  <div class="msub">${t.modal_sub}</div>
  <div class="msummary" id="msummary"></div>
  <form onsubmit="return submitForm(event)">
    <div class="frow">
      <div class="field"><label>${t.f_name} *</label><input id="f_name" required placeholder="${t.ph_name}"/></div>
      <div class="field"><label>${t.f_org}</label><input id="f_org" placeholder="${t.ph_org}"/></div>
    </div>
    <div class="frow">
      <div class="field"><label>${t.f_country} *</label><input id="f_country" required placeholder="${t.ph_country}"/></div>
      <div class="field"><label>${t.f_email} *</label><input id="f_email" type="email" required placeholder="hello@example.com"/></div>
    </div>
    <div class="field"><label>${t.f_phone} *</label><input id="f_phone" required placeholder="010-0000-0000"/></div>
    <div class="field"><label>${t.f_msg} *</label><textarea id="f_msg" rows="3" required placeholder="${t.ph_msg}"></textarea></div>
    <label class="agree"><input type="checkbox" required/> <span><b>${t.agree_b}</b> — ${t.agree_d}</span></label>
    <button class="submit" type="submit">${t.submit}</button>
  </form>
</div></div>

<div class="modal" id="cammodal"><div class="cbox">
  <span class="mx" onclick="closeCam()">×</span>
  <h3>${t.cam_title}</h3>
  <div class="cam-top">
    <div class="cam-imgcol">
      <div class="cam-main"><img id="cam-main-img" src="/images/products/d435if_camera.png" alt="camera"/></div>
      <div class="cam-thumbs">
        <button class="cam-thumb on" data-cam="d435if" onclick="camView('d435if')"><img src="/images/products/d435if_camera.png" alt="D435IF"/><span>D435IF</span></button>
        <button class="cam-thumb" data-cam="d455f" onclick="camView('d455f')"><img src="/images/products/d455f_camera.png" alt="D455F"/><span>D455F</span></button>
        <button class="cam-thumb" data-cam="d405" onclick="camView('d405')"><img src="/images/products/d405_camera.png" alt="D405"/><span>D405</span></button>
      </div>
    </div>
    <div class="cam-info">
      <h4>${t.cam_t}</h4>
      <p>${t.d_cam}</p>
      <div class="cam-opts">
        <h5>${t.cam_chest}</h5>
        <div class="cam-grid">
          <div class="cam-opt" onclick="camChest('d435if')"><span class="cam-radio rd" data-chest="d435if"></span><div><b>D435IF</b><small>PN: 82635D435IF</small></div></div>
          <div class="cam-opt" onclick="camChest('d455f')"><span class="cam-radio rd" data-chest="d455f"></span><div><b>D455F</b><small>PN: 82635D455F</small></div></div>
        </div>
        <h5>${t.cam_arm}</h5>
        <div class="cam-opt" onclick="camArm()"><span class="cam-check ck" id="cam-arm-box"></span><div><b>D405 ×2</b><small>PN: 82635D405</small></div></div>
      </div>
    </div>
  </div>
  <h5 class="cam-specs-h">${t.cam_specs}</h5>
  <div class="cam-tablewrap"><table class="cam-table">
    <thead><tr><th>Specification</th><th>D435IF (Chest)</th><th>D455F (Chest)</th><th>D405 (Arm)</th></tr></thead>
    <tbody>
      <tr><td>Depth Tech</td><td>Active IR Stereo</td><td>Active IR Stereo</td><td>Image-based Stereo</td></tr>
      <tr><td>Range (Depth)</td><td>0.3m ~ 3m</td><td>0.6m ~ 6m</td><td>7cm ~ 50cm</td></tr>
      <tr><td>Depth Res</td><td>Up to 1280×720 (30fps)</td><td>Up to 1280×720 (30fps)</td><td>Up to 1280×720 (30fps)</td></tr>
      <tr><td>Depth Acc</td><td>&lt; 2% at 2m</td><td>&lt; 2% at 4m</td><td>&lt; 1.4% at 20cm</td></tr>
      <tr><td>RGB Res</td><td>1920×1080 (30fps)</td><td>1280×800 (30fps)</td><td>1280×720 (30fps)</td></tr>
      <tr><td>Sensor</td><td>OV9282 / OV2740</td><td>OV9282 / OV9782</td><td>OV9282 / OV9782</td></tr>
      <tr><td>Shutter</td><td>Global / Rolling</td><td>Global / Global</td><td>Global / Global</td></tr>
      <tr><td>FOV (D/RGB)</td><td>87°×58° / 69°×42°</td><td>87°×58° / 90°×65°</td><td>84°×58° / 84°×58°</td></tr>
      <tr><td>Filter</td><td>IR Pass (750nm)</td><td>IR Pass (750nm)</td><td>IR Cut Filter</td></tr>
      <tr><td>Size</td><td>90×25.8×25 mm</td><td>124×29×26.8 mm</td><td>42×42×23 mm</td></tr>
      <tr><td>Interface</td><td>USB-C 3.1 Gen 1</td><td>USB-C 3.1 Gen 1</td><td>USB-C 3.1 Gen 1</td></tr>
    </tbody>
  </table></div>
  <div class="cam-foot">
    <button class="cam-cancel" onclick="closeCam()">${t.cam_cancel}</button>
    <button class="cam-add" id="cam-add" onclick="camAdd()" disabled>${t.cam_add}</button>
  </div>
</div></div>`;
}

const KO: Record<string, string> = {
  back: "OpenArm 2.0 메인으로", head_p: "OpenArm 전 라인업을 한 곳에서. 사양을 확인하고, 원하는 구성을 담아 문의하세요.",
  estnote: "※ 가격은 현재 확정 전입니다. 원하는 구성을 담아 문의를 남겨주시면, 담당자가 최종 견적을 개별 안내드립니다.",
  drag: "드래그 · 360°", add: "주문 담기", add_inq: "담기 (가격 문의)", inquire: "가격 문의",
  cam_select: "옵션 선택", cam_title: "카메라 옵션 선택", cam_chest: "가슴 카메라 (선택)", cam_arm: "팔 카메라 (선택)", cam_specs: "사양 비교", cam_cancel: "취소", cam_add: "선택 항목 담기",
  b_now: "지금 구매 가능", b_oct: "10월 예정", b_soon: "출시 예정", b_11user: "1.1 사용자용", b_stock: "재고 보유", b_acc: "액세서리",
  ship_2_0: "지금 주문 시 8월 중 수령 예정", ship_cell: "10월경 배송 예정", ship_ker: "10월경 배송 예정", ship_inq: "배송 문의",
  cam_opt: "상단 스테레오 카메라(ZED) — 권장 옵션",
  d_2_0: "컴팩트 그리퍼와 인핸드 카메라를 갖춘 차세대 양팔 로봇암입니다.\n연구·교육·개발 현장이 부담 없이 들일 수 있는 피지컬 AI 플랫폼이죠. 7-DOF ×2 · 양방향 힘 피드백.",
  d_cell: "배경, 조명, 카메라, 로봇 위치까지 똑같이 맞춰주는 평가용 셀입니다.\n모델을 공정하게 비교하고 자동으로 평가하는 표준 환경을 만듭니다. Z축 높이 조절 · 침입 차단 안전 센서 · 제로 캘리브레이션 지그.",
  d_ker: "2.0과 똑같은 관절 구조를 가진 무동력 리더암입니다. 가벼워서 오래 조작해도 지치지 않고, 텔레오퍼레이션·티칭 데이터 수집에 잘 맞습니다.\n지금은 외형만 공개됐고, CAD·BOM은 곧 공개될 예정입니다.",
  up_t: "1.1 → 2.0 업그레이드 키트",
  d_up: "이미 1.1을 쓰고 계신다면, 전체를 새로 살 필요 없이 핵심 부품만 바꿔 2.0으로 올릴 수 있습니다. 좌·우 양팔 한 세트로, 새 2.0 엔드이펙터(인핸드 카메라 포함)와 교체형 핑거, 새 외부 커버, CNC 금속 부품이 들어 있습니다.\n※ 엔드이펙터 안의 DM4310 모터는 빠져 있어, 기존 1.1 모터를 그대로 쓰시면 됩니다.",
  d_follower: "OpenArm 사양으로 제작된 검증된 1.1 팔로워 양팔입니다. 좌·우 팔 + 받침대 + 팔로워 그립으로 구성됩니다.\n상단·양팔 Intel RealSense 카메라 옵션을 더할 수 있습니다.",
  d_leader: "OpenArm 사양으로 제작된 1.1 리더 양팔입니다. 좌·우 팔 + 받침대 + 리더 그립으로 구성되어, 팔로워와 양방향 힘 피드백 텔레오퍼레이션을 구현합니다.",
  cam_t: "카메라 패키지 (Intel RealSense)", d_cam: "팔로워에 장착하는 옵션 카메라 시스템입니다. 가슴 1대 + 양팔 각 1대, 최대 3대까지 설치할 수 있습니다.\n가슴 카메라는 D435IF / D455F, 양팔 카메라는 D405 중 용도에 맞춰 선택합니다. 장착 브래킷 포함.",
  cart_h: "주문 카트", total: "합계", cart_note: "최종 견적은 구성·수량·배송지에 따라 개별 안내드립니다.", checkout: "주문 신청하기",
  modal_h: "OpenArm 주문 신청", modal_sub: "담으신 구성 그대로 접수됩니다. 담당자가 구성과 견적을 안내해 드릴게요.",
  f_name: "이름", ph_name: "홍길동", f_org: "소속 / 회사", ph_org: "(주)리버트론 / 학교·연구실 (선택)",
  f_country: "국가 / 지역", ph_country: "예: 대한민국", f_email: "이메일", f_phone: "전화번호", f_msg: "문의 내용", ph_msg: "도입 수량, 희망 일정, 기타 문의사항을 적어주세요.",
  agree_b: "개인정보 수집 및 이용 동의 (필수)", agree_d: "문의·견적 처리를 위해 개인정보를 수집하며 목적 달성 시 즉시 파기합니다.", submit: "주문 접수하기",
  footer: "연구 · 교육 · 개발용 플랫폼 · 가격은 문의 시 개별 안내",
};

const EN: Record<string, string> = {
  back: "Back to OpenArm 2.0", head_p: "The full OpenArm lineup in one place. Check the specs, add the configuration you want, and send an inquiry.",
  estnote: "* Pricing is being finalized. Add the configuration you want and leave an inquiry — our team follows up with an individual quote.",
  drag: "Drag · 360°", add: "Add to order", add_inq: "Add (inquire)", inquire: "Contact for price",
  cam_select: "Select options", cam_title: "Select Camera Options", cam_chest: "Chest Camera (optional)", cam_arm: "Arm Cameras (optional)", cam_specs: "Specifications", cam_cancel: "Cancel", cam_add: "Add Selected",
  b_now: "Available now", b_oct: "Ships ~October", b_soon: "Coming soon", b_11user: "For 1.1 owners", b_stock: "In stock", b_acc: "Accessory",
  ship_2_0: "Order now to receive by mid-August", ship_cell: "Ships around October", ship_ker: "Ships around October", ship_inq: "Shipping on request",
  cam_opt: "Top stereo camera (ZED) — recommended option",
  d_2_0: "A next-generation bimanual arm with a compact gripper and in-hand camera.\nA physical-AI platform research, education, and development teams can actually afford. 7-DOF ×2 · bilateral force feedback.",
  d_cell: "An evaluation cell that keeps background, lighting, cameras, and arm position identical every time.\nIt creates a standard environment for fair, automated model comparison. Z-axis lift · reach-in safety stop · zero-position jig.",
  d_ker: "A motorless leader arm with the exact same joint structure as 2.0. Light enough for long, fatigue-free operation and ideal for data collection.\nOnly the design has been revealed so far; CAD and BOM are coming soon.",
  up_t: "1.1 → 2.0 Upgrade Kit",
  d_up: "Already on 1.1? Upgrade to 2.0 by swapping just the key parts — no need to buy a whole new arm. Sold as one left-and-right arm set, it includes the new 2.0 end-effector (with in-hand camera), replaceable fingers, revised outer covers, and CNC metal parts.\n* The DM4310 motor inside the end-effector is not included — reuse your existing 1.1 motor.",
  d_follower: "The proven 1.1 follower dual arm, built to OpenArm specs. Left + right arm + pedestal + follower grips.\nOptional top and per-arm Intel RealSense cameras can be added.",
  d_leader: "The 1.1 leader dual arm, built to OpenArm specs. Left + right arm + pedestal + leader grips — pairs with the follower for bilateral force-feedback teleoperation.",
  cam_t: "Camera Package (Intel RealSense)", d_cam: "An optional camera system mounted on the follower. One chest + one per arm, up to three total.\nChoose D435IF / D455F for the chest and D405 for the arms. Mounting brackets included.",
  cart_h: "Order cart", total: "Total", cart_note: "Final quotes are provided individually by configuration, quantity, and destination.", checkout: "Submit order",
  modal_h: "OpenArm Order Request", modal_sub: "Submitted exactly as configured. Our team will follow up with configuration and a quote.",
  f_name: "Name", ph_name: "Jane Doe", f_org: "Organization / Company", ph_org: "Acme Inc. / Lab (optional)",
  f_country: "Country / Region", ph_country: "e.g., South Korea", f_email: "Email", f_phone: "Phone", f_msg: "Message", ph_msg: "Quantity, timeline, and any questions.",
  agree_b: "I agree to the collection and use of personal data (required)", agree_d: "used only to process your inquiry and quote, then deleted once fulfilled.", submit: "Submit order",
  footer: "Research · Education · Development platform · Pricing on inquiry",
};

export default function StorePage() {
  const { lang, toggleLanguage } = useLanguage();
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__oaToggleLang = toggleLanguage;
  }, [toggleLanguage]);
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__lang = lang;
    const s = document.createElement("script");
    s.src = "/store.js";
    s.setAttribute("data-store", "1");
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, [lang]);
  const t = lang === "en" ? EN : KO;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="oas" key={lang} dangerouslySetInnerHTML={{ __html: buildHTML(t, lang === "en" ? "en" : "ko") }} />
    </>
  );
}
