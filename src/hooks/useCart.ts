import { useCartStore } from '../store/cartStore';

const parsePrice = (value: string) => Number(value.replace(/[^0-9.]/g, '')) || 0;

const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

export const useCart = () => {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const incrementItem = useCartStore((state) => state.incrementItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotalValue = items.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0
  );
  const deliveryFeeValue = items.length > 0 ? 2.99 : 0;
  const totalValue = subtotalValue + deliveryFeeValue;

  return {
    hasHydrated,
    items,
    itemCount,
    isEmpty: items.length === 0,
    summary: {
      subtotal: formatCurrency(subtotalValue),
      deliveryFee: formatCurrency(deliveryFeeValue),
      total: formatCurrency(totalValue),
    },
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
  };
};
