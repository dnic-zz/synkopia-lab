/* Synkopia Engine · Rauschen
   Ein gemeinsamer Puffer mit weißem Rauschen pro AudioContext. Kick-Klick, Snare, Clap
   und Becken lesen alle daraus, statt jeweils eigenes Rauschen zu erzeugen. */
(function(S){
  "use strict";
  var cache = new WeakMap();
  S.noise = function(ctx){
    var b = cache.get(ctx);
    if(b) return b;
    var len = Math.floor(ctx.sampleRate * 2);
    b = ctx.createBuffer(1, len, ctx.sampleRate);
    var d = b.getChannelData(0);
    for(var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    cache.set(ctx, b);
    return b;
  };
  /* Accent hebt um +4 dB an (Sound-Rezept, Startwert) */
  S.ACCENT = Math.pow(10, 4 / 20);
})(window.Synkopia = window.Synkopia || {});
