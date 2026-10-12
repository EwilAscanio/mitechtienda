'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import RatingStars from './RatingStars';
export default function ProductCard({ product, index=0 }) {
 const {dispatch}=useCart(); const [flight,setFlight]=useState(null); const discount=product.compareAtPrice?Math.round((1-product.price/product.compareAtPrice)*100):0;
 function addToCart(event){dispatch({type:'ADD',product});const from=event.currentTarget.getBoundingClientRect();const target=document.getElementById('cart-trigger')?.getBoundingClientRect();if(target)setFlight({x:from.left+from.width/2,y:from.top+from.height/2,toX:target.left+target.width/2,toY:target.top+target.height/2});}
 return <motion.article initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{delay:(index%4)*.06,duration:.4}} className="group relative">
  <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/4.4] overflow-hidden rounded-[22px] surface"><Image src={product.images[0]} alt={product.name} fill sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw" className="object-cover transition duration-700 group-hover:scale-105"/><Image src={product.images[1]} alt="" fill sizes="(max-width:640px) 50vw,25vw" className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"/><div className="absolute left-3 top-3 flex flex-col gap-2">{discount>0&&<span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-ink">-{discount}%</span>}{product.isNew&&<span className="rounded-full bg-electric px-3 py-1 text-[10px] font-bold text-white">Nuevo</span>}</div></Link>
  <button onClick={addToCart} aria-label={`Agregar ${product.name} al carrito`} className="absolute right-3 top-[calc(100%-155px)] grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-ink text-xl text-white opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100">+</button>
  {flight&&<motion.div aria-hidden="true" initial={{left:flight.x-28,top:flight.y-28,scale:1,opacity:1}} animate={{left:flight.toX-28,top:flight.toY-28,scale:.18,opacity:0}} transition={{duration:.65,ease:[.22,.68,0,1]}} onAnimationComplete={()=>setFlight(null)} className="pointer-events-none fixed z-[70] h-14 w-14 overflow-hidden rounded-full shadow-xl"><Image src={product.images[0]} alt="" fill sizes="56px" className="object-cover"/></motion.div>}
  <div className="pt-4"><div className="flex items-center justify-between gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.15em] muted">{product.brand}</span><RatingStars rating={product.rating}/></div><Link href={`/producto/${product.slug}`} className="mt-1 block font-semibold tracking-tight">{product.name}</Link><div className="mt-2 flex items-center gap-2"><span className="font-semibold">{formatPrice(product.price)}</span>{product.compareAtPrice&&<del className="text-sm muted">{formatPrice(product.compareAtPrice)}</del>}</div></div>
 </motion.article>;
}
