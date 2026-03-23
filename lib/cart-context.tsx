"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import type { Flavor } from "./utils";

/* ── Types ─────────────────────────────── */
export type CartItem = { flavor: Flavor; qty: number };

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD"; flavor: Flavor; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" }
  | { type: "OPEN" }
  | { type: "CLOSE" };

/* ── Reducer ────────────────────────────── */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find((i) => i.flavor.id === action.flavor.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.flavor.id === action.flavor.id
              ? { ...i, qty: i.qty + (action.qty ?? 1) }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { flavor: action.flavor, qty: action.qty ?? 1 }] };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.flavor.id !== action.id) };
    case "SET_QTY":
      return {
        ...state,
        items: action.qty <= 0
          ? state.items.filter((i) => i.flavor.id !== action.id)
          : state.items.map((i) => i.flavor.id === action.id ? { ...i, qty: action.qty } : i),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

/* ── Context ────────────────────────────── */
type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (flavor: Flavor, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const PRICE_PER_CAN = 3.99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vudu-cart");
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        parsed.forEach((item) => dispatch({ type: "ADD", flavor: item.flavor, qty: item.qty }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("vudu-cart", JSON.stringify(state.items));
    } catch {}
  }, [state.items]);

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal   = state.items.reduce((s, i) => s + i.qty * PRICE_PER_CAN, 0);

  const addItem    = useCallback((flavor: Flavor, qty = 1) => dispatch({ type: "ADD", flavor, qty }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE", id }), []);
  const setQty     = useCallback((id: string, qty: number) => dispatch({ type: "SET_QTY", id, qty }), []);
  const clearCart  = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart   = useCallback(() => dispatch({ type: "OPEN" }), []);
  const closeCart  = useCallback(() => dispatch({ type: "CLOSE" }), []);

  return (
    <CartContext.Provider value={{ items: state.items, isOpen: state.isOpen, totalItems, subtotal, addItem, removeItem, setQty, clearCart, openCart, closeCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const PRICE_PER_CAN_VALUE = PRICE_PER_CAN;
