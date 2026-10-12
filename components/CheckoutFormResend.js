'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

const fields = [
  ['name', 'Nombre completo', 'text'],
  ['email', 'Correo electrónico', 'email'],
  ['phone', 'Teléfono', 'tel'],
  ['address', 'Dirección de envío', 'text'],
  ['city', 'Ciudad', 'text'],
  ['postal', 'Código postal', 'text'],
];

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = 'Indica tu nombre completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Ingresa un correo electrónico válido.';
  if (values.phone.replace(/\D/g, '').length < 7) errors.phone = 'Ingresa un teléfono válido.';
  if (values.address.trim().length < 5) errors.address = 'Indica una dirección de envío completa.';
  if (values.city.trim().length < 2) errors.city = 'Indica tu ciudad.';
  if (values.postal.trim().length < 3) errors.postal = 'Ingresa un código postal válido.';
  return errors;
}

export default function CheckoutFormResend() {
  const { items, total, dispatch } = useCart();
  const [values, setValues] = useState({ name: '', email: '', phone: '', address: '', city: '', postal: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [requestError, setRequestError] = useState('');
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setRequestError('');
    if (Object.keys(validationErrors).length || !items.length || sending) return;

    setSending(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, items: items.map(({ id, quantity }) => ({ id, quantity })) }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'No pudimos enviar el pedido. Inténtalo de nuevo.');
      setSuccess({ ...result, items: [...items] });
      dispatch({ type: 'CLEAR' });
    } catch (error) {
      setRequestError(error.message || 'No pudimos conectar con el servicio de correo. Inténtalo de nuevo.');
    } finally {
      setSending(false);
    }
  }

  async function copyDetail() {
    try {
      await navigator.clipboard.writeText(success.detail);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (success) return <section className="mx-auto max-w-2xl py-12 text-center">
    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-100 text-4xl text-emerald-700 dark:bg-emerald-950">✓</div>
    <p className="eyebrow mt-6">Pedido enviado</p>
    <h1 className="mt-2 text-4xl font-semibold tracking-tight">¡Gracias por elegir MiTech!</h1>
    <p className="mt-3 muted">Tu número de pedido es <strong className="text-inherit">#{success.orderNumber}</strong></p>
    <p className="mt-3 text-sm leading-6 muted">Enviamos los detalles a nuestro equipo. Te contactaremos por correo para confirmar disponibilidad y coordinar la entrega.</p>
    <div className="mt-8 rounded-2xl border line p-5 text-left"><div className="font-semibold">Resumen · {success.items.length} {success.items.length === 1 ? 'producto' : 'productos'}</div>
      {success.items.map((item) => <div key={item.id} className="mt-3 flex justify-between gap-4 text-sm"><span>{item.name} × {item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>)}
      <div className="mt-4 flex justify-between border-t line pt-3 font-semibold"><span>Total</span><span>{formatPrice(success.total)}</span></div>
    </div>
    <div className="mt-5 flex flex-wrap justify-center gap-3"><button onClick={copyDetail} className="btn-secondary">{copied ? 'Detalle copiado' : 'Copiar detalle del pedido'}</button><a href="/" className="btn-primary">Volver a la tienda</a></div>
  </section>;

  return <form onSubmit={submit} noValidate className="rounded-3xl border line p-6 sm:p-8">
    <h2 className="text-xl font-semibold">Datos de envío</h2>
    <p className="mt-2 text-sm muted">Te contactaremos para confirmar disponibilidad y envío.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2">{fields.map(([key, label, type]) => <label key={key} className={`text-sm font-medium ${key === 'name' || key === 'address' ? 'sm:col-span-2' : ''}`}>{label}
      <input className="input mt-2" type={type} value={values[key]} onChange={(event) => { setValues({ ...values, [key]: event.target.value }); setErrors({ ...errors, [key]: '' }); }} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : undefined} />
      {errors[key] && <span id={`${key}-error`} role="alert" className="mt-1 block text-xs text-red-600">{errors[key]}</span>}
    </label>)}</div>
    <label className="mt-4 block text-sm font-medium">Notas opcionales<textarea className="input mt-2 min-h-24 resize-y" placeholder="Referencias para la entrega…" value={values.notes} onChange={(event) => setValues({ ...values, notes: event.target.value })} /></label>
    {requestError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200">{requestError}</p>}
    {!items.length && <p className="mt-4 text-sm text-orange-600">Tu carrito está vacío. Agrega productos antes de finalizar el pedido.</p>}
    <button disabled={!items.length || sending} className="btn-primary mt-6 w-full disabled:cursor-wait disabled:opacity-50">{sending ? 'Enviando pedido…' : `Enviar pedido por correo · ${formatPrice(total)}`} <span>→</span></button>
    <p className="mt-3 text-center text-xs muted">No se realiza ningún pago en esta página.</p>
  </form>;
}
