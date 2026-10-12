import { Resend } from 'resend';
import { products } from '../../../data/products';

const json = (body, status = 200) => Response.json(body, { status });
const money = (value) => new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD' }).format(value);

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) return json({ error: 'El envío de correo no está configurado en el servidor.' }, 503);
    if (!process.env.RESEND_FROM_EMAIL || !process.env.STORE_ORDER_EMAIL) return json({ error: 'Falta configurar el remitente o el correo de pedidos en el servidor.' }, 503);

    const customer = await request.json();
    const required = ['name', 'email', 'phone', 'address', 'city', 'postal'];
    if (!customer || required.some((key) => typeof customer[key] !== 'string' || !customer[key].trim())) return json({ error: 'Revisa los datos del formulario e inténtalo de nuevo.' }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) || customer.name.trim().length < 3 || customer.notes?.length > 1000) return json({ error: 'Los datos del cliente no son válidos.' }, 400);
    if (!Array.isArray(customer.items) || customer.items.length < 1 || customer.items.length > 40) return json({ error: 'El pedido no contiene productos válidos.' }, 400);

    // El servidor obtiene precio y disponibilidad del catálogo; nunca confía en importes del navegador.
    const orderItems = [];
    for (const item of customer.items) {
      const product = products.find((entry) => entry.id === item.id);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > product.stock) return json({ error: 'Un producto ya no está disponible en esa cantidad. Actualiza el carrito e inténtalo de nuevo.' }, 400);
      orderItems.push({ product, quantity });
    }

    const orderNumber = `PED-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 4).toUpperCase()}`;
    const orderDate = new Date().toLocaleString('es-VE', { dateStyle: 'long', timeStyle: 'short', timeZone: 'America/Caracas' });
    const total = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const lines = [
      `PEDIDO ${orderNumber}`,
      `Fecha: ${orderDate}`,
      '',
      'DATOS DEL CLIENTE',
      `Nombre: ${customer.name.trim()}`,
      `Correo: ${customer.email.trim()}`,
      `Teléfono: ${customer.phone.trim()}`,
      `Dirección de envío: ${customer.address.trim()}, ${customer.city.trim()}, ${customer.postal.trim()}`,
      customer.notes?.trim() ? `Notas: ${customer.notes.trim()}` : '',
      '',
      'PRODUCTOS',
      ...orderItems.map(({ product, quantity }) => `• ${product.name} — ${quantity} x ${money(product.price)} = ${money(product.price * quantity)}`),
      '',
      `TOTAL: ${money(total)}`,
    ].filter(Boolean);
    const detail = lines.join('\n');

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: [process.env.STORE_ORDER_EMAIL],
      replyTo: customer.email.trim(),
      subject: `Nuevo pedido ${orderNumber} — MiTech`,
      text: detail,
    });
    if (error) {
      console.error('Resend rechazó el pedido:', error.message);
      return json({ error: 'No pudimos enviar el pedido por correo. Verifica la configuración de Resend e inténtalo otra vez.' }, 502);
    }

    return json({ orderNumber, orderDate, detail, total, emailId: data?.id });
  } catch (error) {
    console.error('Error al procesar el pedido:', error);
    return json({ error: 'Ocurrió un error al procesar el pedido. Inténtalo de nuevo.' }, 500);
  }
}
