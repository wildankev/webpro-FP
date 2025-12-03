import React from 'react';
import { Product } from '../lib/data';
import { formatRupiah } from '../lib/utils';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (id: number) => void;
}

export function ProductDetail({ product, onBack, onAddToCart }: ProductDetailProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Kembali
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#1E1E1E] p-4 rounded-2xl border border-[#333]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded-xl"
          />
        </div>

        <div>
          <div className="text-[#007BC0] font-bold mb-2 uppercase tracking-wider text-sm">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {product.name}
          </h1>
          <div className="text-[#00B5E2] text-2xl font-bold mb-6">
            {formatRupiah(product.price)}
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            {product.desc}
          </p>

          <div className="bg-[#1E1E1E] border border-[#333] rounded-xl p-5 mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Stok Tersedia</span>
              <span className="font-bold text-white">{product.stock} pcs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Pengiriman</span>
              <span className="font-bold text-white">Surabaya</span>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product.id)}
            className="w-full py-4 bg-[#007BC0] hover:bg-[#005A8D] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-6 h-6" />
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}
