'use client';
import Link from 'next/link';
import CheckoutForm from '../../components/CheckoutFormResend';
import OrderSummary from '../../components/OrderSummary';
export default function CheckoutPage(){return <section className="container section-space"><Link href="/" className="text-sm muted">← Seguir explorando</Link><div className="mb-8 mt-6"><p className="eyebrow">Ya casi es tuyo</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Finaliza tu pedido</h1><p className="mt-2 muted">Completa tus datos y te contactaremos para coordinar la entrega.</p></div><div className="grid items-start gap-6 lg:grid-cols-[1.2fr_.8fr]"><CheckoutForm/><OrderSummary/></div></section>}
