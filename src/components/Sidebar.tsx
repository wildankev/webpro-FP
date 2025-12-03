import React from 'react';
import { Home, Package, ShoppingCart, ShieldAlert, Info, Box } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  cartCount: number;
  onToggleCart: () => void;
  isOpen: boolean;
}

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  badge?: number;
}

function MenuItem({ icon: Icon, label, isActive, onClick, badge }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 px-5 py-3.5 rounded-xl cursor-pointer transition-colors w-full text-left",
        isActive 
          ? "bg-[#007feb] text-white shadow-lg shadow-blue-500/20" 
          : "text-[#808191] hover:bg-[#292929] hover:text-gray-200"
      )}
    >
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        <Icon className={cn("w-[21px] h-[21px]", isActive ? "text-white" : "text-current")} />
      </div>
      <span className="text-sm font-semibold flex-grow whitespace-nowrap">
        {label}
      </span>
      {badge !== undefined && badge > 0 && (
        <span className={cn(
          "text-xs font-bold px-2 py-0.5 rounded-full",
          isActive ? "bg-white text-[#007feb]" : "bg-[#007feb] text-white"
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

export function Sidebar({ activeView, onNavigate, cartCount, onToggleCart, isOpen }: SidebarProps) {
  return (
    <div className={cn(
      "w-[256px] h-screen fixed top-0 bg-[#141414] border-r border-[#292929]/50 flex flex-col pt-[35px] pb-8 overflow-y-auto shrink-0 z-[1040] transition-transform duration-300",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      {/* Logo Section */}
      <div className="px-[77px] pb-8 flex flex-col items-center justify-center relative">
        <Box className="w-[40px] h-[40px] text-[#007feb] mb-2" strokeWidth={1.5} />
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-white/90 leading-none"><span className="text-[#007feb]">my</span>ITS</h3>
          <p className="text-[12px] font-medium text-[#808191] mt-1">Merchandise</p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="px-5 flex flex-col gap-4">
        <div className="pl-5">
          <span className="text-xs font-medium text-[#808191] uppercase tracking-wider">Menu</span>
        </div>
        
        <div className="h-px bg-[#292929] mx-5" />
        
        <div className="flex flex-col gap-[1px]">
          <MenuItem 
            icon={Home} 
            label="Beranda" 
            isActive={activeView === 'home'} 
            onClick={() => onNavigate('home')} 
          />
          <MenuItem 
            icon={Package} 
            label="Katalog Produk" 
            isActive={activeView === 'catalog' || activeView === 'detail'} 
            onClick={() => onNavigate('catalog')} 
          />
          <MenuItem 
            icon={ShoppingCart} 
            label="Keranjang" 
            onClick={onToggleCart}
            badge={cartCount}
          />
        </div>
      </div>

      {/* Admin / Other Section */}
      <div className="mt-8 px-5 flex flex-col gap-4">
        <div className="pl-5">
          <span className="text-xs font-medium text-[#808191] uppercase tracking-wider">Admin & Info</span>
        </div>
        
        <div className="flex flex-col gap-[1px]">
          <MenuItem 
            icon={ShieldAlert} 
            label="Admin Panel" 
            isActive={activeView === 'login' || activeView === 'admin'} 
            onClick={() => onNavigate('login')} 
          />
          <MenuItem 
            icon={Info} 
            label="Tentang" 
            onClick={() => alert('ITS Merchandise © 2025')} 
          />
        </div>
      </div>
    </div>
  );
}
