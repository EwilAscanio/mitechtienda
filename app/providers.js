'use client';
import { useEffect } from 'react';
import { CartProvider } from '../context/CartContext';
export default function Providers({ children }) {
  useEffect(() => { const saved = localStorage.getItem('mitech-theme'); if (saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); }, []);
  return <CartProvider>{children}</CartProvider>;
}
