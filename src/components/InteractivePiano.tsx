"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX, Sparkles, Music2, Keyboard, HelpCircle } from "lucide-react";

interface WhiteKeyConfig {
  note: string;
  label: string;
  name: string;
  keyA: string; // Layout A (A S D F...)
  keyB: string; // Layout B (Z X C V...)
  left: number;  // %
  width: number; // %
}

interface BlackKeyConfig {
  note: string;
  label: string;
  name: string;
  keyA: string;
  keyB: string;
  left: number;  // %
  width: number; // %
}

interface DrumPadConfig {
  id: number;
  name: string;
  shortcut: string;
  row: number; // 0 = top, 1 = bottom
  col: number; // 0..3
  color: string;
}

interface BubbleInstance {
  id: number;
  timestamp: number;
  x: number; // %
  y: number; // %
  size: number; // px
  sprite: string;
  hue: number; // deg
  driftX: number; // px
  driftY: number; // px
  scale: number;
  duration: number; // seconds
}

const WHITE_KEYS: WhiteKeyConfig[] = [
  { note: "C3", label: "C3", name: "C", keyA: "A", keyB: "Z", left: 8.50, width: 6.01 },
  { note: "D3", label: "D3", name: "D", keyA: "S", keyB: "X", left: 14.50, width: 5.76 },
  { note: "E3", label: "E3", name: "E", keyA: "D", keyB: "C", left: 20.26, width: 5.71 },
  { note: "F3", label: "F3", name: "F", keyA: "F", keyB: "V", left: 25.98, width: 5.71 },
  { note: "G3", label: "G3", name: "G", keyA: "G", keyB: "B", left: 31.69, width: 5.76 },
  { note: "A3", label: "A3", name: "A", keyA: "H", keyB: "N", left: 37.45, width: 5.76 },
  { note: "B3", label: "B3", name: "B", keyA: "J", keyB: "M", left: 43.21, width: 5.81 },
  { note: "C4", label: "C4", name: "C (Mid)", keyA: "K", keyB: "Q", left: 49.02, width: 5.81 },
  { note: "D4", label: "D4", name: "D", keyA: "L", keyB: "W", left: 54.83, width: 5.76 },
  { note: "E4", label: "E4", name: "E", keyA: ";", keyB: "E", left: 60.60, width: 5.76 },
  { note: "F4", label: "F4", name: "F", keyA: "'", keyB: "R", left: 66.36, width: 5.76 },
  { note: "G4", label: "G4", name: "G", keyA: "]", keyB: "T", left: 72.12, width: 5.76 },
  { note: "A4", label: "A4", name: "A", keyA: "\\", keyB: "Y", left: 77.88, width: 5.76 },
  { note: "B4", label: "B4", name: "B", keyA: "Enter", keyB: "U", left: 83.64, width: 7.57 },
];

const BLACK_KEYS: BlackKeyConfig[] = [
  { note: "Db3", label: "C#3", name: "C#", keyA: "W", keyB: "S", left: 13.48, width: 2.15 },
  { note: "Eb3", label: "D#3", name: "D#", keyA: "E", keyB: "D", left: 20.12, width: 2.15 },
  { note: "Gb3", label: "F#3", name: "F#", keyA: "T", keyB: "G", left: 30.08, width: 2.15 },
  { note: "Ab3", label: "G#3", name: "G#", keyA: "Y", keyB: "H", left: 36.52, width: 2.15 },
  { note: "Bb3", label: "A#3", name: "A#", keyA: "U", keyB: "J", left: 42.87, width: 2.15 },
  { note: "Db4", label: "C#4", name: "C#", keyA: "O", keyB: "2", left: 53.22, width: 2.15 },
  { note: "Eb4", label: "D#4", name: "D#", keyA: "P", keyB: "3", left: 60.06, width: 2.15 },
  { note: "Gb4", label: "F#4", name: "F#", keyA: "[", keyB: "5", left: 70.21, width: 2.15 },
  { note: "Ab4", label: "G#4", name: "G#", keyA: "=", keyB: "6", left: 76.76, width: 2.15 },
  { note: "Bb4", label: "A#4", name: "A#", keyA: "Backspace", keyB: "7", left: 83.79, width: 2.15 },
];

