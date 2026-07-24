"use client";

import { useEffect } from "react";
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
html{scroll-behavior:smooth;scroll-padding-top:84px}
.oa{font-family:var(--sans);background:var(--bg);color:var(--txt);-webkit-font-smoothing:antialiased;line-height:1.6}
.oa *{box-sizing:border-box;margin:0;padding:0}
.oa a{color:inherit;text-decoration:none}
.oa .wrap{max-width:1240px;margin:0 auto;padding:0 32px;position:relative;z-index:1}
.oa .eyebrow{font-family:var(--mono);font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--cy);display:inline-flex;align-items:center;gap:11px;font-weight:500}
.oa .eyebrow::before{content:"";width:24px;height:1px;background:var(--cy)}
.oa .foot{font-size:.62em;color:var(--cy-soft);vertical-align:super;font-weight:600;margin-left:2px;opacity:.85}
.oa .sec{padding:clamp(80px,11vw,150px) 0;position:relative}
.oa .kicker{font-family:var(--mono);font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);margin-bottom:18px;display:flex;align-items:baseline;gap:12px}
.oa .kicker b{color:var(--cy);font-weight:700}
.oa .h2{font-size:clamp(32px,4.6vw,56px);font-weight:850;letter-spacing:-.035em;line-height:1.04;word-break:keep-all;max-width:20ch}
.oa .h2 em{color:var(--cy);font-style:normal;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.oa .lead{margin-top:18px;font-size:17px;color:var(--mut);max-width:58ch;word-break:keep-all;line-height:1.7}

/* nav */
.oa nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.82);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}
.oa .nav-in{max-width:1240px;margin:0 auto;padding:0 32px;height:70px;display:flex;align-items:center;justify-content:space-between}
.oa .logo{font-weight:800;font-size:21px;letter-spacing:-.02em}.oa .logo b{color:var(--cy)}
.oa .nav-links{display:flex;gap:30px;font-size:14px;font-weight:500;color:var(--mut);align-items:center}
.oa .nav-links a{transition:.2s}.oa .nav-links a:hover{color:var(--txt)}
.oa .nav-r{display:flex;align-items:center;gap:12px}
.oa .langbtn{font-family:var(--mono);font-size:12px;font-weight:700;color:var(--txt);border:1px solid var(--line2);background:transparent;padding:8px 13px;border-radius:999px;cursor:pointer;transition:.2s}
.oa .langbtn:hover{border-color:var(--cy);color:var(--cy)}
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
.oa .mfoot .cta{flex:1;justify-content:center;font-size:15px;padding:14px}
@media(max-width:980px){.oa .nav-links{display:none}.oa .hamb{display:flex}.oa .nav-r > .langbtn{display:none}}
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
@media(max-width:980px){
  .oa .hero{min-height:auto;display:block;padding-top:20px}
  .oa .hero-in{padding:8px 32px 0}
  .oa .hero-copy{max-width:none}
  .oa .hero-stage{position:relative;width:100%;height:50vh;right:0;margin-top:14px}
  .oa .hero-fade{display:none}
}
/* ── scroll-driven intro experience ── */
.oa .intro{position:relative;height:440vh;z-index:1}
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
.oa .ibadge{font-family:var(--mono);font-size:12px;letter-spacing:.2em;color:var(--cy);font-weight:600}
.oa .ih{font-size:clamp(32px,4.6vw,56px);font-weight:850;letter-spacing:-.035em;line-height:1.05;max-width:15ch;margin:14px 0 0;word-break:keep-all}
.oa .ispecs{display:flex;gap:34px;flex-wrap:wrap;margin-top:26px}
.oa .ispecs > div{display:flex;flex-direction:column}
.oa .ispecs b{font-family:var(--mono);font-size:clamp(34px,4vw,48px);font-weight:700;color:var(--cy);letter-spacing:-.02em;line-height:1;background:var(--grad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;width:fit-content}
.oa .ispecs span{color:var(--mut);font-family:var(--mono);font-size:13px;margin-top:6px}
.oa .scrollcue{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);z-index:3;font-family:var(--mono);font-size:11px;color:var(--mut);letter-spacing:.16em;display:flex;flex-direction:column;align-items:center;gap:10px}
.oa .sc-bar{width:1px;height:38px;background:rgba(10,13,20,.14);position:relative;overflow:hidden}
.oa .sc-bar::after{content:"";position:absolute;top:0;left:0;width:100%;height:42%;background:var(--cy);animation:scd 1.8s ease-in-out infinite}
@keyframes scd{0%{transform:translateY(-110%)}100%{transform:translateY(260%)}}
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
.oa .ecobadge{display:inline-block;font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--cy);background:rgba(58,86,255,.08);border:1px solid rgba(58,86,255,.22);padding:6px 12px;border-radius:7px;margin-bottom:18px}
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
.oa .tgrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:44px}
.oa .tcard{position:relative;background:var(--card);border:1px solid var(--line);box-shadow:var(--shadow);border-radius:18px;padding:26px 28px;overflow:hidden;transition:.28s}
.oa .tcard::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--cy),var(--cy-deep))}
.oa .tcard:hover{border-color:var(--line2);transform:translateY(-3px);box-shadow:0 20px 56px rgba(10,13,20,.10)}
.oa .tnum{position:absolute;top:22px;right:26px;font-family:var(--mono);font-size:13px;color:var(--line2);font-weight:700}
.oa .tlabel{font-family:var(--mono);font-size:11px;letter-spacing:.14em;color:var(--mut);text-transform:uppercase;margin-bottom:20px}
.oa .tflow{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.oa .tside{display:flex;align-items:center;gap:10px;flex:1;min-width:0}
.oa .tside b{display:block;font-size:16px;font-weight:800;letter-spacing:-.01em;line-height:1.2;word-break:keep-all}
.oa .tside small{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase}
.oa .tside.diy b{color:#6e7787}.oa .tside.diy small{color:#566072}
.oa .tside.pro b{color:var(--txt)}.oa .tside.pro small{color:var(--cy)}
.oa .tx{width:22px;height:22px;border-radius:50%;background:rgba(10,13,20,.06);color:#8a94a3;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0}
.oa .tv{width:22px;height:22px;border-radius:50%;background:var(--cy);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;box-shadow:0 0 14px rgba(58,86,255,.5)}
.oa .tarrow{color:var(--cy);font-weight:700;font-size:18px;flex-shrink:0}
.oa .tdesc{font-size:13px;color:var(--mut);line-height:1.62;word-break:keep-all;padding-top:16px;border-top:1px solid var(--line)}
@media(max-width:820px){.oa .tgrid{grid-template-columns:1fr}.oa .tflow{flex-direction:column;align-items:stretch;gap:10px}.oa .tarrow{transform:rotate(90deg);align-self:center}}
.oa .valuebar{margin-top:22px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;background:linear-gradient(110deg,rgba(58,86,255,.1),rgba(58,86,255,.02));border:1px solid var(--cy-deep);border-radius:18px;padding:26px 32px}
.oa .vbe{font-family:var(--mono);font-size:11px;letter-spacing:.1em;color:var(--cy);font-weight:700;margin-bottom:7px}
.oa .valuebar p{font-size:clamp(17px,2vw,21px);font-weight:800;letter-spacing:-.015em;max-width:42ch;word-break:keep-all}
.oa .tcard .tlabel{padding-right:50px}
.oa .tic{position:absolute;top:20px;right:22px;width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(58,86,255,.08);border:1px solid var(--cy-deep);color:var(--cy)}
.oa .tic svg{width:21px;height:21px}
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

/* notes + footer */
.oa .notes{border-top:1px solid var(--line)}
.oa .notes ul{list-style:none;display:flex;flex-direction:column;gap:8px;padding:30px 0 6px}
.oa .notes li{font-size:12.5px;color:var(--mut);line-height:1.6;font-family:var(--mono)}
.oa .notes li b{color:var(--cy-soft);font-weight:500;margin-right:6px}
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

// transformation-card icons (도입시간·조립·SW·A/S) and reason-card icons (지원·플랫폼·확장)
const TI = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.6 6.1a3.8 3.8 0 0 1-4.9 4.9L4.5 16.2l3.3 3.3 5.2-5.2a3.8 3.8 0 0 0 4.9-4.9l-2.4 2.4-2-.5-.5-2z"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z"/><path d="M9.3 12l1.9 1.9L15 10.2"/></svg>',
];
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
  <a href="/" class="logo">OpenArm<b>.</b></a>
  <div class="nav-links">
    <a href="#features">${t.nav_features}</a>
    <a href="#cell">Cell</a>
    <a href="#ker">KER</a>
    <a href="#why">${t.nav_why}</a>
    <a href="#resources">${t.nav_res}</a>
    <a href="#faq">FAQ</a>
    <a href="#contact">${t.nav_contact}</a>
  </div>
  <div class="nav-r">
    <button class="langbtn" onclick="window.__oaToggleLang&&window.__oaToggleLang()">${lang === "ko" ? "EN" : "한국어"}</button>
    <a href="/store" class="cta">${t.nav_store} →</a>
    <button class="hamb" aria-label="menu" onclick="document.getElementById('mmenu').classList.add('on')"><span></span><span></span><span></span></button>
  </div>
</div></nav>

<div class="mmenu" id="mmenu">
  <button class="mclose" aria-label="close" onclick="document.getElementById('mmenu').classList.remove('on')">×</button>
  <a href="#features" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_features}</a>
  <a href="#cell" onclick="document.getElementById('mmenu').classList.remove('on')">OpenArm Cell</a>
  <a href="#ker" onclick="document.getElementById('mmenu').classList.remove('on')">OpenArm KER</a>
  <a href="#why" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_why}</a>
  <a href="#resources" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_res}</a>
  <a href="#faq" onclick="document.getElementById('mmenu').classList.remove('on')">FAQ</a>
  <a href="#contact" onclick="document.getElementById('mmenu').classList.remove('on')">${t.nav_contact}</a>
  <a href="/openarm-1.1">OpenArm 1.1</a>
  <div class="mfoot">
    <button class="langbtn" onclick="window.__oaToggleLang&&window.__oaToggleLang()">${lang === "ko" ? "EN · English" : "KO · 한국어"}</button>
    <a href="/store" class="cta">${t.nav_store} →</a>
  </div>
