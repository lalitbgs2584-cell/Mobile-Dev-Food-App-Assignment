import { create } from 'zustand';

type CounterStore = {
  isReady: boolean;
  goToOnboarding: () => void;
  
};

export const useSplashScreen = create<CounterStore>((set) => ({
  isReady: true,

  goToOnboarding: () =>
    set((state) => ({
      isReady: false,
    })),

}));