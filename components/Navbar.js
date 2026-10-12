'use client';
import Link from 'next/link';
import { useState } from 'react';
import { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
export default function Navbar() {
  const [menu, setMenu] = useState(false); const { count, dispatch } = useCart();
  return <header className="sticky top-0 z-40 border-b line backdrop-blur-xl" style={{background:'color-mix(in srgb, var(--bg) 88%, transparent)'}}><div className="container flex h-[72px] items-center justify-between gap-6">
    <Link href="/" className="text-xl font-extrabold tracking-tight">mi<span className="accent">tech</span><span className="accent">.</span></Link>
    <nav className="hidden items-center gap-7 md:flex">{categories.map(c=><Link key={c.slug} href={`/categoria/${c.slug}`} className="text-sm font-medium muted hover:text-inherit">{c.name}</Link>)}</nav>
    <div className="flex items-center gap-2"><ThemeToggle/><button id="cart-trigger" aria-label={`Abrir carrito, ${count} artículos`} onClick={()=>dispatch({type:'OPEN'})} className="relative flex h-10 items-center gap-2 rounded-full border line surface px-4"><span>Carrito</span><span className="grid h-5 min-w-5 place-items-center rounded-full bg-electric px-1 text-xs text-white">{count}</span></button><button aria-label="Abrir menú" className="rounded-full border line px-3 py-2 md:hidden" onClick={()=>setMenu(!menu)}>{menu?'×':'☰'}</button></div>
  </div>{menu&&<nav className="container grid gap-1 pb-4 md:hidden">{categories.map(c=><Link onClick={()=>setMenu(false)} className="rounded-xl px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5" key={c.slug} href={`/categoria/${c.slug}`}>{c.name}</Link>)}</nav>}</header>;
}