const DRUM_PADS: DrumPadConfig[] = [
  { id: 0, name: "808 Kick", shortcut: "1", row: 0, col: 0, color: "#ef4444" },
  { id: 1, name: "Snare", shortcut: "2", row: 0, col: 1, color: "#f97316" },
  { id: 2, name: "Closed Hat", shortcut: "3", row: 0, col: 2, color: "#eab308" },
  { id: 3, name: "Open Hat", shortcut: "4", row: 0, col: 3, color: "#10b981" },
  { id: 4, name: "Rimshot", shortcut: "5", row: 1, col: 0, color: "#06b6d4" },
  { id: 5, name: "Clap", shortcut: "6", row: 1, col: 1, color: "#6366f1" },
  { id: 6, name: "Low Tom", shortcut: "7", row: 1, col: 2, color: "#ec4899" },
  { id: 7, name: "Perc Tap", shortcut: "8", row: 1, col: 3, color: "#8b5cf6" },
];

// Note to MIDI frequency
const NOTE_FREQUENCIES: Record<string, number> = {
  C3: 130.81, Db3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61,
  Gb3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23,
  Gb4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25
};

// Vibrant chromatic hue mapping for each musical note
const NOTE_HUES: Record<string, number> = {
  C: 320,   // Neon Pink / Magenta
  Db: 350,  // Crimson Red
  D: 25,    // Fiery Orange
  Eb: 50,   // Amber / Gold
  E: 90,    // Lime Green
  F: 145,   // Emerald Mint
  Gb: 175,  // Cyan / Aqua
  G: 205,   // Sky Blue
  Ab: 235,  // Deep Royal Blue
  A: 265,   // Indigo / Violet
  Bb: 285,  // Purple / Lavender
  B: 305,   // Fuchsia
};

const BUBBLE_SPRITES = [
  "/bubbles/bubble-1.png",
  "/bubbles/bubble-2.png",
  "/bubbles/bubble-3.png",
  "/bubbles/bubble-4.png",
];

