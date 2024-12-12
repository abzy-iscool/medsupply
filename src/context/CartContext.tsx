import React, { createContext, useContext, useReducer } from 'react';
import type { Product, CartItem, Order } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  orders: Order[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'PLACE_ORDER'; payload: { shippingAddress: string } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }
    case 'REMOVE_FROM_CART': {
      const item = state.items.find((item) => item.product.id === action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
        total: state.total - (item ? item.product.price * item.quantity : 0),
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + item.product.price * quantityDiff,
      };
    }
    case 'PLACE_ORDER': {
      const newOrder: Order = {
        id: `ORD${String(state.orders.length + 1).padStart(3, '0')}`,
        items: [...state.items],
        status: 'processing',
        totalAmount: state.total,
        shippingAddress: action.payload.shippingAddress,
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        createdAt: new Date(),
      };

      return {
        ...state,
        orders: [...state.orders, newOrder],
        items: [],
        total: 0,
      };
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
        total: 0,
      };
    }
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0,
    orders: []
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}