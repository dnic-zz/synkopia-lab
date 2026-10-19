/* Synkopia Instrument · Clap (909-Art)
   Werte aus dem Sound-Rezept (recherche/techno-dossier.html):
   - Quelle: Rauschen (909: Pseudo-Zufallsgenerator aus Schieberegistern)
   - 4 Stöße im Abstand von ≈ 11 ms (gemessen, Forenanalyse der Schaltung)
   - Bandpass ≈ 1140 Hz, Q ≈ 2 (aus Bauteilwerten errechnet, unsicher)
   - Hallfahne nach dem letzten Stoß, τ ≈ 60 ms (Startwert) */
(function(S){
  "use strict";

  var params = {
    tail: { label: "Nachhall", min: 0.02, max: 0.15, step: 0.005, default: 0.06, unit: "s" }
  };
  var BURSTS = 4, GAP = 0.011;

  function create(ctx, out){
    function trigger(time, accent, p){
      p = p || {};
      var tail = p.tail != null ? p.tail : params.tail.default;
      var level = 1.4 * (accent ? S.ACCENT : 1); // Bandpass schluckt viel Pegel

      var src = ctx.createBufferSource();
      src.buffer = S.noise(ctx);
      var bp = ctx.createBiquadFilter();
      bp.type = "bandpass"; bp.frequency.value = 1140; bp.Q.value = 2;
      var amp = ctx.createGain();
      amp.gain.setValueAtTime(0, time);
      // Drei kurze Stöße, jeder fällt schnell ab
      for(var i = 0; i < BURSTS - 1; i++){
        var ti = time + i * GAP;
        amp.gain.setValueAtTime(level, ti);
        amp.gain.setTargetAtTime(level * 0.05, ti, 0.0025);
      }
      // Der letzte Stoß klingt mit der Hallfahne aus
      var tl = time + (BURSTS - 1) * GAP;
      amp.gain.setValueAtTime(level, tl);
      amp.gain.setTargetAtTime(0, tl, tail);

      src.connect(bp).connect(amp).connect(out);
      src.start(time, Math.random() * 1.5);
      src.stop(tl + tail * 8);
    }
    return { trigger: trigger };
  }

  S.instruments = S.instruments || {};
  S.instruments.clap = { name: "Clap", params: params, create: create };
})(window.Synkopia = window.Synkopia || {});
