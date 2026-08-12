// Unified OpenArm Store — cart + order form (Resend via /api/checkout).
// Premium: no canvas/gripper gimmicks. Handles mixed priced/quote items.
(function () {
  if (!document.querySelector('script[data-mv]')) {
    var m = document.createElement('script');
    m.type = 'module';
    m.src = 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';
    m.setAttribute('data-mv', '1');
    document.head.appendChild(m);
  }
})();

(function () {
  var EN = (window.__lang === 'en');
  var T = EN
    ? { empty: 'Your cart is empty', inquire: 'Inquire', total: 'Total', quotePlus: ' + quoted items', addFirst: 'Please add an item first.', sending: 'Sending…', done: 'Order request received. Our team will be in touch shortly. Thank you!', err: 'Submission failed. Please try again in a moment.', org: 'Organization' }
    : { empty: '담긴 제품이 없습니다', inquire: '문의', total: '합계', quotePlus: ' + 견적 품목', addFirst: '제품을 먼저 담아주세요.', sending: '전송 중…', done: '주문 요청이 접수되었습니다. 담당자가 곧 연락드리겠습니다. 감사합니다!', err: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.', org: '소속/회사' };
  var cart = [];
  var CUR = EN ? '$' : '₩';
  function fmt(n) { return CUR + n.toLocaleString(EN ? 'en-US' : 'ko-KR'); }
  function add(name, price) {
    cart.push({ name: name, price: price });
    render(); openDrawer();
  }
  // 2.0 units with an optional KER add-on checkbox. Bundle price = base + KER
  // (a bundle is simply the arm plus a KER leader, no separate SKU).
  function addKer(name, base, ker, chkId) {
    var chk = document.getElementById(chkId);
    if (chk && chk.checked) cart.push({ name: name + ' & KER', price: base + ker });
    else cart.push({ name: name, price: base });
    render(); openDrawer();
  }
  function rm(i) { cart.splice(i, 1); render(); }
  function totals() {
    var sum = 0, hasQuote = false;
    cart.forEach(function (it) { if (it.price > 0) sum += it.price; else hasQuote = true; });
    if (!cart.length) return '—';
    if (sum === 0) return T.inquire;
    return fmt(sum) + (hasQuote ? T.quotePlus : '');
  }
  function priceLabel(p) { return p > 0 ? fmt(p) : T.inquire; }
  function render() {
    var c = document.getElementById('cnt'); if (c) { c.textContent = cart.length; c.style.display = cart.length ? 'flex' : 'none'; }
    var box = document.getElementById('ditems'); if (!box) return;
    if (!cart.length) { box.innerHTML = '<div class="dempty">' + T.empty + '</div>'; }
    else {
      box.innerHTML = cart.map(function (it, i) {
        return '<div class="di"><div class="dn">' + it.name + '</div><div class="di-r"><span class="dp">' + priceLabel(it.price) + '</span><span class="drm" onclick="rm(' + i + ')">×</span></div></div>';
      }).join('');
    }
    var dt = document.getElementById('dtot'); if (dt) dt.textContent = totals();
  }
  // Hide the shared floating contact button while any overlay (cart drawer / order
  // modal / camera modal) is open, so it doesn't overlap the drawer's CTA on mobile.
  function syncFab() {
    var fab = document.getElementById('oaFab');
    if (!fab) return;
    fab.style.display = document.querySelector('#drawer.on, #modal.on, #cammodal.on') ? 'none' : '';
  }
  function openDrawer() { document.getElementById('drawer').classList.add('on'); document.getElementById('ov').classList.add('on'); syncFab(); }
  function closeDrawer() { document.getElementById('drawer').classList.remove('on'); document.getElementById('ov').classList.remove('on'); syncFab(); }
  function closeAll() { closeDrawer(); var m = document.getElementById('modal'); if (m) m.classList.remove('on'); var cm = document.getElementById('cammodal'); if (cm) cm.classList.remove('on'); syncFab(); }
  function openModal() {
    if (!cart.length) { alert(T.addFirst); return; }
    var s = document.getElementById('msummary');
    s.innerHTML = cart.map(function (it) { return '<div class="mrow"><span>' + it.name + '</span><span>' + priceLabel(it.price) + '</span></div>'; }).join('')
      + '<div class="mrow mtot"><span>' + T.total + '</span><span>' + totals() + '</span></div>';
    document.getElementById('modal').classList.add('on');
    syncFab();
  }
  function submitForm(e) {
    e.preventDefault();
    if (!cart.length) { alert(T.addFirst); return false; }
    var form = e.target, btn = form.querySelector('.submit');
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
    var org = v('f_org'), msg = v('f_msg');
    var requests = (org ? T.org + ': ' + org + '\n' : '') + msg;
    var items = cart.map(function (it) { return { name: it.name, quantity: 1, price: it.price }; });
    var payload = { source: EN ? 'OpenArm Store (EN)' : 'OpenArm Store', contactInfo: { name: v('f_name'), country: v('f_country'), email: v('f_email'), phone: v('f_phone'), requests: requests }, cartItems: items };
    var orig = btn ? btn.textContent : ''; if (btn) { btn.disabled = true; btn.textContent = T.sending; }
    fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      .then(function (res) { if (!res.ok) throw new Error('bad'); closeAll(); cart = []; render(); form.reset(); alert(T.done); })
      .catch(function () { alert(T.err); })
      .then(function () { if (btn) { btn.disabled = false; btn.textContent = orig; } });
    return false;
  }
  // ── Camera option modal (chest D435IF/D455F · arm D405) ──
  var camSel = { chest: null, arm: false };
  var CAM_LBL = EN
    ? { d435if: 'D435IF (Chest)', d455f: 'D455F (Chest)', d405: 'D405 ×2 (Arm)', pkg: 'Camera Package' }
    : { d435if: 'D435IF (가슴)', d455f: 'D455F (가슴)', d405: 'D405 ×2 (팔)', pkg: '카메라 패키지' };
  function openCam() { camSel = { chest: null, arm: false }; syncCam(); var m = document.getElementById('cammodal'); if (m) m.classList.add('on'); syncFab(); }
  function closeCam() { var m = document.getElementById('cammodal'); if (m) m.classList.remove('on'); syncFab(); }
  function camView(id) {
    var img = document.getElementById('cam-main-img'); if (img) img.src = '/images/products/' + id + '_camera.png';
    document.querySelectorAll('.cam-thumb').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-cam') === id); });
  }
  function camChest(id) {
    camSel.chest = (camSel.chest === id) ? null : id;
    if (camSel.chest) camView(id);
    syncCam();
  }
  function camArm() { camSel.arm = !camSel.arm; if (camSel.arm) camView('d405'); syncCam(); }
  function syncCam() {
    document.querySelectorAll('.cam-radio').forEach(function (r) { r.classList.toggle('on', r.getAttribute('data-chest') === camSel.chest); });
    var ab = document.getElementById('cam-arm-box'); if (ab) ab.classList.toggle('on', camSel.arm);
    var add = document.getElementById('cam-add'); if (add) add.disabled = !camSel.chest && !camSel.arm;
  }
  function camAdd() {
    if (!camSel.chest && !camSel.arm) return;
    var parts = [];
    if (camSel.chest) parts.push(CAM_LBL[camSel.chest]);
    if (camSel.arm) parts.push(CAM_LBL.d405);
    cart.push({ name: CAM_LBL.pkg + ' — ' + parts.join(' + '), price: 0 });
    render(); closeCam(); openDrawer();
  }

  window.add = add; window.addKer = addKer; window.rm = rm; window.openDrawer = openDrawer; window.closeDrawer = closeDrawer; window.closeAll = closeAll; window.openModal = openModal; window.submitForm = submitForm;
  window.openCam = openCam; window.closeCam = closeCam; window.camView = camView; window.camChest = camChest; window.camArm = camArm; window.camAdd = camAdd;
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
  render();

  // model-viewer aluminum material (matches landing tone)
  function styleModel(mv) { try { var mats = mv.model && mv.model.materials; if (!mats) return; mats.forEach(function (m) { if (m.pbrMetallicRoughness) { m.pbrMetallicRoughness.setBaseColorFactor([0.74, 0.78, 0.83, 1.0]); if (m.pbrMetallicRoughness.setMetallicFactor) m.pbrMetallicRoughness.setMetallicFactor(0.9); if (m.pbrMetallicRoughness.setRoughnessFactor) m.pbrMetallicRoughness.setRoughnessFactor(0.32); } }); } catch (e) {} }
  var tries = 0, iv = setInterval(function () { var mvs = document.querySelectorAll('model-viewer'); if (mvs.length) { clearInterval(iv); mvs.forEach(function (mv) { if (mv.model) styleModel(mv); mv.addEventListener('load', function () { styleModel(mv); }); }); } if (++tries > 40) clearInterval(iv); }, 250);
})();
