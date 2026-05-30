import { create } from "zustand";

interface ScrollState {
  heroScrollProgress: number;
  setHeroScrollProgress: (progress: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  heroScrollProgress: 0,
  setHeroScrollProgress: (progress) => set({ heroScrollProgress: progress }),
}));
