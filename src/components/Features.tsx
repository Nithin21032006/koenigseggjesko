"use client";

import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="py-32 bg-jesko-black relative overflow-hidden">
      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 flex flex-col items-center"
          >
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-16 h-[2px] bg-jesko-gold mb-8"></div>
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-white leading-tight">
                The Light Speed <br />
                <span className="text-jesko-gold">Transmission</span>
              </h2>
            </div>
            
            <p className="font-rajdhani text-lg md:text-xl text-gray-400 leading-relaxed tracking-wider">
              The Koenigsegg Jesko features a revolutionary 9-speed, multi-clutch transmission entirely developed in-house. It eliminates traditional synchronizers in favor of seven wet multi-disc clutches. 
            </p>
            <p className="font-rajdhani text-lg md:text-xl text-gray-400 leading-relaxed tracking-wider">
              The result is seamless and near-instantaneous gear shifts. Whether shifting up or down, the Light Speed Transmission allows the driver to jump multiple gears at once without losing torque or acceleration momentum—a world first in high-performance automotive engineering.
            </p>

            <ul className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                "7 Wet Multi-Disc Clutches",
                "UPOD Technology",
                "Weight: Just 90 KG"
              ].map((item, i) => (
                <li key={i} className="flex flex-col flex-1 items-center justify-center text-center space-y-2 font-rajdhani tracking-widest text-white uppercase bg-black/30 p-6 border border-carbon-gray">
                  <span className="text-jesko-gold text-2xl">▹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-jesko-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
}
