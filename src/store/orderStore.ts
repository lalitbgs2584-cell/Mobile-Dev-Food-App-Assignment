import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CartLineItem } from '../constants/mockData';

export type StoredOrderStep = {
  id: string;
  label: string;
  state: 'done' | 'active' | 'pending';
};

export type StoredOrder = {
  id: string;
  restaurantName: string;
  image: string;
  itemCount: number;
  items: CartLineItem[];
  subtotal: string;
  deliveryFee: string;
  total: string;
  statusText: string;
  eta: string;
  placedAt: string;
  rider: {
    name: string;
    role: string;
    rating: string;
    avatarUri?: string;
  };
  steps: StoredOrderStep[];
};

type OrderStoreState = {
  hasHydrated: boolean;
  currentOrder: StoredOrder | null;
  pastOrders: StoredOrder[];
  placeOrder: (input: {
    items: CartLineItem[];
    summary: {
      subtotal: string;
      deliveryFee: string;
      total: string;
    };
  }) => StoredOrder;
  setHasHydrated: (value: boolean) => void;
};

const getUniqueRestaurantNames = (items: CartLineItem[]) => [
  ...new Set(items.map((item) => item.subtitle)),
];

const getRestaurantLabel = (items: CartLineItem[]) => {
  const restaurants = getUniqueRestaurantNames(items);

  if (restaurants.length === 0) {
    return 'Your Order';
  }

  if (restaurants.length === 1) {
    return restaurants[0];
  }

  return `${restaurants[0]} + ${restaurants.length - 1} more`;
};

const createOrderId = () => `#ORD${Date.now().toString().slice(-6)}`;

const createCurrentOrderSteps = (): StoredOrderStep[] => [
  { id: 'st1', label: 'Confirmed', state: 'active' },
  { id: 'st2', label: 'Preparing', state: 'pending' },
  { id: 'st3', label: 'On the way', state: 'pending' },
  { id: 'st4', label: 'Delivered', state: 'pending' },
];

const createDeliveredSteps = (): StoredOrderStep[] => [
  { id: 'st1', label: 'Confirmed', state: 'done' },
  { id: 'st2', label: 'Preparing', state: 'done' },
  { id: 'st3', label: 'On the way', state: 'done' },
  { id: 'st4', label: 'Delivered', state: 'done' },
];

const buildOrderRecord = (input: {
  items: CartLineItem[];
  summary: {
    subtotal: string;
    deliveryFee: string;
    total: string;
  };
}): StoredOrder => ({
  id: createOrderId(),
  restaurantName: getRestaurantLabel(input.items),
  image: input.items[0]?.image ?? '',
  itemCount: input.items.reduce((total, item) => total + item.quantity, 0),
  items: input.items.map((item) => ({ ...item })),
  subtotal: input.summary.subtotal,
  deliveryFee: input.summary.deliveryFee,
  total: input.summary.total,
  statusText: 'Order placed',
  eta: '25-30 min',
  placedAt: new Date().toISOString(),
  rider: {
    name: 'Assigning rider',
    role: 'A delivery partner will be assigned shortly',
    rating: '--',
  },
  steps: createCurrentOrderSteps(),
});

const archiveOrder = (order: StoredOrder): StoredOrder => ({
  ...order,
  statusText: 'Delivered',
  eta: 'Delivered',
  rider: {
    ...order.rider,
    name: order.rider.name === 'Assigning rider' ? 'Delivery completed' : order.rider.name,
    role: 'Delivered to your saved address',
  },
  steps: createDeliveredSteps(),
});

export const useOrderStore = create<OrderStoreState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      currentOrder: null,
      pastOrders: [],
      placeOrder: (input) => {
        const nextOrder = buildOrderRecord(input);
        const existingCurrentOrder = get().currentOrder;

        set((state) => ({
          currentOrder: nextOrder,
          pastOrders: existingCurrentOrder
            ? [archiveOrder(existingCurrentOrder), ...state.pastOrders]
            : state.pastOrders,
        }));

        return nextOrder;
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'foodapp-orders',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentOrder: state.currentOrder,
        pastOrders: state.pastOrders,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