</div>

<!-- HERO -->
<section class="intro" id="top">
  <div class="intro-sticky">
    <canvas class="net"></canvas>
    <div class="intro-glow"></div>
    <model-viewer id="introMV" class="intro-mv" src="/models/openarm-2.glb" environment-image="/models/studio-env.png" exposure="1.05" shadow-intensity="0" tone-mapping="aces" interaction-prompt="none" orientation="0deg 90deg 0deg" camera-orbit="15deg 80deg 154%" field-of-view="30deg" disable-zoom disable-tap loading="eager" reveal="auto" alt="OpenArm 2.0"></model-viewer>
    <div class="intro-pool"></div>
    <div class="intro-shade"></div>
    <span class="intro-lab">// OPENARM_2.0 · REALTIME</span>
    <div class="intro-panels">
      <div class="ipanel" data-i="0">
        <span class="eyebrow">${t.hero_eyebrow}</span>
        <h1 class="ititle">OpenArm <b>2.0</b></h1>
        <p class="itag">${t.hero_tag}</p>
        <p class="ilead">${t.hero_lead}</p>
        <div class="hero-cta"><a href="/store" class="btn btn-pri">${t.hero_cta1} →</a><a href="#contact" class="btn btn-ghost">${t.hero_cta2}</a></div>
      </div>
      <div class="ipanel" data-i="1">
        <span class="ibadge">// IN-HAND CAMERA</span>
        <h2 class="ih">${t.f1_t}</h2>
        <p class="ilead">${t.f1_d}</p>
      </div>
      <div class="ipanel" data-i="2">
        <span class="ibadge">// SPECIFICATIONS</span>
        <h2 class="ih">${t.intro_spec_h}</h2>
        <div class="ispecs">
          <div><b>7</b><span>-DOF ×2</span></div>
          <div><b>633</b><span>mm<span class="foot">1</span></span></div>
          <div><b>4.1</b><span>/ 6.0kg<span class="foot">2</span></span></div>
          <div><b>1</b><span>kHz CAN-FD</span></div>
        </div>
      </div>
      <div class="ipanel" data-i="3">
        <span class="ibadge">// PURCHASE</span>
        <h2 class="ih">${t.order_h}</h2>
        <p class="ilead">${t.order_d}</p>
        <div class="hero-cta"><a href="/store" class="btn btn-pri">${t.hero_cta1} →</a><a href="#features" class="btn btn-ghost">${t.intro_explore}</a></div>
      </div>
    </div>
    <div class="scrollcue"><span class="sc-bar"></span>${t.scrollcue}</div>
  </div>
