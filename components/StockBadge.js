export default function StockBadge({ stock }) { return <span className={`text-sm ${stock <= 4 ? 'text-orange-600' : 'text-emerald-600'}`}>{stock <= 4 ? `¡Quedan ${stock}!` : 'Disponible'}</span>; }
