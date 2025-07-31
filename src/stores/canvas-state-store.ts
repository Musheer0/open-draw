import { create } from "zustand";
import type { Canvas } from "fabric";

type CanvasStore = {
  id: string;
  isSaved: boolean;
  setId: (id: string) => void;
  setIsSaved: (val: boolean) => void;
  AutoSave:boolean;
    setAutoSave: (val: boolean) => void;

};

export const useCanvasStore = create<CanvasStore>((set) => ({
  id: "", // default blank
  isSaved: true,
  setId: (id) => set({ id }),
  setIsSaved: (val) => set({ isSaved: val }),
  AutoSave:localStorage.getItem("autoSave")? JSON.parse(localStorage.getItem("autoSave")!).enabled :false,
  setAutoSave:(data)=>{
    localStorage.setItem("autoSave",JSON.stringify({enabled:data}));
    set({AutoSave:data})
  }
}));