</section>

<!-- SPEC METRICS (count-up) -->
<section class="specs"><div class="specrow">
  <div class="scell"><div class="v">${cnt("7")}<span class="u">-DOF ×2</span></div><div class="l">${t.s_dof}</div></div>
  <div class="scell"><div class="v">${cnt("633", "")}<span class="u">mm</span><span class="foot">1</span></div><div class="l">${t.s_reach}</div></div>
  <div class="scell"><div class="v">${cnt("4.1", "")}<span class="u">/ 6.0kg</span><span class="foot">2</span></div><div class="l">${t.s_pay}</div></div>
  <div class="scell"><div class="v">${cnt("1")}<span class="u">kHz</span></div><div class="l">${t.s_ctrl}</div></div>
  <div class="scell"><div class="v">${cnt("100", "%")}</div><div class="l">${t.s_open}</div></div>
</div></section>

<!-- CORE FEATURES -->
<section class="sec" id="features"><div class="wrap">
  <div class="kicker"><b>01</b> ${t.k_feat}</div>
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

<!-- IN ACTION — kv.mp4 (same key-visual as openarm.dev) -->
<section class="sec vidband">
  <div class="wrap">
    <div class="kicker"><b>▶</b> ${t.act_k}</div>
    <h2 class="h2">${t.act_h}</h2>
  </div>
  <div class="vbframe">
    <video src="/videos/kv.mp4" autoplay muted loop playsinline preload="metadata"></video>
    <span class="vbcap">${t.act_cap}</span>
  </div>
</section>

<!-- HARDWARE / LOOK INSIDE -->
<section class="sec" id="hardware" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="kicker"><b>02</b> ${t.k_hw}</div>
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

<!-- ECOSYSTEM: CELL -->
<section class="sec" id="cell"><div class="wrap">
  <div class="kicker"><b>03</b> ${t.k_eco}</div>
  <h2 class="h2">${t.h_eco}</h2>
  <div class="eco">
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

<!-- ECOSYSTEM: KER -->
<section class="sec" id="ker" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="eco rev">
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

<!-- OFFICIAL REVEAL (YouTube) -->
<section class="sec reveal" id="reveal"><div class="wrap">
  <div class="kicker"><b>▶</b> ${t.rv_k}</div>
  <h2 class="h2">${t.rv_h}</h2>
  <p class="lead">${t.rv_d}</p>
  <div class="ytframe">
    <iframe src="https://www.youtube-nocookie.com/embed/6ZLM6f8kF4Q?rel=0&modestbranding=1" title="OpenArm Official Reveal" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</div></section>

