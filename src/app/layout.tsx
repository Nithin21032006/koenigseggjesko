import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import { Providers } from "@/context/Providers";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KOENIGSEGG JESKO - Scrollytelling Showcase",
  description: "Experience the Ultimate Mega Car in an immersive scroll journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} antialiased bg-jesko-black text-white selection:bg-jesko-gold selection:text-jesko-black min-h-screen relative`}
      >
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}
