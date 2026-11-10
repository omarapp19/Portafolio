"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type DesignMode = "glass" | "neo";

interface DesignContextType {
  designMode: DesignMode;
  toggleDesignMode: () => void;
  setDesignMode: (mode: DesignMode) => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

export function DesignProvider({ children }: { children: React.ReactNode }) {
  // Style switching removed: fixed to "glass".
  const [designMode] = useState<DesignMode>("glass");

  useEffect(() => {
    document.body.classList.remove("neo-mode");
    try {
      localStorage.removeItem("designMode");
    } catch {}
  }, []);

  const noop = () => {};

  return (
    <DesignContext.Provider value={{ designMode, toggleDesignMode: noop, setDesignMode: noop }}>
      {children}
    </DesignContext.Provider>
  );
}

export function useDesign() {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error("useDesign must be used within a DesignProvider");
  }
  return context;
}
