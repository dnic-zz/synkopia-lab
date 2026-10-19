/* Synkopia Engine · Mixer
   Jede Spur bekommt einen Kanal mit Gain, Pan, Mute und Solo.
   Alle Kanäle laufen in den Master; am Ende sitzt ein Limiter, damit nichts übersteuert. */
(function(S){
  "use strict";

  function Mixer(ctx){
    this.ctx = ctx;
    this.channels = {};
    this.master = ctx.createGain();
    this.master.gain.value = 0.8;
    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -6;
    this.limiter.knee.value = 0;
    this.limiter.ratio.value = 20;
    this.limiter.attack.value = 0.002;
    this.limiter.release.value = 0.12;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.master.connect(this.limiter).connect(this.analyser).connect(ctx.destination);
  }

  /* Legt einen Kanal an (oder gibt den vorhandenen zurück). Instrumente spielen in channel.input. */
  Mixer.prototype.channel = function(name){
    if(this.channels[name]) return this.channels[name];
    var ctx = this.ctx;
    var ch = {
      name: name,
      input: ctx.createGain(),
      fader: ctx.createGain(),
      mute: ctx.createGain(),
      pan: ctx.createStereoPanner(),
      level: 1, muted: false, solo: false
    };
    ch.input.connect(ch.fader).connect(ch.mute).connect(ch.pan).connect(this.master);
    this.channels[name] = ch;
    return ch;
  };
  Mixer.prototype.setLevel = function(name, v){ var ch = this.channel(name); ch.level = v; ch.fader.gain.setTargetAtTime(v, this.ctx.currentTime, 0.02); };
  Mixer.prototype.setPan = function(name, v){ this.channel(name).pan.pan.setTargetAtTime(v, this.ctx.currentTime, 0.02); };
  Mixer.prototype.setMute = function(name, on){ this.channel(name).muted = !!on; this.update(); };
  Mixer.prototype.setSolo = function(name, on){ this.channel(name).solo = !!on; this.update(); };

  /* Solo schlägt Mute: Ist irgendeine Spur auf Solo, klingen nur die Solo-Spuren. */
  Mixer.prototype.update = function(){
    var names = Object.keys(this.channels), self = this;
    var anySolo = names.some(function(n){ return self.channels[n].solo; });
    names.forEach(function(n){
      var ch = self.channels[n];
      var audible = anySolo ? ch.solo : !ch.muted;
      ch.mute.gain.setTargetAtTime(audible ? 1 : 0, self.ctx.currentTime, 0.01);
    });
  };

  S.Mixer = Mixer;
})(window.Synkopia = window.Synkopia || {});
