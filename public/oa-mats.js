// Apply a premium brushed-aluminum material to every <model-viewer> so the GLB
// arms read as reflective metal (much more visible than the flat default).
(function () {
  function style(mv) {
    try {
      var mats = mv.model && mv.model.materials;
      if (!mats) return;
      mats.forEach(function (m) {
        var p = m.pbrMetallicRoughness;
        if (!p) return;
        // premium machined gunmetal — reads as real metal under the studio IBL
        if (p.setBaseColorFactor) p.setBaseColorFactor([0.58, 0.61, 0.68, 1.0]);
        if (p.setMetallicFactor) p.setMetallicFactor(0.92);
        if (p.setRoughnessFactor) p.setRoughnessFactor(0.28);
      });
    } catch (e) { /* model not ready */ }
  }
  var tries = 0;
  var iv = setInterval(function () {
    var mvs = document.querySelectorAll("model-viewer");
    if (mvs.length) {
      mvs.forEach(function (mv) {
        if (mv.model) style(mv);
        mv.addEventListener("load", function () { style(mv); });
      });
    }
    if (mvs.length || ++tries > 60) clearInterval(iv);
  }, 200);
})();
