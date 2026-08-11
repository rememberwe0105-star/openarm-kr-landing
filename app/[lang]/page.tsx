"use client";

import { memo, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/* ──────────────────────────────────────────────────────────────────────────
   OpenArm 2.0 — Libertron. A dark, immersive, 3D-forward landing centered on
   OpenArm 2.0, referencing openarm.dev's flow (2.0 → ecosystem → purchase) with
   Libertron's "why buy from us" differentiator. Original design (not the old
   site's components). Inline CSS + KO/EN HTML + model-viewer + canvas net.
   ────────────────────────────────────────────────────────────────────────── */

const CSS = `:root{
  --bg:#FFFFFF; --bg2:#F6F8FB; --card:#FFFFFF; --card2:#F2F5F9;
  --txt:#0A0D14; --mut:#52525B; --line:rgba(10,13,20,.09); --line2:rgba(10,13,20,.15);
  --cy:#3A56FF; --cy-soft:#6F83FF; --cy-deep:#2438C9; --grad:linear-gradient(120deg,#3A56FF,#7B61FF);
  --shadow:0 1px 2px rgba(16,24,40,.04),0 10px 28px -10px rgba(16,24,40,.14); --shadow-lg:0 2px 6px rgba(16,24,40,.05),0 28px 60px -16px rgba(16,24,40,.22);
  --grid:linear-gradient(rgba(10,13,20,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(10,13,20,.028) 1px,transparent 1px);
  --sans:var(--font-inter),'Inter',system-ui,sans-serif; --mono:var(--font-jetbrains-mono),'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth;scroll-padding-top:84px;scroll-snap-type:y proximity}
.oa{font-family:var(--sans);background:var(--bg);color:var(--txt);-webkit-font-smoothing:antialiased;line-height:1.6}
.oa *{box-sizing:border-box;margin:0;padding:0}
.oa a{color:inherit;text-decoration:none}
.oa .wrap{max-width:1240px;margin:0 auto;padding:0 32px;position:relative;z-index:1}
.oa .eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--cy-deep);display:inline-flex;align-items:center;gap:8px;font-weight:700;background:rgba(58,86,255,.07);border:1px solid rgba(58,86,255,.18);border-radius:999px;padding:7px 15px}
.oa .eyebrow::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--cy);box-shadow:0 0 0 3px rgba(58,86,255,.14)}
.oa .sec{padding:clamp(80px,11vw,150px) 0;position:relative}
.oa .kicker{font-family:var(--mono);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--cy-deep);margin-bottom:20px;display:inline-flex;align-items:center;gap:9px;width:fit-content;background:rgba(58,86,255,.07);border:1px solid rgba(58,86,255,.18);border-radius:999px;padding:7px 15px}
.oa .kicker b{color:var(--cy);font-weight:800}
.oa .h2{font-size:clamp(32px,4.6vw,56px);font-weight:850;letter-spacing:-.035em;line-height:1.04;word-break:keep-all;max-width:20ch}
.oa .h2 em{color:var(--cy);font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.oa .lead{margin-top:18px;font-size:17px;color:var(--mut);max-width:58ch;word-break:keep-all;line-height:1.7}
/* roofing-template inspired: scroll word-fill headings + entrance reveals (white/blue) */
.oa .h2 .wf{color:#c4cbd7;transition:color .4s ease}
.oa .h2 .wf.on{color:var(--txt)}
.oa .h2 .wf.wfa.on{color:var(--cy)}
.oa .rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.22,.61,.36,1),transform .7s cubic-bezier(.22,.61,.36,1);will-change:opacity,transform}
.oa .rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.oa .rv{opacity:1;transform:none;transition:none}.oa .h2 .wf{color:var(--txt)}}
/* ecosystem trust strip (honest social proof) */
.oa .trustbar{padding:24px 0;border-bottom:1px solid var(--line);background:var(--bg2);background-image:var(--grid);background-size:38px 38px}
.oa .trustbar .wrap{display:flex;align-items:center;gap:14px 24px;flex-wrap:wrap;justify-content:center}
.oa .tb-label{font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut)}
.oa .tb-chips{display:flex;flex-wrap:wrap;gap:9px;justify-content:center}
.oa .tb-chips span{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--cy-deep);background:var(--card);border:1px solid rgba(58,86,255,.16);border-radius:999px;padding:8px 15px;box-shadow:var(--shadow)}
/* hero social proof line */
.oa .heroproof{display:inline-flex;align-items:center;gap:10px;font-size:13px;color:var(--mut)}
.oa .heroproof b{color:var(--txt);font-weight:800}
.oa .heroproof .dots{display:inline-flex}
.oa .heroproof .dots i{width:22px;height:22px;border-radius:50%;border:2px solid var(--bg);margin-left:-7px;background:linear-gradient(135deg,#3A56FF,#7B61FF)}
.oa .heroproof .dots i:first-child{margin-left:0}
.oa .heroproof .dots i:nth-child(2){background:linear-gradient(135deg,#5B6BFF,#9B7BFF)}
.oa .heroproof .dots i:nth-child(3){background:linear-gradient(135deg,#2438C9,#5B52FF)}
.oa .heroproof .dots i:nth-child(4){background:linear-gradient(135deg,#7B61FF,#3A56FF)}

/* nav */
.oa nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid transparent;transition:background .3s,border-color .3s,box-shadow .3s}
.oa nav.scrolled{background:rgba(255,255,255,.9);border-bottom-color:var(--line);box-shadow:0 8px 30px -16px rgba(16,24,40,.28)}
.oa nav:not(.scrolled){background:transparent;border-bottom-color:transparent;box-shadow:none}
.oa nav:not(.scrolled) .logo,.oa nav:not(.scrolled) .nav-links a,.oa nav:not(.scrolled) .langbtn{color:#fff;text-shadow:0 1px 16px rgba(0,0,0,.5)}
.oa nav:not(.scrolled) .logo b{color:#9db0ff}
.oa nav:not(.scrolled) .langbtn{border-color:rgba(255,255,255,.4)}
.oa nav:not(.scrolled) .hamb{border-color:rgba(255,255,255,.4)}
.oa nav:not(.scrolled) .hamb span{background:#fff}
.oa .nav-in{max-width:1240px;margin:0 auto;padding:0 32px;height:70px;display:flex;align-items:center;justify-content:space-between}
.oa .logo{font-weight:800;font-size:21px;letter-spacing:-.02em}.oa .logo b{color:var(--cy)}
.oa .nav-links{display:flex;gap:30px;font-size:14px;font-weight:500;color:var(--mut);align-items:center}
.oa .nav-links a{transition:background-color .2s,border-color .2s}.oa .nav-links a:hover{color:var(--txt)}
.oa .nav-r{display:flex;align-items:center;gap:12px}
.oa .langbtn{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--txt);border:1px solid var(--line2);background:transparent;padding:8px 13px;border-radius:999px;cursor:pointer;transition:background-color .2s,border-color .2s}
.oa .langbtn:hover{border-color:var(--cy);color:var(--cy)}
.oa .langtog{display:inline-flex;align-items:center;font-family:var(--mono);font-size:12px;font-weight:700;color:var(--txt);border:1px solid var(--line2);border-radius:999px;padding:8px 12px;user-select:none;transition:border-color .2s}
.oa .langtog:hover{border-color:var(--cy)}
.oa .langtog .lg{opacity:.4;cursor:pointer;transition:opacity .15s}
.oa .langtog .lg:not(.on):hover{opacity:.85}
.oa .langtog .lg.on{opacity:1;color:var(--cy);cursor:default}
.oa .langtog .lgsep{opacity:.4;margin:0 4px;cursor:default}
.oa nav:not(.scrolled) .langtog{color:#fff;text-shadow:0 1px 16px rgba(0,0,0,.5);border-color:rgba(255,255,255,.4)}
.oa nav:not(.scrolled) .langtog .lg.on{color:#fff}
.oa .cta{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:14px;background:var(--cy);color:#fff;padding:10px 20px;border-radius:999px;transition:.2s}
.oa .cta:hover{background:var(--cy-deep);box-shadow:0 8px 24px rgba(58,86,255,.28)}
.oa .hamb{display:none;flex-direction:column;justify-content:center;gap:5px;width:42px;height:42px;border:1px solid var(--line2);border-radius:11px;background:transparent;cursor:pointer;padding:0 10px}
.oa .hamb span{height:2px;background:var(--txt);border-radius:2px}
.oa .mmenu{position:fixed;inset:0;z-index:60;background:rgba(255,255,255,.98);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);display:flex;flex-direction:column;padding:78px 32px 40px;opacity:0;pointer-events:none;transform:translateY(-8px);transition:.28s}
.oa .mmenu.on{opacity:1;pointer-events:auto;transform:none}
.oa .mclose{position:absolute;top:20px;right:26px;font-size:30px;color:var(--mut);cursor:pointer;line-height:1;background:none;border:none}
.oa .mclose:hover{color:var(--cy)}
.oa .mmenu a{font-size:26px;font-weight:800;letter-spacing:-.02em;color:var(--txt);padding:16px 0;border-bottom:1px solid var(--line)}
.oa .mmenu a:active{color:var(--cy)}
.oa .mfoot{margin-top:auto;padding-top:24px;display:flex;gap:12px;align-items:center}
.oa .mfoot .langbtn{font-size:14px;padding:12px 18px}
.oa .mfoot .langtog{font-size:14px;padding:12px 18px}
.oa .mfoot .cta{flex:1;justify-content:center;font-size:15px;padding:14px}
@media(max-width:980px){.oa .nav-links{display:none}.oa .hamb{display:flex}.oa .nav-r > .langbtn,.oa .nav-r > .langtog{display:none}}
@media(min-width:981px){.oa .mmenu{display:none}}

/* buttons */
.oa .btn{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:15px;padding:15px 28px;border-radius:12px;transition:.22s;cursor:pointer}
.oa .btn-pri{background:var(--cy);color:#fff;box-shadow:0 8px 24px rgba(58,86,255,.24)}
.oa .btn-pri:hover{transform:translateY(-2px);background:var(--cy-deep);box-shadow:0 14px 34px rgba(58,86,255,.34)}
.oa .btn-ghost{border:1px solid var(--line2);color:var(--txt)}
.oa .btn-ghost:hover{border-color:var(--cy);color:var(--cy)}

/* hero */
.oa .net{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.oa .hero{position:relative;overflow:hidden;border-bottom:1px solid var(--line);min-height:100vh;display:flex;align-items:center;background:radial-gradient(120% 80% at 72% 30%,rgba(58,86,255,.05),transparent 60%);background-color:var(--bg)}
.oa .hero::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background-image:var(--grid);background-size:44px 44px;-webkit-mask-image:radial-gradient(120% 90% at 60% 20%,#000,transparent 72%);mask-image:radial-gradient(120% 90% at 60% 20%,#000,transparent 72%);opacity:.6}
.oa .hero-stage{position:absolute;top:0;right:-3%;width:67%;height:100%;z-index:0}
.oa .hero-stage model-viewer{width:100%;height:100%;background:transparent}
.oa .hero-stage .hglow{position:absolute;left:48%;top:50%;width:820px;height:820px;max-width:96%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(58,86,255,.16),rgba(58,86,255,.05) 42%,transparent 66%);filter:blur(26px);pointer-events:none}
.oa .hero-stage .spot{position:absolute;left:50%;top:-6%;width:52%;height:64%;transform:translateX(-50%);pointer-events:none;background:radial-gradient(ellipse 52% 60% at 50% 0%,rgba(58,86,255,.05),transparent 64%)}
.oa .hero-stage .pool{position:absolute;left:50%;bottom:7%;width:60%;height:150px;transform:translateX(-50%);pointer-events:none;background:radial-gradient(ellipse at 50% 50%,rgba(58,86,255,.10),transparent 72%);filter:blur(16px)}
.oa .hero-stage .pool::before{content:"";position:absolute;left:50%;bottom:44%;width:44%;height:10px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(10,13,20,.10),transparent 76%);filter:blur(5px)}
.oa .hero-stage .lab{position:absolute;top:26px;left:26px;font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--cy);opacity:.7;z-index:2}
.oa .hero-stage .hint{position:absolute;bottom:36px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:11px;color:var(--mut);border:1px solid var(--line);padding:6px 13px;border-radius:999px;background:rgba(255,255,255,.7);z-index:2}
.oa .hero-fade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,var(--bg) 0%,var(--bg) 25%,rgba(255,255,255,.55) 47%,transparent 66%)}
.oa .hero-in{position:relative;z-index:2;width:100%;padding:96px 32px}
.oa .hero-copy{max-width:560px}
.oa .hero h1{font-size:clamp(56px,7.6vw,112px);font-weight:900;letter-spacing:-.05em;line-height:.88;margin:18px 0 0}
.oa .hero h1 b{color:var(--cy);background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.oa .hero .tag{font-size:clamp(20px,2.5vw,32px);font-weight:750;letter-spacing:-.02em;margin-top:22px;line-height:1.25;word-break:keep-all;max-width:16ch}
.oa .hero .tag em{color:var(--cy);font-style:normal}
.oa .hero .lead{max-width:44ch;margin-top:18px}
.oa .hero-cta{display:flex;gap:14px;margin-top:34px;flex-wrap:wrap}
/* full-bleed cinematic video hero */
.oa .vhero{position:relative;margin-top:-71px;min-height:100svh;display:flex;align-items:center;overflow:hidden;background:#05070d;border-bottom:1px solid var(--line)}
.oa .vhero-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;filter:blur(3px) brightness(.72) saturate(1.05);transform:scale(1.08)}
.oa .vhero-scrim{position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(120% 82% at 50% 40%,rgba(4,7,13,.5) 0%,rgba(4,7,13,.22) 48%,rgba(4,7,13,0) 76%),linear-gradient(180deg,rgba(4,7,13,.78) 0%,rgba(4,7,13,.58) 26%,rgba(4,7,13,.52) 52%,rgba(4,7,13,.44) 78%,rgba(255,255,255,0) 93%,#ffffff 100%)}
.oa .vhero-in{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;padding:96px 0 96px}
.oa .vhero-title{font-size:clamp(56px,9.5vw,132px);font-weight:900;letter-spacing:-.05em;line-height:.9;margin:20px 0 0;color:#fff;text-shadow:0 2px 30px rgba(0,0,0,.5)}
.oa .vhero-title b{background:linear-gradient(120deg,#7d90ff,#b3a6ff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.oa .vhero-tag{font-size:clamp(20px,2.7vw,34px);font-weight:750;letter-spacing:-.02em;margin-top:18px;line-height:1.22;max-width:22ch;word-break:keep-all;color:#fff;text-shadow:0 1px 20px rgba(0,0,0,.5)}
.oa .vhero-tag em{color:#9db0ff;font-style:normal}
.oa .vhero-lead{margin-top:16px;font-size:17px;color:rgba(255,255,255,.82);max-width:54ch;line-height:1.7;word-break:keep-all}
.oa .vhero .hero-cta{justify-content:center;margin-top:34px}
.oa .vhero .shipnote{margin-top:16px;font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:rgba(255,255,255,.72);display:inline-flex;align-items:center;gap:8px;text-shadow:0 1px 12px rgba(0,0,0,.5)}
.oa .vhero .shipnote::before{content:"";width:7px;height:7px;border-radius:50%;background:#5eead4;box-shadow:0 0 10px rgba(94,234,212,.9)}
.oa .vhero .btn-ghost{border-color:rgba(255,255,255,.34);color:#fff}
.oa .vhero .btn-ghost:hover{border-color:#fff;color:#fff;background:rgba(255,255,255,.08)}
.oa .vhero .herostats{justify-content:center;margin-top:34px}
.oa .vhero .herostats > div{border-left-color:rgba(255,255,255,.2)}
.oa .vhero .herostats > div:first-child{border-left:none}
.oa .vhero .herostats b{background:linear-gradient(120deg,#8ea0ff,#b9adff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.oa .vhero .herostats span{color:rgba(255,255,255,.7)}
.oa .vhero .eyebrow{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.28);color:#fff}
.oa .vhero .eyebrow::before{background:#8ea0ff;box-shadow:0 0 0 3px rgba(142,160,255,.25)}
.oa .vscroll{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);z-index:2;display:flex;justify-content:center}
.oa .vscroll-bar{width:1px;height:44px;background:rgba(255,255,255,.28);position:relative;overflow:hidden;border-radius:2px}
.oa .vscroll-bar::after{content:"";position:absolute;top:0;left:0;width:100%;height:44%;background:linear-gradient(#fff,#8ea0ff);animation:scd2 1.8s ease-in-out infinite}
@keyframes scd2{0%{transform:translateY(-120%)}100%{transform:translateY(260%)}}
@media(max-width:820px){.oa .vhero-title{font-size:clamp(48px,13vw,84px)}.oa .vhero-in{padding-top:112px}.oa .vhero-bg{filter:blur(2px) brightness(.66) saturate(1.05)}}
.oa .btn:active{transform:translateY(0) scale(.98)}
.oa .cta:active{transform:scale(.97)}
@media(max-width:980px){
  .oa .hero{min-height:auto;display:block;padding-top:20px}
  .oa .hero-in{padding:8px 32px 0}
  .oa .hero-copy{max-width:none}
  .oa .hero-stage{position:relative;width:100%;height:50vh;right:0;margin-top:14px}
  .oa .hero-fade{display:none}
}
/* ── scroll-driven intro experience ── */
.oa .intro{position:relative;height:280vh;z-index:1}
.oa .intro-sticky{position:sticky;top:0;height:100vh;overflow:hidden;background:var(--bg)}
.oa .intro-mv{position:absolute;inset:0;width:100%;height:100%;background:transparent;z-index:1;transform:translateX(12%)}
.oa .intro-glow{position:absolute;left:64%;top:48%;width:900px;height:900px;max-width:88%;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(58,86,255,.07),transparent 62%);filter:blur(26px);z-index:0;pointer-events:none}
.oa .intro-pool{position:absolute;left:64%;bottom:9%;width:36%;height:150px;transform:translateX(-50%);z-index:2;pointer-events:none;background:radial-gradient(ellipse at center,rgba(58,86,255,.10),transparent 72%);filter:blur(16px)}
.oa .intro-shade{position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(90deg,var(--bg) 0%,rgba(255,255,255,.88) 24%,rgba(255,255,255,.42) 46%,transparent 64%)}
.oa .intro-lab{position:absolute;top:94px;left:8vw;z-index:3;font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--cy);opacity:.55}
.oa .intro-panels{position:absolute;inset:0;z-index:3;pointer-events:none}
.oa .ipanel{position:absolute;left:0;top:0;width:100%;max-width:780px;height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 8vw;opacity:0;transform:translateY(18px);transition:opacity .35s ease,transform .35s ease;pointer-events:none}
.oa .ipanel.on{opacity:1;transform:none;pointer-events:auto}
.oa .ititle{font-size:clamp(58px,8vw,122px);font-weight:900;letter-spacing:-.05em;line-height:.88;margin:16px 0 0}
.oa .ititle b{color:var(--cy);background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.oa .itag{font-size:clamp(20px,2.5vw,32px);font-weight:750;letter-spacing:-.02em;margin-top:22px;max-width:18ch;line-height:1.25;word-break:keep-all}
.oa .itag em{color:var(--cy);font-style:normal}
.oa .ilead{margin-top:18px;font-size:17px;color:var(--mut);max-width:44ch;line-height:1.72;word-break:keep-all}
.oa .ipanel .hero-cta{margin-top:32px}
.oa .ibadge{display:inline-flex;align-items:center;gap:7px;font-family:var(--mono);font-size:11px;letter-spacing:.16em;color:var(--cy-deep);font-weight:700;background:rgba(58,86,255,.07);border:1px solid rgba(58,86,255,.18);border-radius:999px;padding:6px 14px}
.oa .ih{font-size:clamp(32px,4.6vw,56px);font-weight:850;letter-spacing:-.035em;line-height:1.05;max-width:15ch;margin:14px 0 0;word-break:keep-all}
.oa .ispecs{display:flex;gap:34px;flex-wrap:wrap;margin-top:26px}
.oa .ispecs > div{display:flex;flex-direction:column}
.oa .ispecs b{font-family:var(--mono);font-size:clamp(34px,4vw,48px);font-weight:700;color:var(--cy);letter-spacing:-.02em;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;width:fit-content}
.oa .ispecs span{color:var(--mut);font-family:var(--mono);font-size:13px;margin-top:6px}
.oa .herostats{display:flex;flex-wrap:wrap;gap:0;margin-top:34px}
.oa .herostats > div{display:flex;flex-direction:column;gap:5px;padding:2px 22px;border-left:1px solid var(--line)}
.oa .herostats > div:first-child{padding-left:0;border-left:none}
.oa .herostats b{font-family:var(--mono);font-size:clamp(24px,3vw,30px);font-weight:700;letter-spacing:-.02em;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;width:fit-content}
.oa .herostats span{font-family:var(--mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--mut)}
@media(max-width:820px){.oa .herostats{gap:0}.oa .herostats > div{padding:2px 16px}}
@media(max-width:480px){.oa .herostats > div{padding:2px 12px}.oa .herostats b{font-size:22px}}
.oa .scrollcue{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:3;font-family:var(--mono);font-size:11px;color:var(--mut);letter-spacing:.16em;display:flex;flex-direction:column;align-items:center;gap:10px}
.oa .sc-bar{width:1px;height:38px;background:rgba(10,13,20,.14);position:relative;overflow:hidden}
.oa .sc-bar::after{content:"";position:absolute;top:0;left:0;width:100%;height:42%;background:var(--cy);animation:scd 1.8s ease-in-out infinite}
@keyframes scd{0%{transform:translateY(-110%)}100%{transform:translateY(260%)}}
.oa .istep{position:absolute;right:36px;top:50%;transform:translateY(-50%);z-index:4;display:flex;flex-direction:column;gap:11px;align-items:center}
.oa .istep i{width:7px;height:7px;border-radius:999px;background:rgba(10,13,20,.16);transition:height .35s ease,background .35s ease,box-shadow .35s ease}
.oa .istep i.on{height:28px;background:var(--grad);box-shadow:0 0 0 4px rgba(58,86,255,.10)}
@media(max-width:980px){.oa .istep{display:none}}
.oa .isnap{position:absolute;left:0;width:1px;height:1px;pointer-events:none;scroll-snap-align:start;scroll-snap-stop:always}
@media(max-width:980px){html{scroll-snap-type:none}.oa .isnap{display:none}}
@media(max-width:820px){
  .oa .intro{height:auto}
  .oa .intro-sticky{position:relative;height:auto;min-height:auto;padding:40px 0 30px}
  .oa .intro-mv{position:relative;height:48vh;inset:auto;margin-top:18px;order:2;transform:none}
  .oa .intro-shade,.oa .scrollcue,.oa .intro-lab,.oa .intro-pool{display:none}
  .oa .intro-panels{position:relative;inset:auto}
  .oa .ipanel{position:relative;opacity:1;transform:none;height:auto;padding:0 24px;max-width:none}
  .oa .ipanel[data-i="1"],.oa .ipanel[data-i="2"],.oa .ipanel[data-i="3"]{display:none}
}

/* spec band (count-up) */
.oa .specs{border-bottom:1px solid var(--line);background:var(--bg2);background-image:var(--grid);background-size:38px 38px;position:relative;z-index:1}
.oa .specrow{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line)}
.oa .scell{background:var(--bg2);padding:38px 22px;text-align:center}
.oa .scell .v{font-family:var(--mono);font-size:clamp(26px,3.2vw,40px);font-weight:700;color:var(--cy);letter-spacing:-.03em;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;width:fit-content;margin:0 auto}
.oa .scell .v .u{font-size:.5em;color:var(--cy-soft);margin-left:2px}
.oa .scell .l{font-size:12.5px;color:var(--mut);margin-top:12px;letter-spacing:.02em}
@media(max-width:860px){.oa .specrow{grid-template-columns:1fr 1fr}.oa .scell:last-child{grid-column:1 / -1}}

/* feature cards */
.oa .feat{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:54px}
.oa .fcard{background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:18px;padding:30px 28px;transition:.28s;position:relative;overflow:hidden}
.oa .fcard:hover{border-color:var(--line2);transform:translateY(-4px);box-shadow:0 22px 60px rgba(10,13,20,.10)}
.oa .fcard.big{grid-column:span 2;background:linear-gradient(135deg,rgba(58,86,255,.07),var(--card) 58%);border-color:rgba(58,86,255,.16);display:flex;flex-direction:column;justify-content:flex-end;min-height:280px}
.oa .fcard .ic{width:48px;height:48px;border-radius:13px;background:rgba(58,86,255,.09);border:1px solid rgba(58,86,255,.22);display:flex;align-items:center;justify-content:center;color:var(--cy);margin-bottom:20px}
.oa .fcard h3{font-size:19px;font-weight:800;letter-spacing:-.01em;margin-bottom:10px;line-height:1.3;word-break:keep-all}
.oa .fcard p{font-size:14px;color:var(--mut);line-height:1.66;word-break:keep-all}
.oa .fcard .tag{margin-top:14px;font-family:var(--mono);font-size:11px;color:var(--cy-deep);letter-spacing:.04em}
@media(max-width:920px){.oa .feat{grid-template-columns:1fr 1fr}.oa .fcard.big{grid-column:span 2}}
@media(max-width:600px){.oa .feat{grid-template-columns:1fr}.oa .fcard.big{grid-column:span 1}}

/* hardware 3D explorer */
.oa .d3{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:54px}
.oa .d3 .item{display:flex;flex-direction:column}
.oa .d3stage{position:relative;aspect-ratio:4/3;border:1px solid var(--line2);border-radius:20px;overflow:hidden;background:radial-gradient(circle at 50% 38%,#eef2fb,#e2e8f4 78%)}
.oa .d3stage model-viewer{width:100%;height:100%;background:transparent}
.oa .d3stage .lab{position:absolute;top:16px;left:18px;font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--cy);opacity:.85}
.oa .d3stage .hint{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:10px;color:var(--mut);border:1px solid var(--line);padding:5px 11px;border-radius:999px;background:rgba(255,255,255,.75)}
.oa .d3 h3{font-size:18px;font-weight:800;margin-top:20px}
.oa .d3 p{font-size:14px;color:var(--mut);margin-top:8px;line-height:1.62;word-break:keep-all}
@media(max-width:760px){.oa .d3{grid-template-columns:1fr}}

/* ecosystem rows (Cell / KER) */
.oa .eco{display:grid;grid-template-columns:1.05fr .95fr;gap:54px;align-items:center;margin-top:50px}
.oa .eco.rev .ecomedia{order:2}
.oa .ecomedia{position:relative;aspect-ratio:4/3;border:1px solid var(--line2);border-radius:22px;overflow:hidden;background:radial-gradient(circle at 50% 38%,#eef2fb,#e2e8f4 78%);display:flex;align-items:center;justify-content:center}
.oa .ecomedia model-viewer{width:100%;height:100%;background:transparent}
.oa .ecomedia img,.oa .ecomedia video{width:100%;height:100%;object-fit:cover;display:block}
.oa .ecomedia .lab{position:absolute;top:16px;left:18px;font-family:var(--mono);font-size:10px;letter-spacing:.16em;color:var(--cy);opacity:.85;z-index:2}
.oa .ecobadge{display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--cy-deep);background:rgba(58,86,255,.08);border:1px solid rgba(58,86,255,.22);padding:6px 13px;border-radius:999px;margin-bottom:18px}
.oa .eco h3{font-size:clamp(26px,3.2vw,40px);font-weight:850;letter-spacing:-.025em;margin-bottom:14px}
.oa .eco > div > p{color:var(--mut);font-size:15.5px;line-height:1.7;margin-bottom:22px;word-break:keep-all}
.oa .ecogrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.oa .ecoitem{border:1px solid var(--line);border-radius:12px;padding:15px 16px;background:var(--card)}
.oa .ecoitem b{display:block;font-size:14px;font-weight:700;margin-bottom:4px}
.oa .ecoitem span{font-size:12.5px;color:var(--mut);line-height:1.5;word-break:keep-all}
@media(max-width:880px){.oa .eco,.oa .eco.rev{grid-template-columns:1fr;gap:28px}.oa .eco.rev .ecomedia{order:-1}.oa .ecogrid{grid-template-columns:1fr}}

/* why libertron — transformation */
.oa .why{background:var(--bg2);background-image:var(--grid);background-size:38px 38px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.oa #cell{background:var(--bg2);background-image:var(--grid);background-size:38px 38px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.oa .cmplead{max-width:64ch;margin-top:18px;font-size:16px;color:var(--mut);line-height:1.75;word-break:keep-all}
.oa .cmplead strong{color:var(--txt);font-weight:700}
.oa .wqgrid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:44px}
.oa .wqcard{position:relative;background:var(--card);border:2px solid var(--line);box-shadow:var(--shadow);border-radius:24px;padding:32px 30px 26px;transition:border-color .4s,box-shadow .4s,transform .28s}
.oa .wqcard:hover{border-color:var(--cy-deep);transform:translateY(-3px);box-shadow:0 20px 56px rgba(10,13,20,.10)}
.oa .wqnum{position:absolute;top:20px;right:26px;font-family:var(--mono);font-size:54px;line-height:1;font-weight:900;color:var(--line);transition:color .4s;user-select:none}
.oa .wqcard:hover .wqnum{color:rgba(58,86,255,.25)}
.oa .wqt{font-size:23px;font-weight:800;letter-spacing:-.02em;line-height:1.25;word-break:keep-all;padding-right:76px;margin-bottom:6px}
.oa .wqs{font-size:15.5px;font-weight:700;color:var(--txt);letter-spacing:-.01em;word-break:keep-all;margin-bottom:12px}
.oa .wqd{font-size:14px;color:var(--mut);line-height:1.68;word-break:keep-all}
.oa .wqchip{margin-top:18px;padding-top:14px;border-top:1px dashed var(--line);font-family:var(--mono);font-size:12px;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.oa .wqchip s{color:#8a94a3}
.oa .wqchip i{font-style:normal;color:var(--cy);font-weight:700}
.oa .wqchip b{color:var(--cy);font-weight:800}
@media(max-width:820px){.oa .wqgrid{grid-template-columns:1fr}.oa .wqnum{font-size:44px}.oa .wqt{font-size:20px;padding-right:62px}}
.oa .valuebar{margin-top:22px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;background:linear-gradient(110deg,rgba(58,86,255,.1),rgba(58,86,255,.02));border:1px solid var(--cy-deep);border-radius:18px;padding:26px 32px}
.oa .vbe{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--cy);font-weight:700;margin-bottom:7px}
.oa .valuebar p{font-size:clamp(17px,2vw,21px);font-weight:800;letter-spacing:-.015em;max-width:42ch;word-break:keep-all}
.oa .whyhead{margin-top:46px;font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);display:flex;align-items:center;gap:14px}
.oa .whyhead::after{content:"";flex:1;height:1px;background:var(--line)}
.oa .why3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px}
.oa .whyc{position:relative;background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:18px;padding:30px 28px;transition:.28s;overflow:hidden}
.oa .whyc::before{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 0% 0%,rgba(58,86,255,.07),transparent 55%);opacity:0;transition:.28s}
.oa .whyc:hover{border-color:var(--line2);transform:translateY(-3px);box-shadow:0 20px 56px rgba(10,13,20,.10)}
.oa .whyc:hover::before{opacity:1}
.oa .whyic{position:relative;width:46px;height:46px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(58,86,255,.18),rgba(58,86,255,.03));border:1px solid var(--cy-deep);color:var(--cy);margin-bottom:20px}
.oa .whyic svg{width:24px;height:24px}
.oa .whyc h3{position:relative;font-size:18px;font-weight:800;letter-spacing:-.02em;margin-bottom:11px;word-break:keep-all}
.oa .whyc p{position:relative;font-size:14px;color:var(--mut);line-height:1.72;word-break:keep-all}
@media(max-width:820px){.oa .why3{grid-template-columns:1fr}}

/* official reveal (youtube) */
.oa .reveal .ytframe{position:relative;margin-top:42px;border-radius:20px;overflow:hidden;border:1px solid var(--line2);background:#04060a;aspect-ratio:16/9;box-shadow:0 34px 90px rgba(10,13,20,.12)}
.oa .reveal .ytframe::after{content:"";position:absolute;inset:0;border-radius:20px;pointer-events:none;box-shadow:inset 0 0 0 1px rgba(58,86,255,.14)}
.oa .reveal iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block}

/* faq */
.oa .faqlist{max-width:860px;margin:40px auto 0;display:flex;flex-direction:column;gap:12px}
.oa .faqi{background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:16px;overflow:hidden;transition:border-color .25s}
.oa .faqi[open]{border-color:var(--cy-deep)}
.oa .faqi summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:18px;padding:22px 26px;font-size:clamp(15px,1.7vw,17.5px);font-weight:700;letter-spacing:-.01em;color:var(--txt);word-break:keep-all}
.oa .faqi summary::-webkit-details-marker{display:none}
.oa .faqq{flex:1;line-height:1.45}
.oa .faqx{position:relative;width:18px;height:18px;flex-shrink:0}
.oa .faqx::before,.oa .faqx::after{content:"";position:absolute;background:var(--cy);border-radius:2px;transition:.28s}
.oa .faqx::before{left:0;top:8px;width:18px;height:2px}
.oa .faqx::after{left:8px;top:0;width:2px;height:18px}
.oa .faqi[open] .faqx::after{transform:scaleY(0)}
.oa .faqa{padding:0 26px 24px;font-size:14.5px;color:var(--mut);line-height:1.78;word-break:keep-all;max-width:74ch}
@media(max-width:820px){.oa .faqi summary{padding:18px 20px}.oa .faqa{padding:0 20px 20px}}

/* resources — open-source ecosystem */
.oa .resgrid{display:grid;grid-template-columns:1.35fr 1fr;grid-auto-rows:1fr;gap:18px;margin-top:46px}
.oa .rescard{position:relative;display:flex;flex-direction:column;background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:20px;padding:32px;overflow:hidden;transition:.28s}
.oa .rescard:hover{border-color:var(--line2);transform:translateY(-4px);box-shadow:0 26px 64px rgba(10,13,20,.10)}
.oa .rescard.gh{grid-row:1 / span 2;background:linear-gradient(165deg,rgba(58,86,255,.08),var(--card) 52%)}
.oa .resic{width:54px;height:54px;border-radius:15px;display:flex;align-items:center;justify-content:center;background:rgba(58,86,255,.1);border:1px solid var(--cy-deep);color:var(--cy);margin-bottom:22px;flex-shrink:0}
.oa .resic svg{width:28px;height:28px}
.oa .rescard h3{font-size:20px;font-weight:800;letter-spacing:-.02em;word-break:keep-all}
.oa .rescard.gh h3{font-size:26px}
.oa .rescard p{font-size:14.5px;color:var(--mut);line-height:1.7;margin-top:11px;word-break:keep-all;max-width:40ch}
.oa .reslink{margin-top:auto;padding-top:22px;font-family:var(--mono);font-size:13px;font-weight:700;color:var(--cy);display:inline-flex;align-items:center;gap:7px;transition:.22s}
.oa .rescard:hover .reslink{gap:12px}
.oa .ghwm{position:absolute;right:-28px;bottom:-34px;width:210px;height:210px;color:rgba(10,13,20,.05);pointer-events:none}
.oa .ghwm svg{width:100%;height:100%}
@media(max-width:820px){.oa .resgrid{grid-template-columns:1fr;grid-auto-rows:auto}.oa .rescard.gh{grid-row:auto}.oa .rescard.gh h3{font-size:22px}}

/* final CTA */
.oa .final{text-align:center}
.oa .final .panel{max-width:780px;margin:0 auto;border:1px solid rgba(58,86,255,.18);border-radius:26px;padding:clamp(48px,7vw,80px) 32px;background:linear-gradient(180deg,rgba(58,86,255,.07),rgba(58,86,255,.02)),var(--card);box-shadow:var(--shadow-lg);position:relative;overflow:hidden}
.oa .final .panel::before{content:"";position:absolute;inset:0;z-index:0;pointer-events:none;background-image:var(--grid);background-size:40px 40px;-webkit-mask-image:radial-gradient(90% 80% at 50% 0%,#000,transparent 70%);mask-image:radial-gradient(90% 80% at 50% 0%,#000,transparent 70%);opacity:.5}
.oa .final .panel > *{position:relative;z-index:1}
.oa .final h2{font-size:clamp(30px,4.6vw,54px);font-weight:900;letter-spacing:-.035em;margin:16px 0;word-break:keep-all}
.oa .final p{color:var(--mut);font-size:17px;max-width:50ch;margin:0 auto 30px;word-break:keep-all}
.oa .final .ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.oa .final .shipnote{margin-top:18px;font-family:var(--mono);font-size:12px;letter-spacing:.1em;color:var(--mut);display:inline-flex;align-items:center;gap:8px}
.oa .final .shipnote::before{content:"";width:7px;height:7px;border-radius:50%;background:#0fb890;box-shadow:0 0 8px rgba(15,184,144,.55)}

/* contact */
.oa .ctgrid{display:grid;grid-template-columns:.85fr 1.15fr;gap:52px;margin-top:44px;align-items:start}
.oa .ctinfo{margin-top:28px;display:flex;flex-direction:column;gap:14px}
.oa .ctrow{font-size:15px;display:flex;gap:14px;align-items:center;word-break:break-all}
.oa .ctlbl{font-family:var(--mono);font-size:11px;letter-spacing:.12em;color:var(--cy);border:1px solid var(--line2);border-radius:6px;padding:4px 9px;min-width:54px;text-align:center;flex-shrink:0}
.oa .ctform{background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:20px;padding:30px}
.oa .frow2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.oa .fld{margin-bottom:14px}
.oa .fld label{display:block;font-family:var(--mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);margin-bottom:7px}
.oa .fld input,.oa .fld textarea{width:100%;background:#f6f8fb;border:1px solid var(--line2);border-radius:10px;padding:12px 14px;color:var(--txt);font-family:var(--sans);font-size:15px;outline:none;transition:.2s}
.oa .fld input:focus,.oa .fld textarea:focus{border-color:var(--cy);background:#fff;box-shadow:0 0 0 3px rgba(58,86,255,.15)}
.oa .fld input::placeholder,.oa .fld textarea::placeholder{color:#9aa3b2}
.oa .fld textarea{resize:vertical}
.oa .ctagree{display:flex;gap:10px;align-items:flex-start;font-size:12.5px;color:var(--mut);margin:4px 0 18px;line-height:1.5;cursor:pointer}
.oa .ctagree input{margin-top:3px;accent-color:var(--cy);flex-shrink:0}
.oa .ctsubmit{width:100%;justify-content:center;border:none;cursor:pointer;font-family:var(--sans)}
@media(max-width:820px){.oa .ctgrid{grid-template-columns:1fr;gap:30px}.oa .frow2{grid-template-columns:1fr}}

/* inside — exploded scroll sequence */
.oa .seqwrap{position:relative;height:340vh;background:#232a34}
.oa .seqsticky{position:sticky;top:0;height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:84px 0 30px;background:radial-gradient(circle at 50% 42%,#3a4552,#20262f 80%)}
.oa .seqhead{text-align:center;position:relative;z-index:2;margin-bottom:clamp(6px,1.6vh,22px);padding:0 24px}
.oa .seqhead .kicker{justify-content:center;color:var(--cy-soft)}
.oa .seqhead .h2{color:#fff}
.oa .seqhead .lead{color:rgba(255,255,255,.66);margin-left:auto;margin-right:auto}
.oa .seqstage{position:relative;width:min(1040px,90vw);aspect-ratio:16/9;max-height:64vh;margin:0 auto}
.oa .seqstage .seq3d{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab}
.oa .seqstage .seq3d:active{cursor:grabbing}
.oa .seqstage .seqph{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:rgba(255,255,255,.35);text-transform:uppercase;transition:opacity .4s;pointer-events:none}
.oa .seqhint{position:absolute;bottom:-34px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:rgba(255,255,255,.5);text-transform:uppercase;white-space:nowrap}
.oa .seqprog{position:absolute;right:-6px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;align-items:center;gap:9px;z-index:4;pointer-events:none}
.oa .seqprog span{font-family:var(--mono);font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);writing-mode:vertical-rl}
.oa .sp-rail{position:relative;width:2px;height:112px;background:rgba(255,255,255,.14);border-radius:2px}
.oa .sp-fill{position:absolute;left:0;top:0;width:100%;height:0%;background:linear-gradient(180deg,var(--cy-soft),var(--cy));border-radius:2px}
.oa .sp-dot{position:absolute;left:50%;top:0%;width:9px;height:9px;border-radius:50%;background:var(--cy);border:2px solid rgba(255,255,255,.85);transform:translate(-50%,-50%);box-shadow:0 0 10px rgba(58,86,255,.8)}
@media(max-width:820px){.oa .seqprog{right:-2px}.oa .sp-rail{height:84px}}
.oa .seqlabels3d{position:absolute;inset:0;pointer-events:none;z-index:3;overflow:visible}
.oa .seqleaders{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.oa .seqleaders line{stroke:rgba(122,225,255,.72);stroke-width:1.3;stroke-dasharray:4 3}
.oa .tag3{position:absolute;top:0;left:0;opacity:0;transition:opacity .3s ease;width:max-content;max-width:190px;padding:8px 13px 9px;border-radius:12px;background:rgba(10,14,20,.66);border:1px solid rgba(255,255,255,.16);backdrop-filter:blur(5px);will-change:opacity}
.oa .tag3.rgt{text-align:right}
.oa .tag3 span{display:block;font-family:var(--sans);font-size:11px;line-height:1.32;color:rgba(255,255,255,.6);letter-spacing:-.01em}
.oa .tag3 b{display:block;margin-top:2px;font-family:var(--sans);font-size:14px;font-weight:700;color:#fff;letter-spacing:-.01em;text-shadow:0 1px 6px rgba(0,0,0,.5)}
@media(max-width:820px){.oa .seqwrap{height:250vh}.oa .seqstage{aspect-ratio:1/1;max-height:52vh}.oa .tag3{max-width:140px;padding:6px 10px}.oa .tag3 b{font-size:12px}.oa .tag3 span{font-size:10px}}

/* applications gallery */
.oa .apps .appgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
.oa .appcard{position:relative;margin:0;border-radius:20px;overflow:hidden;border:1px solid var(--line2);aspect-ratio:4/3;background:#0b0e14;box-shadow:var(--shadow)}
.oa .appcard img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .7s cubic-bezier(.22,1,.36,1)}
.oa .appcard:hover img{transform:scale(1.06)}
.oa .appcard figcaption{position:absolute;left:0;bottom:0;width:100%;padding:26px 20px 18px;color:#fff;letter-spacing:-.01em;background:linear-gradient(to top,rgba(4,6,10,.92),rgba(4,6,10,.5) 46%,transparent);z-index:2}
.oa .appcard figcaption b{display:block;font-weight:700;font-size:15px;line-height:1.32}
.oa .appcard figcaption span{display:block;margin-top:5px;font-weight:400;font-size:12.5px;line-height:1.45;color:rgba(255,255,255,.72);max-width:34ch}
@media(max-width:900px){.oa .apps .appgrid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.oa .apps .appgrid{grid-template-columns:1fr}}

/* footer */
.oa .vidband{padding-top:clamp(80px,11vw,140px)}
.oa .vidband .wrap{margin-bottom:42px}
.oa .vbframe{position:relative;width:100%;height:clamp(440px,64vh,780px);overflow:hidden;background:#04060a;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.oa .vbframe video{width:100%;height:100%;object-fit:cover;display:block}
.oa .vbframe::after{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(5,7,11,.5) 0%,transparent 17%,transparent 80%,rgba(5,7,11,.82) 100%)}
.oa .vbcap{position:absolute;left:clamp(20px,4vw,52px);bottom:24px;z-index:2;font-family:var(--mono);font-size:11px;letter-spacing:.18em;color:var(--cy-soft);opacity:.9}
.oa footer{font-family:var(--mono);font-size:12px;color:var(--mut);text-align:center;padding:26px 0 42px;border-top:1px solid var(--line)}
.oa footer b{color:var(--cy)}`;

const I = {
  open: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6l-5 6 5 6M16 6l5 6-5 6"/></svg>',
  force: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7L3 11l4 4M3 11h11M17 17l4-4-4-4M21 13H10"/></svg>',
  teleop: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3v6a3 3 0 0 0 3 3M18 3v6a3 3 0 0 1-3 3M12 12v9M9 21h6"/></svg>',
  grip: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v7M17 3v7M7 10l5 3 5-3M12 13v8"/></svg>',
  kit: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
};

// reason-card icons (지원·플랫폼·확장)
const WI = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3.5l2.2 6 4-13 2.3 7H21"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M17 14.5v5M14.5 17h5"/></svg>',
];
// resource icons — GitHub · docs · Discord
const RI = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.71-.23.71-.5l-.01-1.76c-2.92.64-3.54-1.4-3.54-1.4-.48-1.22-1.17-1.54-1.17-1.54-.95-.66.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.41-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.07a10 10 0 0 1 5.24 0c2-1.35 2.88-1.07 2.88-1.07.57 1.45.21 2.52.1 2.79.67.74 1.08 1.67 1.08 2.82 0 4.02-2.46 4.91-4.8 5.17.38.33.72.97.72 1.96l-.01 2.9c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5z"/></svg>',
  docs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z"/><path d="M13 2v6h6M9 13h6M9 17h4"/></svg>',
  discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.25.5a18.3 18.3 0 0 1 4.36 1.35 17.9 17.9 0 0 0-15 0A18.3 18.3 0 0 1 8.85 3.5L8.6 3a19.8 19.8 0 0 0-4.9 1.4C.7 9 .02 13.4.37 17.7a19.9 19.9 0 0 0 6.04 3.05l.5-.69c-.66-.25-1.3-.55-1.9-.92l.47-.36a14.2 14.2 0 0 0 12.04 0l.47.36c-.6.37-1.24.67-1.9.92l.5.69a19.9 19.9 0 0 0 6.04-3.05c.43-5-.74-9.35-3.33-13.3zM8.9 15c-1 0-1.82-.92-1.82-2.05 0-1.13.8-2.05 1.82-2.05s1.84.93 1.82 2.05c0 1.13-.81 2.05-1.82 2.05zm6.2 0c-1 0-1.82-.92-1.82-2.05 0-1.13.8-2.05 1.82-2.05s1.83.93 1.82 2.05c0 1.13-.8 2.05-1.82 2.05z"/></svg>',
};

