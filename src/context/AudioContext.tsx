"use client";

import React, { createContext, useContext, useCallback, ReactNode, useEffect, useState } from 'react';

interface AudioContextType {
  playHover: () => void;
  playSelect: () => void;
  playScanner: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize lazily to avoid auto-play policy issues
    const initAudio = () => {
      if (!audioCtx) {
        setAudioCtx(new (window.AudioContext || (window as any).webkitAudioContext)());
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, [audioCtx]);

  const playSound = useCallback((type: 'hover' | 'select' | 'scanner') => {
    if (!audioCtx) return;

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'hover') {
      // Very soft, high pitch tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'select') {
      // Solid digital thud
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.1);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'scanner') {
      // Sweeping whoosh
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.3);
      osc.frequency.linearRampToValueAtTime(50, now + 0.6);
      
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.linearRampToValueAtTime(2000, now + 0.3);
      filter.Q.value = 5;

      osc.disconnect();
      osc.connect(filter);
      filter.connect(gainNode);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
      gainNode.gain.linearRampToValueAtTime(0.001, now + 0.6);

      osc.start(now);
      osc.stop(now + 0.65);
    }
  }, [audioCtx]);

  return (
    <AudioContext.Provider value={{
      playHover: () => playSound('hover'),
      playSelect: () => playSound('select'),
      playScanner: () => playSound('scanner')
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
