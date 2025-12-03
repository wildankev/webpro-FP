import React from 'react';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../lib/data';
import { formatRupiah, cn } from '../lib/utils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, cart, onRemove, onCheckout }: CartDrawerProps) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-[1050] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-[350px] bg-[#1E1E1E] border-l border-[#333] z-[1060] transition-transform duration-300 flex flex-col shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 border-b border-[#333] flex justify-between items-center">
          <h5 className="text-lg font-semibold text-white">Keranjang Belanja</h5>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="flex-grow overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
              <p>Keranjang masih kosong</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b border-[#333]">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-[60px] h-[60px] rounded-lg object-cover bg-gray-800"
                  />
                  <div className="flex-grow min-w-0">
                    <h6 className="text-sm font-medium text-white truncate">{item.name}</h6>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatRupiah(item.price)} x {item.qty}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                    <span className="text-sm font-bold text-[#00B5E2]">
                      {formatRupiah(item.price * item.qty)}
                    </span>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#333] bg-[#1E1E1E]">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-medium text-white">Total</span>
            <span className="text-lg font-bold text-[#00B5E2]">{formatRupiah(total)}</span>
          </div>
          <button 
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full py-3 bg-[#007BC0] hover:bg-[#005A8D] text-white rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout Sekarang
          </button>
        </div>
      </div>
    </>
  );
}