const mv = (src: string, alt: string, orbit = "25deg 70deg auto", fov = 'field-of-view="30deg"') =>
  `<model-viewer src="${src}" camera-controls touch-action="pan-y" disable-zoom auto-rotate auto-rotate-delay="400" rotation-per-second="16deg" interaction-prompt="none" orientation="0deg 90deg 0deg" shadow-intensity="0" exposure="1.05" environment-image="/models/studio-env.png" tone-mapping="aces" camera-orbit="${orbit}" ${fov} loading="lazy" reveal="auto" alt="${alt}"></model-viewer>`;

const cnt = (to: string, suf = "", pre = "") =>
  `<span class="cnt" data-to="${to}" data-pre="${pre}" data-suf="${suf}">${pre}0${suf}</span>`;

function buildHTML(t: Dict, lang: "ko" | "en") {
  return `
<nav><div class="nav-in">
  <a href="/${lang}" class="logo">OpenArm<b>.</b></a>
  <div class="nav-links">
    <a href="#features">${t.nav_features}</a>
    <a href="#ker">KER</a>
    <a href="#cell">Cell</a>
    <a href="#why">${t.nav_why}</a>
    <a href="#resources">${t.nav_res}</a>
    <a href="#faq">FAQ</a>
    <a href="#contact">${t.nav_contact}</a>
  </div>
  <div class="nav-r">
    <a href="/${lang}/store" class="cta">${t.nav_store} →</a>
    <button class="hamb" aria-label="menu" onclick="document.getElementById('mmenu').classList.add('on')"><span></span><span></span><span></span></button>
  </div>
</div></nav>

<div class="mmenu" id="mmenu">
  <button class="mclose" aria-label="close" onclick="document.getElementById('mmenu').classList.remove('on')">×</button>
  <a href="#features" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_features}</a>
  <a href="#ker" onclick="document.getElementById('mmenu').classList.remove('on')">OpenArm KER</a>
  <a href="#cell" onclick="document.getElementById('mmenu').classList.remove('on')">OpenArm Cell</a>
  <a href="#why" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_why}</a>
  <a href="#resources" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_res}</a>
  <a href="#faq" onclick="document.getElementById('mmenu').classList.remove('on')">FAQ</a>
  <a href="#contact" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_contact}</a>
  <a href="/${lang}/openarm-1.1">OpenArm 1.1</a>
  <div class="mfoot">
    <a href="/${lang}/store" class="cta">${t.nav_store} →</a>
  </div>
</div>

<section class="vhero" id="top">
  <video class="vhero-bg" src="/videos/kv.mp4" autoplay muted loop playsinline preload="auto"></video>
  <div class="vhero-scrim"></div>
  <div class="vhero-in wrap">
    <span class="eyebrow">${t.hero_eyebrow}</span>
    <h1 class="vhero-title">OpenArm <b>2.0</b></h1>
    <p class="vhero-tag">${t.hero_tag}</p>
    <p class="vhero-lead">${t.hero_lead}</p>
    <div class="hero-cta"><a href="/${lang}/store" class="btn btn-pri">${t.hero_cta1} →</a><a href="#contact" class="btn btn-ghost">${t.hero_cta2}</a></div>
    <div class="shipnote">${t.hero_ship}</div>
    <div class="herostats">
      <div><b>7</b><span>-DOF ×2</span></div>
      <div><b>633</b><span>mm</span></div>
      <div><b>4.1</b><span>/6.0kg</span></div>
      <div><b>1</b><span>kHz CAN-FD</span></div>
    </div>
  </div>
  <div class="vscroll" aria-hidden="true"><span class="vscroll-bar"></span></div>
</section>

<section class="trustbar">
  <div class="wrap">
    <div class="heroproof"><span class="dots"><i></i><i></i><i></i><i></i></span> <span>${lang === "en" ? "A <b>globally open-source</b> robotics project" : "<b>전 세계에 공개된</b> 오픈소스 로봇 프로젝트"}</span></div>
    <div class="tb-label">${lang === "en" ? "Works with your standard stack" : "이미 쓰는 표준 스택 그대로"}</div>
    <div class="tb-chips"><span>ROS 2</span><span>MuJoCo</span><span>Isaac Sim</span><span>Python</span><span>CAN-FD</span><span>${lang === "en" ? "Open-source CAD·BOM" : "오픈소스 CAD·BOM"}</span></div>
  </div>
</section>

<section class="specs"><div class="specrow">
  <div class="scell"><div class="v">${cnt("7")}<span class="u">-DOF ×2</span></div><div class="l">${t.s_dof}</div></div>
  <div class="scell"><div class="v">${cnt("633", "")}<span class="u">mm</span></div><div class="l">${t.s_reach}</div></div>
  <div class="scell"><div class="v">${cnt("4.1", "")}<span class="u">/ 6.0kg</span></div><div class="l">${t.s_pay}</div></div>
  <div class="scell"><div class="v">${cnt("1")}<span class="u">kHz</span></div><div class="l">${t.s_ctrl}</div></div>
  <div class="scell"><div class="v">${cnt("100", "%")}</div><div class="l">${t.s_open}</div></div>
</div></section>

<section class="sec" id="features"><div class="wrap">
  <div class="kicker">${t.k_feat}</div>
  <h2 class="h2">${t.h_feat}</h2>
  <p class="lead">${t.feat_lead}</p>
  <div class="feat">
    <div class="fcard big">
      <div class="ic">${I.grip}</div>
      <h3>${t.f1_t}</h3><p>${t.f1_d}</p>
      <div class="tag">// IN-HAND CAMERA · ${t.f1_tag}</div>
    </div>
    <div class="fcard"><div class="ic">${I.force}</div><h3>${t.f2_t}</h3><p>${t.f2_d}</p></div>
    <div class="fcard"><div class="ic">${I.teleop}</div><h3>${t.f3_t}</h3><p>${t.f3_d}</p></div>
    <div class="fcard"><div class="ic">${I.open}</div><h3>${t.f4_t}</h3><p>${t.f4_d}</p></div>
    <div class="fcard"><div class="ic">${I.kit}</div><h3>${t.f5_t}</h3><p>${t.f5_d}</p></div>
  </div>
</div></section>


<section class="sec" id="hardware" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="kicker">${t.k_hw}</div>
  <h2 class="h2">${t.h_hw}</h2>
  <p class="lead">${t.hw_lead}</p>
  <div class="d3">
    <div class="item">
      <div class="d3stage"><span class="lab">// UNIT_2.0 + HEAD_CAM</span>${mv("/models/openarm-2-headcam.glb", "OpenArm 2.0 with head camera", "20deg 72deg auto")}<span class="hint">${t.drag}</span></div>
      <h3>${t.hw1_t}</h3><p>${t.hw1_d}</p>
    </div>
    <div class="item">
      <div class="d3stage"><span class="lab">// CALIBRATION_JIG</span>${mv("/models/openarm-jig.glb", "Calibration jig", "30deg 72deg auto")}<span class="hint">${t.drag}</span></div>
      <h3>${t.hw2_t}</h3><p>${t.hw2_d}</p>
    </div>
  </div>
</div></section>

<section class="seqwrap" id="inside">
  <div class="seqsticky">
    <div class="wrap seqhead">
      <div class="kicker"><b>◇</b> ${t.k_inside}</div>
      <h2 class="h2">${t.inside_h}</h2>
      <p class="lead">${t.inside_lead}</p>
    </div>
    <div class="seqstage">
      <canvas class="seq3d" aria-label="OpenArm 2.0 분해도 (드래그로 회전, 스크롤로 분해)"></canvas>
      <div class="seqph">${t.inside_hint}</div>
      <div class="seqprog" aria-hidden="true">
        <span>${t.prog_closed}</span>
        <div class="sp-rail"><i class="sp-fill"></i><b class="sp-dot"></b></div>
        <span>${t.prog_open}</span>
      </div>
      <div class="seqlabels3d" aria-hidden="true">
        <svg class="seqleaders"><defs><marker id="oaArrow" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0.5,1 L9,5 L0.5,9 Z" fill="#7ae1ff"/></marker></defs></svg>
        <div class="tag3" data-part="17"><span>${t.tag_grip_d}</span><b>${t.tag_grip_n}</b></div>
        <div class="tag3" data-part="39"><span>${t.tag_cam_d}</span><b>${t.tag_cam_n}</b></div>
        <div class="tag3" data-part="52"><span>${t.tag_motor_d}</span><b>${t.tag_motor_n}</b></div>
      </div>
      <span class="seqhint">${t.inside_hint}</span>
    </div>
  </div>
</section>

<section class="sec apps" id="applications" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="kicker"><b>◆</b> ${t.k_apps}</div>
  <h2 class="h2">${t.apps_h}</h2>
  <p class="lead">${t.apps_lead}</p>
  <div class="appgrid">
    <figure class="appcard"><img loading="lazy" src="/images/app_teleoperation.png" alt="OpenArm 활용: ${t.app_teleop}"/><figcaption><b>${t.app_teleop}</b><span>${t.app_teleop_d}</span></figcaption></figure>
    <figure class="appcard"><img loading="lazy" src="/images/app_rl_imitation.png" alt="OpenArm 활용: ${t.app_rl}"/><figcaption><b>${t.app_rl}</b><span>${t.app_rl_d}</span></figcaption></figure>
    <figure class="appcard"><img loading="lazy" src="/images/app_robot_manipulation.png" alt="OpenArm 활용: ${t.app_manip}"/><figcaption><b>${t.app_manip}</b><span>${t.app_manip_d}</span></figcaption></figure>
    <figure class="appcard"><img loading="lazy" src="/images/app_ai_humanoid.png" alt="OpenArm 활용: ${t.app_humanoid}"/><figcaption><b>${t.app_humanoid}</b><span>${t.app_humanoid_d}</span></figcaption></figure>
    <figure class="appcard"><img loading="lazy" src="/images/app_hri_handshake.png" alt="OpenArm 활용: ${t.app_hri}"/><figcaption><b>${t.app_hri}</b><span>${t.app_hri_d}</span></figcaption></figure>
    <figure class="appcard"><img loading="lazy" src="/images/app_ai_education.png" alt="OpenArm 활용: ${t.app_edu}"/><figcaption><b>${t.app_edu}</b><span>${t.app_edu_d}</span></figcaption></figure>
  </div>
</div></section>

<section class="sec" id="ker"><div class="wrap">
  <div class="kicker">${t.k_eco}</div>
  <h2 class="h2">${t.h_eco}</h2>
  <div class="eco">
    <div class="ecomedia"><span class="lab">// MOD_KER</span><img src="https://docs.openarm.dev/assets/images/ker-086043e0d7a5b11dd872d6f997f37ce4.gif" alt="OpenArm KER" loading="lazy"/></div>
    <div>
      <span class="ecobadge">${t.ker_badge}</span>
      <h3>OpenArm KER</h3>
      <p>${t.ker_d}</p>
      <div class="ecogrid">
        <div class="ecoitem"><b>${t.ker_1t}</b><span>${t.ker_1d}</span></div>
        <div class="ecoitem"><b>${t.ker_2t}</b><span>${t.ker_2d}</span></div>
        <div class="ecoitem"><b>${t.ker_3t}</b><span>${t.ker_3d}</span></div>
        <div class="ecoitem"><b>${t.ker_4t}</b><span>${t.ker_4d}</span></div>
      </div>
    </div>
  </div>
</div></section>

<section class="sec" id="cell" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="eco rev">
    <div class="ecomedia"><span class="lab">// MOD_CELL</span>${mv("/models/openarm-cell-full.glb", "OpenArm Cell + 2.0", "30deg 72deg auto")}</div>
    <div>
      <span class="ecobadge">${t.cell_badge}</span>
      <h3>OpenArm Cell</h3>
      <p>${t.cell_d}</p>
      <div class="ecogrid">
        <div class="ecoitem"><b>${t.cell_1t}</b><span>${t.cell_1d}</span></div>
        <div class="ecoitem"><b>${t.cell_2t}</b><span>${t.cell_2d}</span></div>
        <div class="ecoitem"><b>${t.cell_3t}</b><span>${t.cell_3d}</span></div>
        <div class="ecoitem"><b>${t.cell_4t}</b><span>${t.cell_4d}</span></div>
      </div>
    </div>
  </div>
</div></section>

<section class="sec reveal" id="reveal"><div class="wrap">
  <div class="kicker"><b>▶</b> ${t.rv_k}</div>
  <h2 class="h2">${t.rv_h}</h2>
  <p class="lead">${t.rv_d}</p>
  <div class="ytframe">
    <iframe src="https://www.youtube-nocookie.com/embed/6ZLM6f8kF4Q?rel=0&modestbranding=1" title="OpenArm Official Reveal" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</div></section>

<section class="sec why" id="why"><div class="wrap">
  <div class="kicker">${t.k_why}</div>
  <h2 class="h2">${t.why_title}</h2>
  <p class="cmplead">${t.why_desc}</p>
  <div class="wqgrid">
    ${t.tcards.map((it, i) => `<div class="wqcard">
      <div class="wqnum">0${i + 1}</div>
      <h3 class="wqt">${it.q}</h3>
      <div class="wqs">${it.s}</div>
      <p class="wqd">${it.d}</p>
      <div class="wqchip"><s>${it.cf}</s><i>→</i><b>${it.ct}</b></div>
    </div>`).join("")}
  </div>
  <div class="valuebar">
    <div><div class="vbe">🤝 ${t.why_pro}</div><p>${t.why_foot}</p></div>
    <a href="/${lang}/store" class="btn btn-pri">${t.why_cta} →</a>
  </div>
  <div class="whyhead">${t.why_more}</div>
  <div class="why3">
    ${t.why.map((it, i) => `<div class="whyc">
      <div class="whyic">${WI[i]}</div>
      <h3>${it.t}</h3>
      <p>${it.d}</p>
    </div>`).join("")}
  </div>
</div></section>

<section class="sec res" id="resources"><div class="wrap">
  <div class="kicker">${t.k_res}</div>
  <h2 class="h2">${t.res_h}</h2>
  <p class="lead">${t.res_sub}</p>
  <div class="resgrid">
    <a class="rescard gh" href="https://github.com/enactic/OpenArm" target="_blank" rel="noopener noreferrer">
      <div class="resic">${RI.github}</div>
      <h3>${t.res_gh_t}</h3><p>${t.res_gh_d}</p>
      <span class="reslink">${t.res_gh_b} →</span>
      <span class="ghwm">${RI.github}</span>
    </a>
    <a class="rescard" href="https://docs.openarm.dev/" target="_blank" rel="noopener noreferrer">
      <div class="resic">${RI.docs}</div>
      <h3>${t.res_doc_t}</h3><p>${t.res_doc_d}</p>
      <span class="reslink">${t.res_doc_b} →</span>
    </a>
    <a class="rescard" href="https://discord.gg/FsZaZ4z3We" target="_blank" rel="noopener noreferrer">
      <div class="resic">${RI.discord}</div>
      <h3>${t.res_dc_t}</h3><p>${t.res_dc_d}</p>
      <span class="reslink">${t.res_dc_b} →</span>
    </a>
  </div>
</div></section>

<section class="sec faq" id="faq" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="kicker"><b>?</b> ${t.faq_k}</div>
  <h2 class="h2">${t.faq_h}</h2>
  <p class="lead">${t.faq_sub}</p>
  <div class="faqlist">
    ${t.faq.map((it, i) => `<details class="faqi"${i === 0 ? " open" : ""}>
      <summary><span class="faqq">${it.q}</span><span class="faqx" aria-hidden="true"></span></summary>
      <div class="faqa">${it.a}</div>
    </details>`).join("")}
  </div>
</div></section>

<section class="sec final" id="order"><div class="wrap"><div class="panel">
  <span class="eyebrow" style="justify-content:center">${t.order_eyebrow}</span>
  <h2>${t.order_h}</h2>
  <p>${t.order_d}</p>
  <div class="ctas">
    <a href="/${lang}/store" class="btn btn-pri">${t.order_b1} →</a>
    <a href="/${lang}/openarm-1.1" class="btn btn-ghost">${t.order_b2}</a>
  </div>
  <div class="shipnote">${t.hero_ship}</div>
</div></div></section>

<section class="sec" id="contact" style="background:var(--bg2);background-image:var(--grid);background-size:38px 38px;border-top:1px solid var(--line)"><div class="wrap">
  <div class="kicker">${t.k_contact}</div>
  <div class="ctgrid">
    <div>
      <h2 class="h2">${t.ct_h}</h2>
      <p class="lead">${t.ct_sub}</p>
      <div class="ctinfo">
        <div class="ctrow"><span class="ctlbl">TEL</span> +82 (02) 3486-5278</div>
        <div class="ctrow"><span class="ctlbl">MAIL</span> openarm@libertron.com</div>
        <div class="ctrow"><span class="ctlbl">ADDR</span> ${t.ct_addr}</div>
      </div>
    </div>
    <form class="ctform" onsubmit="return window.__oaInquiry(event)">
      <div class="frow2">
        <div class="fld"><label>${t.ct_name} *</label><input id="i_name" required placeholder="${t.ct_name_ph}"/></div>
        <div class="fld"><label>${t.ct_org}</label><input id="i_org" placeholder="${t.ct_org_ph}"/></div>
      </div>
      <div class="frow2">
        <div class="fld"><label>${t.ct_country} *</label><input id="i_country" required placeholder="${t.ct_country_ph}"/></div>
        <div class="fld"><label>${t.ct_email} *</label><input id="i_email" type="email" required placeholder="hello@example.com"/></div>
      </div>
      <div class="fld"><label>${t.ct_phone} *</label><input id="i_phone" required placeholder="010-0000-0000"/></div>
      <div class="fld"><label>${t.ct_msg} *</label><textarea id="i_msg" rows="4" required placeholder="${t.ct_msg_ph}"></textarea></div>
      <label class="ctagree"><input type="checkbox" required/> <span>${t.ct_privacy}</span></label>
      <button class="btn btn-pri ctsubmit" type="submit">${t.ct_btn} →</button>
    </form>
  </div>
</div></section>

<footer>OPENARM 2.0 · <b>LIBERTRON</b> · ${t.footer}</footer>`;
}

