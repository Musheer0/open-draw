"use client"; 
import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the context shape
type AssetManagerContextType = {
  isAssetManagerOpen: boolean;
  setAssetManagerOpen: (value: boolean) => void;
};

// 2. Create the context with default undefined
const AssetManagerContext = createContext<AssetManagerContextType | undefined>(undefined);

// 3. Create the provider
export const AssetManagerProvider = ({ children }: { children: ReactNode }) => {
  const [isAssetManagerOpen, setAssetManagerOpen] = useState(false);

  return (
    <AssetManagerContext.Provider value={{ isAssetManagerOpen, setAssetManagerOpen }}>
      {children}
    </AssetManagerContext.Provider>
  );
};

// 4. Optional custom hook (for clean use in components)
export const useAssetManager = () => {
  const context = useContext(AssetManagerContext);
  if (!context) throw new Error("useAssetManager must be used within an AssetManagerProvider");
  return context;
};
