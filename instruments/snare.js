/* Synkopia Instrument · Snare (909-Art)
   Werte aus dem Sound-Rezept (recherche/techno-dossier.html):
   - Tonanteil: 2 Oszillatoren mit eigener Hüllkurve (belegt), Dreieck ≈ 180 / 330 Hz (Startwert)
   - Rauschanteil (Snappy): Hochpass 1,5–2 kHz, 0,18 s (belegt, Werte nach Gehör)
   - Tone: Mischung Ton ↔ Rauschen, 0–1 (Startwert)
   Die Längen der beiden Ton-Hüllkurven sind Startwerte. */
(function(S){
  "use strict";

  var params = {
    tune:   { label: "Tune",   min: 0.8,  max: 1.25, step: 0.01, default: 1,    unit: "×" },
    tone:   { label: "Tone",   min: 0,    max: 1,    step: 0.01, default: 0.5,  unit: ""  },
    snappy: { label: "Snappy", min: 0.08, max: 0.35, step: 0.01, default: 0.18, unit: "s" }
  };

  function create(ctx, out){
    function trigger(time, accent, p){
      p = p || {};
      var tune = p.tune != null ? p.tune : params.tune.default;
      var tone = p.tone != null ? p.tone : params.tone.default;
      var snappy = p.snappy != null ? p.snappy : params.snappy.default;
      var level = 0.7 * (accent ? S.ACCENT : 1);
      // Gleich laute Mischung bei 0,5: Ton und Rauschen teilen sich die Lautstärke
      var toneLevel = level * Math.cos(tone * Math.PI / 2);
      var noiseLevel = level * Math.sin(tone * Math.PI / 2);

      [[180, 0.11], [330, 0.07]].forEach(function(o){
        var osc = ctx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = o[0] * tune;
        var g = ctx.createGain();
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(toneLevel * 0.8, time + 0.001);
        g.gain.exponentialRampToValueAtTime(0.0005, time + o[1]);
        osc.connect(g).connect(out);
        osc.start(time);
        osc.stop(time + o[1] + 0.02);
      });

      var src = ctx.createBufferSource();
      src.buffer = S.noise(ctx);
      var hp = ctx.createBiquadFilter();
      hp.type = "highpass"; hp.frequency.value = 1800;
      var ng = ctx.createGain();
      ng.gain.setValueAtTime(0, time);
      ng.gain.linearRampToValueAtTime(noiseLevel, time + 0.001);
      ng.gain.exponentialRampToValueAtTime(0.0005, time + snappy);
      src.connect(hp).connect(ng).connect(out);
      src.start(time, Math.random() * 1.5);
      src.stop(time + snappy + 0.02);
    }
    return { trigger: trigger };
  }

  S.instruments = S.instruments || {};
  S.instruments.snare = { name: "Snare", params: params, create: create };
})(window.Synkopia = window.Synkopia || {});
