"use client";

import { useState, useRef, useEffect, use } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import { useConfigurator } from "@/context/ConfiguratorContext";
import { useAudio } from "@/context/AudioContext";
import { wheelOptions, interiorOptions, packageOptions } from "@/data/configOptions";
import { getCarById } from "@/data/cars";

type Tab = 'wheels' | 'interior' | 'packages';

export default function ConfiguratorPage({ params }: { params: Promise<{ carId: string }> }) {
  const { carId } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>('wheels');
  const [isScanning, setIsScanning] = useState(false);
  const { state, setWheels, setInterior, togglePackage, carData, setSelectedCarId } = useConfigurator();
  const { playHover, playSelect, playScanner } = useAudio();

  useEffect(() => {
    setSelectedCarId(carId);
  }, [carId, setSelectedCarId]);
  
  // Parallax / 3D Values
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for buttery movement
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], ["-20px", "20px"]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], ["-20px", "20px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -0.5 to 0.5
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "Included";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="bg-jesko-black min-h-screen text-white flex flex-col pt-24 overflow-x-hidden">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-6rem)] relative z-10">
        
        {/* Simulation Environment Area with Parallax Tracking */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full lg:w-2/3 h-[50vh] lg:h-full relative flex items-center justify-center bg-[#050505] border-r border-carbon-gray relative overflow-hidden"
          style={{ perspective: "1000px" }}
        >
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

          {/* Decorative glowing orb */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[120px] opacity-20 mix-blend-screen transition-all duration-1000 pointer-events-none bg-jesko-gold"
          ></div>

          {/* Live Car Visualizer (Parallax enabled) */}
          <motion.div 
            style={{ rotateX, rotateY, x: translateX, y: translateY }}
            className="relative w-full h-full flex items-center justify-center p-8 lg:p-16 z-10 pointer-events-none transform-style-3d"
          >
            <motion.div
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-5xl flex items-center justify-center"
            >
              {/* Base Image */}
              <img 
                src={carData.coverImage} 
                alt={`${carData.name} Configuration`} 
                className="w-full h-auto object-contain z-10 relative pointer-events-auto"
              />
            </motion.div>
          </motion.div>
          
          <div className="absolute bottom-12 left-12 z-20">
            <p className="font-orbitron text-xl text-white font-bold uppercase tracking-widest">{carData.name}</p>
            <p className="font-rajdhani text-gray-500 uppercase tracking-[0.3em] text-xs">Standard Configuration</p>
          </div>

          <p className="absolute bottom-8 right-12 font-rajdhani tracking-[0.4em] text-gray-500 uppercase text-xs z-20">
            Live Rendering Environment // Active
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="w-full lg:w-1/3 bg-jesko-black h-[50vh] lg:h-full flex flex-col overflow-hidden relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
          {/* Tabs */}
          <div className="flex border-b border-carbon-gray">
            {(['wheels', 'interior', 'packages'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onMouseEnter={playHover}
                onClick={() => {
                  playSelect();
                  setActiveTab(tab);
                }}
                className={`flex-1 py-5 font-rajdhani font-bold tracking-[0.2em] uppercase text-xs transition-colors relative ${
                  activeTab === tab ? 'text-jesko-gold' : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activetab" className="absolute bottom-0 left-0 right-0 h-1 bg-jesko-gold" />
                )}
              </button>
            ))}
          </div>

          {/* Options Scroll Area */}
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                
                {/* Wheels Options */}
                {activeTab === 'wheels' && (
                  <>
                    <h2 className="font-orbitron text-sm text-gray-500 tracking-[0.3em] uppercase mb-6">Select Wheels</h2>
                    {wheelOptions.map((opt) => (
                      <div 
                        key={opt.id}
                        onMouseEnter={playHover}
                        onClick={() => { playSelect(); setWheels(opt); }}
                        className={`p-5 border cursor-pointer transition-all flex items-center justify-between ${
                          state.wheels.id === opt.id ? 'border-jesko-gold bg-jesko-gold/5 shadow-[inset_0_0_20px_rgba(204,153,51,0.1)]' : 'border-carbon-gray hover:border-gray-500 bg-[#0a0a0a]'
                        }`}
                      >
                        <span className="font-rajdhani font-medium text-lg tracking-wider text-white">{opt.name}</span>
                        <span className="font-rajdhani text-sm text-jesko-gold tracking-widest">{formatPrice(opt.price)}</span>
                      </div>
                    ))}
                  </>
                )}

                {/* Interior Options */}
                {activeTab === 'interior' && (
                  <>
                    <h2 className="font-orbitron text-sm text-gray-500 tracking-[0.3em] uppercase mb-6">Select Upholstery</h2>
                    {interiorOptions.map((opt) => (
                      <div 
                        key={opt.id}
                        onMouseEnter={playHover}
                        onClick={() => { playSelect(); setInterior(opt); }}
                        className={`p-5 border cursor-pointer transition-all flex items-center justify-between group ${
                          state.interior.id === opt.id ? 'border-jesko-gold bg-jesko-gold/5 shadow-[inset_0_0_20px_rgba(204,153,51,0.1)]' : 'border-carbon-gray hover:border-gray-500 bg-[#0a0a0a]'
                        }`}
                      >
                         <div className="flex items-center space-x-5">
                          <div 
                            className="w-12 h-12 border-2 border-gray-700 shadow-inner group-hover:scale-110 transition-transform duration-300 rounded-sm"
                            style={{ backgroundColor: opt.colorHex }}
                          ></div>
                          <span className="font-rajdhani font-medium text-lg tracking-wider text-white">{opt.name}</span>
                        </div>
                        <span className="font-rajdhani text-sm text-jesko-gold tracking-widest">{formatPrice(opt.price)}</span>
                      </div>
                    ))}
                  </>
                )}

                {/* Package Options */}
                {activeTab === 'packages' && (
                  <>
                    <h2 className="font-orbitron text-sm text-gray-500 tracking-[0.3em] uppercase mb-6">Select Additions</h2>
                    {packageOptions.map((opt) => {
                      const isSelected = state.packages.some(p => p.id === opt.id);
                      return (
                        <div 
                          key={opt.id}
                          onMouseEnter={playHover}
                          onClick={() => { playSelect(); togglePackage(opt); }}
                          className={`p-5 border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected ? 'border-jesko-gold bg-jesko-gold/5 shadow-[inset_0_0_20px_rgba(204,153,51,0.1)]' : 'border-carbon-gray hover:border-gray-500 bg-[#0a0a0a]'
                          }`}
                        >
                          <div className="flex items-center space-x-5">
                            <div className={`w-6 h-6 border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-jesko-gold bg-jesko-gold' : 'border-gray-600 bg-transparent'}`}>
                              {isSelected && <span className="text-black text-sm block -mt-[2px]">✓</span>}
                            </div>
                            <span className="font-rajdhani font-medium text-lg tracking-wider text-white">{opt.name}</span>
                          </div>
                          <span className="font-rajdhani text-sm text-jesko-gold tracking-widest">+{formatPrice(opt.price)}</span>
                        </div>
                      )
                    })}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}
