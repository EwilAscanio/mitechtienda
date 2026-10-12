import ProductCard from './ProductCard';
export default function ProductGrid({ products }) { return <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">{products.map((p,i)=><ProductCard key={p.id} product={p} index={i}/>)}</div>; }
