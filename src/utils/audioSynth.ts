/**
 * Audio Synthesizer & Audio Storage Helper
 * Provides a soothing romantic wedding melody via Web Audio API
 * and IndexedDB storage for user-uploaded MP3 files.
 */

// Lyrics from the user's uploaded romantic song
export const SONG_INFO = {
  title: "ده انا أبيع الناس ولا أفرط فيك",
  subtitle: "أغنية حفل الزفاف الخاصة بأحمد وجنى",
  lyrics: [
    { time: 0, text: "اللي عيني سابقة الكلام .. وانا عيني ليك مفيهاش كلام" },
    { time: 24, text: "نفسي أعيش كل الليالي وياك وياك" },
    { time: 32, text: "واللي قالوا هسيب إيديك يا حبيبي دول ضاحكين عليك" },
    { time: 40, text: "مهما كان دايماً مكاني وياك وياك" },
    { time: 47, text: "اه ولا عاش ولا كان اللي يبكيك .. ده انا أبيع الناس ولا أفرط فيك" },
    { time: 55, text: "بلاش مو كلام يا حبيبي الله يخليك يخليك" },
    { time: 63, text: "اه ولا عاش ولا كان يوم اللي يقول .. يجي بعد ما بينّا حبيبي يطول" },
    { time: 71, text: "ولا تيجي في يوم وتلاقي الباب مقفول مقفول" },
    { time: 88, text: "إنتَ فين والباقي فين .. بقى دول عينين ينفع يناموا يوم زعلانين؟" },
    { time: 99, text: "هو إنتَ مين زيّك هنا؟" },
  ]
};

// IndexedDB database setup for persistent custom audio storage
const DB_NAME = "WeddingAudioDB";
const STORE_NAME = "audioFiles";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject("IndexedDB not supported");
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomAudio(file: Blob): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(file, "weddingThemeAudio");
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getCustomAudio(): Promise<Blob | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get("weddingThemeAudio");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function removeCustomAudio(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete("weddingThemeAudio");
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

/**
 * Romantic Melody Synthesizer
 * Uses Web Audio API to create gentle piano-like arpeggios and warm harmonic pads
 * so music can play instantly without external network dependency.
 */
export class RomanticMelodyEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private gainNode: GainNode | null = null;
  private currentVolume = 0.6;

  // Romantic chord progression in D major: D - F#m - G - A - Bm - G - Asus4 - A
  private chords = [
    [293.66, 369.99, 440.00, 587.33], // D maj (D4, F#4, A4, D5)
    [293.66, 369.99, 440.00, 739.99], // F#m / D (F#5)
    [392.00, 493.88, 587.33, 783.99], // G maj (G4, B4, D5, G5)
    [440.00, 554.37, 659.25, 880.00], // A maj (A4, C#5, E5, A5)
    [246.94, 293.66, 369.99, 493.88], // Bm (B3, D4, F#4, B4)
    [392.00, 440.00, 587.33, 739.99], // G add9
    [440.00, 587.33, 659.25, 880.00], // Asus4
    [440.00, 554.37, 659.25, 880.00], // A maj
  ];

  // Lead melody notes inspired by the song's opening motif
  private melodyNotes = [
    587.33, 659.25, 739.99, 587.33, 440.00, 493.88, 587.33,
    587.33, 739.99, 659.25, 587.33, 493.88, 440.00, 369.99,
    440.00, 493.88, 587.33, 659.25, 739.99, 880.00, 739.99, 659.25,
    587.33, 659.25, 587.33, 493.88, 440.00, 293.66, 369.99, 440.00,
  ];

  private chordIndex = 0;
  private melodyIndex = 0;
  private stepCount = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public play() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Start beat sequencer (~84 BPM, gentle slow romantic ballad tempo)
    const stepDuration = 380; // ms per eighth note

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;

      const now = this.ctx.currentTime;

      // Every 4 steps, trigger an acoustic bass / chord root
      if (this.stepCount % 4 === 0) {
        const chord = this.chords[this.chordIndex];
        this.playChordPad(chord, now, 1.8);
        this.chordIndex = (this.chordIndex + 1) % this.chords.length;
      }

      // Arpeggiate chord notes
      const activeChord = this.chords[this.chordIndex];
      const noteToArp = activeChord[this.stepCount % activeChord.length];
      this.playPianoNote(noteToArp, now, 0.4, 0.22);

      // Play soft lead melody note every 2 steps
      if (this.stepCount % 2 === 0) {
        const leadFreq = this.melodyNotes[this.melodyIndex];
        this.playLeadNote(leadFreq, now, 0.6, 0.35);
        this.melodyIndex = (this.melodyIndex + 1) % this.melodyNotes.length;
      }

      this.stepCount++;
    }, stepDuration);
  }

  private playPianoNote(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.gainNode) return;

    // Oscillator 1 (sine for soft body)
    const osc1 = this.ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, startTime);

    // Oscillator 2 (triangle for warm harmonics)
    const osc2 = this.ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 1.001, startTime); // slight chorusing

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(gainLevel * this.currentVolume, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }

  private playLeadNote(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    // subtle gentle vibrato
    const vibrato = this.ctx.createOscillator();
    vibrato.frequency.setValueAtTime(4.5, startTime);
    const vibratoGain = this.ctx.createGain();
    vibratoGain.gain.setValueAtTime(2.5, startTime);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    vibrato.start(startTime);
    vibrato.stop(startTime + duration + 0.1);

    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(gainLevel * this.currentVolume, startTime + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private playChordPad(chord: number[], startTime: number, duration: number) {
    if (!this.ctx || !this.gainNode) return;

    chord.forEach((freq, idx) => {
      if (!this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq / 2, startTime); // sub-octave warmth

      const padGain = this.ctx.createGain();
      padGain.gain.setValueAtTime(0.001, startTime);
      padGain.gain.linearRampToValueAtTime(0.12 * this.currentVolume, startTime + 0.3);
      padGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(padGain);
      padGain.connect(this.gainNode);

      osc.start(startTime + idx * 0.02);
      osc.stop(startTime + duration + 0.1);
    });
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.currentVolume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}
