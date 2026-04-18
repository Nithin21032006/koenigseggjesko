"use client";

import { motion } from "framer-motion";

const specs = [
  { metric: "Top Speed", value: "330+ MPH", subtext: "Simulated for Absolut" },
  { metric: "Power Output", value: "1600 HP", subtext: "On E85 Biofuel" },
  { metric: "Downforce", value: "1400 KG", subtext: "At 275 KM/H (Attack)" },
  { metric: "Transmission", value: "9-SPEED", subtext: "Light Speed Transmission (LST)" },
];

export default function SpecsGrid() {
  return (
    <section className="py-32 px-8 bg-jesko-black border-t border-carbon-gray">
      <div className="container mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-sm font-rajdhani tracking-[0.4em] text-jesko-gold uppercase">
            Engineering Precision
          </h2>
          <h3 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-white">
            Performance Specs
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {specs.map((spec, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="border border-carbon-gray p-8 text-center hover:border-jesko-gold transition-colors duration-500 bg-black/20"
            >
              <div className="font-orbitron font-bold text-4xl text-jesko-gold mb-2">
                {spec.value}
              </div>
              <div className="font-rajdhani text-xl tracking-widest text-white uppercase mb-1">
                {spec.metric}
              </div>
              <div className="font-rajdhani text-sm tracking-wider text-gray-500 uppercase">
                {spec.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
