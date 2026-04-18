"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { jeskoData } from "../data/carData";

interface JeskoExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function JeskoExperience({ scrollYProgress }: JeskoExperienceProps) {
  // Phase 1: Hero (0% - 33%)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33, 1], [1, 1, 0, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.33, 1], [0, -50, -50]);

  // Phase 2: Design (33% - 66%)
  const designOpacity = useTransform(scrollYProgress, [0, 0.33, 0.45, 0.55, 0.66, 1], [0, 0, 1, 1, 0, 0]);
  const designY = useTransform(scrollYProgress, [0, 0.33, 0.45, 0.55, 0.66, 1], [50, 50, 0, 0, -50, -50]);

  // Phase 3: Engine (66% - 100%)
  const engineOpacity = useTransform(scrollYProgress, [0, 0.66, 0.75, 1], [0, 0, 1, 1]);
  const engineY = useTransform(scrollYProgress, [0, 0.66, 0.75, 1], [50, 50, 0, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden text-white flex flex-col justify-center">
      {/* 
        Container constraints and padding for the HUD grid 
        Using z-10 so it's above the canvas 
      */}
      <div className="container mx-auto px-8 relative h-full flex items-center z-10 w-full">
        
        {/* Phase 1: Hero */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex flex-col items-center text-center space-y-6"
        >
          <h2 className="text-xl md:text-3xl font-rajdhani tracking-[0.4em] text-jesko-gold uppercase">
            {jeskoData.hero.subtitle}
          </h2>
          <h1 className="text-6xl md:text-8xl font-orbitron font-bold tracking-widest uppercase">
            {jeskoData.hero.title}
          </h1>
          <div className="flex items-center space-x-6 mt-8">
            <span className="font-rajdhani text-2xl tracking-widest">{jeskoData.hero.price}</span>
            <div className="h-[1px] w-16 bg-jesko-gold"></div>
            <Link href="/inquire" className="pointer-events-auto border border-jesko-gold px-8 py-3 font-rajdhani uppercase tracking-widest hover:bg-jesko-gold hover:text-jesko-black transition-colors duration-300">
              Inquire Now
            </Link>
          </div>
        </motion.div>

        {/* Phase 2: Design */}
        <motion.div 
          style={{ opacity: designOpacity, y: designY }}
          className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 max-w-lg space-y-6 text-left"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-[2px] bg-jesko-gold"></div>
            <span className="font-rajdhani tracking-[0.3em] text-sm text-jesko-gold uppercase">Features</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-bold uppercase">
            {jeskoData.design.title}
          </h2>
          <p className="font-rajdhani text-lg md:text-xl tracking-wider leading-relaxed text-gray-300">
            {jeskoData.design.description}
          </p>
        </motion.div>

        {/* Phase 3: Engine */}
        <motion.div 
          style={{ opacity: engineOpacity, y: engineY }}
          className="absolute right-8 md:right-24 top-1/2 -translate-y-1/2 text-right space-y-8"
        >
          <div className="flex justify-end items-center space-x-4 mb-2">
            <span className="font-rajdhani tracking-[0.3em] text-sm text-jesko-gold uppercase">Performance</span>
            <div className="w-12 h-[2px] bg-jesko-gold"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-orbitron font-bold uppercase text-right">
            {jeskoData.engine.title}
          </h2>
          
          <div className="flex flex-col space-y-6 border-r border-jesko-gold pr-6">
            {jeskoData.engine.specs.map((spec, index) => (
              <div key={index} className="flex flex-col">
                <span className="font-rajdhani text-sm tracking-[0.2em] text-gray-400 uppercase">
                  {spec.label}
                </span>
                <span className="font-orbitron text-2xl font-bold text-white uppercase">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
