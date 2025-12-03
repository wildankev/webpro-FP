import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../lib/data';
import { formatRupiah } from '../lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
  onClick: () => void;
}

export function ProductCard({ product, onAddToCart, onClick }: ProductCardProps) {
  return (
    <div className="card-product group flex flex-col" onClick={onClick}>
      <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-gray-800">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <span className="badge-stock">
          Stok: {product.stock}
        </span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow bg-[#1E1E1E] rounded-b-2xl border-t-0 border border-[#333]">
        <small className="text-gray-500 mb-1">{product.category}</small>
        <h5 className="text-lg font-medium text-white mb-1 truncate" title={product.name}>
          {product.name}
        </h5>
        <div className="text-[#00B5E2] font-semibold text-lg mb-4">
          {formatRupiah(product.price)}
        </div>
        
        <button 
          className="w-full mt-auto py-1.5 px-4 rounded-lg border border-gray-600 text-gray-300 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 text-sm font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product.id);
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          Tambah
        </button>
      </div>
    </div>
  );
}
