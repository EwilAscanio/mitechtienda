'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '../data/products';

export default function Hero() {
  const featuredLaptop = products.find((product) => product.slug === 'macbook-air-15-m3');

  return <section className="container pt-7 md:pt-10"><div className="relative min-h-[540px] overflow-hidden rounded-[32px] bg-[#10131b] text-white md:min-h-[600px]">
    <Image src={featuredLaptop.images[0]} alt={featuredLaptop.name} fill priority sizes="(max-width:768px) 100vw,1200px" className="object-cover object-[68%_center] opacity-65 md:object-[72%_center] md:opacity-75" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,#10131b_0%,rgba(16,19,27,.96)_30%,rgba(16,19,27,.65)_58%,rgba(16,19,27,.08)_100%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(83,109,254,.28),transparent_38%)]" />
    <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="relative z-10 flex min-h-[540px] max-w-2xl flex-col justify-center px-7 py-14 md:min-h-[600px] md:px-16">
      <span className="mb-5 text-xs font-semibold uppercase tracking-[.25em] text-blue-200">TECNOLOGÍA, CON INTENCIÓN</span>
      <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-.06em] md:text-7xl">Tu próxima gran idea empieza aquí.</h1>
      <p className="mt-6 max-w-md text-base leading-7 text-white/75 md:text-lg">Tecnología que acompaña tu ritmo, despierta ideas y hace que cada día funcione mejor.</p>
      <div className="mt-9 flex flex-wrap gap-3"><Link href="#catalogo" className="btn-primary">Explorar colección <span>↗</span></Link><span className="self-center text-xs text-white/70">Selección experta · Envío a todo el país</span></div>
    </motion.div>
    <div className="absolute bottom-8 right-8 z-10 hidden rounded-full border border-white/20 bg-black/25 px-4 py-2 text-sm backdrop-blur md:block">{featuredLaptop.name} <span className="ml-2 text-blue-200">●</span></div>
  </div></section>;
}
