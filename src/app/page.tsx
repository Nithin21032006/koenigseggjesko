"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CAR_MODELS } from "@/data/cars";

export default function Dashboard() {
  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden">
      <Navbar />

      {/* Background with grid pattern and gradient */}
      <div className="absolute inset-0 bg-[#0a0a0a] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      
      <div className="pt-32 pb-16 px-8 max-w-[1600px] mx-auto relative z-10 w-full h-screen flex flex-col justify-center items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-orbitron font-bold uppercase tracking-widest text-white mb-6"
        >
          Koenigsegg <span className="text-jesko-gold">Portal</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-rajdhani text-gray-400 tracking-[0.3em] uppercase max-w-2xl text-lg mb-12"
        >
          Secure Dealership Management & Showroom Access
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 w-full max-w-4xl"
        >
          {/* Dashboard Stats */}
          <div className="border border-carbon-gray bg-[#0a0a0a]/80 backdrop-blur-md p-6 relative overflow-hidden group hover:border-jesko-gold transition-colors duration-500">
             <div className="absolute inset-0 bg-jesko-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             <span className="font-rajdhani text-jesko-gold text-xs tracking-[0.3em] uppercase block mb-2">Global Network</span>
             <span className="font-orbitron text-4xl text-white">42</span>
             <span className="font-rajdhani text-gray-500 text-xs tracking-widest block mt-1 uppercase">Official Dealers</span>
          </div>
          <div className="border border-carbon-gray bg-[#0a0a0a]/80 backdrop-blur-md p-6 relative overflow-hidden group hover:border-jesko-gold transition-colors duration-500">
             <div className="absolute inset-0 bg-jesko-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             <span className="font-rajdhani text-jesko-gold text-xs tracking-[0.3em] uppercase block mb-2">Current Waitlist</span>
             <span className="font-orbitron text-4xl text-white">400+</span>
             <span className="font-rajdhani text-gray-500 text-xs tracking-widest block mt-1 uppercase">Active Orders</span>
          </div>
          <div className="border border-carbon-gray bg-[#0a0a0a]/80 backdrop-blur-md p-6 relative overflow-hidden group hover:border-jesko-gold transition-colors duration-500">
             <div className="absolute inset-0 bg-jesko-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
             <span className="font-rajdhani text-jesko-gold text-xs tracking-[0.3em] uppercase block mb-2">Available Models</span>
             <span className="font-orbitron text-4xl text-white">{CAR_MODELS.length}</span>
             <span className="font-rajdhani text-gray-500 text-xs tracking-widest block mt-1 uppercase">In Digital Showroom</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Link 
            href="/login"
            className="inline-block bg-jesko-gold hover:bg-bright-gold text-black font-rajdhani font-bold uppercase tracking-[0.2em] px-12 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(204,153,51,0.3)] hover:shadow-[0_0_30px_rgba(204,153,51,0.5)] transform hover:-translate-y-1"
          >
            Authenticate Portal
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