type TCard = { q: string; s: string; d: string; cf: string; ct: string };

const KO = {
  nav_features: "Core", nav_why: "Why Libertron", nav_res: "Resources", nav_contact: "Contact", nav_store: "Store",
  hero_eyebrow: "Introducing · OpenArm 2.0",
  hero_tag: "피지컬 AI, <em>누구나 손 쉽게!</em>",
  hero_lead: "100% 오픈소스 양팔 로봇. 더 작아진 그리퍼와 손안의 카메라, 여기에 실험 변수를 잡아주는 Cell까지. 부품 수급부터 세팅까지 리버트론이 한 번에 준비해 드립니다.",
  hero_cta1: "지금 구매하기", hero_cta2: "도입 문의", hero_ship: "지금 구매 시 9월 배송 예정", drag: "드래그 · 360°",
  intro_spec_h: "핵심 사양", intro_explore: "자세히 보기", scrollcue: "SCROLL",
  s_dof: "양팔 기준", s_reach: "도달 거리 (CAD 실측)", s_pay: "정격 · 피크 가반하중", s_ctrl: "CAN-FD 제어", s_open: "오픈소스 CAD·펌웨어",
  k_feat: "Core", h_feat: "OpenArm 2.0을 <em>구매해야 하는 이유</em>",
  feat_lead: "1.0에서 아쉬웠던 부분을 다듬어, 강화학습과 모방학습이 제대로 돌아가는 차세대 플랫폼으로 다시 태어났습니다.",
  f1_t: "더 작아진 그리퍼, 손안의 카메라", f1_d: "구동부를 덜어내 더 작고 가벼워진 그리퍼. 손안의 카메라가 집는 순간의 시야를 그대로 담고, 핑거는 작업에 맞춰 바꿔 끼우면 됩니다. 가슴 카메라 대신 헤드 마운트 ZED 스테레오 카메라를 채택해, 더 자연스러운 탑다운 시야와 깊이가 담긴 학습 데이터를 제공합니다.", f1_tag: "교체형 핑거 · ZED 권장",
  f2_t: "무동력 KER 추가", f2_d: "가벼운 입력 기기 KER을 활용하여 더 빠르고 간편하게 모방 학습 데이터를 수집하고 입력할 수 있습니다.",
  f3_t: "직관적 텔레오퍼레이션", f3_d: "중력은 알아서 잡아줍니다. 바로 옆에서 손으로 시연하듯, 부드럽고 정밀하게 조작하세요.",
  f4_t: "완전한 오픈소스", f4_d: "CAD도, 펌웨어도, 제어 코드도 전부 공개합니다. ROS2를 그대로 쓰니 개발은 더 빨라집니다.",
  f5_t: "완제품으로 배송", f5_d: "리버트론에서는 배송 즉시 사용할 수 있는 오픈암 2.0을 빠르게 제공합니다. 조립부터 세팅까지 이미 완료되었습니다.",
  act_k: "In Action", act_h: "<em>실제 구동 영상</em>으로 확인하세요", act_cap: "// OPENARM 2.0 · 실제 구동 영상",
  k_hw: "Hardware", h_hw: "<em>2.0 하드웨어</em>를 직접 돌려보세요",
  hw_lead: "끌어서 360°로 돌려보세요. 손안의 카메라를 품은 본체부터, 데이터셋의 일관성을 잡아주는 캘리브레이션 지그까지.",
  hw1_t: "OpenArm 2.0 · 헤드 카메라", hw1_d: "손안의 카메라를 품은 본체에, 상단 카메라까지 더한 완전한 구성입니다.",
  hw2_t: "캘리브레이션 지그 (CELL 전용)", hw2_d: "CELL에서 OpenArm 2.0을 동작할 때, 그리퍼를 CAD가 정한 정확한 각도에 딱 맞춰 고정합니다. 조립 오차를 바로잡아, 데이터셋을 더 일관되게 유지하도록 돕습니다.",
  k_inside: "Inside", inside_h: "2.0의 <em>새로워진 그리퍼</em> 구성",
  inside_lead: "카메라가 내장되고, 3D 프린팅만으로 그리퍼를 만들어 교체할 수 있습니다.", inside_hint: "드래그 회전 · 스크롤 분해",
  prog_closed: "조립", prog_open: "분해",
  lbl_grip: "2핑거 그리퍼 조", lbl_act: "DAMIAO QDD 액추에이터", lbl_case: "3D 프린트 케이싱", lbl_cnc: "CNC 알루미늄 플레이트",
  tag_grip_d: "나사 3개로 교체 가능한", tag_grip_n: "그리퍼 엔드",
  tag_cam_d: "손안에 내장된", tag_cam_n: "카메라",
  tag_motor_d: "사람의 손·손목처럼 자연스럽게 동작하는", tag_motor_n: "다미아오 액추에이터",
  k_apps: "Applications", apps_h: "이런 연구에 <em>활용할 수 있습니다</em>",
  apps_lead: "텔레오퍼레이션 데이터 수집부터 강화·모방학습, 휴머노이드 연구와 교육까지. OpenArm 한 대로 다양한 피지컬 AI 연구를 시작할 수 있습니다.",
  app_teleop: "텔레오퍼레이션 · 시연 기반 학습", app_rl: "강화학습 · 모방학습", app_manip: "로봇 매니퓰레이션 연구",
  app_humanoid: "AI 휴머노이드 로봇 학습", app_hri: "인간–로봇 상호작용 (HRI)", app_edu: "AI 로보틱스 교육",
  app_teleop_d: "리더–팔로워 원격조종으로 사람의 시연을 그대로 데이터화합니다.",
  app_rl_d: "수집한 궤적으로 정책을 학습하고 실기에서 바로 검증합니다.",
  app_manip_d: "파지·조립·핸드오버 등 정밀 양팔 조작 알고리즘을 개발합니다.",
  app_humanoid_d: "양팔 매니퓰레이션 데이터로 휴머노이드 스킬을 이식합니다.",
  app_hri_d: "힘 제어 기반의 안전한 근접 협업과 접촉 인터랙션을 연구합니다.",
  app_edu_d: "ROS2·Python·CAN-FD API로 실습하는 로보틱스 커리큘럼.",
  k_eco: "Ecosystem", h_eco: "2.0을 더 유용하게, <em>강력한 추가 옵션</em>",
  cell_badge: "출시 예정", cell_d: "배경도, 조명도, 카메라와 로봇 위치까지 매번 똑같이. 모델을 공정하게 비교하고 자동으로 평가하는 표준 환경, Cell입니다.",
  cell_1t: "표준 환경", cell_1d: "배경·조명·카메라를 고정해 공정하게 비교", cell_2t: "Z축 리프트", cell_2d: "높이를 조절해 다양한 작업을 재현",
  cell_3t: "안전·장기 운용", cell_3d: "움직임 감지 센서를 적용하여 더 안전한 테스트 가능", cell_4t: "자동 평가", cell_4d: "똑같이 재현되는 셋업으로 모델을 자동 비교",
  ker_badge: "출시 예정 · CAD·BOM 추후", ker_d: "2.0과 똑같은 관절 구조를 그대로 옮긴 무동력 리더암(Kinematic Equivalent Replica). 모터가 없어 가볍고, 오래 잡고 있어도 지치지 않습니다. 텔레오퍼레이션과 티칭 데이터 수집에 제격입니다.",
  ker_1t: "동일한 구조 & 설계", ker_1d: "2.0과 같은 관절 구조로 1:1 매핑", ker_2t: "무동력", ker_2d: "모터가 없어 가볍고 저렴",
  ker_3t: "저항 없는 동작", ker_3d: "오래 시연해도 무리없는 무게감", ker_4t: "데이터 수집", ker_4d: "텔레오퍼레이션·티칭에 제격",
  k_why: "Why Libertron",
  why_title: "왜 <em>리버트론</em>에서 구매해야 할까요?",
  why_desc: "OpenArm은 전 세계에 공개된 오픈소스 프로젝트입니다. 그래서 리버트론의 역할은 분명합니다. 부품을 모으고 맞춰보는 데 드는 <strong>최소 석 달의 준비 과정을, 대신 줄여 드리는 것.</strong> 까다로운 준비는 리버트론에 맡기고, 연구에 더 집중하세요.",
  why_pro: "리버트론 Devkits", why_foot: "들어갈 시간과 리스크까지 따져보면, 결국 가장 합리적인 선택입니다.", why_cta: "스토어에서 견적 받기",
  tcards: [
    { q: "“조립 0시간”", s: "완성품으로 배송됩니다", d: "리버트론 엔지니어가 직접 조립하고 캘리브레이션·테스트까지 마친 완성품을 보내드립니다.", cf: "DIY 최소 180시간", ct: "0시간" },
    { q: "“받는 즉시 시작”", s: "도입에 걸리는 준비 기간을 없앴습니다", d: "한 곳에서 바로 배송하고, 증빙 서류까지 한 번에 챙겨 드립니다.", cf: "DIY 최소 2~3개월", ct: "즉시 시작" },
    { q: "“테스트를 마친 소프트웨어”", s: "받은 날 바로 돌려볼 수 있습니다", d: "기본 동작 확인을 마쳤고, 바로 실행할 수 있는 예제 코드도 함께 드립니다.", cf: "직접 해결", ct: "예제 코드 제공" },
    { q: "“국내 직접 A/S”", s: "유지보수는 리버트론이 책임집니다", d: "투명하고 빠른 B2B 기술 지원을 제공합니다.", cf: "100% 본인 부담", ct: "리버트론 지원" },
  ] as TCard[],
  why_more: "리버트론이라는 파트너",
  why: [
    { t: "처음부터 끝까지 함께", d: "부품 수급과 통관, 조립과 캘리브레이션, 첫 구동까지. 연구를 바로 시작할 수 있는 상태로 건네드립니다." },
    { t: "계속 나아지는 플랫폼", d: "1.0의 경험을 2.0에 담았듯, 펌웨어와 예제, 노하우를 꾸준히 업데이트합니다. 함께 나아갑니다." },
    { t: "확장 가능한 솔루션", d: "KER, Cell, 카메라 패키지까지. 연구 환경 전체를 한 창구에서 넓혀가고, 견적도 한 번에 받으세요." },
  ],
  rv_k: "Reveal", rv_h: "세상에 처음 공개되던 <em>그 순간</em>",
  rv_d: "OpenArm의 시작을 담은 공식 영상입니다. 합리적인 가격으로 피지컬 AI 연구를 시작할 수 있도록 설계된 오픈암의 컨셉을 한눈에 확인할 수 있습니다.",
  k_res: "Resources",
  res_h: "코드, 문서, 커뮤니티 <em>모두 오픈</em>되어 있습니다",
  res_sub: "OpenArm은 누구나 들여다보고 함께 만들어가는 오픈소스 프로젝트입니다. 하드웨어 CAD부터 펌웨어와 제어 코드, 전 세계 개발자 커뮤니티까지 — 직접 보고, 받아 쓰고, 함께 발전시키세요.",
  res_gh_t: "GitHub 저장소", res_gh_d: "하드웨어 CAD·펌웨어·제어 코드가 전부 공개되어 있습니다. 받아서 빌드하고, 자유롭게 개조하세요.", res_gh_b: "코드 보기",
  res_doc_t: "공식 문서", res_doc_d: "API 레퍼런스와 셋업 가이드, 튜토리얼까지. (영문)", res_doc_b: "문서 읽기",
  res_dc_t: "Discord 커뮤니티", res_dc_d: "전 세계 개발자들과 실시간으로 묻고 답하며 함께 만들어갑니다.", res_dc_b: "서버 참여",
  faq_k: "FAQ", faq_h: "자주 묻는 질문 <em>FAQ</em>",
  faq_sub: "OpenArm에 대해 가장 많이 들어오는 질문들입니다.",
  faq: [
    { q: "OpenArm은 기존 산업용 로봇팔과 뭐가 다른가요?", a: "가장 큰 차이는 연구실이 실제로 감당할 수 있는 가격과 개방성입니다. 수천만 원대 산업용 로봇은 공정 자동화에 맞춰 과한 스펙과 가격이 붙지만, OpenArm은 연구와 교육에 필요한 만큼만 담아 문턱을 크게 낮췄습니다. CAD·펌웨어·제어 코드가 전부 공개된 오픈소스라 필요하면 직접 뜯어보고 고쳐 쓸 수 있어, 첫 교육용 로봇암부터 강화학습·텔레오퍼레이션 연구까지 부담 없이 시작하기 좋습니다." },
    { q: "Python이나 ROS2로 직접 제어할 수 있나요?", a: "네, 그대로 됩니다. Python API를 기본 제공하고 C++·ROS2·WebSocket 등 익숙한 환경에서 바로 제어할 수 있습니다. 딥러닝이나 강화학습(RL)으로 학습시킨 정책을 실제 로봇암에 곧바로 올려 검증할 수 있어, 로보틱스·AI 연구자분들이 특히 편하게 쓰십니다." },
    { q: "대학 연구실이나 고등학교 로봇 수업용으로 적합한가요?", a: "잘 맞습니다. 크기가 작고 가벼워 좁은 실습 공간에서도 안전하게 다룰 수 있습니다. 무엇보다 복잡한 티칭 펜던트 없이, 로봇을 직접 손으로 잡고 움직여 동작을 가르치거나(kinesthetic teaching) 리더암으로 시연해 그대로 따라 하게 하는 방식이라 처음 접하는 학생도 금세 익힙니다. 기초 코딩 실습부터 심화 로봇 역학 연구까지 두루 활용할 수 있습니다." },
    { q: "그리퍼나 카메라 같은 액세서리를 추가할 수 있나요?", a: "네. 기본 제공되는 리더·팔로워 그리퍼 외에도 주문형 그리퍼와 흡착 펌프 등 다양한 엔드이펙터(End Effector)를 테스트 해볼 수 있습니다. 오픈소스 하드웨어를 제공하기 때문에 CNC, 3D 프린터 등을 활용하여 어댑터를 제작하고 결합해보는 과정도 어렵지 않게 가능합니다. 상단에는 깊이 정보까지 담는 Depth 카메라(ZED Mini 스테레오 카메라)를 옵션으로 장착할 수 있어, 비전 AI 기반의 자율 픽앤플레이스도 테스트 해볼 수 있습니다." },
    { q: "A/S와 기술 지원은 어떻게 되나요?", a: "리버트론은 한국에서 직접 조립하고 검수한 장비를 기준으로, 상담부터 배송, 기술 지원까지 도입 전 과정을 한 창구에서 대응합니다. 국내는 복잡한 수입 절차 없이 빠르게 공급하고, 해외 고객께는 FedEx 등 글로벌 물류로 안전하게 보내 드립니다." },
  ],
  order_eyebrow: "Purchase", order_h: "OpenArm 2.0, 지금 만나보세요", order_d: "원하는 구성을 담아 주문하거나, 견적을 받아보세요.",
  order_b1: "지금 구매하기", order_b2: "OpenArm 1.1 보기",
  k_contact: "Contact", ct_h: "궁금한 점을 <em>문의해 주세요</em>",
  ct_sub: "도입 문의나 견적 상담을 남겨주세요. 담당자가 빠르게 연락드립니다.",
  ct_addr: "서울 영등포구 당산로41길 11 SK V1 Center W동 1111호",
  ct_name: "이름", ct_name_ph: "홍길동", ct_org: "소속 / 회사", ct_org_ph: "(주)리버트론 / 학교·연구실 (선택)",
  ct_country: "국가 / 지역", ct_country_ph: "예: 대한민국", ct_email: "이메일", ct_phone: "전화번호", ct_msg: "문의 내용", ct_msg_ph: "도입 수량, 일정, 그 밖에 궁금한 점을 적어주세요.",
  ct_privacy: "개인정보 수집 및 이용에 동의합니다 (필수) — 문의·견적 처리에만 사용하며, 처리가 끝나면 곧바로 파기합니다.",
  ct_btn: "문의 보내기", ct_sending: "보내는 중…", ct_done: "문의가 잘 접수되었습니다. 담당자가 곧 연락드리겠습니다. 감사합니다!", ct_err: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
  footer: "100% 오픈소스 · 연구 · 교육 · 개발용 양팔 로봇 플랫폼",
};

