import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-jesko-black/50 border-b border-carbon-gray transition-all">
      <Link href="/" className="font-orbitron text-2xl font-bold tracking-widest text-white hover:text-jesko-gold transition-colors">
        KOENIGSEGG
      </Link>
      <Link href="/inquire" className="font-rajdhani text-sm font-bold tracking-[0.2em] text-jesko-black bg-jesko-gold px-6 py-2 rounded-sm hover:bg-bright-gold transition-colors block">
        INQUIRE
      </Link>
    </nav>
  );
}
