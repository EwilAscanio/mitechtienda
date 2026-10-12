'use client';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
const CartContext = createContext(null);
function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': return { ...state, items: action.items || [] };
    case 'ADD': {
      const found = state.items.find((i) => i.id === action.product.id);
      return { ...state, items: found ? state.items.map((i) => i.id === found.id ? { ...i, quantity: Math.min(i.quantity + 1, i.stock) } : i) : [...state.items, { ...action.product, quantity: 1 }], open: true };
    }
    case 'SET_QTY': return { ...state, items: state.items.map((i) => i.id === action.id ? { ...i, quantity: Math.max(1, Math.min(Number(action.quantity) || 1, i.stock)) } : i) };
    case 'REMOVE': return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'OPEN': return { ...state, open: true };
    case 'CLOSE': return { ...state, open: false };
    case 'CLEAR': return { ...state, items: [], open: false };
    default: return state;
  }
}
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [], open: false });
  useEffect(() => { try { dispatch({ type: 'HYDRATE', items: JSON.parse(localStorage.getItem('mitech-cart') || '[]') }); } catch { dispatch({ type: 'HYDRATE', items: [] }); } }, []);
  useEffect(() => { localStorage.setItem('mitech-cart', JSON.stringify(state.items)); }, [state.items]);
  const value = useMemo(() => ({ ...state, dispatch, count: state.items.reduce((n, i) => n + i.quantity, 0), total: state.items.reduce((n, i) => n + i.quantity * i.price, 0) }), [state]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => { const context = useContext(CartContext); if (!context) throw new Error('useCart debe usarse dentro de CartProvider'); return context; };
