export const formatPrice = (value) => new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
export const makeOrderNumber = () => `PED-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
export const absoluteProductUrl = (slug) => `${typeof window !== 'undefined' ? window.location.origin : 'https://mitechstore.com'}/producto/${slug}`;
