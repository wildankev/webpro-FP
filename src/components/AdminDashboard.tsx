import React from 'react';
import { Product } from '../lib/data';
import { formatRupiah } from '../lib/utils';
import { Trash2 } from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onDelete: (id: number) => void;
  onLogout: () => void;
}

export function AdminDashboard({ products, onDelete, onLogout }: AdminDashboardProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard Admin</h2>
        <button 
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
        >
          Logout
        </button>
      </div>

      <div className="bg-[#1E1E1E] border border-[#333] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#252525] text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Produk</th>
                <th className="px-6 py-3">Harga</th>
                <th className="px-6 py-3">Stok</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[#252525]">
                  <td className="px-6 py-4">#{p.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="w-10 h-10 rounded object-cover bg-gray-700" />
                      <span className="font-medium text-white">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatRupiah(p.price)}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onDelete(p.id)}
                      className="text-red-500 hover:text-red-400 p-1 border border-red-900 rounded hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
