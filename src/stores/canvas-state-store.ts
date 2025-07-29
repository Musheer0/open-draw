import { create } from "zustand";
import type { Canvas } from "fabric";

type CanvasStore = {
  id: string;
  isSaved: boolean;
  setId: (id: string) => void;
  setIsSaved: (val: boolean) => void;
};

export const useCanvasStore = create<CanvasStore>((set) => ({
  id: "", // default blank
  isSaved: true,
  setId: (id) => set({ id }),
  setIsSaved: (val) => set({ isSaved: val }),
}));
