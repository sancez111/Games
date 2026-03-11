// SoundManager using Web Audio API for placeholder sounds
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.musicEnabled = true;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setEnabled(val) {
    this.enabled = val;
  }

  setMusicEnabled(val) {
    this.musicEnabled = val;
  }

  // Play a tone with given frequency, duration, and type
  playTone(freq, duration = 0.15, type = 'sine', volume = 0.3) {
    if (!this.enabled) return;
    this.init();

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + duration);
  }

  // Cheerful ding for correct answer
  playCorrect() {
    if (!this.enabled) return;
    this.init();
    this.playTone(880, 0.1, 'sine', 0.25);
    setTimeout(() => this.playTone(1108, 0.15, 'sine', 0.25), 80);
    setTimeout(() => this.playTone(1320, 0.2, 'sine', 0.2), 160);
  }

  // Gentle boop for wrong answer
  playWrong() {
    if (!this.enabled) return;
    this.init();
    this.playTone(300, 0.15, 'triangle', 0.15);
    setTimeout(() => this.playTone(250, 0.2, 'triangle', 0.1), 100);
  }

  // Ascending notes for streak
  playStreak(level) {
    if (!this.enabled) return;
    this.init();
    const base = 523; // C5
    for (let i = 0; i <= level; i++) {
      setTimeout(() => {
        this.playTone(base * Math.pow(1.125, i), 0.12, 'sine', 0.2);
      }, i * 80);
    }
  }

  // Short fanfare for level complete
  playLevelComplete() {
    if (!this.enabled) return;
    this.init();
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.25, 'sine', 0.2), i * 150);
    });
  }

  // Longer celebration for world complete
  playWorldComplete() {
    if (!this.enabled) return;
    this.init();
    const notes = [523, 587, 659, 784, 880, 1047, 1175, 1319];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.2), i * 120);
    });
  }

  // Gentle tick for timer warning
  playTick() {
    if (!this.enabled) return;
    this.init();
    this.playTone(800, 0.05, 'sine', 0.08);
  }

  // Button click
  playClick() {
    if (!this.enabled) return;
    this.init();
    this.playTone(660, 0.06, 'sine', 0.12);
  }
}

// Singleton
export const soundManager = new SoundManager();
