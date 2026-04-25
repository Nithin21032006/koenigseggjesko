"use client";

import { ReactNode } from "react";
import { ConfiguratorProvider } from "./ConfiguratorContext";
import { AudioProvider } from "./AudioContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      <ConfiguratorProvider>
        {children}
      </ConfiguratorProvider>
    </AudioProvider>
  );
}