<!-- WHY LIBERTRON -->
<section class="sec why" id="why"><div class="wrap">
  <div class="kicker"><b>04</b> ${t.k_why}</div>
  <h2 class="h2">${t.why_title}</h2>
  <p class="cmplead">${t.why_desc}</p>
  <div class="tgrid">
    ${t.tcards.map((it, i) => `<div class="tcard">
      <div class="tic">${TI[i]}</div>
      <div class="tlabel">${it.label}</div>
      <div class="tflow">
        <div class="tside diy"><span class="tx">✕</span><div><b>${it.ds}</b><small>DIY</small></div></div>
        <div class="tarrow">→</div>
        <div class="tside pro"><span class="tv">✓</span><div><b>${it.ps}</b><small>Devkits</small></div></div>
      </div>
      <p class="tdesc">${it.pd}</p>
    </div>`).join("")}
  </div>
  <div class="valuebar">
    <div><div class="vbe">🤝 ${t.why_pro}</div><p>${t.why_foot}</p></div>
    <a href="/store" class="btn btn-pri">${t.why_cta} →</a>
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

<!-- RESOURCES (open-source ecosystem) -->
<section class="sec res" id="resources"><div class="wrap">
  <div class="kicker"><b>05</b> ${t.k_res}</div>
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

<!-- FAQ (SEO) -->
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

<!-- FINAL CTA -->
<section class="sec final" id="order"><div class="wrap"><div class="panel">
  <span class="eyebrow" style="justify-content:center">${t.order_eyebrow}</span>
  <h2>${t.order_h}</h2>
  <p>${t.order_d}</p>
  <div class="ctas">
    <a href="/store" class="btn btn-pri">${t.order_b1} →</a>
    <a href="/openarm-1.1" class="btn btn-ghost">${t.order_b2}</a>
  </div>
</div></div></section>

<!-- CONTACT -->
<section class="sec" id="contact" style="background:var(--bg2);border-top:1px solid var(--line)"><div class="wrap">
  <canvas class="net"></canvas>
  <div class="kicker"><b>06</b> ${t.k_contact}</div>
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

<section class="notes"><div class="wrap"><ul>
  <li><b>1</b> ${t.note1}</li>
  <li><b>2</b> ${t.note2}</li>
</ul></div></section>

