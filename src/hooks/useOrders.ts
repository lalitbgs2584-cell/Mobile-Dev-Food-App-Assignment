import { useOrderStore } from '../store/orderStore';

export const useOrders = () => {
  const hasHydrated = useOrderStore((state) => state.hasHydrated);
  const currentOrder = useOrderStore((state) => state.currentOrder);
  const pastOrders = useOrderStore((state) => state.pastOrders);
  const placeOrder = useOrderStore((state) => state.placeOrder);

  return {
    hasHydrated,
    currentOrder,
    pastOrders,
    placeOrder,
  };
};
