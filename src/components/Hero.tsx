import React from 'react';
import { ShoppingBag } from 'lucide-react';

export function Hero({ onShopNow }: { onShopNow: () => void }) {
  return (
    <div className="bg-gradient-to-br from-[#007BC0] to-[#00B5E2] rounded-[20px] p-8 md:p-12 mb-8 relative overflow-hidden shadow-lg">
      <div className="flex items-center relative z-10">
        <div className="md:w-7/12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Official Merchandise ITS
          </h1>
          <p className="text-white/90 text-lg mb-6 leading-relaxed">
            Dapatkan atribut resmi, perlengkapan kuliah, dan suvenir eksklusif Institut Teknologi Sepuluh Nopember.
          </p>
          <button 
            onClick={onShopNow}
            className="bg-white text-[#007BC0] font-bold px-8 py-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            Belanja Sekarang
          </button>
        </div>
        <div className="hidden md:flex md:w-5/12 justify-center items-center">
          <ShoppingBag className="w-48 h-48 text-white opacity-80 rotate-[-10deg]" />
        </div>
      </div>
      
      {/* Decorative Circle */}
      <div className="absolute -right-20 -bottom-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
    </div>
  );
}
