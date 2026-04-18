"use client";

import { motion } from "framer-motion";

export default function Interior() {
  return (
    <section className="py-32 bg-jesko-black relative overflow-hidden border-t border-carbon-gray">
      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-4">
              <div className="w-16 h-[2px] bg-jesko-gold mb-8"></div>
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-white leading-tight">
                Luxury <br />
                <span className="text-jesko-gold">Cockpit</span>
              </h2>
            </div>
            
            <p className="font-rajdhani text-lg md:text-xl text-gray-400 leading-relaxed tracking-wider">
              Despite its extreme performance, the Koenigsegg Jesko refuses to compromise on luxury. The cabin is lined with leather, alcantara, and carbon fiber. The SmartWheel incorporates twin small touchscreens right into the steering wheel, providing haptic feedback.
            </p>
            <p className="font-rajdhani text-lg md:text-xl text-gray-400 leading-relaxed tracking-wider">
              At the center sits the cutting-edge SmartCenter display console, managing everything from telemetry and G-force mapping to climate control and Apple CarPlay.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-jesko-gold blur-[100px] opacity-10 -z-10"></div>
            <img 
              src="/images/jesko_interior.png" 
              alt="Koenigsegg Jesko Cockpit" 
              className="w-full h-auto object-cover border border-carbon-gray shadow-2xl -skew-y-1 hover:skew-y-0 transition-transform duration-700" 
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