<footer>OPENARM 2.0 · <b>LIBERTRON</b> · ${t.footer}</footer>`;
}

type TCard = { label: string; ds: string; ps: string; pd: string };

const KO = {
  nav_features: "핵심", nav_why: "왜 리버트론", nav_res: "자료", nav_contact: "문의", nav_store: "스토어",
  hero_eyebrow: "Introducing · OpenArm 2.0",
  hero_tag: "피지컬 AI 연구를, <em>누구나 재현할 수 있게.</em>",
  hero_lead: "100% 오픈소스 양팔 로봇암. 더 작아진 그리퍼, 손안의 카메라, 그리고 변수를 잡아주는 Cell까지. 부품 수급부터 세팅까지, 리버트론이 한 번에 준비해 드립니다.",
  hero_cta1: "구성 둘러보기", hero_cta2: "도입 문의", drag: "드래그 · 360°",
  intro_spec_h: "핵심 사양", intro_explore: "자세히 보기", scrollcue: "SCROLL",
  s_dof: "양팔 자유도", s_reach: "도달 거리 (CAD 실측)", s_pay: "정격 · 피크 가반하중", s_ctrl: "CAN-FD 제어", s_open: "오픈소스 CAD·펌웨어",
  k_feat: "Core — 2.0의 핵심", h_feat: "OpenArm 2.0이 <em>특별한 이유</em>",
  feat_lead: "1.1의 아쉬움을 하나하나 다듬었습니다. 강화학습도, 보상학습도 제대로 돌아가는 차세대 플랫폼으로 다시 설계했습니다.",
  f1_t: "컴팩트 그리퍼 + 인핸드 카메라", f1_d: "구동부를 덜어내 더 작고 가벼워진 그리퍼. 손안의 카메라가 집는 순간의 시야를 그대로 담고, 핑거는 작업에 맞춰 바꿔 끼우면 됩니다. 상단에 ZED 스테레오 카메라(권장)를 더하면, 깊이까지 담긴 학습 데이터가 쌓입니다.", f1_tag: "교체형 핑거 · ZED 권장",
  f2_t: "양방향 힘 피드백", f2_d: "리더와 팔로워가 힘을 주고받습니다. 닿고 누르는 감각까지, 손끝 그대로 전해집니다.",
  f3_t: "직관적 텔레오퍼레이션", f3_d: "중력은 알아서 잡아줍니다. 바로 옆에서 손으로 시연하듯, 부드럽고 정밀하게 조작하세요.",
  f4_t: "완전한 오픈소스", f4_d: "CAD도, 펌웨어도, 제어 코드도 전부 공개합니다. ROS2를 그대로 쓰니 개발은 더 빨라집니다.",
  f5_t: "키트 또는 완제품", f5_d: "직접 조립하는 키트, 또는 리버트론이 조립과 테스트까지 마친 완제품. 원하는 방식으로 고르세요.",
  act_k: "In Action — 실제 구동", act_h: "<em>OpenArm 2.0</em>, 실제로 움직이다", act_cap: "// OPENARM 2.0 · 실제 구동 영상",
  k_hw: "Hardware — 손끝으로 살펴보기", h_hw: "직접 돌려보는 <em>2.0 하드웨어</em>",
  hw_lead: "끌어서 360°로 돌려보세요. 손안의 카메라를 품은 본체부터, 데이터셋의 일관성을 잡아주는 캘리브레이션 지그까지.",
  hw1_t: "OpenArm 2.0 · 헤드 카메라", hw1_d: "손안의 카메라를 품은 본체에, 상단 카메라까지 더한 완전한 구성입니다.",
  hw2_t: "캘리브레이션 지그", hw2_d: "그리퍼를 CAD가 정한 정확한 각도에 딱 맞춰 고정합니다. 조립 오차를 바로잡아, 데이터셋을 더 일관되게 유지하도록 돕습니다.",
  k_eco: "Ecosystem — 함께 확장되는 셋업", h_eco: "팔 하나로 끝나지 않습니다",
  cell_badge: "출시 예정 · 10월경 배송", cell_d: "배경도, 조명도, 카메라와 로봇 위치까지 매번 똑같이. 모델을 공정하게 비교하고 자동으로 평가하는 표준 환경, Cell입니다.",
  cell_1t: "표준 환경", cell_1d: "배경·조명·카메라를 고정해 공정하게 비교", cell_2t: "Z축 리프트", cell_2d: "높이를 조절해 다양한 작업을 재현",
  cell_3t: "안전·장기 운용", cell_3d: "침입 감지 센서로 무인 운용까지", cell_4t: "자동 평가", cell_4d: "똑같이 재현되는 셋업으로 모델을 자동 비교",
  ker_badge: "10월 배송 예정 · CAD·BOM 추후", ker_d: "2.0과 똑같은 관절 구조를 그대로 옮긴 무동력 리더암(Kinematic Equivalent Replica). 모터가 없어 가볍고, 오래 잡고 있어도 지치지 않습니다. 텔레오퍼레이션과 티칭 데이터 수집에 제격입니다.",
  ker_1t: "동일 기구학", ker_1d: "2.0과 같은 관절 구조로 1:1 매핑", ker_2t: "무동력", ker_2d: "모터가 없어 가볍고 저렴",
  ker_3t: "무피로 조작", ker_3d: "오래 시연해도 지치지 않음", ker_4t: "데이터 수집", ker_4d: "텔레오퍼레이션·티칭에 제격",
  k_why: "Why Libertron — 리버트론을 고르는 이유",
  why_title: "왜 <em>리버트론</em>일까요?",
  why_desc: "OpenArm은 전 세계에 공개된 오픈소스 프로젝트입니다. 그래서 리버트론의 역할은 분명합니다. 부품을 모으고 맞춰보는 데 드는 <strong>최소 석 달의 준비 과정을, 대신 줄여 드리는 것.</strong> 까다로운 준비는 리버트론에 맡기고, 연구에 더 집중하세요.",
  why_pro: "리버트론 Devkits", why_foot: "들어갈 시간과 리스크까지 따져보면, 결국 가장 합리적인 선택입니다.", why_cta: "스토어에서 견적 받기",
  tcards: [
    { label: "도입 시간", ds: "최소 2~3개월", ps: "받는 즉시 시작", pd: "한 곳에서 바로 배송, 증빙 서류까지 한 번에 챙겨 드립니다." },
    { label: "조립 시간", ds: "최소 180시간", ps: "0시간", pd: "리버트론 엔지니어가 직접 조립해, 완성품으로 보내드립니다." },
    { label: "초기 소프트웨어", ds: "직접 해결", ps: "테스트 끝난 환경", pd: "기본 동작은 확인을 마쳤고, 바로 돌려볼 예제 코드도 함께 드립니다." },
    { label: "유지보수 A/S", ds: "100% 본인 부담", ps: "국내 직접 대응", pd: "투명하고 빠른 B2B 기술 지원. (현재 서비스 지역: 대한민국)" },
  ] as TCard[],
  why_more: "리버트론이라는 파트너",
  why: [
    { t: "처음부터 끝까지 함께", d: "부품 수급과 통관, 조립과 캘리브레이션, 첫 구동까지. 연구를 바로 시작할 수 있는 상태로 건네드립니다." },
    { t: "계속 나아지는 플랫폼", d: "1.1의 경험을 2.0에 담았듯, 펌웨어와 예제, 노하우를 꾸준히 업데이트합니다. 함께 나아갑니다." },
    { t: "확장 가능한 솔루션", d: "Cell, KER, 카메라 패키지까지. 연구 환경 전체를 한 창구에서 넓혀가고, 견적도 한 번에 받으세요." },
  ],
  rv_k: "Reveal — 공식 공개 영상", rv_h: "세상에 처음 공개되던 <em>그 순간</em>",
  rv_d: "리버트론이 함께해 온 OpenArm, 그 시작을 담은 공식 영상입니다. 로봇암 한 대가 연구의 문턱을 어떻게 낮춰왔는지 직접 확인해 보세요.",
  k_res: "Resources — 오픈소스 생태계",
  res_h: "코드도, 문서도, <em>커뮤니티</em>도 — 전부 열려 있습니다",
  res_sub: "OpenArm은 누구나 들여다보고 함께 만들어가는 오픈소스 프로젝트입니다. 하드웨어 CAD부터 펌웨어와 제어 코드, 전 세계 개발자 커뮤니티까지 — 직접 보고, 받아 쓰고, 함께 발전시키세요.",
  res_gh_t: "GitHub 저장소", res_gh_d: "하드웨어 CAD·펌웨어·제어 코드가 전부 공개되어 있습니다. 받아서 빌드하고, 자유롭게 개조하세요.", res_gh_b: "코드 보기",
  res_doc_t: "공식 문서", res_doc_d: "API 레퍼런스와 셋업 가이드, 튜토리얼까지. (영문)", res_doc_b: "문서 읽기",
  res_dc_t: "Discord 커뮤니티", res_dc_d: "전 세계 개발자들과 실시간으로 묻고 답하며 함께 만들어갑니다.", res_dc_b: "서버 참여",
  faq_k: "FAQ — 자주 묻는 질문", faq_h: "자주 묻는 질문 <em>FAQ</em>",
  faq_sub: "OpenArm에 대해 가장 많이 들어오는 질문들입니다.",
  faq: [
    { q: "오픈암(OpenArm)은 기존 산업용 로봇팔과 어떻게 다른가요?", a: "OpenArm은 합리적인 가격으로 협동 로봇을 경험해 볼 수 있는 최고의 스타팅 머신입니다. 고가의 산업용 로봇과 달리 연구에 적합한 스펙으로 가격 거품을 제거했으며, 누구나 쉽게 접근하고 개조할 수 있도록 오픈소스를 기반으로 설계되어 교육, 연구, 프로토타이핑에 최적화되어 있습니다." },
    { q: "파이썬(Python)이나 ROS2로 직접 제어가 가능한가요?", a: "네, 완벽하게 지원합니다! OpenArm은 Python API를 제공하며, C++, ROS2, 웹소켓 등 다양한 환경에서 직접 코딩하여 제어할 수 있습니다. 로봇 공학도나 AI 연구원들이 딥러닝, 강화학습(RL) 모델을 로봇팔에 바로 적용해 볼 수 있는 최고의 플랫폼입니다." },
    { q: "대학교 연구실이나 고등학교 로봇 실습용으로 적합한가요?", a: "최고의 선택입니다. 컴팩트한 사이즈와 가벼운 무게로 좁은 공간에서도 안전하게 실습할 수 있습니다. 또한 직관적인 티칭 펜던트 기능과 오픈소스 특성 덕분에 기초 코딩 교육부터 심화 로봇 역학 연구까지 전천후로 활용 가능합니다." },
    { q: "그리퍼나 카메라 등 액세서리를 추가할 수 있나요?", a: "네, 현재 제공중인 Leader arm과 Follower arm용 그리퍼 이외에 주문형 그리퍼 및 흡착 펌프 등 다양한 엔드 이펙터(End Effector)를 준비 중이며, 옵션으로 제공되는 고성능 Depth 카메라(Intel RealSense D435IF, D455F, D405 등)을 마운트하여 비전 AI 기반의 자율 픽앤플레이스 작업도 쉽게 구현할 수 있습니다." },
    { q: "A/S 및 기술 지원은 어떻게 되나요?", a: "(주)리버트론은 한국에서 직접 제작한 제품을 기반으로, 상담에서 배송, 기술 지원 등 장비 도입의 전 과정에 대한 원스톱 서비스를 제공합니다. 국내는 복잡한 수입 절차 없이 신속하게 공급하며, 해외 고객의 경우에는 FedEx 등 글로벌 물류 네트워크를 통해 안전하고 효율적인 배송을 지원합니다." },
  ],
  order_eyebrow: "Purchase", order_h: "OpenArm 2.0, 지금 만나보세요", order_d: "원하는 구성을 담아 주문하거나, 견적을 받아보세요. 지금 주문하면 8월 중에 받아보실 수 있습니다.",
  order_b1: "스토어로 가기", order_b2: "OpenArm 1.1 보기",
  k_contact: "Contact — 도입 문의", ct_h: "프로젝트를 <em>함께 시작</em>해요",
  ct_sub: "도입 문의나 견적 상담을 남겨주세요. 담당자가 빠르게 연락드립니다.",
  ct_addr: "서울 영등포구 당산로41길 11 SK V1 Center W동 1111호",
  ct_name: "이름", ct_name_ph: "홍길동", ct_org: "소속 / 회사", ct_org_ph: "(주)리버트론 / 학교·연구실 (선택)",
  ct_country: "국가 / 지역", ct_country_ph: "예: 대한민국", ct_email: "이메일", ct_phone: "전화번호", ct_msg: "문의 내용", ct_msg_ph: "도입 수량, 일정, 그 밖에 궁금한 점을 적어주세요.",
  ct_privacy: "개인정보 수집 및 이용에 동의합니다 (필수) — 문의·견적 처리에만 사용하며, 처리가 끝나면 곧바로 파기합니다.",
  ct_btn: "문의 보내기", ct_sending: "보내는 중…", ct_done: "문의가 잘 접수되었습니다. 담당자가 곧 연락드리겠습니다. 감사합니다!", ct_err: "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
  note1: "도달 거리 633mm는 OpenArm CAD 도면에서 실측한 값입니다. (공식 문서에는 공개되지 않은 항목)",
  note2: "정격 4.1kg · 피크 6.0kg 가반하중은 엔드이펙터를 포함한 값입니다. 실제 가반하중은 엔드이펙터 무게만큼 줄어듭니다.",
  footer: "100% 오픈소스 · 연구 · 교육 · 개발용 양팔 로봇 플랫폼",
};

type Dict = typeof KO;

const EN: Dict = {
  nav_features: "Core", nav_why: "Why Libertron", nav_res: "Resources", nav_contact: "Contact", nav_store: "Store",
  hero_eyebrow: "Introducing · OpenArm 2.0",
  hero_tag: "Making physical AI <em>reproducible.</em>",
  hero_lead: "A 100% open-source bimanual humanoid arm. Compact gripper, in-hand camera, and a variable-controlled Cell — supplied one-stop from Korea by Libertron.",
  hero_cta1: "Browse purchase options", hero_cta2: "Get in touch", drag: "Drag · 360°",
  intro_spec_h: "Core specifications", intro_explore: "Explore", scrollcue: "SCROLL",
  s_dof: "DOF per dual arm", s_reach: "Reach (CAD-measured)", s_pay: "Nominal / peak payload", s_ctrl: "CAN-FD control", s_open: "Open-source CAD & firmware",
  k_feat: "Core — what's inside 2.0", h_feat: "What makes <em>OpenArm 2.0</em> different",
  feat_lead: "We refined every rough edge of 1.1 and re-engineered it into a next-generation platform built to run reinforcement and reward learning the way they should.",
  f1_t: "Compact gripper + in-hand camera", f1_d: "Simpler actuation makes the gripper smaller. The in-hand camera captures the moment of grasping, and fingers swap to fit each task. Add the recommended top-down ZED stereo camera and you capture depth-rich training data.", f1_tag: "swappable fingers · ZED recommended",
  f2_t: "Bilateral force feedback", f2_d: "Leader and follower trade force back and forth, conveying the feel of contact and pressure as-is.",
  f3_t: "Intuitive teleoperation", f3_d: "Smooth gravity compensation lets you operate precisely, as if demonstrating the task by hand.",
  f4_t: "Fully open source", f4_d: "CAD, firmware, and control code are all open — ROS2-compatible for rapid development.",
  f5_t: "Kit or pre-built", f5_d: "Get it as a DIY kit, or fully assembled and tested by Libertron's engineers.",
  act_k: "In Action", act_h: "See <em>OpenArm 2.0</em> in motion", act_cap: "// OPENARM 2.0 · REAL FOOTAGE",
  k_hw: "Hardware — explore it yourself", h_hw: "Spin the <em>2.0 hardware</em>",
  hw_lead: "Drag to explore in 360° — from the body with its in-hand camera to the calibration jig that keeps your dataset consistent.",
  hw1_t: "OpenArm 2.0 · head camera", hw1_d: "The full setup — the body with integrated in-hand camera plus the top-down camera.",
  hw2_t: "Calibration jig", hw2_d: "A zero-position jig that locks the gripper to its exact CAD-defined angles, calibrating out assembly errors for a consistent dataset.",
  k_eco: "Ecosystem — an expandable setup", h_eco: "It doesn't end with one arm",
  cell_badge: "Coming soon · ships ~October", cell_d: "A reproducible evaluation cell that keeps background, lighting, cameras, and arm position identical every time — a standard environment for fair, automated model comparison.",
  cell_1t: "Standard environment", cell_1d: "Controls background, lighting, cameras for fair comparison", cell_2t: "Z-axis lift", cell_2d: "Height adjust to reproduce varied tasks",
  cell_3t: "Safe & long-running", cell_3d: "Reach-in safety stop for unattended operation", cell_4t: "Automated evaluation", cell_4d: "Reproducible setup for automatic model comparison",
  ker_badge: "Ships in October · CAD·BOM later", ker_d: "A motorless leader arm with the exact same joint structure as 2.0 (Kinematic Equivalent Replica). No motors means it's light and fatigue-free — ideal for teleoperation and teaching-data collection.",
  ker_1t: "Same kinematics", ker_1d: "Same joints as 2.0 for 1:1 mapping", ker_2t: "Motorless", ker_2d: "Light and affordable without motors",
  ker_3t: "Fatigue-free", ker_3d: "Operate for hours without tiring", ker_4t: "Data collection", ker_4d: "Ideal for teleop and teaching",
  k_why: "Why Libertron — the value",
  why_title: "Why buy from <em>Libertron</em>?",
  why_desc: "OpenArm is an open-source project available worldwide. Libertron's role is simple — we eliminate <strong>the 3+ months and countless trials you'd otherwise waste on sourcing, assembly, and setup</strong>. Now, simply focus on your research.",
  why_pro: "Libertron Devkits", why_foot: "When you factor in time and risk, it's ultimately the most affordable choice.", why_cta: "Get a quote in the store",
  tcards: [
    { label: "Setup time", ds: "2–3 months min.", ps: "Start immediately", pd: "Fast single-vendor delivery with complete documentation" },
    { label: "Assembly", ds: "180+ hours min.", ps: "0 hours", pd: "Fully assembled by Libertron's expert engineers before shipping" },
    { label: "Initial software", ds: "Self troubleshooting", ps: "Pre-tested env", pd: "Basic operation verified; out-of-the-box example code provided" },
    { label: "Maintenance", ds: "100% on you", ps: "Local support (KR)", pd: "Transparent, fast B2B technical support (currently serving South Korea)" },
  ] as TCard[],
  why_more: "Partnering with Libertron",
  why: [
    { t: "End-to-end support", d: "From sourcing and customs to assembly, calibration, and first run — we hand it over ready for research to begin." },
    { t: "A platform that keeps improving", d: "Just as 1.1's field experience shaped 2.0, we keep updating firmware, example code, and know-how alongside you." },
    { t: "An expandable solution", d: "Cell, KER, camera packages — scale your entire research setup and get quotes from a single point of contact." },
  ],
  rv_k: "Reveal — official footage", rv_h: "The moment it was <em>first revealed</em>",
  rv_d: "The official OpenArm reveal that Libertron has been part of. See the story of how one robot arm set out to lower the barrier to research.",
  k_res: "Resources — the open-source ecosystem",
  res_h: "Code, docs, and a <em>community</em> — all open",
  res_sub: "OpenArm is an open-source project anyone can inspect and build on. From hardware CAD to firmware and control code to a worldwide developer community — explore it, use it, and help it grow.",
  res_gh_t: "GitHub repository", res_gh_d: "Hardware CAD, firmware, and control code are all public. Clone it, build it, and modify it freely.", res_gh_b: "View code",
  res_doc_t: "Official docs", res_doc_d: "API reference, setup guides, and tutorials. (English)", res_doc_b: "Read docs",
  res_dc_t: "Discord community", res_dc_d: "Ask, answer, and build together with developers around the world in real time.", res_dc_b: "Join server",
  faq_k: "FAQ — frequently asked", faq_h: "Frequently Asked <em>Questions</em>",
  faq_sub: "Here are the most common questions about the OpenArm robotic arm.",
  faq: [
    { q: "How is OpenArm different from existing industrial robotic arms?", a: "OpenArm is the ultimate starting machine to experience collaborative robots at a reasonable price. Unlike expensive industrial robots, we eliminated price bubbles while keeping research-grade specifications. It is comprehensively designed based on open-source so anyone can easily access and modify it, making it optimized for education, research, and prototyping." },
    { q: "Can I control it directly using Python or ROS2?", a: "Yes, absolutely! OpenArm provides a Python API and can be directly coded and controlled in various environments including C++, ROS2, and WebSockets. It is the best platform for robotics students or AI researchers who want to quickly deploy deep learning and reinforcement learning (RL) models onto a physical robot arm." },
    { q: "Is it suitable for university labs or high school robotics courses?", a: "It is the best choice. With its compact size and light weight, you can safely experiment even in tight spaces. Thanks to its intuitive teaching pendant functionality and open-source nature, it can be utilized in all environments from basic coding education to advanced robotics dynamics research." },
    { q: "Can I attach accessories like grippers or cameras?", a: "Yes, beyond the standard grippers for the Leader and Follower arms, we are expanding our lineup to include custom grippers, suction pumps, and various end effectors. With optional high-performance depth cameras (e.g., Intel RealSense D435i, D455, D405), vision AI-based autonomous pick-and-place tasks can be implemented with ease." },
    { q: "How does after-sales and technical support work?", a: "Libertron provides a one-stop solution covering the entire process of equipment adoption from consultation and delivery to technical support based on products manufactured in Korea. For customers in Korea, we ensure fast and seamless supply without complex import procedures. For international customers, products are delivered safely and efficiently through global logistics partners such as FedEx." },
  ],
  order_eyebrow: "Purchase", order_h: "Meet OpenArm 2.0 — available now", order_d: "Add the configuration you need and order, or request a quote. Order now to receive it by mid-August.",
  order_b1: "Browse the store", order_b2: "View OpenArm 1.1",
  k_contact: "Contact — get in touch", ct_h: "Let's <em>start</em> your project",
  ct_sub: "Leave an inquiry or quote request and our team will get back to you shortly.",
  ct_addr: "Room 1111, SK V1 Center W, 11 Dangsan-ro 41-gil, Yeongdeungpo-gu, Seoul",
  ct_name: "Name", ct_name_ph: "Jane Doe", ct_org: "Organization / Company", ct_org_ph: "Acme Inc. / Lab (optional)",
  ct_country: "Country / Region", ct_country_ph: "e.g., South Korea", ct_email: "Email", ct_phone: "Phone", ct_msg: "Message", ct_msg_ph: "Quantity, timeline, and any questions.",
  ct_privacy: "I agree to the collection and use of personal data (required) — used only to process your inquiry and quote, then deleted once fulfilled.",
  ct_btn: "Submit inquiry", ct_sending: "Sending…", ct_done: "Your inquiry has been received. Our team will be in touch shortly. Thank you!", ct_err: "Submission failed. Please try again in a moment.",
  note1: "Reach 633mm is measured from the OpenArm CAD drawings (not published in the official docs).",
  note2: "Nominal 4.1kg / peak 6.0kg payload includes the end-effector. Effective payload is reduced by the end-effector's weight.",
  footer: "100% open-source · bimanual robot platform for research · education · development",
};

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__oaToggleLang = toggleLanguage;
  }, [toggleLanguage]);
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
    return () => { s.remove(); };
  }, [lang]);
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
  }, [lang]);
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
  }, [lang]);
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
    };
    // rAF 코얼레싱 — 카메라 오빗 갱신을 프레임당 1회로 제한
    let ticking = false;
    const onScrollRaf = () => { if (ticking) return; ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); };
    window.addEventListener("scroll", onScrollRaf, { passive: true });
    window.addEventListener("resize", onScrollRaf);
    onScroll();
    const t0 = setTimeout(onScroll, 200);
    return () => { clearTimeout(t0); window.removeEventListener("scroll", onScrollRaf); window.removeEventListener("resize", onScrollRaf); };
  }, [lang]);
  const t = lang === "en" ? EN : KO;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="oa" key={lang} dangerouslySetInnerHTML={{ __html: buildHTML(t, lang === "en" ? "en" : "ko") }} />
    </>
  );
}
