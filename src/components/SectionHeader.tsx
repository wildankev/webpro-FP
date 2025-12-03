import React from 'react';
import { FigmaIcon } from './FigmaIcon';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <h2 className="text-[20px] text-white/90 font-['Poppins'] tracking-tight">
        {title}
      </h2>
      <button 
        onClick={onSeeAll}
        className="flex items-center gap-1 text-[13.8px] font-semibold text-white/90 hover:text-white transition-colors"
      >
        Lihat semua
        <div className="w-[18px] h-[18px]">
          <FigmaIcon path="pe71b400" viewBox="0 0 18 18" />
        </div>
      </button>
    </div>
  );
}
