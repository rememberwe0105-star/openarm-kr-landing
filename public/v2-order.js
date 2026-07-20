(function(){if(!document.querySelector('script[data-mv]')){var m=document.createElement('script');m.type='module';m.src='https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';m.setAttribute('data-mv','1');document.head.appendChild(m);}})();

(function(){
  var EN = (window.__lang==='en');
  var T = EN ? {empty:'Your cart is empty',est:'Est.',tba:'TBA',inquire:'Inquire',total:'Total',tbd:'Price TBA',quote:'On request',addFirst:'Please add a configuration first.',sending:'Sending…',done:'Pre-order received. Our team will be in touch shortly. Thank you!',err:'Submission failed. Please try again in a moment.',org:'Organization',cam:'OpenArm 2.0 + Top stereo camera'}
              : {empty:'담긴 구성이 없습니다',est:'예상가',tba:'가격 미정',inquire:'문의',total:'합계',tbd:'가격 문의',quote:'문의',addFirst:'구성을 먼저 담아주세요.',sending:'전송 중…',done:'사전예약이 접수되었습니다. 담당자가 곧 연락드리겠습니다. 감사합니다!',err:'전송에 실패했습니다. 잠시 후 다시 시도해주세요.',org:'소속/회사',cam:'OpenArm 2.0 + 상단 스테레오 카메라'};
  var cart=[];
  function fmt(n){return '$'+n.toLocaleString();}
  function add(name,price,cam){var label=name,p=price;if(cam){p=price+800;label=name+(EN?' + ZED top stereo camera':' + ZED 상단 스테레오 카메라');}cart.push({name:label,price:p});render();openDrawer();}
  function rm(i){cart.splice(i,1);render();}
  function render(){
    var c=document.getElementById('cnt');if(!c)return;c.textContent=cart.length;c.style.display=cart.length?'flex':'none';
    var box=document.getElementById('ditems');if(!box)return;
    if(!cart.length){box.innerHTML='<div class="dempty">'+T.empty+'</div>';}
    else{box.innerHTML=cart.map(function(it,i){return '<div class="di"><div><div class="dn">'+it.name+'</div></div><div style="display:flex;align-items:center"><span class="dp">'+T.quote+'</span><span class="drm" onclick="rm('+i+')">×</span></div></div>';}).join('');}
    document.getElementById('dtot').textContent=cart.length?T.quote:'—';
  }
  function openDrawer(){document.getElementById('drawer').classList.add('on');document.getElementById('ov').classList.add('on');}
  function closeDrawer(){document.getElementById('drawer').classList.remove('on');document.getElementById('ov').classList.remove('on');}
  function closeAll(){closeDrawer();var m=document.getElementById('modal');if(m)m.classList.remove('on');}
  function openModal(){if(!cart.length){alert(T.addFirst);return;}var s=document.getElementById('msummary');s.innerHTML=cart.map(function(it){return '<div class="mrow"><span>'+it.name+'</span><span>'+T.quote+'</span></div>';}).join('')+'<div class="mrow" style="border-top:1px solid var(--line);margin-top:6px;padding-top:8px;color:var(--txt);font-weight:800"><span>'+T.total+'</span><span style="color:var(--cyan)">'+T.quote+'</span></div>';document.getElementById('modal').classList.add('on');}
  function submitForm(e){
    e.preventDefault();
    if(!cart.length){alert(T.addFirst);return false;}
    var form=e.target,btn=form.querySelector('.submit');
    var v=function(id){var el=document.getElementById(id);return el?el.value.trim():'';};
    var org=v('f_org'),msg=v('f_msg');
    var requests=(org?T.org+': '+org+'\n':'')+msg;
    var items=cart.map(function(it){return {name:it.name,quantity:1,price:it.price};});
    var payload={source:EN?'OpenArm 2.0 Pre-order':'OpenArm 2.0 사전예약',contactInfo:{name:v('f_name'),country:v('f_country'),email:v('f_email'),phone:v('f_phone'),requests:requests},cartItems:items};
    var orig=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent=T.sending;}
    fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
      .then(function(res){if(!res.ok)throw new Error('bad');closeAll();cart=[];render();form.reset();alert(T.done);})
      .catch(function(){alert(T.err);})
      .then(function(){if(btn){btn.disabled=false;btn.textContent=orig;}});
    return false;
  }
  window.add=add;window.rm=rm;window.openDrawer=openDrawer;window.closeDrawer=closeDrawer;window.closeAll=closeAll;window.openModal=openModal;window.submitForm=submitForm;
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeAll();});
  render();
  var cv=document.getElementById('net');
  if(cv){var cx=cv.getContext('2d'),W,H,P=[];function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;}rs();addEventListener('resize',rs);
    for(var i=0;i<Math.min(70,Math.floor(innerWidth/20));i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35});
    var mp={x:-999,y:-999};addEventListener('mousemove',function(e){mp.x=e.clientX;mp.y=e.clientY;});
    function draw(){if(!document.body.contains(cv))return;cx.clearRect(0,0,W,H);for(var i=0;i<P.length;i++){var p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;cx.beginPath();cx.arc(p.x,p.y,1.3,0,6.28);cx.fillStyle='rgba(0,200,255,.5)';cx.fill();}
      for(var a=0;a<P.length;a++)for(var b=a+1;b<P.length;b++){var dx=P[a].x-P[b].x,dy=P[a].y-P[b].y,d=dx*dx+dy*dy;if(d<15000){cx.strokeStyle='rgba(0,200,255,'+(.14*(1-d/15000))+')';cx.lineWidth=1;cx.beginPath();cx.moveTo(P[a].x,P[a].y);cx.lineTo(P[b].x,P[b].y);cx.stroke();}}
      for(var k=0;k<P.length;k++){var ex=P[k].x-mp.x,ey=P[k].y-mp.y,ed=ex*ex+ey*ey;if(ed<28000){cx.strokeStyle='rgba(0,200,255,'+(.45*(1-ed/28000))+')';cx.lineWidth=1;cx.beginPath();cx.moveTo(P[k].x,P[k].y);cx.lineTo(mp.x,mp.y);cx.stroke();}}
      requestAnimationFrame(draw);}
    draw();}

  var grip=document.getElementById("grip");
  if(grip){var dot=document.getElementById("dot"),jawL=document.getElementById("jawL"),jawR=document.getElementById("jawR");
    var gmx=innerWidth/2,gmy=innerHeight/2,ggx=gmx,ggy=gmy,gt=0,grab=0,grabT=0;
    addEventListener("mousemove",function(e){gmx=e.clientX;gmy=e.clientY;});
    addEventListener("mousedown",function(){grabT=1;});addEventListener("mouseup",function(){grabT=0;});
    (function gloop(){if(!document.body.contains(grip))return;ggx+=(gmx-ggx)*0.16;ggy+=(gmy-ggy)*0.16;gt+=0.05;grab+=(grabT-grab)*0.2;var open=(Math.sin(gt)*0.5+0.5)*3*(1-grab)+grab*-1.5;jawL.setAttribute("transform","translate("+(-open)+",0)");jawR.setAttribute("transform","translate("+(open)+",0)");grip.style.transform="translate("+(ggx-32)+"px,"+(ggy-48)+"px)";if(dot)dot.style.transform="translate("+(gmx-3)+"px,"+(gmy-3)+"px)";requestAnimationFrame(gloop);})();}

  // 제품 GLB 재질: 알루미늄 메탈릭으로 (랜딩과 동일 톤)
  function styleModel(mv){try{var mats=mv.model&&mv.model.materials;if(!mats)return;mats.forEach(function(m){if(m.pbrMetallicRoughness){m.pbrMetallicRoughness.setBaseColorFactor([0.74,0.78,0.83,1.0]);if(m.pbrMetallicRoughness.setMetallicFactor)m.pbrMetallicRoughness.setMetallicFactor(0.9);if(m.pbrMetallicRoughness.setRoughnessFactor)m.pbrMetallicRoughness.setRoughnessFactor(0.32);}});}catch(e){}}
  var mvTries=0,mvIv=setInterval(function(){var mvs=document.querySelectorAll('model-viewer');if(mvs.length){clearInterval(mvIv);mvs.forEach(function(mv){if(mv.model)styleModel(mv);mv.addEventListener('load',function(){styleModel(mv);});});}if(++mvTries>40)clearInterval(mvIv);},250);
})();