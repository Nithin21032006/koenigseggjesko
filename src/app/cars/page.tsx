"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CAR_MODELS } from "@/data/cars";
import { useAudio } from "@/context/AudioContext";

export default function DealershipHome() {
  const { playHover, playSelect } = useAudio();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden selection:bg-jesko-gold selection:text-black">
      <Navbar />

      {/* Luxury grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Header Section */}
      <section className="pt-40 pb-20 px-8 relative z-10 flex flex-col items-center justify-center min-h-[50vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="text-sm md:text-base font-rajdhani text-jesko-gold tracking-[0.5em] uppercase mb-6">
            Exclusive Access
          </h1>
          <h2 className="text-5xl md:text-8xl font-orbitron font-bold uppercase tracking-widest text-white mb-8">
            The <span className="text-gray-500">Collection</span>
          </h2>
          <p className="font-rajdhani text-gray-400 tracking-[0.2em] uppercase max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover the pinnacle of automotive engineering. Configure your ultimate mega car to exacting specifications.
          </p>
        </motion.div>
        
        {/* Subtle scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-rajdhani text-xs text-gray-600 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-jesko-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* Cars Showcase - Alternating Layout */}
      <section className="pb-32 px-4 md:px-12 max-w-[1800px] mx-auto relative z-10 flex flex-col gap-32">
        {CAR_MODELS.map((car, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 + 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24 group`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-3/5 h-[50vh] lg:h-[70vh] relative overflow-hidden bg-black/50 border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
                <img 
                  src={car.coverImage} 
                  alt={car.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s] ease-out pointer-events-none"
                />
              </div>

              {/* Text/Content Section */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-jesko-gold"></div>
                  <span className="font-rajdhani text-jesko-gold tracking-[0.3em] text-xs uppercase">Model 0{idx + 1}</span>
                </div>
                
                <h3 className="font-orbitron text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-white mb-4">
                  {car.name.replace('Koenigsegg ', '')}
                </h3>
                
                <p className="font-rajdhani text-gray-400 tracking-[0.2em] uppercase text-sm md:text-base mb-12">
                  "{car.tagline}"
                </p>

                <div className="flex flex-col gap-8">
                  <div>
                    <span className="block font-rajdhani text-gray-600 text-xs tracking-[0.3em] uppercase mb-2">Starting at</span>
                    <span className="font-orbitron text-2xl md:text-3xl text-white">{formatPrice(car.basePrice)}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link 
                      href={`/models/${car.id}`}
                      onMouseEnter={playHover}
                      onClick={playSelect}
                      className="px-8 py-4 border border-white/20 text-white font-rajdhani uppercase tracking-[0.2em] text-sm hover:border-white hover:bg-white hover:text-black transition-all duration-500 text-center"
                    >
                      Discover More
                    </Link>
                    <Link 
                      href={`/configurator/${car.id}`}
                      onMouseEnter={playHover}
                      onClick={playSelect}
                      className="px-8 py-4 bg-jesko-gold text-black font-rajdhani uppercase tracking-[0.2em] text-sm font-bold hover:bg-bright-gold transition-all duration-500 shadow-[0_0_20px_rgba(204,153,51,0.15)] hover:shadow-[0_0_30px_rgba(204,153,51,0.3)] text-center"
                    >
                      Configure
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}
