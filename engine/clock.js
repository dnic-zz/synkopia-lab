/* Synkopia Engine · Clock
   Lookahead-Scheduler: Ein Timer weckt alle ~25 ms auf und plant alle Sechzehntel,
   die in den nächsten ~100 ms fällig sind, auf die Uhr des AudioContext.
   So bleibt das Timing stabil, auch wenn der Browser kurz beschäftigt ist.
   Der Timer läuft in einem kleinen Worker, weil Browser normale Timer in Hintergrund-Tabs
   auf einmal pro Sekunde drosseln. Geht das nicht, nimmt die Clock setInterval.
   Klassisches Skript (kein ES-Modul), damit die Labore per Doppelklick laufen. */
(function(S){
  "use strict";

  var WORKER_SRC = "var id=null;onmessage=function(e){clearInterval(id);if(e.data>0)id=setInterval(function(){postMessage(0)},e.data)}";
  function makeTimer(ms, fn){
    try{
      var url = URL.createObjectURL(new Blob([WORKER_SRC], { type: "text/javascript" }));
      var w = new Worker(url);
      w.onmessage = fn;
      w.postMessage(ms);
      return { stop: function(){ w.postMessage(0); w.terminate(); URL.revokeObjectURL(url); } };
    }catch(e){
      var id = setInterval(fn, ms);
      return { stop: function(){ clearInterval(id); } };
    }
  }

  function Clock(ctx, opts){
    this.ctx = ctx;
    this.bpm = opts.bpm || 120;
    this.onTick = opts.onTick;          // onTick(tick, time, sixteenth)
    this.interval = opts.interval || 0.025;
    this.lookahead = opts.lookahead || 0.1;
    this.running = false;
    this.timer = null;
    this.tick = 0;
    this.nextTime = 0;
  }
  Clock.prototype.sixteenth = function(){ return 60 / this.bpm / 4; };
  Clock.prototype.start = function(){
    if(this.running) return;
    this.running = true;
    this.tick = 0;
    this.nextTime = this.ctx.currentTime + 0.06;
    this.schedule();
    this.timer = makeTimer(this.interval * 1000, this.schedule.bind(this));
  };
  Clock.prototype.stop = function(){
    this.running = false;
    if(this.timer) this.timer.stop();
    this.timer = null;
  };
  Clock.prototype.schedule = function(){
    if(!this.running) return;
    var now = this.ctx.currentTime, until = now + this.lookahead;
    // War der Tab lange blockiert, nicht alle verpassten Schläge auf einmal nachholen
    if(this.nextTime < now - 0.05) this.nextTime = now + 0.02;
    while(this.nextTime < until){
      var dur = this.sixteenth();
      this.onTick(this.tick, this.nextTime, dur);
      this.nextTime += dur;
      this.tick++;
    }
  };

  S.Clock = Clock;
})(window.Synkopia = window.Synkopia || {});
