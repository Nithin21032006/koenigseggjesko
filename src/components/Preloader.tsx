import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
  return (
    <AnimatePresence>
      {progress < 100 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9000] bg-jesko-black flex flex-col items-center justify-center font-rajdhani"
        >
          <div className="space-y-8 text-center w-full max-w-sm px-6">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="font-orbitron text-jesko-gold tracking-[0.5em] text-xs md:text-sm uppercase"
            >
              System Initialization
            </motion.div>
            
            <div className="text-6xl md:text-8xl font-bold tracking-tighter text-white font-orbitron">
              {Math.round(progress)}<span className="text-jesko-gold text-2xl md:text-4xl ml-2">%</span>
            </div>
            
            <div className="w-full h-[2px] bg-carbon-gray mx-auto overflow-hidden relative">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-jesko-gold shadow-[0_0_15px_rgba(202,158,59,0.8)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
