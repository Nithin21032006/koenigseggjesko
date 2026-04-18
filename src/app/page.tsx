"use client";

import { useRef, useState } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import JeskoScrollCanvas from "@/components/JeskoScrollCanvas";
import JeskoExperience from "@/components/JeskoExperience";
import SpecsGrid from "@/components/SpecsGrid";
import Features from "@/components/Features";
import Aerodynamics from "@/components/Aerodynamics";
import Interior from "@/components/Interior";
import Preloader from "@/components/Preloader";
import EngineIgnition from "@/components/EngineIgnition";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-jesko-black min-h-screen">
      <Preloader progress={loadProgress} />
      <Navbar />
      
      {/* SCROLL SEQUENCE (Locked for 600vh) */}
      <section ref={containerRef} className="h-[600vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-jesko-black">
          <JeskoScrollCanvas 
            scrollYProgress={scrollYProgress} 
            totalFrames={240} 
            imageFolderPath="/images/jesko-sequence" 
            onProgress={setLoadProgress}
          />
          <JeskoExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE (Scrolls naturally after sequence) */}
      <div className="relative z-20 bg-jesko-black">
        <SpecsGrid />
        <Features />
        <Aerodynamics />
        <Interior />
        <EngineIgnition />
      </div>
      
      <footer className="border-t border-carbon-gray py-8 text-center text-gray-500 font-rajdhani text-sm tracking-widest bg-jesko-black relative z-20">
        &copy; {new Date().getFullYear()} KOENIGSEGG SHOWCASE. CONCEPT DESIGN.
      </footer>
    </main>
  );
}
