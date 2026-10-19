/* Synkopia Instrument · 808-Kick
   Werte aus dem Sound-Rezept (recherche/techno-dossier.html):
   - Gedämpfter Resonator, Grundton ≈ 49,5 Hz (Schaltungsanalyse; Roland-Tabelle nennt 56 Hz)
   - Beim Anschlag mehr als eine Oktave höher, ≈ 6 ms lang
   - „Seufzer“: leichtes Absinken im Ausklang, ≈ 52 → 49 Hz
   - Decay 0,3–3 s, Standard 1,2 s (Startwert) */
(function(S){
  "use strict";

  var params = {
    tune:  { label: "Tune",       min: 45,  max: 60, step: 0.5,  default: 49.5, unit: "Hz" },
    decay: { label: "Kick-Länge", min: 0.3, max: 3,  step: 0.05, default: 1.2,  unit: "s"  }
  };

  function create(ctx, out){
    var last = null; // eine Stimme: ein neuer Schlag beendet den alten, wie beim Original
    function trigger(time, accent, p){
      p = p || {};
      var f = p.tune != null ? p.tune : params.tune.default;
      var decay = p.decay != null ? p.decay : params.decay.default;
      var level = 0.62 * (accent ? S.ACCENT : 1);

      var osc = ctx.createOscillator();
      osc.type = "sine";
      // Anschlag: kurzer Sprung über eine Oktave, dann der Seufzer zum Grundton
      osc.frequency.setValueAtTime(f * 2.2, time);
      osc.frequency.exponentialRampToValueAtTime(f * 1.06, time + 0.006);
      osc.frequency.setTargetAtTime(f, time + 0.006, decay / 3);

      // Resonator: rein exponentielles Ausklingen, nach „decay“ etwa −60 dB
      var amp = ctx.createGain();
      amp.gain.setValueAtTime(0, time);
      amp.gain.linearRampToValueAtTime(level, time + 0.001);
      amp.gain.setTargetAtTime(0, time + 0.001, decay / 6.9);

      // eigener Choke-Knoten pro Schlag, damit sich seine Automation nicht mit der Hüllkurve überschneidet
      var choke = ctx.createGain();
      if(last) last.gain.setTargetAtTime(0, time, 0.003);
      last = choke;
      osc.connect(amp).connect(choke).connect(out);
      osc.start(time);
      osc.stop(time + decay + 0.1);
    }
    return { trigger: trigger };
  }

  S.instruments = S.instruments || {};
  S.instruments.kick808 = { name: "808-Kick", params: params, create: create };
})(window.Synkopia = window.Synkopia || {});