type Dict = typeof KO;

const EN: Dict = {
  nav_features: "Core", nav_why: "Why Libertron", nav_res: "Resources", nav_contact: "Contact", nav_store: "Store",
  hero_eyebrow: "Introducing · OpenArm 2.0",
  hero_tag: "Physical AI, <em>made easy for everyone.</em>",
  hero_lead: "A 100% open-source bimanual humanoid arm. Compact gripper, in-hand camera, and a variable-controlled Cell — supplied one-stop from Korea by Libertron.",
  hero_cta1: "Buy now", hero_cta2: "Get in touch", hero_ship: "Order now — ships in September", drag: "Drag · 360°",
  intro_spec_h: "Core specifications", intro_explore: "Explore", scrollcue: "SCROLL",
  s_dof: "Per dual arm", s_reach: "Reach (CAD-measured)", s_pay: "Nominal / peak payload", s_ctrl: "CAN-FD control", s_open: "Open-source CAD & firmware",
  k_feat: "Core", h_feat: "Why you should <em>buy OpenArm 2.0</em>",
  feat_lead: "We refined what fell short in 1.0 — reborn as a next-generation platform where reinforcement and imitation learning run the way they should.",
  f1_t: "A smaller gripper, an in-hand camera", f1_d: "Simpler actuation makes the gripper smaller. The in-hand camera captures the moment of grasping, and fingers swap to fit each task. Upgraded from a chest-mounted camera to a head-mounted ZED stereo camera, providing a more natural top-down view and depth-rich training data.", f1_tag: "swappable fingers · ZED recommended",
  f2_t: "Motorless KER add-on", f2_d: "Collect and feed imitation-learning data faster and more easily with KER, a lightweight motorless input device.",
  f3_t: "Intuitive teleoperation", f3_d: "Smooth gravity compensation lets you operate precisely, as if demonstrating the task by hand.",
  f4_t: "Fully open source", f4_d: "CAD, firmware, and control code are all open — ROS2-compatible for rapid development.",
  f5_t: "Ships fully assembled", f5_d: "Libertron delivers OpenArm 2.0 ready to use the moment it arrives — assembly and setup already done.",
  act_k: "In Action", act_h: "See <em>OpenArm 2.0</em> in motion", act_cap: "// OPENARM 2.0 · REAL FOOTAGE",
  k_hw: "Hardware", h_hw: "Spin the <em>2.0 hardware</em> yourself",
  hw_lead: "Drag to explore in 360° — from the body with its in-hand camera to the calibration jig that keeps your dataset consistent.",
  hw1_t: "OpenArm 2.0 · head camera", hw1_d: "The full setup — the body with integrated in-hand camera plus the top-down camera.",
  hw2_t: "Calibration jig (CELL only)", hw2_d: "When operating OpenArm 2.0 in the CELL, it locks the gripper to its exact CAD-defined angles — calibrating out assembly errors for a consistent dataset.",
  k_inside: "Inside", inside_h: "2.0's <em>redesigned gripper</em>",
  inside_lead: "A built-in camera — and a gripper you can 3D-print and swap yourself.", inside_hint: "drag to rotate · scroll to explode",
  prog_closed: "Closed", prog_open: "Open",
  lbl_grip: "Two-finger gripper jaw", lbl_act: "DAMIAO QDD actuator", lbl_case: "3D-printed casing", lbl_cnc: "CNC aluminum plate",
  tag_grip_d: "Swappable with 3 screws", tag_grip_n: "Gripper end",
  tag_cam_d: "Built into the hand", tag_cam_n: "Camera",
  tag_motor_d: "Human-like hand & wrist motion", tag_motor_n: "DAMIAO actuator",
  k_apps: "Applications", apps_h: "Use it for <em>research like this</em>",
  apps_lead: "From teleoperation data collection to reinforcement and imitation learning, humanoid research, and education — one OpenArm opens the door to a wide range of physical-AI work.",
  app_teleop: "Teleoperation & demonstration learning", app_rl: "Reinforcement & imitation learning", app_manip: "Robot manipulation research",
  app_humanoid: "AI-driven humanoid learning", app_hri: "Human–robot interaction (HRI)", app_edu: "AI robotics education",
  app_teleop_d: "Capture human demonstrations directly via leader–follower teleop.",
  app_rl_d: "Train policies on the collected trajectories, then validate on hardware.",
  app_manip_d: "Develop precise bimanual grasping, assembly and handover algorithms.",
  app_humanoid_d: "Port bimanual manipulation data into humanoid skills.",
  app_hri_d: "Study safe, force-controlled close collaboration and contact.",
  app_edu_d: "A hands-on robotics curriculum on the ROS2, Python & CAN-FD API.",
  k_eco: "Ecosystem", h_eco: "Make 2.0 more useful — <em>powerful add-ons</em>",
  cell_badge: "Coming soon", cell_d: "A reproducible evaluation cell that keeps background, lighting, cameras, and arm position identical every time — a standard environment for fair, automated model comparison.",
  cell_1t: "Standard environment", cell_1d: "Controls background, lighting, cameras for fair comparison", cell_2t: "Z-axis lift", cell_2d: "Height adjust to reproduce varied tasks",
  cell_3t: "Safe & long-running", cell_3d: "Motion-detection sensors for safer testing", cell_4t: "Automated evaluation", cell_4d: "Reproducible setup for automatic model comparison",
  ker_badge: "Coming soon · CAD·BOM later", ker_d: "A motorless leader arm with the exact same joint structure as 2.0 (Kinematic Equivalent Replica). No motors means it's light and fatigue-free — ideal for teleoperation and teaching-data collection.",
  ker_1t: "Identical structure & design", ker_1d: "Same joints as 2.0 for 1:1 mapping", ker_2t: "Motorless", ker_2d: "Light and affordable without motors",
  ker_3t: "Drag-free operation", ker_3d: "A comfortable weight even in long demos", ker_4t: "Data collection", ker_4d: "Ideal for teleop and teaching",
  k_why: "Why Libertron",
  why_title: "Why buy from <em>Libertron</em>?",
  why_desc: "OpenArm is an open-source project available worldwide. Libertron's role is simple — we eliminate <strong>the 3+ months and countless trials you'd otherwise waste on sourcing, assembly, and setup</strong>. Now, simply focus on your research.",
  why_pro: "Libertron Devkits", why_foot: "When you factor in time and risk, it's ultimately the most affordable choice.", why_cta: "Get a quote in the store",
  tcards: [
    { q: "“Zero assembly”", s: "Delivered fully built", d: "Assembled, calibrated, and tested by Libertron engineers before shipping.", cf: "DIY 180+ hours", ct: "0 hours" },
    { q: "“Ready on arrival”", s: "No setup period before you start", d: "Fast single-vendor delivery with complete documentation, all in one place.", cf: "DIY 2–3 months", ct: "Start immediately" },
    { q: "“Pre-tested software”", s: "Run it the day it arrives", d: "Basic operation verified, with ready-to-run example code included.", cf: "Self troubleshooting", ct: "Example code included" },
    { q: "“Technical support”", s: "Maintenance is on Libertron", d: "Transparent, fast B2B technical support.", cf: "100% on you", ct: "Libertron support" },
  ] as TCard[],
  why_more: "Partnering with Libertron",
  why: [
    { t: "End-to-end support", d: "From sourcing and customs to assembly, calibration, and first run — we hand it over ready for research to begin." },
    { t: "A platform that keeps improving", d: "Just as 1.0's field experience shaped 2.0, we keep updating firmware, example code, and know-how alongside you." },
    { t: "An expandable solution", d: "KER, Cell, camera packages — scale your entire research setup and get quotes from a single point of contact." },
  ],
  rv_k: "Reveal", rv_h: "The moment it was <em>first revealed</em>",
  rv_d: "The official video that introduced OpenArm to the world — see, at a glance, the concept of an arm built to make physical-AI research affordable.",
  k_res: "Resources",
  res_h: "Code, docs, and a <em>community</em> — all open",
  res_sub: "OpenArm is an open-source project anyone can inspect and build on. From hardware CAD to firmware and control code to a worldwide developer community — explore it, use it, and help it grow.",
  res_gh_t: "GitHub repository", res_gh_d: "Hardware CAD, firmware, and control code are all public. Clone it, build it, and modify it freely.", res_gh_b: "View code",
  res_doc_t: "Official docs", res_doc_d: "API reference, setup guides, and tutorials. (English)", res_doc_b: "Read docs",
  res_dc_t: "Discord community", res_dc_d: "Ask, answer, and build together with developers around the world in real time.", res_dc_b: "Join server",
  faq_k: "FAQ", faq_h: "Frequently Asked <em>Questions</em>",
  faq_sub: "Here are the most common questions about the OpenArm robotic arm.",
  faq: [
    { q: "How is OpenArm different from existing industrial robotic arms?", a: "OpenArm is the ultimate starting machine to experience collaborative robots at a reasonable price. Unlike expensive industrial robots, we eliminated price bubbles while keeping research-grade specifications. It is comprehensively designed based on open-source so anyone can easily access and modify it, making it optimized for education, research, and prototyping." },
    { q: "Can I control it directly using Python or ROS2?", a: "Yes, absolutely! OpenArm provides a Python API and can be directly coded and controlled in various environments including C++, ROS2, and WebSockets. It is the best platform for robotics students or AI researchers who want to quickly deploy deep learning and reinforcement learning (RL) models onto a physical robot arm." },
    { q: "Is it suitable for university labs or high school robotics courses?", a: "It is the best choice. With its compact size and light weight, you can safely experiment even in tight spaces. Thanks to its intuitive teaching pendant functionality and open-source nature, it can be utilized in all environments from basic coding education to advanced robotics dynamics research." },
    { q: "Can I attach accessories like grippers or cameras?", a: "Yes. Beyond the standard Leader and Follower grippers, you can test custom grippers, suction pumps, and other end effectors. Because the hardware is open source, fabricating and mounting your own adapters with a CNC or 3D printer is straightforward. A depth camera (ZED Mini stereo camera) that captures depth data can be mounted on top, so you can also try vision-AI-based autonomous pick-and-place." },
    { q: "How does after-sales and technical support work?", a: "Libertron provides a one-stop solution covering the entire process of equipment adoption from consultation and delivery to technical support based on products manufactured in Korea. For customers in Korea, we ensure fast and seamless supply without complex import procedures. For international customers, products are delivered safely and efficiently through global logistics partners such as FedEx." },
  ],
  order_eyebrow: "Purchase", order_h: "Meet OpenArm 2.0 — available now", order_d: "Add the configuration you need and order, or request a quote.",
  order_b1: "Buy now", order_b2: "View OpenArm 1.1",
  k_contact: "Contact", ct_h: "Send us <em>your questions</em>",
  ct_sub: "Leave an inquiry or quote request and our team will get back to you shortly.",
  ct_addr: "Room 1111, SK V1 Center W, 11 Dangsan-ro 41-gil, Yeongdeungpo-gu, Seoul",
  ct_name: "Name", ct_name_ph: "Jane Doe", ct_org: "Organization / Company", ct_org_ph: "Acme Inc. / Lab (optional)",
  ct_country: "Country / Region", ct_country_ph: "e.g., South Korea", ct_email: "Email", ct_phone: "Phone", ct_msg: "Message", ct_msg_ph: "Quantity, timeline, and any questions.",
  ct_privacy: "I agree to the collection and use of personal data (required) — used only to process your inquiry and quote, then deleted once fulfilled.",
  ct_btn: "Submit inquiry", ct_sending: "Sending…", ct_done: "Your inquiry has been received. Our team will be in touch shortly. Thank you!", ct_err: "Submission failed. Please try again in a moment.",
  footer: "100% open-source · bimanual robot platform for research · education · development",
};

