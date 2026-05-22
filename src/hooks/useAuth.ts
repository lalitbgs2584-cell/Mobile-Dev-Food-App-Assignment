import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const hasSeenOnboarding = useAuthStore((state) => state.hasSeenOnboarding);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  return {
    hasHydrated,
    hasSeenOnboarding,
    isAuthenticated,
    user,
    login,
    logout,
    completeOnboarding,
  };
};
