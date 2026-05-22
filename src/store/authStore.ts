import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  avatarUri?: string;
};

type AuthState = {
  hasHydrated: boolean;
  hasSeenOnboarding: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  completeOnboarding: () => void;
  login: (user: AuthUser) => void;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
};

const defaultState = {
  hasHydrated: false,
  hasSeenOnboarding: false,
  isAuthenticated: false,
  user: null,
} satisfies Pick<
  AuthState,
  'hasHydrated' | 'hasSeenOnboarding' | 'isAuthenticated' | 'user'
>;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...defaultState,
      completeOnboarding: () => set({ hasSeenOnboarding: true }),
      login: (user) =>
        set({
          hasSeenOnboarding: true,
          isAuthenticated: true,
          user,
        }),
      logout: () =>
        set({
          hasSeenOnboarding: true,
          isAuthenticated: false,
          user: null,
        }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'foodapp-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasSeenOnboarding: state.hasSeenOnboarding,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
