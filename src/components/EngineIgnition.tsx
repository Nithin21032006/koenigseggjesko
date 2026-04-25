"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "@/context/AudioContext";

export default function EngineIgnition() {
  const { playEngineRev } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  const startEngine = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    playEngineRev();
    
    // Auto-stop the visualizer after the 3.5s synthesized rev finishes
    setTimeout(() => {
      setIsPlaying(false);
    }, 3500);
  };

  return (
    <section className="py-24 bg-jesko-black flex flex-col items-center justify-center relative overflow-hidden border-t border-carbon-gray">


      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-20 pointer-events-none flex items-center justify-center gap-2">
        {/* Animated equalizer waves when playing */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: isPlaying ? [20, Math.random() * 150 + 50, 20] : 20,
              opacity: isPlaying ? [0.3, 0.8, 0.3] : 0.2
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut"
            }}
            className="w-4 bg-jesko-gold rounded-full"
            style={{ minHeight: '20px' }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="space-y-2 text-center text-white">
          <h2 className="font-orbitron font-bold text-3xl md:text-5xl uppercase tracking-widest">
            Acoustic <span className="text-jesko-gold">Signature</span>
          </h2>
          <p className="font-rajdhani text-gray-400 tracking-widest uppercase text-sm">
            5.0L Twin-Turbo V8 • Flat-Plane Crank
          </p>
        </div>

        <button 
          onClick={startEngine}
          className={`relative group w-32 h-32 rounded-full border-2 transition-all duration-500 flex items-center justify-center ${isPlaying ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)]' : 'border-jesko-gold shadow-[0_0_30px_rgba(202,158,59,0.3)] hover:scale-105'}`}
        >
          <div className={`absolute inset-2 rounded-full transition-colors duration-500 ${isPlaying ? 'bg-red-500/20' : 'bg-jesko-gold/10 group-hover:bg-jesko-gold/30'}`}></div>
          <span className={`font-orbitron font-bold tracking-[0.2em] uppercase text-sm z-10 transition-colors duration-300 ${isPlaying ? 'text-red-500' : 'text-jesko-gold'}`}>
            {isPlaying ? 'STOP' : 'START'}
          </span>
        </button>
      </div>
    </section>
  );
}
