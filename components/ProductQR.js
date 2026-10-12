'use client';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { absoluteProductUrl } from '../lib/utils';
export default function ProductQR({slug}){const [src,setSrc]=useState('');useEffect(()=>{QRCode.toDataURL(absoluteProductUrl(slug),{width:180,margin:1,color:{dark:'#17191f',light:'#ffffff'}}).then(setSrc).catch(()=>setSrc(''))},[slug]);return <div className="flex items-center gap-5 rounded-2xl border line p-5"><div className="grid h-[128px] w-[128px] shrink-0 place-items-center rounded-xl bg-white p-2">{src?<img src={src} alt="Código QR para ver este producto" className="h-full w-full"/>:<span className="text-xs muted">Generando QR…</span>}</div><div><h3 className="font-semibold">Llévalo en tu móvil</h3><p className="mt-2 text-sm leading-6 muted">Escanea para ver este producto en tu móvil.</p></div></div>}
