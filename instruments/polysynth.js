/* Synkopia Instrument · Polysynth (Detroit-Stabs und Strings)
   Werte aus dem Sound-Rezept (recherche/techno-dossier.html), alle als Startwert:
   - Pro Akkordton 2 Sägezähne, ± 7 Cent verstimmt
   - Tiefpass 1,8 kHz (Stab) oder 2,5 kHz (Strings)
   - Hüllkurve Stab: Attack 5 ms, Decay 0,25 s · Strings: Attack 0,25 s, Release 0,8 s
   - Akkord c-Moll 7 (C Es G B): typisch, aber keine Kopie eines Tracks
   Aufruf: trigger(time, accent, { notes: [Hz, …], attack, decay, cutoff }) */
(function(S){
  "use strict";

  var params = {
    decay:  { label: "Akkord-Länge", min: 0.08, max: 0.8,  step: 0.01, default: 0.25, unit: "s"  },
    cutoff: { label: "Filter",       min: 500,  max: 6000, step: 50,   default: 1800, unit: "Hz" },
    attack: { label: "Attack",       min: 0.002, max: 0.4, step: 0.001, default: 0.005, unit: "s" }
  };
  var CHORDS = {
    moll: [130.81, 155.56, 196.00, 233.08],   // C3 Es3 G3 B3 (Cm7)
    dur:  [130.81, 164.81, 196.00, 246.94]    // C3 E3 G3 H3 (Cmaj7)
  };

  function create(ctx, out){
    function trigger(time, accent, p){
      p = p || {};
      var notes = p.notes || CHORDS.moll;
      var attack = p.attack != null ? p.attack : params.attack.default;
      var decay = p.decay != null ? p.decay : params.decay.default;
      var cutoff = p.cutoff != null ? p.cutoff : params.cutoff.default;
      var level = 0.9 * (accent ? S.ACCENT : 1);

      var lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = cutoff; lp.Q.value = 0.9;
      var env = ctx.createGain();
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(level, time + attack);
      env.gain.exponentialRampToValueAtTime(0.0005, time + attack + decay);
      var mix = ctx.createGain(); mix.gain.value = 1 / (notes.length * 2);
      mix.connect(lp).connect(env).connect(out);
      var end = time + attack + decay + 0.03;
      notes.forEach(function(f){
        [-7, 7].forEach(function(cents){
          var o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = f; o.detune.value = cents;
          o.connect(mix); o.start(time); o.stop(end);
        });
      });
    }
    return { trigger: trigger };
  }

  S.instruments = S.instruments || {};
  S.instruments.polysynth = { name: "Polysynth", params: params, chords: CHORDS, create: create };
})(window.Synkopia = window.Synkopia || {});