export default function Home() {
  const { lang } = useLanguage();
  // After hydration React can silently re-apply the section's innerHTML, replacing every node
  // the effects below have bound to (stale nav toggle, wiped word-fill spans / reveal classes —
  // the "white nav on white background" bug). Watch .oa's direct children and bump an epoch so
  // all DOM-binding effects re-run against the live nodes.
  const [domEpoch, setDomEpoch] = useState(0);
  useEffect(() => {
    const oa = document.querySelector(".oa");
    if (!oa) return;
    const mo = new MutationObserver((recs) => {
      // safety net: only react to the .oa container itself being replaced (parent record)
      // or its children being re-applied (oa record) — ignore unrelated mutations like the
      // effects' own <script> appends, or we loop forever
      const relevant = recs.some((r) =>
        r.target === oa ||
        Array.from(r.addedNodes).concat(Array.from(r.removedNodes)).some((n) => n instanceof HTMLElement && n.classList.contains("oa"))
      );
      if (relevant) setDomEpoch((e) => e + 1);
    });
    mo.observe(oa, { childList: true });
    if (oa.parentElement) mo.observe(oa.parentElement, { childList: true });
    return () => mo.disconnect();
  }, [lang, domEpoch]);
  // model-viewer + metallic material
  useEffect(() => {
    if (!document.querySelector("script[data-mv]")) {
      const m = document.createElement("script");
      m.type = "module";
      m.src = "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";
      m.setAttribute("data-mv", "1");
      document.head.appendChild(m);
    }
    const s = document.createElement("script");
    s.src = "/oa-mats.js";
    document.body.appendChild(s);
    // 모바일: auto-rotate가 유휴 WebGL 렌더 루프를 돌려 메인 스레드를 포화 → CSS 색 전환(내비/제목)이 멈춤.
    // 회전은 데스크톱에서만, 모바일은 드래그로만 회전(정지 상태 = 잼 없음).
    if (window.matchMedia("(max-width:980px)").matches) {
      document.querySelectorAll(".oa model-viewer").forEach((el) => {
        el.removeAttribute("auto-rotate");
        el.removeAttribute("auto-rotate-delay");
        el.removeAttribute("rotation-per-second");
      });
    }
    return () => { s.remove(); };
  }, [lang, domEpoch]);
  // constellation network on dark sections
  useEffect(() => {
    const canvases = Array.from(document.querySelectorAll<HTMLCanvasElement>(".net"));
    const stops: Array<() => void> = [];
    for (const cv of canvases) {
      const ctx = cv.getContext("2d");
      const parent = cv.parentElement;
      if (!ctx || !parent) continue;
      let W = 0, H = 0, raf = 0;
      const pts: Array<{ x: number; y: number; vx: number; vy: number }> = [];
      const mouse = { x: -999, y: -999 };
      const resize = () => { const r = parent.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; };
      resize();
      const N = Math.max(22, Math.min(72, Math.floor(W / 22)));
      for (let i = 0; i < N; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
      const onMove = (e: MouseEvent) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
      const onResize = () => resize();
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("resize", onResize);
      // 화면 밖 캔버스는 rAF를 완전히 정지 — 스크롤 중 불필요한 O(n²) 페인트 제거
      let visible = false;
      const draw = () => {
        if (!document.body.contains(cv) || !visible) return;
        ctx.clearRect(0, 0, W, H);
        for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, 6.283); ctx.fillStyle = "rgba(58,86,255,.5)"; ctx.fill(); }
        for (let a = 0; a < pts.length; a++) for (let b = a + 1; b < pts.length; b++) { const dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y, d = dx * dx + dy * dy; if (d < 16000) { ctx.strokeStyle = "rgba(58,86,255," + (0.15 * (1 - d / 16000)) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke(); } }
        for (const p of pts) { const dx = p.x - mouse.x, dy = p.y - mouse.y, d = dx * dx + dy * dy; if (d < 30000) { ctx.strokeStyle = "rgba(58,86,255," + (0.5 * (1 - d / 30000)) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke(); } }
        raf = requestAnimationFrame(draw);
      };
      const io = new IntersectionObserver(([en]) => {
        const was = visible;
        visible = !!en?.isIntersecting;
        if (visible && !was) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
      }, { rootMargin: "120px" });
      io.observe(cv);
      stops.push(() => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("mousemove", onMove); window.removeEventListener("resize", onResize); });
    }
    return () => { for (const s of stops) s(); };
  }, [lang, domEpoch]);
  // count-up spec numbers on view
  useEffect(() => {
    const animate = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.to || "0");
      const pre = el.dataset.pre || "", suf = el.dataset.suf || "";
      const dec = (el.dataset.to || "").includes(".") ? 1 : 0;
      const start = performance.now(), dur = 1300;
      const step = (now: number) => {
        const f = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - f, 3);
        el.textContent = pre + (to * e).toFixed(dec) + suf;
        if (f < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    // Re-query each scroll so it animates the current (possibly re-mounted) nodes.
    const check = () => {
      document.querySelectorAll<HTMLElement>(".cnt").forEach((el) => {
        if (el.dataset.counted) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) { el.dataset.counted = "1"; animate(el); }
      });
      // safeguard: ensure the kv.mp4 band autoplays
      const vv = document.querySelector<HTMLVideoElement>(".vbframe video");
      if (vv && vv.paused) { vv.muted = true; vv.play().catch(() => {}); }
    };
    // rAF 코얼레싱 — 스크롤 이벤트마다가 아니라 프레임당 1회만 실행
    let ticking = false;
    const onCheck = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; check(); }); };
    window.addEventListener("scroll", onCheck, { passive: true });
    window.addEventListener("resize", onCheck);
    check();
    return () => { window.removeEventListener("scroll", onCheck); window.removeEventListener("resize", onCheck); };
  }, [lang, domEpoch]);
  // inquiry form → /api/contact
  useEffect(() => {
    const tt = lang === "en" ? EN : KO;
    (window as unknown as Record<string, unknown>).__oaInquiry = (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const val = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() || "";
      const btn = form.querySelector(".ctsubmit") as HTMLButtonElement | null;
      const payload = { name: val("i_name"), organization: val("i_org"), country: val("i_country"), email: val("i_email"), phone: val("i_phone"), message: val("i_msg") };
      const orig = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = tt.ct_sending; }
      fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        .then((r) => { if (!r.ok) throw new Error("bad"); form.reset(); alert(tt.ct_done); })
        .catch(() => alert(tt.ct_err))
        .finally(() => { if (btn) { btn.disabled = false; btn.textContent = orig; } });
      return false;
    };
  }, [lang]);
  // scroll-driven intro: orbit the camera + reveal panels as the user scrolls
  useEffect(() => {
    const kf = [[15, 80, 154], [28, 84, 50], [58, 90, 134], [8, 77, 118]];
    // camera-target per stage: stage 1 pans to (and zooms into) the right gripper
    const tg = [[0, 386.5, -125], [155, 205, -120], [0, 386.5, -125], [0, 386.5, -125]];
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;
    // Re-query each frame so it stays correct even if the inline HTML re-mounts.
    const onScroll = () => {
      const intro = document.querySelector<HTMLElement>(".intro");
      const mv = document.getElementById("introMV");
      const panels = Array.from(document.querySelectorAll<HTMLElement>(".ipanel"));
      if (!intro || !mv || !panels.length) return;
      if (window.innerWidth < 821) { panels.forEach((pl, i) => pl.classList.toggle("on", i === 0)); return; }
      const total = intro.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -intro.getBoundingClientRect().top / total)) : 0;
      const seg = p * (kf.length - 1);
      const i = Math.min(kf.length - 2, Math.floor(seg));
      const f = seg - i;
      const th = lerp(kf[i][0], kf[i + 1][0], f), ph = lerp(kf[i][1], kf[i + 1][1], f), rad = lerp(kf[i][2], kf[i + 1][2], f);
      mv.setAttribute("camera-orbit", `${th.toFixed(1)}deg ${ph.toFixed(1)}deg ${rad.toFixed(1)}%`);
      const tx = lerp(tg[i][0], tg[i + 1][0], f), ty = lerp(tg[i][1], tg[i + 1][1], f), tz = lerp(tg[i][2], tg[i + 1][2], f);
      mv.setAttribute("camera-target", `${tx.toFixed(1)}m ${ty.toFixed(1)}m ${tz.toFixed(1)}m`);
      const active = Math.min(panels.length - 1, Math.floor(p * panels.length));
      panels.forEach((pl, idx) => pl.classList.toggle("on", idx === active));
      document.querySelectorAll<HTMLElement>(".istep i").forEach((d, idx) => d.classList.toggle("on", idx === active));
    };
    // rAF 코얼레싱 — 카메라 오빗 갱신을 프레임당 1회로 제한
    let ticking = false;
    const onScrollRaf = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onScrollRaf);
    onScroll();
    const t0 = setTimeout(onScroll, 200);
    return () => { clearTimeout(t0); window.removeEventListener("scroll", onScrollRaf); window.removeEventListener("resize", onScrollRaf); };
  }, [lang, domEpoch]);
  // roofing-template inspired: section heading word-fill on scroll + entrance reveals (white/blue)
  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>(".oa .h2"));
    heads.forEach((h) => {
      if (h.dataset.wf) return;
      h.dataset.wf = "1";
      const kids = Array.from(h.childNodes);
      h.textContent = "";
      const addWords = (text: string, cls: string) => {
        text.split(/(\s+)/).forEach((tok) => {
          if (tok === "") return;
          if (/^\s+$/.test(tok)) { h.appendChild(document.createTextNode(tok)); return; }
          const s = document.createElement("span");
          s.className = cls;
          s.textContent = tok;
          h.appendChild(s);
        });
      };
      kids.forEach((k) => {
        if (k.nodeType === 3) addWords(k.textContent || "", "wf");
        else if ((k as HTMLElement).tagName === "EM") addWords(k.textContent || "", "wf wfa");
        else h.appendChild(k);
      });
    });
    const fill = () => {
      // live query — the cached node can be detached by a post-hydration innerHTML re-apply
      const nav = document.querySelector<HTMLElement>(".oa nav");
      if (nav) nav.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.72);
      for (const h of heads) {
        const words = h.querySelectorAll<HTMLElement>(".wf");
        if (!words.length) continue;
        const r = h.getBoundingClientRect();
        const start = window.innerHeight * 0.86, end = window.innerHeight * 0.42;
        const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
        const n = Math.ceil(p * words.length);
        words.forEach((w, i) => w.classList.toggle("on", i < n));
      }
    };
    const rvEls = Array.from(document.querySelectorAll<HTMLElement>(
      ".oa .kicker, .oa .sec > .wrap > .lead, .oa .feat, .oa .d3, .oa .eco, .oa .resgrid, .oa .faqlist, .oa .final .panel, .oa .ctgrid"
    ));
    rvEls.forEach((el) => el.classList.add("rv"));
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rvEls.forEach((el) => io.observe(el));
    let ticking = false;
    const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; fill(); }); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    fill();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); io.disconnect(); };
  }, [lang, domEpoch]);
  // "inside" — live three.js exploded view of the OpenArm 2.0 arm.
  // Drag to rotate; scrolling the sticky section drives the explosion.
  // three.js + the baked part segmentation load lazily as the section approaches.
  useEffect(() => {
    const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
    const isMobile = window.matchMedia("(max-width:820px)").matches;

    let disposed = false, raf = 0, running = false, sceneReady = false, wantRun = false;
    let cleanupScene: (() => void) | null = null;
    let explode = 0, labelOp = 0;

    const start = async () => {
      if (sceneReady || disposed) return;
      sceneReady = true; // guard re-entry; real readiness set at the end
      // query the live DOM at start-time, never earlier: after hydration React can re-apply the
      // section's innerHTML, silently detaching any nodes captured when the effect first ran
      // (the scene then renders into a ghost canvas — the root cause of the "3D never starts
      // until a reload" bug). The render loop watches isConnected and re-runs start() if the
      // nodes get swapped again.
      const wrap = document.querySelector<HTMLElement>(".oa .seqwrap");
      const stage = document.querySelector<HTMLElement>(".oa .seqstage");
      const canvas = stage?.querySelector<HTMLCanvasElement>(".seq3d");
      const ph = stage?.querySelector<HTMLElement>(".seqph");
      const labelBox = stage?.querySelector<HTMLElement>(".seqlabels3d");
      const spFill = stage?.querySelector<HTMLElement>(".sp-fill");
      const spDot = stage?.querySelector<HTMLElement>(".sp-dot");
      if (!wrap || !stage || !canvas) { sceneReady = false; return; }
      const THREE = await import("three");
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const bin = await fetch("/models/arm-exploded.bin").then((r) => r.arrayBuffer());
      if (disposed) return;

      const dv = new DataView(bin);
      if (dv.getUint32(0, true) !== 0x4f414558) return;
      const V = dv.getUint32(8, true), T = dv.getUint32(12, true), P = dv.getUint32(16, true);
      let o = 24;
      const pos = new Float32Array(bin, o, V * 3); o += V * 12;
      const disp = new Float32Array(bin, o, V * 3); o += V * 12;
      const pid = new Uint16Array(bin, o, V); o += (V * 2 + 3) & ~3;
      const idx = new Uint32Array(bin, o, T * 3);

      // per-part centroid + displacement, for projecting the callout tags
      const pc = new Float32Array(P * 3), pcn = new Float32Array(P), pdsp = new Float32Array(P * 3);
      for (let i = 0; i < V; i++) {
        const g = pid[i];
        pc[g * 3] += pos[i * 3]; pc[g * 3 + 1] += pos[i * 3 + 1]; pc[g * 3 + 2] += pos[i * 3 + 2]; pcn[g]++;
        pdsp[g * 3] = disp[i * 3]; pdsp[g * 3 + 1] = disp[i * 3 + 1]; pdsp[g * 3 + 2] = disp[i * 3 + 2];
      }
      for (let g = 0; g < P; g++) { const n = pcn[g] || 1; pc[g * 3] /= n; pc[g * 3 + 1] /= n; pc[g * 3 + 2] /= n; }

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(32, 1, 1, 20000);
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      // studio environment for metallic reflections (procedural, no asset download)
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      const d1 = new THREE.DirectionalLight(0xffffff, 1.1); d1.position.set(500, 900, 700); scene.add(d1);
      const d2 = new THREE.DirectionalLight(0x9fc0ff, 0.4); d2.position.set(-600, 200, -500); scene.add(d2);

      // hide the detached mount plate + stray fasteners that float free of the isolated gripper assembly
      const HIDDEN = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 19, 20, 21]);
      let index = idx;
      if (HIDDEN.size) {
        const keep: number[] = [];
        for (let f = 0; f < T; f++) {
          const a = idx[f * 3];
          if (!HIDDEN.has(pid[a])) keep.push(a, idx[f * 3 + 1], idx[f * 3 + 2]);
        }
        index = new Uint32Array(keep);
      }
      const raw = new THREE.BufferGeometry();
      raw.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      raw.setAttribute("adisp", new THREE.BufferAttribute(disp, 3));
      raw.setIndex(new THREE.BufferAttribute(index, 1));
      // the GLB carries no normals — naive smooth normals over the welded soup look crumpled.
      // Creased normals keep curved faces (motor drums) smooth while machined edges stay crisp.
      const { toCreasedNormals } = await import("three/examples/jsm/utils/BufferGeometryUtils.js");
      const geom = toCreasedNormals(raw, Math.PI / 5);
      raw.dispose();

      const uEx = { value: 0 };
      const mat = new THREE.MeshStandardMaterial({ color: 0x99a3b2, metalness: 0.55, roughness: 0.42 });
      mat.onBeforeCompile = (sh) => {
        sh.uniforms.uEx = uEx;
        sh.vertexShader = "attribute vec3 adisp;uniform float uEx;\n" + sh.vertexShader
          .replace("#include <begin_vertex>", "vec3 transformed = position + adisp * uEx;");
      };
      const mesh = new THREE.Mesh(geom, mat); scene.add(mesh);

      geom.computeBoundingBox();
      const bb = geom.boundingBox!;
      const ctr3 = bb.getCenter(new THREE.Vector3());
      // bounding-sphere radius at rest and at full explode, so the camera can be pulled
      // back dynamically — the assembly never overflows the canvas at any aspect or explode level
      const EXPLODE_MAX = 1.0;
      const FRAME_MARGIN = 1.15; // >1 = breathing room; the bounding sphere already guards against overflow at any rotation
      const posA = geom.attributes.position, dspA = geom.attributes.adisp;
      let rAsm2 = 0, rFull2 = 0;
      for (let i = 0; i < posA.count; i++) {
        const dx = posA.getX(i) - ctr3.x, dy = posA.getY(i) - ctr3.y, dz = posA.getZ(i) - ctr3.z;
        rAsm2 = Math.max(rAsm2, dx * dx + dy * dy + dz * dz);
        const ex = dx + dspA.getX(i) * EXPLODE_MAX, ey = dy + dspA.getY(i) * EXPLODE_MAX, ez = dz + dspA.getZ(i) * EXPLODE_MAX;
        rFull2 = Math.max(rFull2, ex * ex + ey * ey + ez * ez);
      }
      const rAsm = Math.sqrt(rAsm2), rFull = Math.sqrt(rFull2);

      const controls = new OrbitControls(cam, canvas);
      controls.enableZoom = false; controls.enablePan = false; controls.rotateSpeed = 0.75;
      controls.autoRotate = !isMobile; controls.autoRotateSpeed = 0.55;
      controls.target.copy(ctr3);
      // initial 3/4 side view direction; distance is driven by fitCamera()
      cam.position.set(ctr3.x + 0.96, ctr3.y + 0.41, ctr3.z + 1.07);
      // fit the current explode state to the viewport by forcing the orbit distance.
      // binds on whichever FOV is tighter (vertical, or horizontal on narrow viewports).
      const fitCamera = () => {
        const R = rAsm + (rFull - rAsm) * Math.min(1, uEx.value / EXPLODE_MAX);
        const fovV = cam.fov * Math.PI / 180;
        const fovH = 2 * Math.atan(Math.tan(fovV / 2) * cam.aspect);
        const dist = (R / Math.sin(Math.min(fovV, fovH) / 2)) * FRAME_MARGIN;
        controls.minDistance = controls.maxDistance = dist;
      };
      fitCamera();
      controls.update();

      // callout tags sit at the stage edges (off the model); a dashed leader arrows in to each part
      const svg = labelBox?.querySelector<SVGSVGElement>(".seqleaders") || null;
      const SLOTS: Record<number, { side: "L" | "R"; ty: number }> = {
        17: { side: "L", ty: 0.70 }, // gripper end
        39: { side: "R", ty: 0.52 }, // camera
        52: { side: "R", ty: 0.20 }, // DAMIAO motor
      };
      const anchors = (labelBox ? Array.from(labelBox.querySelectorAll<HTMLElement>(".tag3")) : []).map((el) => {
        const id = parseInt(el.dataset.part || "-1", 10);
        const slot = SLOTS[id] || { side: "R" as const, ty: 0.5 };
        el.classList.toggle("rgt", slot.side === "R");
        let line: SVGLineElement | null = null;
        if (svg) {
          line = document.createElementNS("http://www.w3.org/2000/svg", "line");
          line.setAttribute("marker-end", "url(#oaArrow)");
          svg.appendChild(line);
        }
        return { el, id, side: slot.side, ty: slot.ty, line, connX: 0, connY: 0 };
      });
      const v3 = new THREE.Vector3();
      let userInteracting = false;
      controls.addEventListener("start", () => { userInteracting = true; controls.autoRotate = false; });
      controls.addEventListener("end", () => { userInteracting = false; });

      const readP = () => {
        const total = wrap.offsetHeight - window.innerHeight;
        return total > 0 ? clamp01(-wrap.getBoundingClientRect().top / total) : 0;
      };
      const applyScroll = () => {
        const p = readP();
        const q = clamp01((p - 0.14) / 0.72); // 0 = assembled, 1 = fully scrolled
        explode = q; // full spread — the baked disps are collision-relaxed for no overlap at 1.0
        labelOp = clamp01((q - 0.86) / 0.12); // tags fade in only once the parts have settled apart
        if (!userInteracting && p < 0.16) controls.autoRotate = !isMobile;
        if (p > 0.22) controls.autoRotate = false;
      };
      const placeTags = () => { // pin each tag to its edge slot and cache the leader start point
        const h = canvas.clientHeight, cr = canvas.getBoundingClientRect();
        for (const a of anchors) {
          a.el.style.top = (a.ty * h) + "px";
          a.el.style.transform = "translateY(-50%)";
          if (a.side === "L") { a.el.style.left = "6px"; a.el.style.right = "auto"; }
          else { a.el.style.right = "6px"; a.el.style.left = "auto"; }
          const r = a.el.getBoundingClientRect();
          a.connX = (a.side === "L" ? r.right : r.left) - cr.left;
          a.connY = (r.top + r.height / 2) - cr.top;
        }
      };
      const resize = () => {
        const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
        renderer.setSize(w, h, false);
        cam.aspect = w / h; cam.updateProjectionMatrix();
        placeTags();
      };
      const drawLeaders = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        for (const a of anchors) {
          let off = a.id < 0 || a.id >= P;
          let sx = 0, sy = 0;
          if (!off) {
            v3.set(
              pc[a.id * 3] + pdsp[a.id * 3] * uEx.value,
              pc[a.id * 3 + 1] + pdsp[a.id * 3 + 1] * uEx.value,
              pc[a.id * 3 + 2] + pdsp[a.id * 3 + 2] * uEx.value,
            ).project(cam);
            off = v3.z > 1;
            sx = (v3.x * 0.5 + 0.5) * w; sy = (-v3.y * 0.5 + 0.5) * h;
          }
          a.el.style.opacity = off ? "0" : String(labelOp);
          if (a.line) {
            a.line.style.opacity = off ? "0" : String(labelOp);
            if (!off) {
              a.line.setAttribute("x1", String(a.connX)); a.line.setAttribute("y1", String(a.connY));
              a.line.setAttribute("x2", String(sx)); a.line.setAttribute("y2", String(sy));
            }
          }
        }
      };
      resize();
      applyScroll();

      const loop = () => {
        if (disposed || !wantRun) { running = false; return; }
        if (!canvas.isConnected) { // DOM was re-applied under us — tear down and re-init on live nodes
          running = false; sceneReady = false;
          if (cleanupScene) { cleanupScene(); cleanupScene = null; }
          gate();
          return;
        }
        raf = requestAnimationFrame(loop);
        uEx.value += (explode - uEx.value) * 0.14;
        // assembled⇄exploded progress rail
        const pct = (Math.min(1, uEx.value) * 100).toFixed(1) + "%";
        if (spFill) spFill.style.height = pct;
        if (spDot) spDot.style.top = pct;
        fitCamera();
        controls.update();
        renderer.render(scene, cam);
        drawLeaders();
      };
      const startLoop = () => { if (running || disposed || !wantRun) return; running = true; raf = requestAnimationFrame(loop); };

      let ticking = false;
      const onScroll = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; applyScroll(); }); };
      const onResize = () => { resize(); applyScroll(); };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      if (ph) ph.style.opacity = "0";
      startLoop();

      cleanupScene = () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        controls.dispose(); geom.dispose(); mat.dispose(); envTex.dispose(); pmrem.dispose(); renderer.dispose();
      };
      // expose loop starter to the IO gate below
      (start as unknown as { _run?: () => void })._run = startLoop;
    };

    // lazy init + render gating: run only while the section is near/in the viewport.
    // scroll-driven rect check instead of IntersectionObserver — the IO occasionally went
    // stale after its initial (non-intersecting) event and never fired again, leaving the
    // scene unstarted until a hard reload.
    const nearViewport = () => {
      const w = document.querySelector<HTMLElement>(".oa .seqwrap");
      if (!w) return false;
      const r = w.getBoundingClientRect();
      return r.bottom > -500 && r.top < window.innerHeight + 500;
    };
    let gateTick = false;
    const gate = () => {
      if (gateTick || disposed) return;
      gateTick = true;
      requestAnimationFrame(() => {
        gateTick = false;
        if (disposed) return;
        const vis = nearViewport();
        wantRun = vis;
        if (vis) {
          start();
          const run = (start as unknown as { _run?: () => void })._run;
          if (run) run();
        }
      });
    };
    window.addEventListener("scroll", gate, { passive: true });
    window.addEventListener("resize", gate);
    gate();

    return () => {
      disposed = true; wantRun = false;
      window.removeEventListener("scroll", gate);
      window.removeEventListener("resize", gate);
      if (raf) cancelAnimationFrame(raf);
      if (cleanupScene) cleanupScene();
    };
  }, [lang]);
  const t = lang === "en" ? EN : KO;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <OaHtml key={lang} html={buildHTML(t, lang === "en" ? "en" : "ko")} />
    </>
  );
}

// The page body is server-rendered HTML adopted on hydration. React keeps no "previous"
// record of adopted dangerouslySetInnerHTML, so ANY re-render of the owner re-applies the
// whole innerHTML — replacing every node the effects have bound to (dead nav color toggle,
// wiped word-fill/reveal setup, 3D scene rendering into a detached canvas). memo() stops
// the div from ever re-rendering; language switches remount it via the key above.
const OaHtml = memo(
  function OaHtml({ html }: { html: string }) {
    return <div className="oa" dangerouslySetInnerHTML={{ __html: html }} />;
  },
  (prev, next) => prev.html === next.html
);
