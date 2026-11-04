// @ts-nocheck
/* eslint-disable */
"use client";
import { useEffect, useRef } from "react";

const CORE = `<style>
  :root{
    --bg:#141311; --bg2:#1e1d1b; --ink:#eeedeb; --dim:#a6a199;
    --yellow:#c9a24b; --yellow-hi:#e6c77e; --line:#2c2a26; --ok:#5fd68b;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:var(--bg);color:var(--ink);font-family:'Archivo',system-ui,sans-serif;overflow-x:hidden}

  header{
    position:fixed;top:0;left:0;right:0;z-index:50;display:flex;align-items:center;
    justify-content:space-between;padding:18px 28px;
    background:linear-gradient(#141311d9,#14131100);
  }
  .logo{font-family:'Big Shoulders Display';font-weight:800;font-size:22px;letter-spacing:.06em;text-transform:uppercase}
  .logo span{color:var(--yellow)}
  nav a{color:var(--dim);text-decoration:none;font-size:14px;margin-left:26px}
  nav a:hover,nav a:focus-visible{color:var(--yellow-hi)}
  a:focus-visible,button:focus-visible{outline:2px solid var(--yellow);outline-offset:3px}

  .track{height:470vh;position:relative}
  .stage{
    position:sticky;top:0;height:100vh;overflow:hidden;
    background:
      radial-gradient(120% 90% at 50% 118%, #2c2a27 0%, transparent 55%),
      radial-gradient(85% 60% at 74% -6%, #2b2925 0%, transparent 60%),
      var(--bg);
  }
  .stage svg{position:absolute;inset:0;width:100%;height:100%}

  /* GPU-animated dust (compositor only, zero JS per frame) */
  .mote{
    position:absolute;border-radius:50%;background:#e3e1de;pointer-events:none;
    will-change:transform;
    animation:float var(--dur) ease-in-out infinite alternate;
  }
  @keyframes float{
    from{transform:translate3d(0,0,0)}
    to{transform:translate3d(var(--dx),var(--dy),0)}
  }
  .asmroot.lite .mote{display:none}

  .intro{position:absolute;left:6vw;top:15vh;max-width:540px;z-index:5;transition:opacity .3s,transform .3s}
  .intro h1{font-family:'Big Shoulders Display';font-weight:800;font-size:clamp(40px,6vw,78px);line-height:.94;text-transform:uppercase}
  .intro h1 em{font-style:normal;color:var(--yellow)}
  .intro p{margin-top:16px;color:var(--dim);font-size:16px;max-width:380px}
  .scroll-hint{
    margin-top:28px;display:inline-flex;align-items:center;gap:10px;
    font-family:'IBM Plex Mono';font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:var(--yellow);
  }
  .scroll-hint::after{content:"";width:1px;height:34px;background:var(--yellow);animation:drip 1.6s ease-in-out infinite}
  @keyframes drip{0%{transform:scaleY(.2);transform-origin:top}50%{transform:scaleY(1)}100%{transform:scaleY(.2);transform-origin:bottom}}

  .outro{position:absolute;left:6vw;bottom:13vh;z-index:5;max-width:460px;opacity:0;transform:translateY(16px);transition:opacity .4s,transform .4s}
  .outro.show{opacity:1;transform:none}
  .outro h2{font-family:'Big Shoulders Display';font-weight:800;font-size:clamp(28px,3.4vw,44px);text-transform:uppercase;line-height:1}
  .outro p{color:var(--dim);margin:12px 0 18px}
  .btn{display:inline-block;background:var(--yellow);color:#0c0b0a;border:0;cursor:pointer;font-weight:600;font-size:15px;padding:13px 24px;border-radius:4px;text-decoration:none}
  .btn:hover{background:var(--yellow-hi)}

  .hud{position:absolute;right:4vw;top:50%;transform:translateY(-50%);z-index:5;width:252px}
  .hud .hd{font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.2em;color:var(--dim);text-transform:uppercase;border-bottom:1px solid var(--line);padding-bottom:8px;margin-bottom:10px}
  .hud ul{list-style:none}
  .hud li{display:flex;align-items:baseline;gap:10px;padding:7px 0;font-size:13.5px;color:#68635b;transition:color .25s}
  .hud li .dot{width:8px;height:8px;border-radius:50%;flex:none;align-self:center;border:1px solid #4e4a44;transition:all .25s}
  .hud li .sku{margin-left:auto;font-family:'IBM Plex Mono';font-size:11px;color:#524e48;transition:color .25s}
  .hud li.done{color:var(--ink)}
  .hud li.done .dot{background:var(--ok);border-color:var(--ok);box-shadow:0 0 8px #5fd68b66}
  .hud li.done .sku{color:var(--dim)}

  .meter{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);z-index:5;width:min(420px,70vw);text-align:center}
  .meter .bar{height:2px;background:var(--line);border-radius:2px;overflow:hidden}
  .meter .bar i{display:block;height:100%;width:0;background:var(--yellow)}
  .meter .txt{margin-top:8px;font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.22em;color:var(--dim);text-transform:uppercase}
  .meter .txt b{color:var(--yellow);font-weight:500}

  .catalog{padding:110px 6vw 130px;background:var(--bg2)}
  .catalog .eyebrow{font-family:'IBM Plex Mono';font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--yellow)}
  .catalog h2{font-family:'Big Shoulders Display';font-weight:800;font-size:clamp(34px,4.6vw,58px);text-transform:uppercase;margin:10px 0 8px}
  .catalog>p{color:var(--dim);max-width:520px}
  .grid{margin-top:44px;display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
  .card{border:1px solid var(--line);border-radius:8px;padding:22px;background:#181614;transition:border-color .2s,transform .2s}
  .card:hover{border-color:#4d4943;transform:translateY(-3px)}
  .card .sku{font-family:'IBM Plex Mono';font-size:11px;color:var(--dim)}
  .card h3{font-size:17px;margin:8px 0 4px;font-weight:600}
  .card .fit{font-size:13px;color:var(--dim)}
  .card .row{display:flex;align-items:center;justify-content:space-between;margin-top:18px}
  .card .price{font-family:'IBM Plex Mono';font-size:15px;color:var(--yellow-hi)}
  .card button{background:none;border:1px solid #4b4842;color:var(--ink);border-radius:4px;padding:8px 14px;font-size:13px;cursor:pointer}
  .card button:hover{border-color:var(--yellow);color:var(--yellow-hi)}
  footer{padding:34px 6vw;color:#68635b;font-size:13px;border-top:1px solid var(--line);background:var(--bg2)}

  /* lite mode: cut the floor sheen too */
  .asmroot.lite #sheen{display:none}

  @media (max-width:860px){.hud{display:none}nav{display:none}.intro{top:12vh}}
  @media (prefers-reduced-motion:reduce){.scroll-hint::after{animation:none}.mote{animation:none}}

@media(max-width:760px){.track{height:auto}.stage{position:relative;height:auto;min-height:74vh}.hud{display:none}.intro{position:relative}}</style><div class="asmroot"><div class="track" id="track">
  <div class="stage" id="stageEl">

    <svg viewBox="0 0 1240 780" preserveAspectRatio="xMidYMid meet" aria-label="Excavator assembling from floating parts">
      <defs>
        <linearGradient id="yBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#a6a29d"/><stop offset=".5" stop-color="#7e7972"/><stop offset="1" stop-color="#524f4a"/>
        </linearGradient>
        <linearGradient id="yBody2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#bab7b3"/><stop offset="1" stop-color="#65615b"/>
        </linearGradient>
        <linearGradient id="yBoom" x1="0" y1="0" x2=".4" y2="1">
          <stop offset="0" stop-color="#b3afaa"/><stop offset=".55" stop-color="#7d7871"/><stop offset="1" stop-color="#4b4844"/>
        </linearGradient>
        <linearGradient id="stG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#706b62"/><stop offset="1" stop-color="#292724"/>
        </linearGradient>
        <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f7f6f5"/><stop offset=".5" stop-color="#bfbcb6"/><stop offset="1" stop-color="#8c857a"/>
        </linearGradient>
        <linearGradient id="glassG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e4e3e1" stop-opacity=".92"/>
          <stop offset=".55" stop-color="#979288" stop-opacity=".9"/>
          <stop offset="1" stop-color="#545049" stop-opacity=".95"/>
        </linearGradient>
        <radialGradient id="fog1" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#b5b0a9" stop-opacity=".13"/><stop offset="1" stop-color="#b5b0a9" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="floorGlow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#4d4942" stop-opacity=".7"/><stop offset="1" stop-color="#141311" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f0efee" stop-opacity=".2"/><stop offset="1" stop-color="#f0efee" stop-opacity="0"/>
        </linearGradient>
        <!-- glow without filters: soft radial halo -->
        <radialGradient id="tubeHalo" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#f5f5f4" stop-opacity=".55"/>
          <stop offset=".55" stop-color="#f5f5f4" stop-opacity=".14"/>
          <stop offset="1" stop-color="#f5f5f4" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="vignette" cx=".5" cy=".46" r=".72">
          <stop offset=".62" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#090908" stop-opacity=".85"/>
        </radialGradient>
        <radialGradient id="sheenG" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#6e6a64" stop-opacity=".22"/>
          <stop offset=".5" stop-color="#67625a" stop-opacity=".12"/>
          <stop offset="1" stop-color="#141311" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- ======== atmosphere (fully static: painted once) ======== -->
      <g id="bg">
        <g>
          <ellipse cx="965" cy="82" rx="130" ry="34" fill="url(#tubeHalo)" transform="rotate(27 965 82)"/>
          <rect x="870" y="52" width="190" height="9" rx="4.5" transform="rotate(27 965 56)" fill="#fafaf9"/>
          <ellipse cx="1085" cy="192" rx="105" ry="26" fill="url(#tubeHalo)" transform="rotate(27 1085 192)" opacity=".8"/>
          <rect x="1005" y="168" width="160" height="8" rx="4" transform="rotate(27 1085 172)" fill="#f2f1f0"/>
          <rect x="945" y="308" width="140" height="7" rx="3.5" transform="rotate(27 1015 311)" fill="#ebeae8" opacity=".8"/>
          <ellipse cx="145" cy="90" rx="100" ry="26" fill="url(#tubeHalo)" transform="rotate(23 145 90)" opacity=".6"/>
          <rect x="70" y="66" width="150" height="8" rx="4" transform="rotate(23 145 70)" fill="#f2f1f0"/>
        </g>
        <polygon points="905,60 1010,95 780,700 560,700" fill="url(#beamG)"/>
        <polygon points="120,74 210,105 420,700 250,700" fill="url(#beamG)" opacity=".7"/>
        <ellipse cx="620" cy="360" rx="560" ry="330" fill="url(#fog1)"/>
        <ellipse cx="300" cy="600" rx="430" ry="150" fill="url(#fog1)"/>
        <rect x="0" y="690" width="1240" height="90" fill="#0d0c0b"/>
        <ellipse cx="600" cy="694" rx="520" ry="42" fill="url(#floorGlow)"/>
        <!-- cheap "reflection": warm sheen under the machine instead of a mirrored copy -->
        <ellipse id="sheen" cx="590" cy="712" rx="430" ry="34" fill="url(#sheenG)"/>
      </g>

      <!-- ======== MACHINE (assembled pose; JS explodes each part) ======== -->
      <g id="machine">

        <g id="p-tracks">
          <path d="M498 578 h524 a54 54 0 0 1 0 108 h-524 a54 54 0 0 1 0 -108 z"
                fill="#1c1a18" stroke="#46433d" stroke-width="4"/>
          <path d="M498 578 h524 a54 54 0 0 1 0 108 h-524 a54 54 0 0 1 0 -108 z"
                fill="none" stroke="#0a0a09" stroke-width="14" stroke-dasharray="7 9"/>
          <path d="M498 578 h524 a54 54 0 0 1 0 108 h-524 a54 54 0 0 1 0 -108 z"
                fill="none" stroke="#5e5a52" stroke-width="2" stroke-dasharray="7 9" opacity=".6"/>
          <circle cx="503" cy="632" r="37" fill="url(#stG)" stroke="#181715" stroke-width="4"/>
          <circle cx="503" cy="632" r="20" fill="#252320"/>
          <circle cx="503" cy="632" r="7" fill="#69645b"/>
          <circle cx="1017" cy="632" r="37" fill="url(#stG)" stroke="#181715" stroke-width="4"/>
          <circle cx="1017" cy="632" r="22" fill="#252320"/>
          <g fill="#69645b">
            <circle cx="1017" cy="616" r="3.4"/><circle cx="1031" cy="626" r="3.4"/>
            <circle cx="1026" cy="643" r="3.4"/><circle cx="1008" cy="643" r="3.4"/>
            <circle cx="1003" cy="626" r="3.4"/>
          </g>
          <g fill="url(#stG)" stroke="#181715" stroke-width="3">
            <circle cx="575" cy="654" r="16"/><circle cx="643" cy="654" r="16"/>
            <circle cx="711" cy="654" r="16"/><circle cx="779" cy="654" r="16"/>
            <circle cx="847" cy="654" r="16"/><circle cx="915" cy="654" r="16"/>
          </g>
          <g fill="#252320">
            <circle cx="575" cy="654" r="5"/><circle cx="643" cy="654" r="5"/>
            <circle cx="711" cy="654" r="5"/><circle cx="779" cy="654" r="5"/>
            <circle cx="847" cy="654" r="5"/><circle cx="915" cy="654" r="5"/>
          </g>
          <circle cx="660" cy="596" r="10" fill="url(#stG)" stroke="#181715" stroke-width="3"/>
          <circle cx="860" cy="596" r="10" fill="url(#stG)" stroke="#181715" stroke-width="3"/>
          <rect x="556" y="600" width="408" height="34" rx="10" fill="#312e2a" stroke="#181715" stroke-width="3"/>
          <rect x="700" y="566" width="120" height="38" rx="8" fill="#393631" stroke="#181715" stroke-width="3"/>
        </g>

        <g id="p-house">
          <rect x="706" y="548" width="108" height="18" rx="7" fill="#292724" stroke="#161513" stroke-width="3"/>
          <path d="M560 494 h496 a16 16 0 0 1 16 16 v36 a12 12 0 0 1 -12 12 h-486 l-30 -26 v-22 a16 16 0 0 1 16 -16 z"
                fill="url(#yBody)" stroke="#403e3a" stroke-width="3"/>
          <path d="M546 540 h522" stroke="#484642" stroke-width="4" opacity=".7"/>
          <rect x="588" y="512" width="30" height="10" rx="3" fill="#585550" opacity=".7"/>
          <rect x="640" y="512" width="30" height="10" rx="3" fill="#585550" opacity=".7"/>
          <path d="M868 418 h150 a18 18 0 0 1 18 18 v58 h-186 v-58 a18 18 0 0 1 18 -18 z"
                fill="url(#yBody2)" stroke="#403e3a" stroke-width="3"/>
          <g stroke="#484642" stroke-width="3.4" opacity=".85">
            <line x1="890" y1="436" x2="890" y2="478"/><line x1="908" y1="436" x2="908" y2="478"/>
            <line x1="926" y1="436" x2="926" y2="478"/><line x1="944" y1="436" x2="944" y2="478"/>
            <line x1="962" y1="436" x2="962" y2="478"/>
          </g>
          <rect x="988" y="430" width="40" height="22" rx="5" fill="#393631" stroke="#181715" stroke-width="2.5"/>
          <rect x="1000" y="392" width="12" height="30" rx="5" fill="url(#stG)" stroke="#181715" stroke-width="2.5"/>
          <path d="M872 418 v-26 h146 v26" fill="none" stroke="#e0dfdc" stroke-width="4" stroke-linecap="round"/>
          <line x1="920" y1="392" x2="920" y2="418" stroke="#e0dfdc" stroke-width="3.4"/>
          <line x1="968" y1="392" x2="968" y2="418" stroke="#e0dfdc" stroke-width="3.4"/>
        </g>

        <g id="p-cw">
          <path d="M1056 432 h30 a26 26 0 0 1 26 26 v92 a16 16 0 0 1 -16 16 h-40 z"
                fill="url(#yBody)" stroke="#403e3a" stroke-width="3"/>
          <line x1="1062" y1="458" x2="1108" y2="458" stroke="#484642" stroke-width="3"/>
          <line x1="1062" y1="480" x2="1112" y2="480" stroke="#484642" stroke-width="3"/>
          <circle cx="1088" cy="512" r="7" fill="#484642" opacity=".7"/>
        </g>

        <g id="p-cab">
          <path d="M746 494 v-118 a30 30 0 0 1 30 -30 h74 a18 18 0 0 1 18 18 v130 z"
                fill="url(#yBody2)" stroke="#403e3a" stroke-width="3"/>
          <path d="M756 486 v-108 a22 22 0 0 1 22 -22 h44 v130 z" fill="url(#glassG)" stroke="#322f2b" stroke-width="3"/>
          <line x1="800" y1="356" x2="800" y2="484" stroke="#322f2b" stroke-width="3.4"/>
          <line x1="757" y1="418" x2="822" y2="418" stroke="#322f2b" stroke-width="2.6" opacity=".8"/>
          <rect x="832" y="368" width="26" height="56" rx="5" fill="url(#glassG)" stroke="#322f2b" stroke-width="3"/>
          <rect x="748" y="344" width="118" height="8" rx="4" fill="#484642" opacity=".8"/>
          <rect x="838" y="332" width="14" height="12" rx="3" fill="#393631"/>
          <line x1="762" y1="426" x2="786" y2="398" stroke="#322f2b" stroke-width="2.6"/>
          <line x1="746" y1="380" x2="734" y2="372" stroke="#e0dfdc" stroke-width="3"/>
          <rect x="726" y="362" width="10" height="14" rx="2.5" fill="#393631" stroke="#e0dfdc" stroke-width="1.4"/>
          <line x1="746" y1="494" x2="868" y2="494" stroke="#403e3a" stroke-width="3"/>
        </g>

        <g id="p-boom">
          <path d="M716 512 C 606 448 466 336 356 232 L 306 168 L 354 128 C 464 220 606 348 700 446 Z"
                fill="url(#yBoom)" stroke="#403e3a" stroke-width="4" stroke-linejoin="round"/>
          <path d="M676 468 C 588 396 478 310 384 224" stroke="#524f4a" stroke-width="6" fill="none" opacity=".55"/>
          <path d="M700 490 C 610 430 490 336 380 240" stroke="#e5cfa4" stroke-width="3" fill="none" opacity=".5"/>
          <circle cx="700" cy="492" r="19" fill="#393631" stroke="#181715" stroke-width="3.4"/>
          <circle cx="700" cy="492" r="8" fill="#8c857a"/>
          <circle cx="330" cy="180" r="16" fill="#393631" stroke="#181715" stroke-width="3.4"/>
          <circle cx="330" cy="180" r="6.5" fill="#8c857a"/>
          <circle cx="508" cy="350" r="11" fill="#393631" stroke="#181715" stroke-width="3"/>
          <circle cx="545" cy="342" r="9" fill="#393631" stroke="#181715" stroke-width="3"/>
        </g>

        <g id="p-boomcyl">
          <line x1="758" y1="524" x2="622" y2="430" stroke="#292724" stroke-width="27" stroke-linecap="round"/>
          <line x1="758" y1="524" x2="622" y2="430" stroke="#5e5a52" stroke-width="13" stroke-linecap="round"/>
          <line x1="640" y1="443" x2="622" y2="430" stroke="#8c857a" stroke-width="20" stroke-linecap="round"/>
          <line x1="622" y1="430" x2="512" y2="354" stroke="url(#chrome)" stroke-width="9" stroke-linecap="round"/>
          <circle cx="762" cy="526" r="11" fill="#181715"/>
          <circle cx="508" cy="352" r="9" fill="#181715"/>
          <path d="M756 512 q-16 -20 -6 -40" fill="none" stroke="#181715" stroke-width="5" stroke-linecap="round"/>
        </g>

        <g id="p-arm">
          <path d="M366 142 L 390 168 L 230 470 L 192 492 L 168 468 L 330 156 Z"
                fill="url(#yBody2)" stroke="#403e3a" stroke-width="4" stroke-linejoin="round"/>
          <path d="M356 176 L 214 452" stroke="#524f4a" stroke-width="5" opacity=".55"/>
          <path d="M338 168 L 198 442" stroke="#e5cfa4" stroke-width="2.6" opacity=".5"/>
          <circle cx="192" cy="470" r="13" fill="#393631" stroke="#181715" stroke-width="3.4"/>
          <circle cx="192" cy="470" r="5.5" fill="#8c857a"/>
          <circle cx="314" cy="236" r="9" fill="#393631" stroke="#181715" stroke-width="3"/>
        </g>

        <g id="p-armcyl">
          <line x1="548" y1="344" x2="452" y2="260" stroke="#292724" stroke-width="22" stroke-linecap="round"/>
          <line x1="548" y1="344" x2="452" y2="260" stroke="#5e5a52" stroke-width="10" stroke-linecap="round"/>
          <line x1="452" y1="260" x2="380" y2="196" stroke="url(#chrome)" stroke-width="8" stroke-linecap="round"/>
          <circle cx="550" cy="346" r="9" fill="#181715"/>
          <circle cx="378" cy="194" r="8" fill="#181715"/>
        </g>

        <g id="p-bktcyl">
          <line x1="316" y1="238" x2="266" y2="336" stroke="#292724" stroke-width="18" stroke-linecap="round"/>
          <line x1="316" y1="238" x2="266" y2="336" stroke="#5e5a52" stroke-width="8" stroke-linecap="round"/>
          <line x1="266" y1="336" x2="230" y2="410" stroke="url(#chrome)" stroke-width="7" stroke-linecap="round"/>
          <path d="M230 410 L 226 456 M230 410 L 250 468" stroke="#46433d" stroke-width="9" stroke-linecap="round"/>
          <circle cx="230" cy="410" r="7" fill="#181715"/>
        </g>

        <g id="p-bucket"><path d="M184 476 C182 455 196 440 215 438 L244 440 C257 442 263 453 260 466 L255 480 L194 488 Z" fill="url(#yBody2)" stroke="#2a2826" stroke-width="3" stroke-linejoin="round"/><path d="M196 482 C171 528 165 594 202 640 C226 670 294 674 352 657 L359 644 C327 602 292 546 264 480 Z" fill="url(#yBody)" stroke="#262422" stroke-width="4.5" stroke-linejoin="round"/><path d="M196 482 C171 528 165 594 202 640 C226 670 294 674 352 657 L349 643 C295 657 236 653 213 628 C183 589 186 530 207 489 Z" fill="#3b3936"/><circle cx="196" cy="540" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="195" cy="539" r="1.4" fill="#8a857c"/><circle cx="194" cy="566" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="193" cy="565" r="1.4" fill="#8a857c"/><circle cx="197" cy="592" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="196" cy="591" r="1.4" fill="#8a857c"/><circle cx="205" cy="615" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="204" cy="614" r="1.4" fill="#8a857c"/><circle cx="219" cy="634" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="218" cy="633" r="1.4" fill="#8a857c"/><circle cx="240" cy="647" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="239" cy="646" r="1.4" fill="#8a857c"/><circle cx="265" cy="653" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="264" cy="652" r="1.4" fill="#8a857c"/><circle cx="292" cy="654" r="4.2" fill="#2d2b28" stroke="#151412" stroke-width="1.5"/><circle cx="291" cy="653" r="1.4" fill="#8a857c"/><path d="M264 480 C292 546 327 602 359 644 L378 634 C346 592 311 536 284 472 Z" fill="#7d786f" stroke="#262422" stroke-width="2.5" stroke-linejoin="round"/><path d="M270 486 C296 548 330 602 360 640" fill="none" stroke="#e8e2d6" stroke-opacity=".3" stroke-width="2"/><circle cx="282" cy="520" r="2.6" fill="#2d2b28"/><circle cx="281.4" cy="519.4" r="1" fill="#c9c3b8"/><circle cx="298" cy="556" r="2.6" fill="#2d2b28"/><circle cx="297.4" cy="555.4" r="1" fill="#c9c3b8"/><circle cx="318" cy="592" r="2.6" fill="#2d2b28"/><circle cx="317.4" cy="591.4" r="1" fill="#c9c3b8"/><circle cx="338" cy="624" r="2.6" fill="#2d2b28"/><circle cx="337.4" cy="623.4" r="1" fill="#c9c3b8"/><path d="M226 500 C214 540 215 588 238 618" fill="none" stroke="#262422" stroke-opacity=".55" stroke-width="4" stroke-linecap="round"/><path d="M250 496 C240 540 244 586 266 616" fill="none" stroke="#262422" stroke-opacity=".4" stroke-width="3.5" stroke-linecap="round"/><path d="M342 663 L366 630 L381 639 L357 672 Z" fill="#4f4b46" stroke="#262422" stroke-width="2" stroke-linejoin="round"/><g opacity=".72"><polygon points="373.1,609.4 394.9,606.5 398.6,627.3 377.1,632.0" fill="#55514b" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polygon points="394.9,606.5 407.6,607.3 421.0,610.8 424.5,613.0 421.9,615.9 410.1,621.5 398.6,627.3" fill="#878178" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polyline points="398.5,615.5 418.5,613.4" fill="none" stroke="#3a3733" stroke-opacity=".5" stroke-width="1.4"/><polyline points="397.3,608.6 406.1,609.6 418.2,612.1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g><g opacity=".72"><polygon points="367.1,622.4 388.9,619.5 392.6,640.3 371.1,645.0" fill="#5a5650" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polygon points="388.9,619.5 401.6,620.3 415.0,623.8 418.5,626.0 415.9,628.9 404.1,634.5 392.6,640.3" fill="#8f897f" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polyline points="392.5,628.5 412.5,626.4" fill="none" stroke="#3a3733" stroke-opacity=".5" stroke-width="1.4"/><polyline points="391.3,621.6 400.1,622.6 412.2,625.1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g><g><polygon points="360.1,635.4 381.9,632.5 385.6,653.3 364.1,658.0" fill="#615d56" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polygon points="381.9,632.5 394.6,633.3 408.0,636.8 411.5,639.0 408.9,641.9 397.1,647.5 385.6,653.3" fill="url(#chrome)" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polyline points="385.5,641.5 405.5,639.4" fill="none" stroke="#3a3733" stroke-opacity=".5" stroke-width="1.4"/><polyline points="384.3,634.6 393.1,635.6 405.2,638.1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g><g><polygon points="352.1,648.4 373.9,645.5 377.6,666.3 356.1,671.0" fill="#68645d" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polygon points="373.9,645.5 386.6,646.3 400.0,649.8 403.5,652.0 400.9,654.9 389.1,660.5 377.6,666.3" fill="url(#chrome)" stroke="#262422" stroke-width="2.2" stroke-linejoin="round"/><polyline points="377.5,654.5 397.5,652.4" fill="none" stroke="#3a3733" stroke-opacity=".5" stroke-width="1.4"/><polyline points="376.3,647.6 385.1,648.6 397.2,651.1" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g><circle cx="224" cy="454" r="11" fill="#2b2926" stroke="#151412" stroke-width="3"/><circle cx="224" cy="454" r="5" fill="#b8b3aa"/><circle cx="198" cy="468" r="9" fill="#2b2926" stroke="#151412" stroke-width="3"/><circle cx="198" cy="468" r="4" fill="#b8b3aa"/></g>

        <g id="p-hw1">
          <circle cx="330" cy="180" r="23" fill="none" stroke="#75706a" stroke-width="8.5"/>
          <path d="M312 166 a23 23 0 0 1 30 -6" fill="none" stroke="#e5cfa4" stroke-width="3"/>
        </g>
        <g id="p-hw2">
          <circle cx="192" cy="470" r="17" fill="none" stroke="#75706a" stroke-width="7"/>
          <path d="M180 460 a17 17 0 0 1 22 -4" fill="none" stroke="#e5cfa4" stroke-width="2.6"/>
        </g>
        <g id="p-hw3">
          <rect x="682" y="484" width="36" height="15" rx="7.5" fill="url(#chrome)" stroke="#5e5a52" stroke-width="2"/>
          <line x1="712" y1="484" x2="712" y2="499" stroke="#5e5a52" stroke-width="2"/>
        </g>
        <g id="p-hw4"><path d="M358 124 l11 6.5 v13 l-11 6.5 -11 -6.5 v-13 z" fill="url(#chrome)" stroke="#5e5a52" stroke-width="2"/><circle cx="358" cy="137" r="3.4" fill="#5e5a52"/></g>
        <g id="p-hw5"><path d="M512 340 l9.5 5.5 v11 l-9.5 5.5 -9.5 -5.5 v-11 z" fill="url(#chrome)" stroke="#5e5a52" stroke-width="2"/><circle cx="512" cy="351" r="3" fill="#5e5a52"/></g>
        <g id="p-hw6">
          <path d="M704 470 C 662 420 612 400 562 370 C 532 352 514 330 502 306"
                fill="none" stroke="#141311" stroke-width="7.5" stroke-linecap="round"/>
          <path d="M704 470 C 662 420 612 400 562 370 C 532 352 514 330 502 306"
                fill="none" stroke="#4d4943" stroke-width="3" stroke-linecap="round"/>
        </g>
        <g id="p-hw7">
          <circle cx="700" cy="492" r="27" fill="none" stroke="#75706a" stroke-width="8.5"/>
          <path d="M680 476 a27 27 0 0 1 34 -7" fill="none" stroke="#e5cfa4" stroke-width="3"/>
        </g>
        <g id="p-hw8"><rect x="246" y="322" width="28" height="12" rx="6" fill="url(#chrome)" stroke="#5e5a52" stroke-width="2"/></g>
      </g>

      <rect x="0" y="0" width="1240" height="780" fill="url(#vignette)" pointer-events="none"/>
    </svg>

    <div class="intro" id="intro">
      <h1>Every machine is the sum of its <em>parts</em>.</h1>
      <p>Genuine spare parts for crawler excavators — pins, seals, cylinders, undercarriage and more. Watch it come together.</p>
      <div class="scroll-hint">Scroll to assemble</div>
    </div>

    <div class="outro" id="outro">
      <h2>Fully assembled.<br>Fully in stock.</h2>
      <p>Every component you just watched lock into place is on our shelves, ready to ship.</p>
      <a class="btn" href="#catalog-results">Browse spare parts</a>
    </div>

    <aside class="hud" aria-hidden="true">
      <div class="hd">Assembly sequence</div>
      <ul id="checklist">
        <li data-part="tracks"><span class="dot"></span>Undercarriage<span class="sku">UC-3400</span></li>
        <li data-part="house"><span class="dot"></span>Upper frame<span class="sku">UF-1120</span></li>
        <li data-part="cw"><span class="dot"></span>Counterweight<span class="sku">CW-0870</span></li>
        <li data-part="cab"><span class="dot"></span>Operator cab<span class="sku">CB-2210</span></li>
        <li data-part="boom"><span class="dot"></span>Boom<span class="sku">BM-5540</span></li>
        <li data-part="boomcyl"><span class="dot"></span>Boom cylinder<span class="sku">HC-7031</span></li>
        <li data-part="arm"><span class="dot"></span>Arm / stick<span class="sku">AR-4415</span></li>
        <li data-part="armcyl"><span class="dot"></span>Arm cylinder<span class="sku">HC-7044</span></li>
        <li data-part="bucket"><span class="dot"></span>Bucket<span class="sku">BK-9002</span></li>
        <li data-part="bktcyl"><span class="dot"></span>Bucket linkage<span class="sku">LK-3308</span></li>
        <li data-part="hw"><span class="dot"></span>Pins &amp; hardware<span class="sku">KIT-118</span></li>
      </ul>
    </aside>

    <div class="meter">
      <div class="bar"><i id="meterFill"></i></div>
      <div class="txt">Assembly <b id="meterPct">0%</b></div>
    </div>

  </div>
</div></div>`;

