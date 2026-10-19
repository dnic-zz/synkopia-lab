/* Synkopia Instrument · Hi-Hats (808-Synthese, mit 6-Bit-Schalter)
   Werte aus dem Sound-Rezept (recherche/techno-dossier.html):
   - 6 Rechteck-Oszillatoren, unharmonisch: 205,3 · 304,4 · 369,6 · 522,7 · 540 · 800 Hz (belegt)
   - Bandpass ≈ 7100 Hz für die Hats (belegt), Hochpass ≈ 7 kHz (Startwert)
   - Decay: geschlossen ≈ 50 ms, offen ≈ 400 ms (Startwert); die geschlossene stoppt die offene (Choke)
   - 909-Charakter: Ihre Becken sind 6-Bit-Samples (belegt). Der Schalter quantisiert das Signal
     auf 64 Stufen. Er macht den rauen Klang hörbar, baut die 909-Hats aber nicht nach.
   Aufruf: trigger(time, accent, { open: true|false, closed, openDecay, hp, bits }) */
(function(S){
  "use strict";

  var params = {
    closed:    { label: "Hat-Länge",    min: 0.02, max: 0.15,  step: 0.005, default: 0.05, unit: "s"  },
    openDecay: { label: "Offene Länge", min: 0.2,  max: 0.8,   step: 0.01,  default: 0.4,  unit: "s"  },
    hp:        { label: "Hat-Filter",   min: 5000, max: 10000, step: 100,   default: 7000, unit: "Hz" },
    bits:      { label: "Bit-Tiefe",    options: [0, 6], default: 0 }   // 0 = analog
  };
  var FREQS = [205.3, 304.4, 369.6, 522.7, 540, 800];
  var DRIVE = 1.6;  // Spitze nach den Filtern ≈ 0,54; bringt das Signal vor dem Quantisieren nah an Vollaussteuerung

  function bitCurve(bits){
    // symmetrisch um 0 (63 Stufen), damit Stille still bleibt und kein Gleichanteil entsteht
    var n = 8192, c = new Float32Array(n), half = Math.pow(2, bits - 1) - 1;
    for(var i = 0; i < n; i++){ var x = i / (n - 1) * 2 - 1; c[i] = Math.round(x * half) / half; }
    return c;
  }

  function create(ctx, out){
    var curve6 = bitCurve(6);
    var lastOpen = null;

    function trigger(time, accent, p){
      p = p || {};
      var open = !!p.open;
      var decay = open ? (p.openDecay != null ? p.openDecay : params.openDecay.default)
                       : (p.closed != null ? p.closed : params.closed.default);
      var hpf = p.hp != null ? p.hp : params.hp.default;
      var bits = p.bits || 0;
      var level = (open ? 0.5 : 0.6) * (accent ? S.ACCENT : 1);

      // Choke: jede neue Hat beendet eine noch klingende offene Hat
      if(lastOpen){ lastOpen.gain.setTargetAtTime(0, time, 0.004); lastOpen = null; }

      var sum = ctx.createGain(); sum.gain.value = 1 / 3;
      var oscs = FREQS.map(function(f){
        var o = ctx.createOscillator(); o.type = "square"; o.frequency.value = f; o.connect(sum); return o;
      });
      var bp = ctx.createBiquadFilter(); bp.type = "bandpass"; bp.frequency.value = 7100; bp.Q.value = 0.8;
      var hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = hpf;
      var env = ctx.createGain();
      env.gain.setValueAtTime(0, time);
      env.gain.linearRampToValueAtTime(1, time + 0.001);
      env.gain.exponentialRampToValueAtTime(0.001, time + decay);
      sum.connect(bp).connect(hp).connect(env);

      var choke = ctx.createGain();
      var lvl = ctx.createGain(); lvl.gain.value = level;
      if(bits){
        var pre = ctx.createGain(); pre.gain.value = DRIVE;
        var q = ctx.createWaveShaper(); q.curve = curve6;
        var post = ctx.createGain(); post.gain.value = 1 / DRIVE;
        env.connect(pre).connect(q).connect(post).connect(lvl);
      } else {
        env.connect(lvl);
      }
      lvl.connect(choke).connect(out);
      if(open) lastOpen = choke;

      oscs.forEach(function(o){ o.start(time); o.stop(time + decay + 0.02); });
    }
    return { trigger: trigger };
  }

  S.instruments = S.instruments || {};
  S.instruments.hats808 = { name: "Hi-Hats", params: params, create: create };
})(window.Synkopia = window.Synkopia || {});
