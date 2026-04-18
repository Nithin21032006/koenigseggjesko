"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function InquirePage() {
  return (
    <main className="bg-jesko-black min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-jesko-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="flex-1 flex items-center justify-center pt-24 pb-12 relative z-10 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl bg-black/40 border border-carbon-gray p-10 md:p-16 backdrop-blur-md shadow-2xl"
        >
          <div className="text-center mb-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white uppercase tracking-widest">
              Dealership <span className="text-jesko-gold">Inquiry</span>
            </h1>
            <p className="font-rajdhani text-gray-400 tracking-wider text-lg">
              Begin your journey to acquire the Koenigsegg Jesko. Please provide your details below and an exclusive representative will contact you.
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">First Name</label>
                <input 
                  type="text" 
                  className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                  placeholder="Christian"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Last Name</label>
                <input 
                  type="text" 
                  className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                  placeholder="von Koenigsegg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300"
                placeholder="vip@koenigsegg.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Region</label>
              <select className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300 appearance-none">
                <option value="us">North America</option>
                <option value="eu">Europe</option>
                <option value="me">Middle East</option>
                <option value="as">Asia Pacific</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block font-rajdhani text-sm tracking-[0.2em] text-jesko-gold uppercase">Additional comments (Optional)</label>
              <textarea 
                className="w-full bg-jesko-black/50 border border-carbon-gray focus:border-jesko-gold text-white font-rajdhani px-4 py-3 outline-none transition-colors duration-300 h-32 resize-none"
                placeholder="I am interested in allocating a build slot..."
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-jesko-gold text-jesko-black hover:bg-bright-gold font-rajdhani font-bold tracking-[0.3em] uppercase py-4 transition-colors duration-300 mt-4"
            >
              Submit Request
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="font-rajdhani text-gray-500 hover:text-white transition-colors tracking-widest text-sm uppercase flex items-center justify-center space-x-2">
              <span>←</span>
              <span>Return to Showcase</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
