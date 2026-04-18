"use client";

import { useMotionValueEvent, MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface JeskoScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
  onProgress?: (progress: number) => void;
}

export default function JeskoScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
  onProgress
}: JeskoScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedOrFailedCount = 0;
    const preloadImages = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `${imageFolderPath}/${i}.jpg`;
        
        const markDone = () => {
          loadedOrFailedCount++;
          if (onProgress) {
            onProgress((loadedOrFailedCount / totalFrames) * 100);
          }
          if (loadedOrFailedCount === totalFrames) {
            setImagesLoaded(true);
          }
        };

        img.onload = () => {
          markDone();
        };

        img.onerror = () => {
          console.error(`Failed to load frame: ${img.src}`);
          markDone();
        };
        imagesRef.current[i - 1] = img;
      }
    };
    preloadImages();
  }, [totalFrames, imageFolderPath]);

  // Handle Resize and Retina Displays
  const drawFrame = (frameIndex: number) => {
    const img = imagesRef.current[frameIndex];
    if (!img) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpi = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Only resize the canvas DOM element if the dimensions have actually changed
    // Setting canvas.width continuously during scroll drops frames and blanks the canvas
    if (canvas.width !== Math.floor(width * dpi) || canvas.height !== Math.floor(height * dpi)) {
      canvas.width = Math.floor(width * dpi);
      canvas.height = Math.floor(height * dpi);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpi, dpi);
    }

    // Object-fit: contain logic
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    // Clear previous drawing
    ctx.clearRect(0, 0, width, height);

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map progress 0-1 to frame index 0-239
    let frameIndex = Math.floor(latest * (totalFrames - 1));
    // Clamp to valid range just in case
    frameIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));
    drawFrame(frameIndex);
  });

  // Handle window resize to redraw at correct scale
  useEffect(() => {
    const handleResize = () => {
      // Redraw current frame based on current motion value
      const latest = scrollYProgress.get();
      let frameIndex = Math.floor(latest * (totalFrames - 1));
      frameIndex = Math.max(0, Math.min(frameIndex, totalFrames - 1));
      drawFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, scrollYProgress, totalFrames]);

  // Ensure frame 0 is drawn immediately when images finish loading
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0);
    }
  }, [imagesLoaded]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
