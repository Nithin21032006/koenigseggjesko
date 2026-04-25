"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        router.push('/cars');
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during authentication.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen text-white relative overflow-hidden flex flex-col">
      <Navbar />

      <div className="absolute inset-0 bg-[#0a0a0a] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>
      
      <div className="flex-1 flex items-center justify-center relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: [-10, 10, -10] }}
          transition={{ 
            opacity: { duration: 0.6 },
            scale: { duration: 0.6 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-[450px] h-[450px] max-w-[90vw] bg-[#0a0a0a]/80 backdrop-blur-xl border border-carbon-gray p-10 shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative flex flex-col justify-center"
        >
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-jesko-gold to-transparent opacity-70"></div>
          
          <h2 className="text-3xl font-orbitron font-bold uppercase tracking-wider mb-2 text-center mt-auto">Security <span className="text-jesko-gold">Login</span></h2>
          <p className="text-center font-rajdhani text-gray-400 tracking-widest uppercase text-xs mb-6">Authorized Personnel Only</p>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-900/30 border border-red-500/50 text-red-400 p-3 mb-6 font-rajdhani tracking-wider text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-rajdhani text-gray-400 text-xs tracking-widest uppercase mb-2">Dealer ID / Email</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#111] border border-gray-800 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-jesko-gold transition-colors placeholder-gray-600"
                placeholder="Enter Dealer ID"
              />
            </div>
            <div>
              <label className="block font-rajdhani text-gray-400 text-xs tracking-widest uppercase mb-2">Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#111] border border-gray-800 text-white px-4 py-3 font-rajdhani focus:outline-none focus:border-jesko-gold transition-colors placeholder-gray-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-jesko-gold hover:bg-bright-gold text-black font-rajdhani font-bold uppercase tracking-[0.2em] py-4 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                "Access Systems"
              )}
            </button>
          </form>

          <div className="mt-auto pt-6 border-t border-carbon-gray text-center">
            <Link href="/" className="font-rajdhani text-gray-500 hover:text-jesko-gold text-xs tracking-widest uppercase transition-colors">
              &larr; Return to Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