export default function ExcavatorAssembly() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let raf = 0, io: any = null;
    let readScroll = () => {};
    try {
      const root = host.shadowRoot || host.attachShadow({ mode: "open" });
      root.innerHTML = CORE;
      const byId = (id: string) => root.getElementById(id);
      const asmRoot = root.querySelector(".asmroot");
      const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const easeBack = (t: number) => { const c = 1.35; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
      const defs = [
        {id:"p-tracks",key:"tracks",dx:0,dy:210,rot:0,ox:760,oy:632,s:.02,e:.20,drift:5,ease:easeOut},
        {id:"p-house",key:"house",dx:185,dy:-95,rot:5,ox:800,oy:500,s:.10,e:.30,drift:8,ease:easeBack},
        {id:"p-cw",key:"cw",dx:275,dy:-35,rot:11,ox:1080,oy:500,s:.16,e:.36,drift:9,ease:easeBack},
        {id:"p-cab",key:"cab",dx:55,dy:-250,rot:-7,ox:806,oy:420,s:.20,e:.40,drift:9,ease:easeBack},
        {id:"p-boom",key:"boom",dx:-65,dy:-95,rot:-25,ox:700,oy:492,s:.30,e:.54,drift:10,ease:easeBack},
        {id:"p-boomcyl",key:"boomcyl",dx:-135,dy:-175,rot:-14,ox:635,oy:438,s:.42,e:.62,drift:11,ease:easeBack},
        {id:"p-arm",key:"arm",dx:-195,dy:-55,rot:33,ox:330,oy:180,s:.46,e:.66,drift:11,ease:easeBack},
        {id:"p-armcyl",key:"armcyl",dx:-205,dy:-145,rot:21,ox:460,oy:268,s:.54,e:.72,drift:12,ease:easeBack},
        {id:"p-bucket",key:"bucket",dx:-155,dy:115,rot:8,ox:224,oy:454,s:.58,e:.78,drift:12,ease:easeBack},
        {id:"p-bktcyl",key:"bktcyl",dx:-165,dy:-75,rot:-13,ox:280,oy:320,s:.62,e:.80,drift:12,ease:easeBack},
        {id:"p-hw1",key:"hw",dx:-245,dy:-205,rot:225,ox:330,oy:180,s:.72,e:.86,drift:14,ease:easeBack},
        {id:"p-hw2",key:"hw",dx:-265,dy:125,rot:185,ox:192,oy:470,s:.74,e:.88,drift:14,ease:easeBack},
        {id:"p-hw3",key:"hw",dx:155,dy:-265,rot:145,ox:700,oy:492,s:.76,e:.90,drift:14,ease:easeBack},
        {id:"p-hw4",key:"hw",dx:-185,dy:-245,rot:265,ox:358,oy:137,s:.78,e:.92,drift:14,ease:easeBack},
        {id:"p-hw5",key:"hw",dx:125,dy:-305,rot:205,ox:512,oy:348,s:.80,e:.93,drift:14,ease:easeBack},
        {id:"p-hw6",key:"hw",dx:-95,dy:-325,rot:-32,ox:600,oy:380,s:.80,e:.94,drift:10,ease:easeOut},
        {id:"p-hw7",key:"hw",dx:225,dy:-185,rot:165,ox:700,oy:492,s:.82,e:.95,drift:14,ease:easeBack},
        {id:"p-hw8",key:"hw",dx:-305,dy:-65,rot:245,ox:260,oy:328,s:.84,e:.96,drift:14,ease:easeBack}
      ] as any[];
      defs.forEach((d, i) => { d.el = byId(d.id); d.phase = i * 1.7; d.last = ""; d.settled = false; });
      const stage = byId("stageEl");
      if (stage) for (let i = 0; i < 12; i++) {
        const m = document.createElement("div"); m.className = "mote";
        const sz = (1.5 + Math.random() * 2.5);
        m.style.width = m.style.height = sz + "px";
        m.style.left = (5 + Math.random() * 90) + "%";
        m.style.top = (8 + Math.random() * 70) + "%";
        m.style.opacity = (0.05 + Math.random() * 0.14).toFixed(2);
        m.style.setProperty("--dx", ((Math.random() - 0.5) * 46) + "px");
        m.style.setProperty("--dy", ((Math.random() - 0.5) * 30) + "px");
        m.style.setProperty("--dur", (6 + Math.random() * 8) + "s");
        m.style.animationDelay = (-Math.random() * 8) + "s";
        stage.appendChild(m);
      }
      const track = byId("track"), intro = byId("intro"), outro = byId("outro");
      const meterFill = byId("meterFill"), meterPct = byId("meterPct");
      const items: any = {};
      root.querySelectorAll("#checklist li").forEach((li: any) => items[li.dataset.part] = li);
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches || mobile;
      let target = reduced ? 1 : 0, p = -1, lastPct = -1, driftOn = !reduced, active = true;
      const done: any = {};
      readScroll = () => {
        if (!track) return;
        const r = track.getBoundingClientRect();
        target = clamp(-r.top / (track.offsetHeight - window.innerHeight), 0, 1);
      };
      if (!reduced) {
        window.addEventListener("scroll", readScroll, { passive: true } as any);
        window.addEventListener("resize", readScroll);
        readScroll();
      }
      p = target;
      function frame(now: number) {
        if (!active) return;
        p += (target - p) * (reduced ? 1 : 0.16);
        if (Math.abs(target - p) < 0.0005) p = target;
        const t = now / 1000;
        for (const d of defs) {
          const q = clamp((p - d.s) / (d.e - d.s), 0, 1);
          if (q >= 1 && d.settled) continue;
          const e = d.ease(q), k = 1 - e, kd = clamp(k, 0, 1);
          const bobX = driftOn ? Math.sin(t * 0.9 + d.phase) * d.drift * kd : 0;
          const bobY = driftOn ? Math.cos(t * 0.7 + d.phase) * d.drift * kd : 0;
          const str = `translate(${(d.dx * k + bobX).toFixed(1)} ${(d.dy * k + bobY).toFixed(1)}) rotate(${(d.rot * k).toFixed(2)} ${d.ox} ${d.oy})`;
          if (str !== d.last && d.el) { d.el.setAttribute("transform", str); d.last = str; }
          d.settled = (q >= 1);
          const li = items[d.key];
          if (li && d.key !== "hw") {
            if (q >= 1 && !done[d.key]) { li.classList.add("done"); done[d.key] = true; }
            else if (q < 1 && done[d.key]) { li.classList.remove("done"); done[d.key] = false; }
          }
        }
        if (items.hw) items.hw.classList.toggle("done", p > 0.95);
        const pct = Math.round(p * 100);
        if (pct !== lastPct) {
          lastPct = pct;
          if (meterFill) meterFill.style.width = pct + "%";
          if (meterPct) meterPct.textContent = pct + "%";
          if (intro) {
            intro.style.opacity = p < 0.06 ? "1" : String(clamp(1 - (p - 0.06) / 0.06, 0, 1));
            intro.style.transform = `translateY(${(-p * 120).toFixed(0)}px)`;
            intro.style.pointerEvents = p > 0.12 ? "none" : "auto";
          }
          if (outro) outro.classList.toggle("show", p > 0.93);
        }
        raf = requestAnimationFrame(frame);
      }
      io = new IntersectionObserver((en) => { active = en[0].isIntersecting; if (active) raf = requestAnimationFrame(frame); });
      if (track) io.observe(track);
      raf = requestAnimationFrame(frame);
    } catch (err) { /* assembly is decorative; never break the page */ }
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      window.removeEventListener("scroll", readScroll as any);
      window.removeEventListener("resize", readScroll as any);
    };
  }, []);
  return <div ref={hostRef} aria-hidden="true" />;
}
