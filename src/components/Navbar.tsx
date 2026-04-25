"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConfigurator } from "@/context/ConfiguratorContext";

export default function Navbar() {
  const { state } = useConfigurator();
  const pathname = usePathname();
  const isShowroomFlow = pathname.startsWith('/cars') || pathname.startsWith('/models') || pathname.startsWith('/configurator') || pathname === '/inquire';

  // Format price as $X,XXX,XXX
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(state.totalPrice);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-jesko-black/50 border-b border-carbon-gray transition-all">
      <Link href={isShowroomFlow ? "/cars" : "/"} className="font-orbitron text-2xl font-bold tracking-widest text-white hover:text-jesko-gold transition-colors">
        KOENIGSEGG
      </Link>
      <div className="flex items-center space-x-6">
        {isShowroomFlow ? (
          <>
            <div className="font-rajdhani text-sm font-medium tracking-widest text-jesko-gold">
              EST: {formattedPrice}
            </div>
            <Link href={`/configurator/${state.selectedCarId}`} className="font-rajdhani text-sm font-bold tracking-[0.1em] text-white hover:text-jesko-gold transition-colors uppercase">
              Configure
            </Link>
            <Link href="/inquire" className="font-rajdhani text-sm font-bold tracking-[0.2em] text-jesko-black bg-jesko-gold px-6 py-2 rounded-sm hover:bg-bright-gold transition-colors block">
              PRE-ORDER
            </Link>
          </>
        ) : (
          <Link href="/login" className="font-rajdhani text-sm font-bold tracking-[0.2em] text-white hover:text-jesko-gold transition-colors uppercase border border-white/20 px-6 py-2 hover:border-jesko-gold rounded-sm">
            DEALER LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
