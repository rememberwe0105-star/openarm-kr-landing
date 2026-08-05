"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CSS = `:root{--bg:#04060A;--line:rgba(0,200,255,.18);--line2:rgba(0,200,255,.40);--cyan:#00C8FF;--cyan-soft:#8BEDFF;--txt:#EAF4FC;--mut:#7E8DA3;--mono:'JetBrains Mono',monospace}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--txt);line-height:1.6;overflow-x:hidden;cursor:none}
  a{text-decoration:none;color:inherit}
  #net{position:fixed;inset:0;z-index:0;pointer-events:none}
  #grip{position:fixed;left:0;top:0;z-index:60;pointer-events:none;width:64px;height:64px;filter:drop-shadow(0 0 8px rgba(0,200,255,.8));will-change:transform}
  #dot{position:fixed;left:0;top:0;z-index:61;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 12px 4px rgba(0,200,255,.95);pointer-events:none;transform:translate(-50px,-50px)}
  .field input,.field textarea{cursor:text}
  .grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);background-size:54px 54px;mask-image:radial-gradient(circle at 50% 20%,#000,transparent 75%);opacity:.4}
  .glow{position:fixed;width:1000px;height:1000px;left:50%;top:-300px;transform:translateX(-50%);z-index:0;pointer-events:none;background:radial-gradient(circle,rgba(0,200,255,.16),transparent 60%);filter:blur(30px)}
  .wrap{max-width:1320px;margin:0 auto;padding:0 24px;position:relative;z-index:2}
  .mono{font-family:var(--mono)}
  nav{position:sticky;top:0;z-index:30;backdrop-filter:blur(14px);background:rgba(4,6,10,.55);border-bottom:1px solid var(--line)}
  .nav-in{max-width:1320px;margin:0 auto;padding:0 24px;height:70px;display:flex;align-items:center;justify-content:space-between}
  .logo{font-size:21px;font-weight:900;letter-spacing:-.03em}.logo b{color:var(--cyan)}
  .cartbtn{display:flex;align-items:center;gap:9px;border:1px solid var(--line2);padding:9px 18px;border-radius:999px;font-weight:700;font-size:14px;cursor:pointer;position:relative;color:var(--txt)}
  .cartbtn:hover{border-color:var(--cyan);box-shadow:0 0 16px rgba(0,200,255,.3)}
  .langbtn{font-family:var(--mono);font-size:13px;font-weight:700;color:var(--txt);border:1px solid var(--line2);background:transparent;padding:9px 14px;border-radius:999px;cursor:pointer}
  .langbtn:hover{border-color:var(--cyan);color:var(--cyan)}
  .cnt{position:absolute;top:-8px;right:-8px;background:var(--cyan);color:#04121a;font-size:11px;font-weight:800;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 10px rgba(0,200,255,.6)}
  header{padding:60px 0 30px;border-bottom:1px solid var(--line)}
  .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.3em;color:var(--cyan);text-transform:uppercase;display:inline-flex;align-items:center;gap:10px;margin-bottom:16px}
  .eyebrow::before{content:"";width:28px;height:1px;background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
  .back{font-size:13px;color:var(--mut);font-weight:600;margin-bottom:18px;display:inline-block}.back:hover{color:var(--cyan)}
  header h1{font-size:clamp(36px,5vw,62px);font-weight:900;letter-spacing:-.04em;margin-bottom:14px}
  header h1 span{color:var(--cyan);text-shadow:0 0 28px rgba(0,200,255,.5)}
  header p{color:var(--mut);font-size:18px;max-width:700px}
  .estnote{margin-top:16px;display:inline-block;font-family:var(--mono);font-size:12px;color:var(--cyan-soft);background:rgba(0,200,255,.07);border:1px solid var(--line);padding:9px 14px;border-radius:8px}
  .prod{display:flex;flex-wrap:wrap;align-items:center;gap:46px;padding:76px 0;border-bottom:1px solid var(--line)}
  .prod.rev{flex-direction:row-reverse}
  .pimg{flex:1 1 460px;min-width:300px;position:relative;aspect-ratio:4/3;border:1px solid var(--line2);border-radius:24px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:linear-gradient(140deg,#eef2f6,#dde5ed);box-shadow:0 0 50px rgba(0,200,255,.07)}
  .pimg img{width:100%;height:100%;object-fit:contain;padding:26px}
  .pimg.mv{background:radial-gradient(circle at 50% 42%,#0e1a2b,#05080e 74%)}
  .pimg.mv model-viewer{width:100%;height:100%;background:transparent}
  .mvhint{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--mut);border:1px solid var(--line);padding:5px 10px;border-radius:999px;background:rgba(4,6,10,.6);z-index:3}
  .corner{position:absolute;width:18px;height:18px;border:2px solid var(--cyan);opacity:.85;z-index:2}
  .c1{top:13px;left:13px;border-right:0;border-bottom:0}.c2{top:13px;right:13px;border-left:0;border-bottom:0}
  .c3{bottom:13px;left:13px;border-right:0;border-top:0}.c4{bottom:13px;right:13px;border-left:0;border-top:0}
  .scode{position:absolute;bottom:14px;left:40px;font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:#3a4654;z-index:2}
  .pbadge{position:absolute;top:18px;left:40px;background:var(--cyan);color:#04121a;font-family:var(--mono);font-size:11px;font-weight:700;padding:5px 11px;border-radius:6px;z-index:3;letter-spacing:.06em}
  .pinfo{flex:1 1 380px;min-width:300px}
  .pcat{font-family:var(--mono);font-size:11px;color:var(--cyan);letter-spacing:.2em;margin-bottom:12px}
  .pinfo h2{font-size:clamp(28px,3vw,42px);font-weight:900;letter-spacing:-.02em;line-height:1.08;margin-bottom:12px}
  .price{font-family:var(--mono);font-size:28px;color:var(--cyan);font-weight:700;margin-bottom:6px;text-shadow:0 0 18px rgba(0,200,255,.35)}
  .price .est{font-size:13px;color:var(--mut);font-weight:500;margin-right:6px;font-family:'Inter'}
  .pricesub{font-family:var(--mono);font-size:12px;color:var(--mut);margin-bottom:10px;letter-spacing:.04em}
  .pxnote{font-family:var(--mono);font-size:11px;color:var(--mut);margin-bottom:22px;letter-spacing:.03em;opacity:.85}
  .pdesc{color:var(--mut);font-size:15.5px;line-height:1.7;margin-bottom:24px;white-space:pre-line}
  .opt{display:flex;align-items:center;gap:12px;border:1px solid var(--line);border-radius:12px;padding:14px 16px;margin-bottom:20px;cursor:pointer;transition:.2s;max-width:440px;background:rgba(0,200,255,.03)}
  .opt:hover{border-color:var(--line2)}
  .opt input{width:18px;height:18px;accent-color:var(--cyan)}
  .opt .ot{font-weight:700;font-size:14px}
  .opt .op{margin-left:auto;font-family:var(--mono);color:var(--cyan-soft);font-weight:700}
  .addbtn{width:100%;max-width:440px;border:1px solid var(--line2);background:transparent;color:var(--txt);font-family:'Inter';font-weight:800;font-size:15px;padding:15px;border-radius:12px;cursor:pointer;transition:.25s}
  .addbtn:hover{background:var(--cyan);color:#04121a;border-color:var(--cyan);box-shadow:0 0 24px rgba(0,200,255,.35)}
  .addbtn.solid{background:var(--cyan);color:#04121a;border-color:var(--cyan);box-shadow:0 0 24px rgba(0,200,255,.35)}
  .addbtn.solid:hover{background:var(--cyan-soft)}
  .overlay{position:fixed;inset:0;background:rgba(2,4,8,.6);opacity:0;pointer-events:none;transition:.3s;z-index:40;backdrop-filter:blur(2px)}
  .overlay.on{opacity:1;pointer-events:auto}
  .drawer{position:fixed;top:0;right:0;height:100%;width:400px;max-width:90vw;background:#070b12;border-left:1px solid var(--line2);box-shadow:-10px 0 50px rgba(0,0,0,.5);transform:translateX(100%);transition:.35s;z-index:50;display:flex;flex-direction:column}
  .drawer.on{transform:none}
  .dh{padding:22px 24px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center}
  .dh h3{font-size:18px;font-weight:900}.dh .mono{color:var(--cyan);font-size:12px;letter-spacing:.1em}
  .dx{cursor:pointer;font-size:24px;color:var(--mut);line-height:1}.dx:hover{color:var(--cyan)}
  .ditems{flex:1;overflow-y:auto;padding:16px 24px}
  .dempty{text-align:center;color:var(--mut);padding:50px 0;font-size:14px;font-family:var(--mono)}
  .di{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 0;border-bottom:1px solid var(--line)}
  .di .dn{font-weight:700;font-size:14px}.di .dnsub{font-size:11px;color:var(--mut);font-family:var(--mono)}
  .di .dp{font-family:var(--mono);font-weight:700;color:var(--cyan-soft);font-size:14px}
  .di .drm{cursor:pointer;color:var(--mut);font-size:18px;margin-left:8px}.di .drm:hover{color:#ff6b6b}
  .dfoot{padding:22px 24px;border-top:1px solid var(--line)}
  .dtot{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;color:var(--mut)}
  .dtot b{font-family:var(--mono);font-size:24px;color:var(--cyan)}
  .dnote{font-size:11px;color:var(--mut);font-family:var(--mono);margin-bottom:16px}
  .checkout{width:100%;background:var(--cyan);color:#04121a;font-weight:800;font-size:16px;padding:15px;border:none;border-radius:12px;cursor:pointer;box-shadow:0 0 24px rgba(0,200,255,.4)}
  .checkout:hover{background:var(--cyan-soft)}
  .modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(2,4,8,.6);opacity:0;pointer-events:none;transition:.3s;z-index:60;backdrop-filter:blur(3px)}
  .modal.on{opacity:1;pointer-events:auto}
  .mbox{background:#0a0f17;border:1px solid var(--line2);border-radius:22px;max-width:540px;width:100%;max-height:90vh;overflow-y:auto;padding:32px;box-shadow:0 0 60px rgba(0,200,255,.1)}
  .mbox h3{font-size:23px;font-weight:900;margin-bottom:6px}
  .mx{position:absolute;top:16px;right:20px;font-size:26px;color:var(--mut);cursor:pointer;line-height:1;z-index:2}.mx:hover{color:var(--cyan)}
  .mbox .msub{color:var(--mut);font-size:14px;margin-bottom:20px}
  .frow{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .field{margin-bottom:14px}
  .field label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--mut);margin-bottom:7px;text-transform:uppercase}
  .field input,.field textarea{width:100%;background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:10px;padding:12px 14px;color:var(--txt);font-family:'Inter';font-size:15px;outline:none}
  .field input:focus,.field textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,200,255,.15)}
  .field input::placeholder,.field textarea::placeholder{color:#56627a}
  .agree{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;color:var(--mut);margin:6px 0 18px}
  .agree input{margin-top:3px;accent-color:var(--cyan)}.agree b{color:var(--txt)}
  .msummary{border:1px solid var(--line);border-radius:12px;padding:16px;margin-bottom:18px;font-size:13px;background:rgba(0,200,255,.03)}
  .msummary .mrow{display:flex;justify-content:space-between;padding:4px 0;color:var(--mut)}
  .submit{width:100%;background:var(--cyan);color:#04121a;font-weight:800;font-size:16px;padding:15px;border:none;border-radius:12px;cursor:pointer;box-shadow:0 0 24px rgba(0,200,255,.4)}
  .submit:hover{background:var(--cyan-soft)}
  footer{padding:40px 0;text-align:center;color:var(--mut);font-family:var(--mono);font-size:12px;position:relative;z-index:2}
  @media(max-width:760px){.frow{grid-template-columns:1fr}.prod{padding:48px 0;gap:28px}body{cursor:auto}#grip,#dot{display:none}}
  @media(max-width:480px){
    .wrap{padding:0 18px}
    header{padding:44px 0 24px}
    .prod{padding:36px 0;gap:24px}
    .pinfo h2{font-size:26px}
    .drawer{width:100%;max-width:100%}
    .mbox{padding:24px 20px}
    .mbox h3{font-size:20px}
  }`;

const HTML_KO = `<canvas id="net"></canvas><div class="grid"></div><div class="glow"></div>
<svg id="grip" viewBox="0 0 64 64" fill="none">
  <g stroke="#00C8FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="26" y="6" width="12" height="12" rx="3" fill="rgba(0,200,255,.10)"/>
    <line x1="32" y1="18" x2="32" y2="25"/>
  </g>
  <circle cx="32" cy="25" r="2.6" fill="#00C8FF"/>
  <g id="jawL" stroke="#00C8FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="rgba(0,200,255,.07)">
    <path d="M30 26 L21 31 L22 47 L29 53 L31 49 L26 45 L27 34 L31 32 Z"/>
  </g>
  <g id="jawR" stroke="#00C8FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="rgba(0,200,255,.07)">
    <path d="M34 26 L43 31 L42 47 L35 53 L33 49 L38 45 L37 34 L33 32 Z"/>
  </g>
</svg>
<div id="dot"></div>

<nav>
  <div class="nav-in">
    <a href="/ko" class="logo">OpenArm<b>.</b></a>
    <div style="display:flex;align-items:center;gap:8px"><button class="langbtn" onclick="window.__v2ToggleLang&&window.__v2ToggleLang()">EN</button><div class="cartbtn" onclick="openDrawer()"><span class="mono">CART</span><span class="cnt" id="cnt" style="display:none">0</span></div></div>
  </div>
</nav>

<div class="wrap">
  <header>
    <a class="back" href="/ko/v2">← OpenArm 2.0 페이지로</a>
    <div class="eyebrow">PRE-ORDER STORE</div>
    <h1>OpenArm 2.0 <span>사전예약</span></h1>
    <p>출시를 앞둔 제품들을 미리 둘러보세요. 사진과 사양을 확인하고, 원하는 구성을 카트에 담아 사전예약을 남기실 수 있습니다.</p>
    <div class="estnote">※ 가격은 구성·수량에 따라 개별 견적으로 안내드립니다. 원하시는 구성을 담아 사전예약을 남겨주시면 담당자가 견적과 함께 연락드립니다.</div>
  </header>

  <div class="prod">
    <div class="pimg mv">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">출시예정</span><span class="scode">// UNIT_2.0</span>
      <model-viewer src="/models/openarm-2.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="20deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" shadow-softness="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="25deg 72deg auto" field-of-view="32deg" loading="lazy" alt="OpenArm 2.0 3D"></model-viewer>
      <span class="mvhint">드래그 · 360°</span>
    </div>
    <div class="pinfo">
      <div class="pcat">// ROBOTS</div>
      <h2>OpenArm 2.0 Bimanual</h2>
      <div class="price" style="font-size:23px">가격 문의<span style="font-size:13px;color:var(--mut);font-family:'Inter'"> · 구성별 견적</span></div>
      <div class="pricesub">BIMANUAL SYSTEM · 7-DOF ×2 · BILATERAL FEEDBACK</div>
      <div class="pxnote">구성·수량에 따라 견적 안내</div>
      <div class="pdesc">컴팩트 그리퍼와 인핸드 카메라를 갖춘 차세대 양팔 로봇암입니다.
연구·교육·개발 현장이 부담 없이 들일 수 있는 피지컬 AI 플랫폼이죠.</div>
      <label class="opt"><input type="checkbox" id="camopt"/><span class="ot">상단 스테레오 카메라 패키지</span><span class="op">문의</span></label>
      <button class="addbtn solid" onclick="add('OpenArm 2.0',6500,document.getElementById('camopt').checked)">사전예약 담기</button>
    </div>
  </div>

  <div class="prod rev">
    <div class="pimg mv">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">출시예정</span><span class="scode">// MOD_CELL</span>
      <model-viewer src="/models/openarm-cell.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="20deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="30deg 72deg auto" loading="lazy" alt="OpenArm Cell 3D"></model-viewer>
      <span class="mvhint">드래그 · 360°</span>
    </div>
    <div class="pinfo">
      <div class="pcat">// EVALUATION</div>
      <h2>OpenArm Cell</h2>
      <div class="price" style="font-size:23px">가격 문의<span style="font-size:13px;color:var(--mut);font-family:'Inter'"> · 구성별 견적</span></div>
      <div class="pricesub">REPRODUCIBLE EVALUATION CELL · Z-AXIS LIFT</div>
      <div class="pxnote">구성·수량에 따라 견적 안내</div>
      <div class="pdesc">배경, 조명, 카메라, 로봇 위치까지 똑같이 맞춰주는 평가용 셀입니다.
모델을 공정하게 비교하고 자동으로 평가하는 표준 환경을 만듭니다.</div>
      <button class="addbtn" onclick="add('OpenArm Cell',6200,false)">사전예약 담기</button>
    </div>
  </div>

  <div class="prod">
    <div class="pimg" style="background:radial-gradient(circle at 50% 40%,#0e1a2b,#05080e 74%)">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">COMING SOON</span><span class="scode">// MOD_KER</span>
      <img src="https://docs.openarm.dev/assets/images/ker-086043e0d7a5b11dd872d6f997f37ce4.gif" alt="OpenArm KER"/>
    </div>
    <div class="pinfo">
      <div class="pcat">// TELEOP</div>
      <h2>OpenArm KER</h2>
      <div class="price" style="font-size:23px">예상가 미정 <span style="font-size:13px;color:var(--mut);font-family:'Inter'">· 가격 문의</span></div>
      <div class="pricesub">KINEMATIC EQUIVALENT REPLICA · MOTORLESS</div>
      <div class="pdesc">2.0과 똑같은 관절 구조를 가진 무동력 리더암입니다. 가벼워서 오래 조작해도 지치지 않고, 데이터 수집에 잘 맞습니다.
지금은 외형만 공개됐고, CAD·BOM은 곧 공개될 예정입니다.</div>
      <button class="addbtn" onclick="add('OpenArm KER',0,false)">관심 등록 (가격 문의)</button>
    </div>
  </div>

  <div class="prod rev">
    <div class="pimg">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">기존 1.1 전용</span><span class="scode">// UPGRADE_KIT</span>
      <img src="https://cdn.shopify.com/s/files/1/0719/7982/7417/files/Upgrade_kit_fig_1N.png?v=1779094011" alt="OpenArm 1→2 Upgrade Kit — 교체 파츠(파란색 강조)"/>
    </div>
    <div class="pinfo">
      <div class="pcat">// UPGRADE</div>
      <h2>1.1 → 2.0 업그레이드 키트</h2>
      <div class="price" style="font-size:23px">가격 문의<span style="font-size:13px;color:var(--mut);font-family:'Inter'"> · 구성별 견적</span></div>
      <div class="pricesub">L+R ARM SET · COVERS · CNC PARTS · NEW END-EFFECTOR</div>
      <div class="pxnote">구성·수량에 따라 견적 안내</div>
      <div class="pdesc">이미 1.1을 쓰고 계신다면, 전체를 새로 살 필요 없이 핵심 부품만 바꿔 2.0으로 올릴 수 있습니다. 좌·우 양팔 한 세트로, 새 2.0 엔드이펙터(인핸드 카메라 포함)와 교체형 핑거, 새 외부 커버, CNC 금속 부품이 들어 있습니다.
※ 엔드이펙터 안의 DM4310 모터는 빠져 있어, 기존 1.1 모터를 그대로 쓰시면 됩니다. ZED 상단 스테레오 카메라 세트까지 포함하는 구성은 별도 문의 주세요.</div>
      <label class="opt"><input type="checkbox" id="upcamopt"/><span class="ot">ZED 상단 스테레오 카메라 세트</span><span class="op">문의</span></label>
      <button class="addbtn" onclick="add('1.1 → 2.0 업그레이드 키트',1000,document.getElementById('upcamopt').checked)">사전예약 담기</button>
    </div>
  </div>
</div>

<footer>OPENARM 2.0 · LIBERTRON · 사전예약 스토어 시안 v13 (다크) — 가격은 별도 견적 안내 · 사진 출처: openarm.dev</footer>

<div class="overlay" id="ov" onclick="closeAll()"></div>
<aside class="drawer" id="drawer">
  <div class="dh"><h3>사전예약 카트 <span class="mono">// CART</span></h3><span class="dx" onclick="closeDrawer()">×</span></div>
  <div class="ditems" id="ditems"></div>
  <div class="dfoot">
    <div class="dtot"><span>합계</span><b id="dtot">—</b></div>
    <div class="dnote" id="dnote">구성·수량에 따라 개별 견적으로 안내드립니다.</div>
    <button class="checkout" onclick="openModal()">사전예약 신청하기 →</button>
  </div>
</aside>

<div class="modal" id="modal">
  <div class="mbox" style="position:relative">
    <span class="mx" onclick="closeAll()">×</span>
    <h3>OpenArm 2.0 사전예약 신청</h3>
    <div class="msub">담으신 구성 그대로 접수됩니다. 담당자가 구성과 견적을 안내해 드릴게요.</div>
    <div class="msummary" id="msummary"></div>
    <form onsubmit="return submitForm(event)">
      <div class="frow">
        <div class="field"><label>이름 *</label><input id="f_name" required placeholder="홍길동"/></div>
        <div class="field"><label>소속 / 회사</label><input id="f_org" placeholder="(주)리버트론 / 학교·연구실 (선택)"/></div>
      </div>
      <div class="frow">
        <div class="field"><label>국가 / 지역 *</label><input id="f_country" required placeholder="예: 대한민국"/></div>
        <div class="field"><label>이메일 *</label><input id="f_email" type="email" required placeholder="hello@example.com"/></div>
      </div>
      <div class="field"><label>전화번호 *</label><input id="f_phone" required placeholder="010-0000-0000"/></div>
      <div class="field"><label>문의 내용 *</label><textarea id="f_msg" rows="3" required placeholder="도입 수량 및 기타 문의사항을 적어주세요."></textarea></div>
      <label class="agree"><input type="checkbox" required/> <span><b>개인정보 수집 및 이용 동의 (필수)</b> — 문의·견적 처리를 위해 개인정보를 수집하며 목적 달성 시 즉시 파기합니다.</span></label>
      <button class="submit" type="submit">사전예약 접수하기</button>
    </form>
  </div>
</div>`;

const HTML_EN = `<canvas id="net"></canvas><div class="grid"></div><div class="glow"></div>
<svg id="grip" viewBox="0 0 64 64" fill="none">
  <g stroke="#00C8FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
    <rect x="26" y="6" width="12" height="12" rx="3" fill="rgba(0,200,255,.10)"/>
    <line x1="32" y1="18" x2="32" y2="25"/>
  </g>
  <circle cx="32" cy="25" r="2.6" fill="#00C8FF"/>
  <g id="jawL" stroke="#00C8FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="rgba(0,200,255,.07)">
    <path d="M30 26 L21 31 L22 47 L29 53 L31 49 L26 45 L27 34 L31 32 Z"/>
  </g>
  <g id="jawR" stroke="#00C8FF" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="rgba(0,200,255,.07)">
    <path d="M34 26 L43 31 L42 47 L35 53 L33 49 L38 45 L37 34 L33 32 Z"/>
  </g>
</svg>
<div id="dot"></div>

<nav>
  <div class="nav-in">
    <a href="/" class="logo">OpenArm<b>.</b></a>
    <div style="display:flex;align-items:center;gap:8px"><button class="langbtn" onclick="window.__v2ToggleLang&&window.__v2ToggleLang()">한국어</button><div class="cartbtn" onclick="openDrawer()"><span class="mono">CART</span><span class="cnt" id="cnt" style="display:none">0</span></div></div>
  </div>
</nav>

<div class="wrap">
  <header>
    <a class="back" href="/v2">← Back to OpenArm 2.0</a>
    <div class="eyebrow">PRE-ORDER STORE</div>
    <h1>OpenArm 2.0 <span>Pre-order</span></h1>
    <p>Take an early look at our upcoming products. Browse the photos and specs, add the configuration you want to your cart, and leave a pre-order.</p>
    <div class="estnote">* Pricing is provided as an individual quote based on configuration and quantity. Add the configuration you want, leave a pre-order, and our team will follow up with a quote.</div>
  </header>

  <div class="prod">
    <div class="pimg">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">Coming soon</span><span class="scode">// UNIT_2.0</span>
      <model-viewer src="/models/openarm-2.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="20deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" shadow-softness="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="25deg 72deg auto" field-of-view="32deg" loading="lazy" alt="OpenArm 2.0 3D"></model-viewer>
      <span class="mvhint">Drag · 360°</span>
    </div>
    <div class="pinfo">
      <div class="pcat">// ROBOTS</div>
      <h2>OpenArm 2.0 Bimanual</h2>
      <div class="price" style="font-size:23px">Contact for quote<span style="font-size:13px;color:var(--mut);font-family:'Inter'"> · per configuration</span></div>
      <div class="pricesub">BIMANUAL SYSTEM · 7-DOF ×2 · BILATERAL FEEDBACK</div>
      <div class="pxnote">Quoted by configuration & quantity</div>
      <div class="pdesc">A next-generation bimanual arm with a compact gripper and in-hand camera.
A physical-AI platform that research, education, and development teams can actually afford.</div>
      <label class="opt"><input type="checkbox" id="camopt"/><span class="ot">Top stereo camera package</span><span class="op">On request</span></label>
      <button class="addbtn solid" onclick="add('OpenArm 2.0',6500,document.getElementById('camopt').checked)">Add to pre-order</button>
    </div>
  </div>

  <div class="prod rev">
    <div class="pimg">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">Coming soon</span><span class="scode">// MOD_CELL</span>
      <model-viewer src="/models/openarm-cell.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="20deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="30deg 72deg auto" loading="lazy" alt="OpenArm Cell 3D"></model-viewer>
      <span class="mvhint">Drag · 360°</span>
    </div>
    <div class="pinfo">
      <div class="pcat">// EVALUATION</div>
      <h2>OpenArm Cell</h2>
      <div class="price" style="font-size:23px">Contact for quote<span style="font-size:13px;color:var(--mut);font-family:'Inter'"> · per configuration</span></div>
      <div class="pricesub">REPRODUCIBLE EVALUATION CELL · Z-AXIS LIFT</div>
      <div class="pxnote">Quoted by configuration & quantity</div>
      <div class="pdesc">An evaluation cell that keeps background, lighting, cameras, and arm position identical every time.
It creates a standard environment for fair, automated model comparison.</div>
      <button class="addbtn" onclick="add('OpenArm Cell',6200,false)">Add to pre-order</button>
    </div>
  </div>

  <div class="prod">
    <div class="pimg" style="background:radial-gradient(circle at 50% 40%,#0e1a2b,#05080e 74%)">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">COMING SOON</span><span class="scode">// MOD_KER</span>
      <img src="https://docs.openarm.dev/assets/images/ker-086043e0d7a5b11dd872d6f997f37ce4.gif" alt="OpenArm KER"/>
    </div>
    <div class="pinfo">
      <div class="pcat">// TELEOP</div>
      <h2>OpenArm KER</h2>
      <div class="price" style="font-size:23px">Price TBA <span style="font-size:13px;color:var(--mut);font-family:'Inter'">· Inquire</span></div>
      <div class="pricesub">KINEMATIC EQUIVALENT REPLICA · MOTORLESS</div>
      <div class="pdesc">A motorless leader arm with the exact same joint structure as 2.0. Light enough for long, fatigue-free operation and ideal for data collection.
Only the design has been revealed so far; CAD and BOM are coming soon.</div>
      <button class="addbtn" onclick="add('OpenArm KER',0,false)">Register interest (inquire)</button>
    </div>
  </div>

  <div class="prod rev">
    <div class="pimg">
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <span class="pbadge">For 1.1 owners</span><span class="scode">// UPGRADE_KIT</span>
      <img src="https://cdn.shopify.com/s/files/1/0719/7982/7417/files/Upgrade_kit_fig_1N.png?v=1779094011" alt="OpenArm 1→2 Upgrade Kit — replaced parts highlighted in blue"/>
    </div>
    <div class="pinfo">
      <div class="pcat">// UPGRADE</div>
      <h2>1.1 → 2.0 Upgrade Kit</h2>
      <div class="price" style="font-size:23px">Contact for quote<span style="font-size:13px;color:var(--mut);font-family:'Inter'"> · per configuration</span></div>
      <div class="pricesub">L+R ARM SET · COVERS · CNC PARTS · NEW END-EFFECTOR</div>
      <div class="pxnote">Quoted by configuration & quantity</div>
      <div class="pdesc">Already on 1.1? Upgrade to 2.0 by swapping just the key parts — no need to buy a whole new arm. Sold as one left-and-right arm set, it includes the new 2.0 end-effector (with in-hand camera), replaceable fingers, revised outer covers, and CNC metal parts.
* The DM4310 motor inside the end-effector is not included — reuse your existing 1.1 motor. The configuration that also includes the ZED top stereo camera set is available on request.</div>
      <label class="opt"><input type="checkbox" id="upcamopt"/><span class="ot">ZED top stereo camera set</span><span class="op">On request</span></label>
      <button class="addbtn" onclick="add('1.1 → 2.0 Upgrade Kit',1000,document.getElementById('upcamopt').checked)">Add to pre-order</button>
    </div>
  </div>
</div>

<footer>OPENARM 2.0 · LIBERTRON · Pre-order store preview — pricing by quote · images: openarm.dev</footer>

<div class="overlay" id="ov" onclick="closeAll()"></div>
<aside class="drawer" id="drawer">
  <div class="dh"><h3>Pre-order Cart <span class="mono">// CART</span></h3><span class="dx" onclick="closeDrawer()">×</span></div>
  <div class="ditems" id="ditems"></div>
  <div class="dfoot">
    <div class="dtot"><span>Total</span><b id="dtot">—</b></div>
    <div class="dnote" id="dnote">Pricing is quoted per configuration and quantity.</div>
    <button class="checkout" onclick="openModal()">Submit pre-order →</button>
  </div>
</aside>

<div class="modal" id="modal">
  <div class="mbox" style="position:relative">
    <span class="mx" onclick="closeAll()">×</span>
    <h3>OpenArm 2.0 Pre-order Request</h3>
    <div class="msub">Submitted exactly as configured. Our team will follow up with configuration and a quote.</div>
    <div class="msummary" id="msummary"></div>
    <form onsubmit="return submitForm(event)">
      <div class="frow">
        <div class="field"><label>Name *</label><input id="f_name" required placeholder="Jane Doe"/></div>
        <div class="field"><label>Organization / Company</label><input id="f_org" placeholder="Acme Inc. / Lab (optional)"/></div>
      </div>
      <div class="frow">
        <div class="field"><label>Country / Region *</label><input id="f_country" required placeholder="e.g., South Korea"/></div>
        <div class="field"><label>Email *</label><input id="f_email" type="email" required placeholder="hello@example.com"/></div>
      </div>
      <div class="field"><label>Phone *</label><input id="f_phone" required placeholder="010-0000-0000"/></div>
      <div class="field"><label>Message *</label><textarea id="f_msg" rows="3" required placeholder="Quantity, timeline, and any questions."></textarea></div>
      <label class="agree"><input type="checkbox" required/> <span><b>I agree to the collection and use of personal data (required)</b> — used only to process your inquiry and quote, then deleted once fulfilled.</span></label>
      <button class="submit" type="submit">Submit pre-order</button>
    </form>
  </div>
</div>`;

export default function V2OrderPage() {
  const { lang, toggleLanguage } = useLanguage();
  useEffect(() => { (window as unknown as Record<string, unknown>).__v2ToggleLang = toggleLanguage; }, [toggleLanguage]);
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__lang = lang;
    const s = document.createElement("script");
    s.src = "/v2-order.js";
    s.setAttribute("data-v2order", "1");
    document.body.appendChild(s);
    return () => { s.remove(); };
  }, [lang]);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <style dangerouslySetInnerHTML={{ __html: "html body{background:#04060A !important;color:#EAF4FC !important}" }} />
      <div key={lang} dangerouslySetInnerHTML={{ __html: lang === "en" ? HTML_EN : HTML_KO }} />
    </>
  );
}