export default function InteractivePiano() {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [activePads, setActivePads] = useState<Set<number>>(new Set());
  const [lastPlayed, setLastPlayed] = useState<string>("Ready to play");
  const [showKeyLabels, setShowKeyLabels] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [pitchBend, setPitchBend] = useState(0); // -1 to +1
  const [bubbles, setBubbles] = useState<BubbleInstance[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const bufferCacheRef = useRef<Map<string, AudioBuffer>>(new Map());
  const isDraggingJoystickRef = useRef(false);
  const bubbleCounterRef = useRef(0);

  // Initialize Web Audio
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(volume, ctx.currentTime);
        masterGain.connect(ctx.destination);
        audioCtxRef.current = ctx;
        masterGainRef.current = masterGain;
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, [volume]);

  // Load Piano Samples in background
  useEffect(() => {
    let isCancelled = false;
    const loadSamples = async () => {
      const ctx = getAudioContext();
      if (!ctx) return;

      const allNotes = [
        "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3",
        "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5"
      ];

      const priorityNotes = ["C3", "E3", "G3", "C4", "E4", "G4", "A4"];
      const remainingNotes = allNotes.filter((n) => !priorityNotes.includes(n));

      const loadNote = async (note: string) => {
        try {
          const res = await fetch(`/sounds/piano/${note}.mp3`);
          if (!res.ok) return;
          const arrayBuffer = await res.arrayBuffer();
          const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
          if (!isCancelled) {
            bufferCacheRef.current.set(note, audioBuffer);
          }
        } catch {
          // Fall back to synthesized soft tone
        }
      };

      await Promise.all(priorityNotes.map(loadNote));
      Promise.all(remainingNotes.map(loadNote));
    };

    loadSamples();
    return () => {
      isCancelled = true;
    };
  }, [getAudioContext]);

  // Update volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      const currentVal = isMuted ? 0 : volume;
      masterGainRef.current.gain.setTargetAtTime(currentVal, audioCtxRef.current.currentTime, 0.02);
    }
  }, [volume, isMuted]);

  // Auto-cleanup bubbles after animation completes
  useEffect(() => {
    if (bubbles.length === 0) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setBubbles((prev) => prev.filter((b) => now - b.timestamp < 2200));
    }, 800);
    return () => clearInterval(interval);
  }, [bubbles.length]);

  // Spawn colourful iridescent bubbles constrained inside this frame
  const spawnBubbles = useCallback((xPct: number, yPct: number, noteOrName: string) => {
    const count = 2 + Math.floor(Math.random() * 2); // 2-3 bubbles
    const noteRoot = noteOrName.replace(/[0-9]/g, "").trim();
    const baseHue = NOTE_HUES[noteRoot] ?? Math.floor(Math.random() * 360);

    const newItems: BubbleInstance[] = [];
    const now = Date.now();

    for (let i = 0; i < count; i++) {
      bubbleCounterRef.current += 1;
      const sprite = BUBBLE_SPRITES[Math.floor(Math.random() * BUBBLE_SPRITES.length)];
      // Randomize size between 34px and 76px
      const size = 36 + Math.floor(Math.random() * 40);
      const hueOffset = (Math.random() - 0.5) * 40;
      const driftX = (Math.random() - 0.5) * 44; // horizontal sway in px
      const driftY = -(65 + Math.random() * 95);  // float up 65px to 160px
      const duration = 1.2 + Math.random() * 0.5;

      newItems.push({
        id: bubbleCounterRef.current,
        timestamp: now,
        x: Math.max(3, Math.min(97, xPct + (Math.random() - 0.5) * 2.8)),
        y: Math.max(5, Math.min(95, yPct + (Math.random() - 0.5) * 3)),
        size,
        sprite,
        hue: (baseHue + hueOffset + 360) % 360,
        driftX,
        driftY,
        scale: 0.85 + Math.random() * 0.4,
        duration,
      });
    }

    setBubbles((prev) => [...prev.slice(-32), ...newItems]);
  }, []);

  // Synthesize rich soft acoustic piano tone fallback
  const synthesizeSoftPiano = useCallback((ctx: AudioContext, note: string, detuneCents = 0) => {
    const baseFreq = NOTE_FREQUENCIES[note] || 261.63;
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2800, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 1.2);
    filter.Q.setValueAtTime(1.8, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

    const osc1 = ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.detune.setValueAtTime(detuneCents, now);

    const osc2 = ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(baseFreq * 2, now);
    osc2.detune.setValueAtTime(detuneCents + 2.5, now);

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.22, now);

    const osc3 = ctx.createOscillator();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(baseFreq, now);
    osc3.detune.setValueAtTime(detuneCents - 3.2, now);

    const osc3Gain = ctx.createGain();
    osc3Gain.gain.setValueAtTime(0.4, now);

    osc1.connect(filter);
    osc2.connect(osc2Gain).connect(filter);
    osc3.connect(osc3Gain).connect(filter);

    filter.connect(gain);
    if (masterGainRef.current) {
      gain.connect(masterGainRef.current);
    } else {
      gain.connect(ctx.destination);
    }

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + 2.5);
    osc2.stop(now + 2.5);
    osc3.stop(now + 2.5);

    return gain;
  }, []);

  // Play Piano Note
  const playNote = useCallback((note: string) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    setActiveNotes((prev) => new Set(prev).add(note));
    setLastPlayed(`🎹 ${note}`);

    // Spawn colorful iridescent bubbles at key position
    const white = WHITE_KEYS.find((k) => k.note === note);
    if (white) {
      spawnBubbles(white.left + white.width / 2, 60, note);
    } else {
      const black = BLACK_KEYS.find((k) => k.note === note);
      if (black) {
        spawnBubbles(black.left + black.width / 2, 48, note);
      }
    }

    const buffer = bufferCacheRef.current.get(note);
    const detuneCents = pitchBend * 300;

    if (buffer) {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.detune.setValueAtTime(detuneCents, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(6500, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.9, ctx.currentTime);

      source.connect(filter).connect(gain);
      if (masterGainRef.current) {
        gain.connect(masterGainRef.current);
      } else {
        gain.connect(ctx.destination);
      }

      source.start(0);

      setTimeout(() => {
        setActiveNotes((prev) => {
          const next = new Set(prev);
          next.delete(note);
          return next;
        });
      }, 300);
    } else {
      synthesizeSoftPiano(ctx, note, detuneCents);
      setTimeout(() => {
        setActiveNotes((prev) => {
          const next = new Set(prev);
          next.delete(note);
          return next;
        });
      }, 300);
    }
  }, [getAudioContext, pitchBend, synthesizeSoftPiano, spawnBubbles]);

  // Synthesize Drum Pad Sounds
  const playDrumPad = useCallback((padId: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    setActivePads((prev) => new Set(prev).add(padId));
    const pad = DRUM_PADS[padId];
    setLastPlayed(`🥁 ${pad.name}`);

    // Spawn bubbles above drum pad
    const padTop = pad.row === 0 ? 22 : 34;
    const padLefts = [31.35, 42.65, 53.95, 65.25];
    spawnBubbles(padLefts[pad.col], padTop, pad.name);

    const now = ctx.currentTime;
    const dest = masterGainRef.current || ctx.destination;

    switch (padId) {
      case 0: {
        // 808 Sub Kick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(145, now);
        osc.frequency.exponentialRampToValueAtTime(38, now + 0.38);
        gain.gain.setValueAtTime(1.0, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc.connect(gain).connect(dest);
        osc.start(now);
        osc.stop(now + 0.45);
        break;
      }
      case 1: {
        // Snare
        const toneOsc = ctx.createOscillator();
        const toneGain = ctx.createGain();
        toneOsc.frequency.setValueAtTime(185, now);
        toneGain.gain.setValueAtTime(0.6, now);
        toneGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        toneOsc.connect(toneGain).connect(dest);
        toneOsc.start(now);
        toneOsc.stop(now + 0.15);

        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "highpass";
        noiseFilter.frequency.setValueAtTime(800, now);
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.8, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        noise.connect(noiseFilter).connect(noiseGain).connect(dest);
        noise.start(now);
        noise.stop(now + 0.25);
        break;
      }
      case 2: {
        // Closed Hi-Hat
        const bufferSize = ctx.sampleRate * 0.06;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(8500, now);
        filter.Q.setValueAtTime(2.5, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        noise.connect(filter).connect(gain).connect(dest);
        noise.start(now);
        noise.stop(now + 0.06);
        break;
      }
      case 3: {
        // Open Hi-Hat
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(6000, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.65, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
        noise.connect(filter).connect(gain).connect(dest);
        noise.start(now);
        noise.stop(now + 0.4);
        break;
      }
      case 4: {
        // Rimshot
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(1600, now);
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1600, now);
        filter.Q.setValueAtTime(12, now);
        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.connect(filter).connect(gain).connect(dest);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case 5: {
        // Hand Clap
        const bufferSize = ctx.sampleRate * 0.25;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1200, now);
        filter.Q.setValueAtTime(1.5, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.setValueAtTime(0.1, now + 0.015);
        gain.gain.setValueAtTime(0.8, now + 0.03);
        gain.gain.setValueAtTime(0.1, now + 0.045);
        gain.gain.setValueAtTime(0.9, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        noise.connect(filter).connect(gain).connect(dest);
        noise.start(now);
        noise.stop(now + 0.25);
        break;
      }
      case 6: {
        // Low Tom
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(125, now);
        osc.frequency.exponentialRampToValueAtTime(68, now + 0.28);
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain).connect(dest);
        osc.start(now);
        osc.stop(now + 0.32);
        break;
      }
      case 7: {
        // Perc Tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(820, now);
        gain.gain.setValueAtTime(0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain).connect(dest);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }
    }

    setTimeout(() => {
      setActivePads((prev) => {
        const next = new Set(prev);
        next.delete(padId);
        return next;
      });
    }, 200);
  }, [getAudioContext, spawnBubbles]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")) {
        return;
      }

      if (e.repeat) return;
      const key = e.key.toUpperCase();

      // Check White Keys
      const whiteMatch = WHITE_KEYS.find(
        (k) => k.keyA.toUpperCase() === key || k.keyB.toUpperCase() === key || k.keyA === e.key || k.keyB === e.key
      );
      if (whiteMatch) {
        e.preventDefault();
        playNote(whiteMatch.note);
        return;
      }

      // Check Black Keys
      const blackMatch = BLACK_KEYS.find(
        (k) => k.keyA.toUpperCase() === key || k.keyB.toUpperCase() === key || k.keyA === e.key || k.keyB === e.key
      );
      if (blackMatch) {
        e.preventDefault();
        playNote(blackMatch.note);
        return;
      }

      // Check Drum Pads (1..8)
      if (e.key >= "1" && e.key <= "8") {
        const padIdx = parseInt(e.key, 10) - 1;
        if (padIdx >= 0 && padIdx < DRUM_PADS.length) {
          e.preventDefault();
          playDrumPad(padIdx);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playNote, playDrumPad]);

  // Play Sample Chord helper
  const playPresetChord = (notes: string[]) => {
    notes.forEach((n, idx) => {
      setTimeout(() => playNote(n), idx * 80);
    });
  };

  return (
    <section id="instrument" className="py-20 md:py-28 bg-[#09090b] text-white relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[350px] bg-red-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header Badge & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase font-display mb-3"
            >
              <Music2 className="w-3.5 h-3.5 text-red-400" />
              Interactive Instrument • Akai MPK Mini
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-stone-100 tracking-tight"
            >
              Jam on my keyboard
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-stone-400 mt-2 max-w-xl"
            >
              Click or tap the keys, hit the drum pads, or use your computer keyboard to play soft concert grand piano chords and watch colorful bubbles dance!
            </motion.p>
          </div>

          {/* Quick controls toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Chord presets */}
            <div className="flex items-center gap-1.5 bg-stone-900/90 border border-stone-800 rounded-full p-1 shadow-sm">
              <span className="text-[11px] font-medium text-stone-400 px-2.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Presets:
              </span>
              <button
                onClick={() => playPresetChord(["C4", "E4", "G4", "B4"])}
                className="text-xs px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-medium active:scale-95"
              >
                Cmaj7
              </button>
              <button
                onClick={() => playPresetChord(["A3", "C4", "E4", "G4"])}
                className="text-xs px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-medium active:scale-95"
              >
                Am7
              </button>
              <button
                onClick={() => playPresetChord(["F3", "A3", "C4", "E4"])}
                className="text-xs px-2.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-medium active:scale-95"
              >
                Fmaj7
              </button>
            </div>

            {/* Toggle key labels */}
            <button
              onClick={() => setShowKeyLabels(!showKeyLabels)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
                showKeyLabels
                  ? "bg-red-500/20 border-red-500/50 text-red-200"
                  : "bg-stone-900/90 border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Key Guides</span>
            </button>

            {/* Volume control */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-stone-900/90 border border-stone-800 text-stone-400 hover:text-stone-200 transition-colors active:scale-95"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-stone-300" />}
            </button>
          </div>
        </div>

        {/* Real-time Status Indicator */}
        <div className="flex items-center justify-between px-2 mb-3 text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-stone-300 font-medium">{lastPlayed}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-stone-500 text-[11px]">
            <span>Keys: <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700 font-mono">A-K</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700 font-mono">Z-M</kbd></span>
            <span>Pads: <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700 font-mono">1-8</kbd></span>
          </div>
        </div>

        {/* Keyboard Chassis Frame - Completely Black Background with No White Borders */}
        <div className="relative w-full rounded-2xl md:rounded-3xl p-2 sm:p-4 bg-black border border-stone-800 shadow-2xl overflow-hidden">
          {/* Main aspect container matching 1024 x 649 (constrained frame for bubbles & keys) */}
          <div className="relative w-full aspect-[1024/649] rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-inner">
            {/* The transparent Akai MPK Mini illustration on pure black background */}
            <Image
              src="/midi-keyboard.png"
              alt="Playable Akai MPK Mini MIDI Keyboard"
              fill
              priority
              className="object-contain pointer-events-none select-none"
              sizes="(max-width: 1200px) 100vw, 1100px"
            />

            {/* ---------------- FLOATING COLORFUL BUBBLES CONSTRAINED UNDER THIS FRAME ONLY ---------------- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
              <AnimatePresence>
                {bubbles.map((b) => (
                  <motion.div
                    key={b.id}
                    initial={{
                      opacity: 0,
                      scale: 0.25,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0, 0.95, 0.9, 0],
                      scale: [0.25, b.scale, b.scale * 1.08, b.scale * 1.25],
                      x: [0, b.driftX * 0.5, b.driftX],
                      y: [0, b.driftY * 0.5, b.driftY],
                    }}
                    exit={{ opacity: 0, scale: 1.35 }}
                    transition={{ duration: b.duration, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      left: `${b.x}%`,
                      top: `${b.y}%`,
                      width: `${b.size}px`,
                      height: `${b.size}px`,
                      transform: "translate(-50%, -50%)",
                      filter: `hue-rotate(${b.hue}deg) drop-shadow(0 0 10px rgba(168, 85, 247, 0.45))`,
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={b.sprite}
                        alt="Bubble"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interactive Hitbox & Key Animation Layer */}
            <div className="absolute inset-0 z-10">
              {/* ---------------- 8 MPC DRUM PADS ---------------- */}
              {DRUM_PADS.map((pad) => {
                const isPadActive = activePads.has(pad.id);
                const topPct = pad.row === 0 ? 20.34 : 32.67;
                const heightPct = pad.row === 0 ? 7.55 : 8.17;
                const leftOffsets = [26.9, 38.2, 49.5, 60.8];
                const leftPct = leftOffsets[pad.col];
                const widthPct = 8.9;

                return (
                  <div
                    key={`pad-${pad.id}`}
                    style={{
                      position: "absolute",
                      top: `${topPct}%`,
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      height: `${heightPct}%`,
                    }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      playDrumPad(pad.id);
                    }}
                    className="cursor-pointer rounded-sm group select-none touch-none"
                    role="button"
                    tabIndex={0}
                    aria-label={pad.name}
                  >
                    {/* Glowing LED Strike Ring & Feedback */}
                    <div
                      className={`w-full h-full rounded transition-all duration-100 flex items-center justify-center relative overflow-hidden ${
                        isPadActive
                          ? "bg-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.9)] scale-[0.97] ring-2 ring-red-400"
                          : "hover:bg-red-500/15 group-active:scale-[0.97]"
                      }`}
                    >
                      {showKeyLabels && (
                        <span className="absolute bottom-1 right-1.5 text-[9px] sm:text-[11px] font-mono font-bold px-1 rounded bg-black/60 text-stone-200 border border-stone-700/60 pointer-events-none">
                          {pad.shortcut}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* ---------------- RED JOYSTICK ---------------- */}
              <div
                style={{
                  position: "absolute",
                  top: "16.5%",
                  left: "13.2%",
                  width: "6.8%",
                  height: "10.8%",
                }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  isDraggingJoystickRef.current = true;
                  setPitchBend(0.5);
                  setLastPlayed("🕹️ Pitch Bend +");
                  spawnBubbles(16.5, 20, "F");
                }}
                onPointerUp={() => {
                  isDraggingJoystickRef.current = false;
                  setPitchBend(0);
                }}
                onPointerLeave={() => {
                  if (isDraggingJoystickRef.current) {
                    isDraggingJoystickRef.current = false;
                    setPitchBend(0);
                  }
                }}
                className="cursor-grab active:cursor-grabbing rounded-full group select-none touch-none"
                title="Pitch & Mod Joystick"
              >
                <div className="w-full h-full rounded-full transition-transform active:scale-90 hover:ring-2 hover:ring-red-400/50" />
              </div>

              {/* ---------------- 14 WHITE PIANO KEYS ---------------- */}
              {WHITE_KEYS.map((key) => {
                const isActive = activeNotes.has(key.note);
                return (
                  <div
                    key={`white-${key.note}`}
                    style={{
                      position: "absolute",
                      top: "48.23%",
                      height: "30.51%",
                      left: `${key.left}%`,
                      width: `${key.width}%`,
                      zIndex: 10,
                    }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      playNote(key.note);
                    }}
                    className="cursor-pointer select-none touch-none rounded-b-md group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Key ${key.name}`}
                  >
                    {/* Active key illumination & physical press */}
                    <div
                      className={`w-full h-full rounded-b-md transition-all duration-75 flex flex-col justify-end items-center pb-2 ${
                        isActive
                          ? "bg-amber-200/35 shadow-[inset_0_4px_12px_rgba(0,0,0,0.3),0_0_16px_rgba(251,191,36,0.5)] translate-y-0.5"
                          : "hover:bg-white/10 group-active:translate-y-0.5"
                      }`}
                    >
                      {showKeyLabels && (
                        <span className="text-[9px] sm:text-[11px] font-mono font-semibold px-1 py-0.5 rounded bg-stone-900/75 text-stone-300 border border-stone-700/60 pointer-events-none mb-1">
                          {key.keyA}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* ---------------- 10 BLACK PIANO KEYS ---------------- */}
              {BLACK_KEYS.map((key) => {
                const isActive = activeNotes.has(key.note);
                return (
                  <div
                    key={`black-${key.note}`}
                    style={{
                      position: "absolute",
                      top: "48.23%",
                      height: "18.34%",
                      left: `${key.left}%`,
                      width: `${key.width}%`,
                      zIndex: 20,
                    }}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      playNote(key.note);
                    }}
                    className="cursor-pointer select-none touch-none rounded-b-sm group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Key ${key.name}`}
                  >
                    {/* Active black key neon red/amber strike glow */}
                    <div
                      className={`w-full h-full rounded-b-sm transition-all duration-75 flex flex-col justify-end items-center pb-1 ${
                        isActive
                          ? "bg-red-500/40 ring-1 ring-red-400 shadow-[0_0_18px_rgba(239,68,68,0.8)] scale-[0.98] translate-y-0.5"
                          : "hover:bg-red-500/15 group-active:translate-y-0.5"
                      }`}
                    >
                      {showKeyLabels && (
                        <span className="text-[8px] sm:text-[9px] font-mono font-bold px-0.5 rounded bg-black/80 text-red-300 pointer-events-none border border-red-500/40">
                          {key.keyA}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Helpful Tips Below Instrument */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-3 border-t border-stone-800/60 pt-5">
          <div className="flex items-center gap-2 text-stone-400">
            <HelpCircle className="w-4 h-4 text-stone-500 flex-shrink-0" />
            <span>
              Pro tip: Play keys with <strong className="text-stone-200">A-S-D-F-G-H-J</strong> for white notes and <strong className="text-stone-200">W-E-T-Y-U</strong> for sharps to launch colorful bubbles!
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-500">Audio: Authentic MusyngKite Grand Piano &amp; 808 Beats</span>
          </div>
        </div>
      </div>
    </section>
  );
}
