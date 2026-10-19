/* Synkopia Engine · Sequencer
   16 Steps wie bei der TR-909, mit Last Step, Accent pro Step, Swing und Flam.
   - Swing s (0,50–0,70): jede zweite Sechzehntel kommt um (2s − 1) · Sechzehntel später.
     50 % ist gerade, 66 % ist eine Triole.
   - Flam (0,020–0,048 s): Der Schlag kommt zweimal kurz hintereinander.
   Ein Pattern-Feld ist leer (0, false, "") oder enthält einen Wert, der an das Instrument
   weitergereicht wird (z. B. true, oder "x"/"o" für geschlossene und offene Hi-Hats). */
(function(S){
  "use strict";

  function Sequencer(ctx, opts){
    opts = opts || {};
    this.ctx = ctx;
    this.steps = 16;
    this.lastStep = 16;
    this.swing = 0.5;
    this.flam = 0.03;
    this.tracks = {};                       // name → { pattern, play(value, time, accent) }
    this.accent = new Array(16).fill(false);
    this.flams = new Array(16).fill(false);
    this.onStep = opts.onStep || null;      // onStep(pos, time) für die Anzeige
    this.pos = 0;
    this.bar = 0;
    this.clock = new S.Clock(ctx, { bpm: opts.bpm || 120, onTick: this.tick.bind(this) });
  }

  /* pattern: Array mit 16 Feldern oder Funktion pos → Wert (liest dann immer den aktuellen Stand) */
  Sequencer.prototype.addTrack = function(name, pattern, play){
    this.tracks[name] = { pattern: pattern, play: play };
  };
  Sequencer.prototype.setBpm = function(bpm){ this.clock.bpm = bpm; };
  Sequencer.prototype.start = function(){ this.pos = 0; this.bar = 0; this.clock.start(); };
  Sequencer.prototype.stop = function(){ this.clock.stop(); };
  Object.defineProperty(Sequencer.prototype, "running", { get: function(){ return this.clock.running; } });

  /* Verschiebung einer Position durch Swing, in Sekunden */
  Sequencer.prototype.swingOffset = function(pos, sixteenth){
    return pos % 2 === 1 ? (2 * this.swing - 1) * sixteenth : 0;
  };

  Sequencer.prototype.tick = function(tick, time, sixteenth){
    var pos = this.pos, self = this;
    var t = time + this.swingOffset(pos, sixteenth);
    var accent = !!this.accent[pos];
    var flam = this.flams[pos] ? this.flam : 0;
    Object.keys(this.tracks).forEach(function(name){
      var tr = self.tracks[name];
      var v = typeof tr.pattern === "function" ? tr.pattern(pos) : tr.pattern[pos];
      if(!v) return;
      tr.play(v, t, accent);
      if(flam) tr.play(v, t + flam, accent);
    });
    if(this.onStep) this.onStep(pos, t, this.bar);
    this.pos = (pos + 1) % Math.max(1, Math.min(this.steps, this.lastStep));
    if(this.pos === 0) this.bar++;
  };

  S.Sequencer = Sequencer;
})(window.Synkopia = window.Synkopia || {});
