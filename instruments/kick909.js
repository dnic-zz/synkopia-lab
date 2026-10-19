/* Synkopia Instrument · 909-Kick
   Werte aus dem Sound-Rezept (recherche/techno-dossier.html):
   - Sinus mit leichter Sättigung (Original: Sägezahn durch Waveshaper, fast sinusförmig)
   - Tonhöhe fällt von ≈ 270 Hz auf Tune (≈ 50 Hz), Zeitkonstante τ ≈ 31 ms (gemessen)
   - Klick: Rauschen im Band 2–4 kHz, 8 ms
   - Decay 0,15–0,8 s, Standard 0,45 s (Startwert) */
(function(S){
  "use strict";

  var params = {
    tune:  { label: "Tune",       min: 45,   max: 65,  step: 0.5,  default: 50,   unit: "Hz" },
    decay: { label: "Kick-Länge", min: 0.15, max: 0.8, step: 0.01, default: 0.45, unit: "s"  },
    click: { label: "Klick",      min: 0,    max: 1,   step: 0.01, default: 0.5,  unit: ""   }
  };

  function create(ctx, out){
    var last = null; // eine Stimme: ein neuer Schlag beendet den alten, wie beim Original
    var curve = new Float32Array(1024);
    for(var i = 0; i < curve.length; i++){ var x = i / 511.5 - 1; curve[i] = Math.tanh(1.6 * x) / Math.tanh(1.6); }

    function trigger(time, accent, p){
      p = p || {};
      var tune = p.tune != null ? p.tune : params.tune.default;
      var decay = p.decay != null ? p.decay : params.decay.default;
      var click = p.click != null ? p.click : params.click.default;
      var level = 0.62 * (accent ? S.ACCENT : 1);

      // Ton: Sinus mit fallender Tonhöhe, leicht gesättigt
      var osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(270, time);
      osc.frequency.setTargetAtTime(tune, time, 0.031);
      var shaper = ctx.createWaveShaper();
      shaper.curve = curve;
      var amp = ctx.createGain();
      amp.gain.setValueAtTime(0, time);
      amp.gain.linearRampToValueAtTime(level, time + 0.0015);
      amp.gain.exponentialRampToValueAtTime(0.0005, time + decay);
      // eigener Choke-Knoten pro Schlag, damit sich seine Automation nicht mit der Hüllkurve überschneidet
      var choke = ctx.createGain();
      if(last) last.gain.setTargetAtTime(0, time, 0.003);
      last = choke;
      osc.connect(shaper).connect(amp).connect(choke).connect(out);
      osc.start(time);
      osc.stop(time + decay + 0.05);

      // Klick: kurzes Rauschen im Band um 3 kHz
      if(click > 0){
        var src = ctx.createBufferSource();
        src.buffer = S.noise(ctx);
        var bp = ctx.createBiquadFilter();
        bp.type = "bandpass"; bp.frequency.value = 3000; bp.Q.value = 0.9;
        var cg = ctx.createGain();
        cg.gain.setValueAtTime(level * click * 1.2, time);
        cg.gain.exponentialRampToValueAtTime(0.0005, time + 0.008);
        src.connect(bp).connect(cg).connect(out);
        src.start(time, Math.random() * 1.5);
        src.stop(time + 0.012);
      }
    }
    return { trigger: trigger };
  }

  S.instruments = S.instruments || {};
  S.instruments.kick909 = { name: "909-Kick", params: params, create: create };
})(window.Synkopia = window.Synkopia || {});
