"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CSS = `:root{
    --bg:#04060A; --line:rgba(0,200,255,.18); --line2:rgba(0,200,255,.40);
    --cyan:#00C8FF; --cyan-soft:#8BEDFF; --txt:#EAF4FC; --mut:#7E8DA3;
    --mono:'JetBrains Mono',monospace; --sans:'Inter',sans-serif;
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body{font-family:var(--sans);background:var(--bg);color:var(--txt);overflow-x:hidden;cursor:none}
  a{color:inherit;text-decoration:none}
  #net{position:fixed;inset:0;z-index:0;pointer-events:none}
  .scan{position:fixed;inset:0;z-index:55;pointer-events:none;
    background:repeating-linear-gradient(0deg,rgba(0,200,255,.035) 0,rgba(0,200,255,.035) 1px,transparent 2px,transparent 4px);mix-blend-mode:overlay;opacity:.5}
  .glow{position:fixed;width:1000px;height:1000px;left:50%;top:-300px;transform:translateX(-50%);z-index:0;pointer-events:none;
    background:radial-gradient(circle,rgba(0,200,255,.18),transparent 60%);filter:blur(30px)}
  .wrap{max-width:1280px;margin:0 auto;padding:0 28px;position:relative;z-index:2}
  .mono{font-family:var(--mono)}
  .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.3em;color:var(--cyan);text-transform:uppercase;display:inline-flex;align-items:center;gap:10px}
  .eyebrow::before{content:"";width:30px;height:1px;background:var(--cyan);box-shadow:0 0 8px var(--cyan)}
  /* gripper cursor */
  #grip{position:fixed;left:0;top:0;z-index:60;pointer-events:none;width:64px;height:64px;
    filter:drop-shadow(0 0 9px rgba(0,200,255,.8));will-change:transform}
  #dot{position:fixed;left:0;top:0;z-index:61;width:6px;height:6px;border-radius:50%;background:#fff;
    box-shadow:0 0 14px 4px rgba(0,200,255,.95);pointer-events:none;transform:translate(-50px,-50px)}
  /* nav */
  nav{position:fixed;top:0;left:0;width:100%;z-index:40;backdrop-filter:blur(14px);
    background:rgba(4,6,10,.5);border-bottom:1px solid var(--line)}
  .nav-in{max-width:1280px;margin:0 auto;padding:0 28px;height:66px;display:flex;align-items:center;justify-content:space-between}
  .logo{font-weight:900;font-size:20px;letter-spacing:-.02em}.logo b{color:var(--cyan)}
  .nav-links{display:flex;gap:26px;font-size:13px;font-weight:500;color:var(--mut);align-items:center}
  .nav-links a:hover{color:var(--txt)}.nav-links .on{color:var(--cyan);display:flex;align-items:center;gap:7px}
  .tagpill{font-family:var(--mono);font-size:9px;font-weight:700;background:var(--cyan);color:#04121a;padding:2px 6px;border-radius:4px;letter-spacing:.1em;box-shadow:0 0 10px rgba(0,200,255,.6)}
  .ghost{border:1px solid var(--line2);padding:8px 16px;border-radius:999px;font-size:13px}
  .ghost:hover{border-color:var(--cyan);color:var(--cyan);box-shadow:0 0 16px rgba(0,200,255,.3)}
  .langbtn{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--txt);border:1px solid var(--line2);background:transparent;padding:7px 13px;border-radius:999px;cursor:pointer}
  .langbtn:hover{border-color:var(--cyan);color:var(--cyan)}
  .navback{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--mut);border:1px solid var(--line);padding:7px 13px;border-radius:999px}
  .navback:hover{border-color:var(--cyan);color:var(--cyan)}
  /* ticker */
  .ticker{position:fixed;top:66px;left:0;width:100%;z-index:39;border-bottom:1px solid var(--line);background:rgba(4,6,10,.6);overflow:hidden;height:30px}
  .ticker .move{display:inline-block;white-space:nowrap;font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:var(--mut);line-height:30px;animation:tick 26s linear infinite}
  .ticker b{color:var(--cyan)}
  @keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  section{position:relative;z-index:2}
  .sec-tag{font-family:var(--mono);font-size:12px;letter-spacing:.22em;color:var(--mut);text-transform:uppercase;margin-bottom:18px;display:inline-flex;gap:8px}
  .sec-tag b{color:var(--cyan)}
  .h2{font-size:clamp(30px,4.2vw,54px);font-weight:900;letter-spacing:-.03em;line-height:1.04;word-break:keep-all}
  .reveal{opacity:0;transform:translateY(34px);transition:opacity .8s ease,transform .8s ease}
  .reveal.in{opacity:1;transform:none}
  /* HERO */
  .hero{padding:165px 0 90px;display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center;min-height:100vh}
  .glitch{position:relative;font-size:clamp(58px,7.6vw,116px);font-weight:900;letter-spacing:-.05em;line-height:.9;margin:18px 0 22px}
  .glitch .v{color:var(--cyan);text-shadow:0 0 34px rgba(0,200,255,.65)}
  .glitch::before,.glitch::after{content:attr(data-t);position:absolute;left:0;top:0;width:100%;overflow:hidden;opacity:.85}
  .glitch::before{color:#ff4df0;clip-path:inset(0 0 55% 0);animation:g1 3.2s infinite linear alternate}
  .glitch::after{color:#00fff0;clip-path:inset(55% 0 0 0);animation:g2 2.6s infinite linear alternate}
  @keyframes g1{0%,92%,100%{transform:translate(0)}93%{transform:translate(-3px,-2px)}96%{transform:translate(2px,1px)}}
  @keyframes g2{0%,90%,100%{transform:translate(0)}94%{transform:translate(3px,2px)}97%{transform:translate(-2px,-1px)}}
  .hero .lead{font-size:19px;color:var(--mut);max-width:470px;line-height:1.6;margin-bottom:28px;word-break:keep-all}
  .hero .tag{font-size:clamp(20px,2.5vw,32px);font-weight:800;letter-spacing:-.02em;line-height:1.25;margin-bottom:16px;word-break:keep-all}
  .hero .tag em{color:var(--cyan);font-style:normal;text-shadow:0 0 22px rgba(0,200,255,.5)}
  .chips{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:34px}
  .chip{font-family:var(--mono);font-size:12px;color:var(--cyan-soft);border:1px solid var(--line);background:rgba(0,200,255,.06);padding:8px 13px;border-radius:8px}
  .chip b{color:#fff}
  .cta{display:inline-flex;align-items:center;gap:10px;background:var(--cyan);color:#04121a;font-weight:800;padding:15px 26px;border-radius:10px;font-size:15px;box-shadow:0 0 34px rgba(0,200,255,.45);transition:.25s}
  .cta:hover{transform:translateY(-2px);box-shadow:0 0 48px rgba(0,200,255,.7)}
  .stage{position:relative;aspect-ratio:1/1;border:1px solid var(--line2);border-radius:24px;overflow:hidden;background:radial-gradient(circle at 50% 40%,#0d1a2b,#05080e 72%);box-shadow:inset 0 0 60px rgba(0,200,255,.08),0 0 50px rgba(0,200,255,.06)}
  .stage .corner{position:absolute;width:20px;height:20px;border:2px solid var(--cyan);opacity:.8}
  .stage .c1{top:14px;left:14px;border-right:0;border-bottom:0}.stage .c2{top:14px;right:14px;border-left:0;border-bottom:0}
  .stage .c3{bottom:14px;left:14px;border-right:0;border-top:0}.stage .c4{bottom:14px;right:14px;border-left:0;border-top:0}
  .stage model-viewer{width:100%;height:100%;background:transparent}
  .stage .ring{position:absolute;left:50%;top:50%;width:80%;height:80%;transform:translate(-50%,-50%);border:1px dashed rgba(0,200,255,.3);border-radius:50%;animation:spin 20s linear infinite}
  .stage .ring2{position:absolute;left:50%;top:50%;width:96%;height:96%;transform:translate(-50%,-50%);border:1px solid rgba(0,200,255,.12);border-radius:50%;animation:spin 40s linear infinite reverse}
  @keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
  .stage .lab{position:absolute;font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--cyan);opacity:.85}
  .stage .lab.tl{top:20px;left:44px}.stage .lab.br{bottom:20px;right:44px;text-align:right}
  .stage .hint{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:11px;color:var(--mut);border:1px solid var(--line);padding:6px 12px;border-radius:999px;background:rgba(4,6,10,.7)}
  .demo{position:absolute;top:16px;right:18px;font-family:var(--mono);font-size:9px;color:var(--mut);letter-spacing:.15em;border:1px solid var(--line);padding:3px 7px;border-radius:5px}
  .block{padding:96px 0}
  .grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:46px}
  .card{position:relative;border:1px solid var(--line);border-radius:16px;padding:28px;background:linear-gradient(180deg,rgba(11,18,30,.85),rgba(6,10,17,.6));overflow:hidden;transition:.35s}
  .card::after{content:"";position:absolute;left:0;top:0;height:2px;width:0;background:var(--cyan);box-shadow:0 0 12px var(--cyan);transition:width .4s}
  .card:hover{border-color:var(--line2);transform:translateY(-5px);box-shadow:0 18px 56px rgba(0,200,255,.12)}
  .card:hover::after{width:100%}
  .card .num{font-family:var(--mono);font-size:12px;color:var(--cyan);opacity:.85;margin-bottom:18px}
  .card .ic{width:46px;height:46px;border:1px solid var(--line2);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;color:var(--cyan);box-shadow:inset 0 0 14px rgba(0,200,255,.12)}
  .card h3{font-size:19px;font-weight:800;margin-bottom:10px;line-height:1.3;word-break:keep-all}
  .card p{font-size:14px;color:var(--mut);line-height:1.65;word-break:keep-all}
  .specstrip{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:20px;border:1px solid var(--line);border-radius:16px;padding:30px;background:rgba(11,18,30,.5)}
  .specstrip .v{font-family:var(--mono);font-size:28px;font-weight:700;color:var(--cyan);margin-bottom:6px;text-shadow:0 0 18px rgba(0,200,255,.4)}
  .specstrip .l{font-size:13px;color:var(--mut)}
  .pricebar{display:flex;justify-content:space-between;align-items:center;gap:30px;margin-top:18px;border:1px solid var(--line2);border-radius:18px;padding:34px 38px;background:linear-gradient(110deg,rgba(0,200,255,.12),rgba(13,19,32,.55));box-shadow:0 0 50px rgba(0,200,255,.08);position:relative;overflow:hidden}
  .pricebar .pb-eyebrow{font-family:var(--mono);font-size:11px;letter-spacing:.22em;color:var(--cyan);margin-bottom:12px}
  .pricebar .pb-title{font-size:clamp(22px,2.6vw,32px);font-weight:900;letter-spacing:-.02em;line-height:1.25;word-break:keep-all}
  .pricebar .pb-title em{color:var(--cyan);font-style:normal;text-shadow:0 0 22px rgba(0,200,255,.5)}
  .pricebar .pb-desc{margin-top:12px;color:var(--mut);font-size:15px;max-width:580px;word-break:keep-all}
  .pricebar .pb-right{text-align:right;flex-shrink:0}
  .pricebar .pb-badge{display:inline-block;font-family:var(--mono);font-weight:700;font-size:13px;color:#04121a;background:var(--cyan);padding:9px 17px;border-radius:8px;box-shadow:0 0 18px rgba(0,200,255,.5)}
  .pricebar .pb-note{margin-top:10px;font-size:12px;color:var(--mut)}
  .hl4{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:46px}
  .hl{border:1px solid var(--line);border-radius:16px;padding:28px 24px;background:linear-gradient(180deg,rgba(11,18,30,.7),rgba(6,10,17,.5));transition:.3s}
  .hl:hover{border-color:var(--line2);transform:translateY(-4px);box-shadow:0 14px 44px rgba(0,200,255,.10)}
  .hl .ic{width:44px;height:44px;border:1px solid var(--line2);border-radius:12px;display:flex;align-items:center;justify-content:center;color:var(--cyan);margin-bottom:16px;box-shadow:inset 0 0 14px rgba(0,200,255,.12)}
  .hl h3{font-size:17px;font-weight:800;margin-bottom:8px;word-break:keep-all}
  .hl p{font-size:13.5px;color:var(--mut);line-height:1.6;word-break:keep-all}
  .showrow{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:56px}
  .showrow+.showrow{margin-top:40px}
  .showrow.rev .modstage{order:2}
  .modstage{position:relative;aspect-ratio:4/3;border:1px solid var(--line2);border-radius:22px;overflow:hidden;background:radial-gradient(circle at 50% 40%,#0e1a2b,#05080e 74%);box-shadow:inset 0 0 60px rgba(0,200,255,.08),0 0 50px rgba(0,200,255,.06);display:flex;align-items:center;justify-content:center}
  .modstage img{width:100%;height:100%;object-fit:contain;padding:22px}
  .modstage video{width:100%;height:100%;object-fit:cover;display:block}
  .modstage .corner{position:absolute;width:18px;height:18px;border:2px solid var(--cyan);opacity:.75}
  .modstage .c1{top:14px;left:14px;border-right:0;border-bottom:0}.modstage .c2{top:14px;right:14px;border-left:0;border-bottom:0}
  .modstage .c3{bottom:14px;left:14px;border-right:0;border-top:0}.modstage .c4{bottom:14px;right:14px;border-left:0;border-top:0}
  .modstage .lab{position:absolute;top:18px;left:42px;font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--cyan);opacity:.85}
  .modtext .modbadge{display:inline-block;font-family:var(--mono);font-size:10px;color:#04121a;background:var(--cyan-soft);padding:5px 12px;border-radius:6px;letter-spacing:.1em;margin-bottom:16px;box-shadow:0 0 14px rgba(0,200,255,.4)}
  .modtext h3{font-size:clamp(26px,3vw,40px);font-weight:900;letter-spacing:-.02em;margin-bottom:14px}
  .modtext p{color:var(--mut);font-size:15.5px;line-height:1.65;max-width:94%;word-break:keep-all;margin-bottom:22px}
  .modchips{display:flex;flex-wrap:wrap;gap:8px}
  .modchips span{font-family:var(--mono);font-size:11px;color:var(--cyan-soft);border:1px solid var(--line);background:rgba(0,200,255,.05);padding:6px 11px;border-radius:7px}
  .cform{max-width:640px;margin:34px auto 0;text-align:left}
  .frow{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .field{margin-bottom:16px}
  .field label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.12em;color:var(--mut);margin-bottom:8px;text-transform:uppercase}
  .field input,.field textarea{width:100%;background:rgba(255,255,255,.03);border:1px solid var(--line);border-radius:10px;padding:13px 15px;color:var(--txt);font-family:var(--sans);font-size:15px;outline:none;transition:.2s;cursor:text}
  .field input:focus,.field textarea:focus{border-color:var(--cyan);box-shadow:0 0 0 3px rgba(0,200,255,.15)}
  .field input::placeholder,.field textarea::placeholder{color:#56627a}
  .field textarea{resize:vertical}
  .opts{display:flex;flex-wrap:wrap;gap:8px}
  .oc{font-family:var(--mono);font-size:12px;color:var(--mut);border:1px solid var(--line);border-radius:8px;padding:9px 14px;cursor:pointer;transition:.2s}
  .oc:hover{border-color:var(--line2);color:var(--txt)}
  .oc.active{background:rgba(0,200,255,.12);border-color:var(--cyan);color:var(--cyan-soft)}
  .ohint{font-family:var(--mono);font-size:11px;color:var(--mut);margin-top:10px;letter-spacing:.02em}
  .submit{margin-top:8px;width:100%;justify-content:center;border:none;cursor:pointer;font-family:var(--sans)}
  .fnote{text-align:center;font-family:var(--mono);font-size:11px;color:var(--mut);margin-top:14px}
  .ptype{font-family:var(--mono);font-size:12px;color:var(--cyan);letter-spacing:.08em;border:1px solid var(--line);background:rgba(0,200,255,.06);border-radius:8px;padding:11px 15px;margin-bottom:18px}
  .ptype b{color:var(--cyan-soft)}
  .agree{display:flex;align-items:flex-start;gap:10px;margin:6px 0;cursor:pointer;color:var(--mut)}
  .agree input{margin-top:3px;width:16px;height:16px;accent-color:var(--cyan);cursor:pointer;flex-shrink:0}
  .agree b{color:var(--txt);font-weight:700;font-size:13px}
  .agree .ag-desc{font-size:11.5px;color:var(--mut);line-height:1.5}
  .pgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:46px}
  .pcard{position:relative;border:1px solid var(--line);border-radius:16px;padding:22px;background:linear-gradient(180deg,rgba(11,18,30,.72),rgba(6,10,17,.5));transition:.3s;display:flex;flex-direction:column;text-align:left}
  .pcard:hover{border-color:var(--line2);transform:translateY(-3px);box-shadow:0 14px 44px rgba(0,200,255,.10)}
  .pc-badge{position:absolute;top:15px;right:15px;font-family:var(--mono);font-size:9px;color:#04121a;background:var(--cyan-soft);padding:3px 8px;border-radius:5px;letter-spacing:.06em}
  .pc-ic{width:42px;height:42px;border:1px solid var(--line2);border-radius:11px;display:flex;align-items:center;justify-content:center;color:var(--cyan);margin-bottom:16px}
  .pcard h4{font-size:18px;font-weight:800;margin-bottom:4px}
  .pc-sub{font-size:11px;color:var(--mut);font-family:var(--mono);letter-spacing:.08em;margin-bottom:18px}
  .pc-price{font-size:13px;color:var(--mut);margin-bottom:16px;margin-top:auto}
  .pc-price b{font-family:var(--mono);font-size:22px;color:var(--txt);font-weight:700}
  .pc-price span{color:var(--cyan)}
  .pc-add{width:100%;border:1px solid var(--line2);background:transparent;color:var(--txt);font-family:var(--sans);font-weight:700;font-size:14px;padding:11px;border-radius:10px;cursor:pointer;transition:.2s}
  .pc-add:hover{background:var(--cyan);color:#04121a;border-color:var(--cyan)}
  .ordergrid{display:grid;grid-template-columns:.82fr 1.18fr;gap:22px;margin-top:22px;align-items:start;text-align:left}
  .cartbox{border:1px solid var(--line2);border-radius:16px;padding:22px;background:rgba(13,19,32,.6);position:sticky;top:90px}
  .cart-h{font-family:var(--mono);font-size:12px;letter-spacing:.12em;color:var(--cyan);margin-bottom:14px}
  .cart-list{display:flex;flex-direction:column;gap:8px;min-height:64px;margin-bottom:14px}
  .cart-empty{color:var(--mut);font-size:12.5px;font-family:var(--mono);padding:18px 0;text-align:center}
  .ci{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:13px;border:1px solid var(--line);border-radius:8px;padding:9px 11px}
  .ci .ci-price{font-family:var(--mono);color:var(--cyan-soft)}
  .ci .ci-right{display:flex;align-items:center;gap:10px}
  .ci .ci-rm{cursor:pointer;color:var(--mut);font-size:16px;line-height:1}
  .ci .ci-rm:hover{color:#ff6b6b}
  .cart-total{display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid var(--line);padding-top:14px;font-size:13px;color:var(--mut)}
  .cart-total b{font-family:var(--mono);font-size:22px;color:var(--cyan);font-weight:700}
  .cart-note{font-family:var(--mono);font-size:10.5px;color:var(--mut);margin-top:10px;line-height:1.6}
  @media(max-width:920px){.ordergrid{grid-template-columns:1fr}.cartbox{position:static}}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:46px}
  .opt{position:relative;border:1px solid var(--line);border-radius:20px;padding:36px;overflow:hidden;min-height:310px;background:linear-gradient(150deg,rgba(11,18,30,.92),rgba(6,10,17,.7));display:flex;flex-direction:column;justify-content:flex-end;transition:.35s}
  .opt:hover{border-color:var(--line2);transform:translateY(-5px);box-shadow:0 18px 56px rgba(0,200,255,.12)}
  .opt .code{position:absolute;top:26px;left:30px;font-family:var(--mono);font-size:12px;color:var(--cyan);letter-spacing:.2em}
  .opt .badge{position:absolute;top:24px;right:26px;font-family:var(--mono);font-size:10px;color:#04121a;background:var(--cyan-soft);padding:4px 9px;border-radius:6px;letter-spacing:.1em;box-shadow:0 0 14px rgba(0,200,255,.5)}
  .opt h3{font-size:26px;font-weight:900;letter-spacing:-.02em;margin-bottom:10px}
  .opt p{font-size:14.5px;color:var(--mut);line-height:1.65;max-width:92%;word-break:keep-all}
  .opt .deco{position:absolute;right:-40px;top:30px;width:240px;height:240px;border:1px solid var(--line);border-radius:50%;opacity:.5}
  .opt .deco2{position:absolute;right:14px;top:84px;width:130px;height:130px;border:1px dashed rgba(0,200,255,.35);border-radius:50%;animation:spin 16s linear infinite}
  .contact{padding:112px 0 130px;text-align:center}
  .contact .panel{position:relative;border:1px solid var(--line2);border-radius:24px;padding:74px 30px;overflow:hidden;background:radial-gradient(circle at 50% 0%,rgba(0,200,255,.14),transparent 60%);box-shadow:0 0 60px rgba(0,200,255,.08)}
  .contact h2{font-size:clamp(30px,4.4vw,54px);font-weight:900;letter-spacing:-.03em;margin-bottom:16px;word-break:keep-all}
  .contact p{color:var(--mut);font-size:17px;max-width:520px;margin:0 auto 34px;line-height:1.6;word-break:keep-all}
  footer{border-top:1px solid var(--line);padding:26px 0;font-family:var(--mono);font-size:12px;color:var(--mut);text-align:center}
  @media(max-width:920px){
    body{cursor:auto}#grip,#dot{display:none}
    .hero{grid-template-columns:1fr;gap:36px;padding-top:130px;min-height:auto}
    .grid3,.grid2,.specstrip{grid-template-columns:1fr}.pricebar{flex-direction:column;align-items:flex-start}.pricebar .pb-right{text-align:left;margin-top:10px}.hl4{grid-template-columns:1fr 1fr}.showrow,.showrow.rev{grid-template-columns:1fr;gap:24px}.showrow.rev .modstage{order:-1}.modtext p{max-width:100%}.frow{grid-template-columns:1fr}.nav-links{display:none}.ticker{display:none}
  }
  .d3grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:46px}
  .d3stage{position:relative;aspect-ratio:1/1;border:1px solid var(--line2);border-radius:22px;overflow:hidden;background:radial-gradient(circle at 50% 42%,#0e1a2b,#05080e 72%);box-shadow:inset 0 0 60px rgba(0,200,255,.08),0 0 50px rgba(0,200,255,.06)}
  .d3stage model-viewer{width:100%;height:100%;background:transparent}
  .d3stage .corner{position:absolute;width:18px;height:18px;border:2px solid var(--cyan);opacity:.8;z-index:2}
  .d3stage .c1{top:13px;left:13px;border-right:0;border-bottom:0}.d3stage .c2{top:13px;right:13px;border-left:0;border-bottom:0}
  .d3stage .c3{bottom:13px;left:13px;border-right:0;border-top:0}.d3stage .c4{bottom:13px;right:13px;border-left:0;border-top:0}
  .d3stage .lab{position:absolute;top:16px;left:40px;font-family:var(--mono);font-size:10px;letter-spacing:.18em;color:var(--cyan);opacity:.85;z-index:2}
  .d3cap{position:absolute;bottom:16px;left:0;width:100%;text-align:center;font-weight:800;font-size:16px;color:#fff;text-shadow:0 0 16px rgba(0,200,255,.4);z-index:2}
  .d3hint{position:absolute;bottom:48px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:10px;color:var(--mut);border:1px solid var(--line);padding:5px 10px;border-radius:999px;background:rgba(4,6,10,.6);z-index:2}
  @media(max-width:760px){.d3grid{grid-template-columns:1fr}}
  .d3item{display:flex;flex-direction:column}
  .d3name{font-size:18px;font-weight:800;margin-top:18px;text-align:center}
  .d3desc{margin-top:8px;font-size:13.5px;color:var(--mut);line-height:1.65;text-align:center;max-width:92%;margin-left:auto;margin-right:auto;word-break:keep-all}
  @media(max-width:560px){
    .wrap{padding:0 20px}
    .glitch{font-size:clamp(42px,12.5vw,58px)}
    .hero .lead{font-size:17px}
    .hero{padding-top:118px}
    .block{padding:64px 0}
    .hl4{grid-template-columns:1fr}
    .specstrip{padding:22px}
    .contact{padding:78px 0 92px}
    .contact .panel{padding:52px 22px}
    .chips{gap:8px}
    .chip{font-size:11px;padding:7px 11px}
  }`;

const HTML_KO = `<canvas id="net"></canvas>
<div class="glow"></div>
<div class="scan"></div>

<!-- gripper cursor -->
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
    <div class="nav-links">
      <a class="on" href="#top">2.0 <span class="tagpill">NEW</span></a>
      <a href="#features">Features</a><a href="#options">Options</a><a href="#contact">Contact</a>
    </div>
    <div style="display:flex;align-items:center;gap:12px"><a href="/ko" class="navback">← OpenArm 1.1</a><button class="langbtn" onclick="window.__v2ToggleLang&&window.__v2ToggleLang()">EN</button></div>
  </div>
</nav>
<div class="ticker"><span class="move">7-DOF ×2&nbsp;&nbsp;//&nbsp;&nbsp;REACH <b>633MM</b>&nbsp;&nbsp;//&nbsp;&nbsp;PAYLOAD <b>4.1KG</b> (PEAK 6.0KG)&nbsp;&nbsp;//&nbsp;&nbsp;<b>BILATERAL FORCE FEEDBACK</b>&nbsp;&nbsp;//&nbsp;&nbsp;IN-HAND CAMERA&nbsp;&nbsp;//&nbsp;&nbsp;KER LEADER ARM&nbsp;&nbsp;//&nbsp;&nbsp;OPENARM CELL&nbsp;&nbsp;//&nbsp;&nbsp;100% OPEN-SOURCE&nbsp;&nbsp;//&nbsp;&nbsp;7-DOF ×2&nbsp;&nbsp;//&nbsp;&nbsp;REACH <b>633MM</b>&nbsp;&nbsp;//&nbsp;&nbsp;PAYLOAD <b>4.1KG</b> (PEAK 6.0KG)&nbsp;&nbsp;//&nbsp;&nbsp;<b>BILATERAL FORCE FEEDBACK</b>&nbsp;&nbsp;//&nbsp;&nbsp;IN-HAND CAMERA&nbsp;&nbsp;//&nbsp;&nbsp;KER LEADER ARM&nbsp;&nbsp;//&nbsp;&nbsp;OPENARM CELL&nbsp;&nbsp;//&nbsp;&nbsp;100% OPEN-SOURCE&nbsp;&nbsp;//&nbsp;&nbsp;</span></div>

<section id="top">
  <div class="wrap hero">
    <div>
      <span class="eyebrow">RESEARCH-GRADE BIMANUAL PLATFORM</span>
      <h1 class="glitch" data-t="OpenArm 2.0">OpenArm <span class="v">2.0</span></h1>
      <p class="tag">1.1에 <em>가치를 더하다</em>.</p>
      <p class="lead">1.1에서 아쉬웠던 부분을 하나하나 다듬고, 변수를 통제하는 셀(Cell) 환경까지 더했습니다. 강화학습과 보상학습을 제대로 돌릴 수 있는 차세대 휴머노이드 로봇암입니다.</p>
      <div class="chips">
        <span class="chip"><b>7</b>-DOF ×2</span><span class="chip">REACH <b>633</b>mm</span>
        <span class="chip">PAYLOAD <b>4.1</b>kg</span><span class="chip">BILATERAL FEEDBACK</span>
      </div>
      <a class="cta" href="#contact">사전 문의하기 →</a>
    </div>
    <div class="stage">
      
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <div class="ring2"></div><div class="ring"></div>
      <span class="lab tl">// AXIS_VIEW</span>
      <span class="lab br">RENDER: REALTIME<br/>STATUS: ONLINE</span>
      <model-viewer src="/models/openarm-2.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="20deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" shadow-softness="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="25deg 72deg auto" field-of-view="32deg" alt="OpenArm 2.0 3D"></model-viewer>
      <span class="hint">DRAG TO ROTATE · 마우스로 360° 살펴보세요</span>
    </div>
  </div>
</section>

<section id="explore3d" class="block">
  <div class="wrap">
    <div class="reveal" style="text-align:center;max-width:760px;margin:0 auto">
      <div class="sec-tag" style="justify-content:center">// 3D EXPLORER — 직접 돌려보기</div>
      <h2 class="h2">손끝으로 살펴보는 <span style="color:var(--cyan)">하드웨어</span></h2>
    </div>
    <div class="d3grid reveal">
      <div class="d3item">
        <div class="d3stage">
          <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
          <span class="lab">// CELL + OPENARM_2.0</span>
          <model-viewer src="/models/openarm-cell-full.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="22deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="30deg 72deg auto" loading="lazy" alt="OpenArm Cell + 본체"></model-viewer>
          <div class="d3hint">드래그 · 360°</div>
        </div>
        <h3 class="d3name">OpenArm Cell + 본체</h3>
        <p class="d3desc">Cell 안에 OpenArm 2.0을 설치한 평가 셋업 전체 모습입니다.</p>
      </div>
      <div class="d3item">
        <div class="d3stage">
          <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
          <span class="lab">// CALIBRATION_JIG</span>
          <model-viewer src="/models/openarm-jig.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="22deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="30deg 72deg auto" loading="lazy" alt="캘리브레이션 지그"></model-viewer>
          <div class="d3hint">드래그 · 360°</div>
        </div>
        <h3 class="d3name">캘리브레이션 지그</h3>
        <p class="d3desc">그리퍼를 CAD가 정의한 정확한 각도에 물리적으로 고정하는 제로 위치 지그입니다. 조립 오차와 공차를 보정해 데이터셋의 일관성을 보장합니다.</p>
      </div>
    </div>
  </div>
</section>

<section id="core" class="block">
  <div class="wrap">
    <div class="reveal">
      <div class="sec-tag"><b>01</b> / CORE STRENGTHS — 변하지 않는 강점</div>
      <h2 class="h2">여전히 유지되는 <span style="color:var(--cyan)">OpenArm의 매력</span></h2>
    </div>
    <div class="hl4 reveal">
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5a2.3 2 0 0 1 5 0c0 2-5 1-5 3a2.3 2 0 0 0 5 0"/></svg></div><h3>합리적인 가격</h3><p>고가 휴머노이드의 일부 비용만으로 연구급 성능을 누리세요.</p></div>
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7L3 11l4 4M3 11h11M17 17l4-4-4-4M21 13H10"/></svg></div><h3>양방향 힘 피드백</h3><p>리더와 팔로워가 힘을 주고받아, 닿고 누르는 감각까지 그대로 전합니다.</p></div>
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/></svg></div><h3>완전한 오픈소스</h3><p>CAD부터 펌웨어, 제어 코드까지 빠짐없이 공개되어 있습니다.</p></div>
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg></div><h3>피지컬 AI 테스트</h3><p>강화학습, 모방학습 등 여러 AI 방식을 마음껏 시험해볼 수 있습니다.</p></div>
    </div>
  </div>
</section>

<section id="features" class="block">
  <div class="wrap">
    <div class="reveal">
      <div class="sec-tag"><b>02</b> / SYSTEM UPGRADES — 핵심 변화</div>
      <h2 class="h2">1.1을 넘어선 <span style="color:var(--cyan)">핵심 변화</span></h2>
    </div>
    <div class="grid3">
      <div class="card reveal"><div class="num">U-01</div>
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v7M17 3v7M7 10l5 3 5-3M12 13v8"/></svg></div>
        <h3>컴팩트 그리퍼 + 내장 카메라</h3>
        <p>구동 방식을 단순하게 바꿔 한층 작아진 그리퍼입니다. 손안에 들어간 카메라가 집는 순간의 시야를 그대로 담고, 핑거는 작업에 맞춰 갈아 끼울 수 있습니다.</p></div>
      <div class="card reveal"><div class="num">U-02</div>
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></div>
        <h3>스테레오 비전 + 인핸드 카메라</h3>
        <p>그리퍼에 기본으로 들어간 인핸드 카메라에, 위에서 내려다보는 ZED 스테레오 카메라(권장)를 더하면 깊이까지 담아낸 풍부한 학습 데이터를 모을 수 있습니다.</p></div>
      <div class="card reveal"><div class="num">U-03</div>
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg></div>
        <h3>Cell · KER 기반 강화 학습</h3>
        <p>변수를 통제하는 OpenArm Cell과 무동력 리더암 KER을 함께 쓰면, 누구나 똑같이 재현할 수 있는 더 탄탄한 학습 환경이 완성됩니다.</p></div>
    </div>
  </div>
</section>

<section id="options" class="block">
  <div class="wrap">
    <div class="reveal">
      <div class="sec-tag"><b>03</b> / EXPANSION MODULES — 추가 옵션</div>
      <h2 class="h2">함께 확장되는 <span style="color:var(--cyan)">셋업</span></h2>
    </div>

    <div class="showrow reveal">
      <div class="modstage">
        <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
        <span class="lab">// MOD_CELL</span>
        <video src="/videos/kv.mp4" autoplay muted loop playsinline></video>
      </div>
      <div class="modtext">
        <span class="modbadge">출시 예정</span>
        <h3>OpenArm Cell</h3>
        <p>배경, 조명, 카메라, 로봇 위치까지 똑같이 맞춰주는 평가용 셀입니다. 모델을 공정하게 비교하고 자동으로 평가하는 표준 환경을 만듭니다.</p>
        <div class="modchips"><span>Z축 높이 조절</span><span>침입 차단 안전 센서</span><span>제로 캘리브레이션 지그</span></div>
      </div>
    </div>

    <div class="showrow rev reveal">
      <div class="modstage">
        <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
        <span class="lab">// MOD_KER</span>
        <img src="https://docs.openarm.dev/assets/images/ker-086043e0d7a5b11dd872d6f997f37ce4.gif" alt="OpenArm KER" loading="lazy"/>
      </div>
      <div class="modtext">
        <span class="modbadge">COMING SOON</span>
        <h3>OpenArm KER</h3>
        <p>2.0과 똑같은 관절 구조를 가진 무동력 리더암(KER)입니다. 모터가 없어 가볍고, 오래 조작해도 지치지 않습니다.</p>
        <div class="modchips"><span>모터리스 · 무동력</span><span>저피로 텔레오퍼레이션</span><span>CAD·BOM 추후 공개</span></div>
      </div>
    </div>
  </div>
</section>

<section id="contact" class="contact">
  <div class="wrap">
    <div class="panel reveal">
      <div class="sec-tag" style="justify-content:center"><b>04</b> / PRE-ORDER — 사전예약</div>
      <h2>OpenArm 2.0, 가장 먼저 만나보세요</h2>
      <p>원하는 구성을 직접 확인하고, 필요한 셋업을 담아 사전예약을 남겨보세요. 가격은 구성에 맞춰 개별 견적으로 안내드립니다.</p>
      <a class="cta" href="/ko/v2/order" style="margin-top:6px">사전예약 구성 보러가기 →</a>
      <div style="margin-top:16px;font-family:var(--mono);font-size:11px;color:var(--mut)">// 별도 사전예약 스토어 페이지로 연결됩니다 (가격은 견적 안내)</div>
    </div>
  </div>
  <footer>OPENARM 2.0 · LIBERTRON · DESIGN PREVIEW v17 — 연구·교육·개발용 플랫폼</footer>
</section>`;

const HTML_EN = `<canvas id="net"></canvas>
<div class="glow"></div>
<div class="scan"></div>

<!-- gripper cursor -->
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
    <div class="nav-links">
      <a class="on" href="#top">2.0 <span class="tagpill">NEW</span></a>
      <a href="#features">Features</a><a href="#options">Options</a><a href="#contact">Contact</a>
    </div>
    <div style="display:flex;align-items:center;gap:12px"><a href="/" class="navback">← OpenArm 1.1</a><button class="langbtn" onclick="window.__v2ToggleLang&&window.__v2ToggleLang()">한국어</button></div>
  </div>
</nav>
<div class="ticker"><span class="move">7-DOF ×2&nbsp;&nbsp;//&nbsp;&nbsp;REACH <b>633MM</b>&nbsp;&nbsp;//&nbsp;&nbsp;PAYLOAD <b>4.1KG</b> (PEAK 6.0KG)&nbsp;&nbsp;//&nbsp;&nbsp;<b>BILATERAL FORCE FEEDBACK</b>&nbsp;&nbsp;//&nbsp;&nbsp;IN-HAND CAMERA&nbsp;&nbsp;//&nbsp;&nbsp;KER LEADER ARM&nbsp;&nbsp;//&nbsp;&nbsp;OPENARM CELL&nbsp;&nbsp;//&nbsp;&nbsp;100% OPEN-SOURCE&nbsp;&nbsp;//&nbsp;&nbsp;7-DOF ×2&nbsp;&nbsp;//&nbsp;&nbsp;REACH <b>633MM</b>&nbsp;&nbsp;//&nbsp;&nbsp;PAYLOAD <b>4.1KG</b> (PEAK 6.0KG)&nbsp;&nbsp;//&nbsp;&nbsp;<b>BILATERAL FORCE FEEDBACK</b>&nbsp;&nbsp;//&nbsp;&nbsp;IN-HAND CAMERA&nbsp;&nbsp;//&nbsp;&nbsp;KER LEADER ARM&nbsp;&nbsp;//&nbsp;&nbsp;OPENARM CELL&nbsp;&nbsp;//&nbsp;&nbsp;100% OPEN-SOURCE&nbsp;&nbsp;//&nbsp;&nbsp;</span></div>

<section id="top">
  <div class="wrap hero">
    <div>
      <span class="eyebrow">RESEARCH-GRADE BIMANUAL PLATFORM</span>
      <h1 class="glitch" data-t="OpenArm 2.0">OpenArm <span class="v">2.0</span></h1>
      <p class="tag">Beyond 1.1 — <em>more value.</em></p>
      <p class="lead">We refined every rough edge of 1.1 and added a variable-controlled Cell environment. A next-generation humanoid arm built to run reinforcement and reward learning the way they should.</p>
      <div class="chips">
        <span class="chip"><b>7</b>-DOF ×2</span><span class="chip">REACH <b>633</b>mm</span>
        <span class="chip">PAYLOAD <b>4.1</b>kg</span><span class="chip">BILATERAL FEEDBACK</span>
      </div>
      <a class="cta" href="#contact">Get in touch →</a>
    </div>
    <div class="stage">
      
      <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
      <div class="ring2"></div><div class="ring"></div>
      <span class="lab tl">// AXIS_VIEW</span>
      <span class="lab br">RENDER: REALTIME<br/>STATUS: ONLINE</span>
      <model-viewer src="/models/openarm-2.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="20deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" shadow-softness="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="25deg 72deg auto" field-of-view="32deg" alt="OpenArm 2.0 3D"></model-viewer>
      <span class="hint">DRAG TO ROTATE · explore in 360°</span>
    </div>
  </div>
</section>

<section id="explore3d" class="block">
  <div class="wrap">
    <div class="reveal" style="text-align:center;max-width:760px;margin:0 auto">
      <div class="sec-tag" style="justify-content:center">// 3D EXPLORER — spin it yourself</div>
      <h2 class="h2">Explore the <span style="color:var(--cyan)">hardware</span></h2>
    </div>
    <div class="d3grid reveal">
      <div class="d3item">
        <div class="d3stage">
          <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
          <span class="lab">// CELL + OPENARM_2.0</span>
          <model-viewer src="/models/openarm-cell-full.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="22deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="30deg 72deg auto" loading="lazy" alt="OpenArm Cell + Arm"></model-viewer>
          <div class="d3hint">Drag · 360°</div>
        </div>
        <h3 class="d3name">OpenArm Cell + Arm</h3>
        <p class="d3desc">The full evaluation setup, with OpenArm 2.0 installed inside the Cell.</p>
      </div>
      <div class="d3item">
        <div class="d3stage">
          <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
          <span class="lab">// CALIBRATION_JIG</span>
          <model-viewer src="/models/openarm-jig.glb" camera-controls auto-rotate auto-rotate-delay="400" rotation-per-second="22deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="1" exposure="1.05" environment-image="neutral" tone-mapping="aces" camera-orbit="30deg 72deg auto" loading="lazy" alt="Calibration Jig"></model-viewer>
          <div class="d3hint">Drag · 360°</div>
        </div>
        <h3 class="d3name">Calibration Jig</h3>
        <p class="d3desc">A zero-position jig that physically locks the gripper to its exact CAD-defined angles, calibrating out assembly errors and tolerances for a consistent dataset.</p>
      </div>
    </div>
  </div>
</section>

<section id="core" class="block">
  <div class="wrap">
    <div class="reveal">
      <div class="sec-tag"><b>01</b> / CORE STRENGTHS — what stays</div>
      <h2 class="h2">What still makes <span style="color:var(--cyan)">OpenArm great</span></h2>
    </div>
    <div class="hl4 reveal">
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5a2.3 2 0 0 1 5 0c0 2-5 1-5 3a2.3 2 0 0 0 5 0"/></svg></div><h3>Affordable</h3><p>Research-grade performance at a fraction of a high-end humanoid’s cost.</p></div>
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7L3 11l4 4M3 11h11M17 17l4-4-4-4M21 13H10"/></svg></div><h3>Bilateral force feedback</h3><p>Leader and follower trade force back and forth, conveying the feel of contact and pressure as-is.</p></div>
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/></svg></div><h3>Fully open source</h3><p>Everything is open — CAD, firmware, and control code.</p></div>
      <div class="hl"><div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg></div><h3>Built for physical AI</h3><p>Freely test reinforcement learning, imitation learning, and other AI approaches.</p></div>
    </div>
  </div>
</section>

<section id="features" class="block">
  <div class="wrap">
    <div class="reveal">
      <div class="sec-tag"><b>02</b> / SYSTEM UPGRADES — key changes</div>
      <h2 class="h2">The key changes <span style="color:var(--cyan)">beyond 1.1</span></h2>
    </div>
    <div class="grid3">
      <div class="card reveal"><div class="num">U-01</div>
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v7M17 3v7M7 10l5 3 5-3M12 13v8"/></svg></div>
        <h3>Compact gripper + built-in camera</h3>
        <p>A simpler actuation makes the gripper noticeably smaller. The in-hand camera captures the exact view at the moment of grasping, and the fingers can be swapped to fit each task.</p></div>
      <div class="card reveal"><div class="num">U-02</div>
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></div>
        <h3>Stereo vision + in-hand camera</h3>
        <p>Add the recommended top-down ZED stereo camera to the gripper’s built-in in-hand camera, and you capture depth-rich training data.</p></div>
      <div class="card reveal"><div class="num">U-03</div>
        <div class="ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"/></svg></div>
        <h3>Stronger learning with Cell · KER</h3>
        <p>Pair the variable-controlled OpenArm Cell with the motorless KER leader arm and you get a sturdier learning setup that anyone can reproduce identically.</p></div>
    </div>
  </div>
</section>

<section id="options" class="block">
  <div class="wrap">
    <div class="reveal">
      <div class="sec-tag"><b>03</b> / EXPANSION MODULES — add-ons</div>
      <h2 class="h2">An expandable <span style="color:var(--cyan)">setup</span></h2>
    </div>

    <div class="showrow reveal">
      <div class="modstage">
        <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
        <span class="lab">// MOD_CELL</span>
        <video src="/videos/kv.mp4" autoplay muted loop playsinline></video>
      </div>
      <div class="modtext">
        <span class="modbadge">Coming soon</span>
        <h3>OpenArm Cell</h3>
        <p>An evaluation cell that keeps background, lighting, cameras, and arm position identical every time. It creates a standard environment for fair, automated model comparison.</p>
        <div class="modchips"><span>Z-axis lift</span><span>Reach-in safety stop</span><span>Zero-position jig</span></div>
      </div>
    </div>

    <div class="showrow rev reveal">
      <div class="modstage">
        <span class="corner c1"></span><span class="corner c2"></span><span class="corner c3"></span><span class="corner c4"></span>
        <span class="lab">// MOD_KER</span>
        <img src="https://docs.openarm.dev/assets/images/ker-086043e0d7a5b11dd872d6f997f37ce4.gif" alt="OpenArm KER" loading="lazy"/>
      </div>
      <div class="modtext">
        <span class="modbadge">COMING SOON</span>
        <h3>OpenArm KER</h3>
        <p>A motorless leader arm (KER) with the exact same joint structure as 2.0. No motors means it’s light, so you can operate it for hours without fatigue.</p>
        <div class="modchips"><span>Motorless</span><span>Low-fatigue teleop</span><span>CAD·BOM coming soon</span></div>
      </div>
    </div>
  </div>
</section>

<section id="contact" class="contact">
  <div class="wrap">
    <div class="panel reveal">
      <div class="sec-tag" style="justify-content:center"><b>04</b> / PRE-ORDER</div>
      <h2>Be the first to meet OpenArm 2.0</h2>
      <p>Check the configurations yourself, add the setup you need, and leave a pre-order. Pricing is provided as an individual quote based on your configuration.</p>
      <a class="cta" href="/v2/order" style="margin-top:6px">Browse pre-order options →</a>
      <div style="margin-top:16px;font-family:var(--mono);font-size:11px;color:var(--mut)">// Opens the dedicated pre-order store (pricing by quote)</div>
    </div>
  </div>
  <footer>OPENARM 2.0 · LIBERTRON · Research · Education · Development platform</footer>
</section>`;

export default function V2Page() {
  const { lang, toggleLanguage } = useLanguage();
  useEffect(() => { (window as unknown as Record<string, unknown>).__v2ToggleLang = toggleLanguage; }, [toggleLanguage]);
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "/v2-landing.js";
    s.setAttribute("data-v2", "1");
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
