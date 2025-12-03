import React from 'react';
import { Item } from '../lib/data';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="relative h-[400px] w-full rounded-[24px] bg-[#222222] overflow-hidden group flex flex-col shadow-[0px_10px_160px_10px_rgba(17,12,46,0.05)]">
      {/* Image Section */}
      <div className="h-[200px] m-[10px] rounded-[16px] overflow-hidden relative bg-[#313131] shrink-0">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 px-4 pt-4 pb-4 flex flex-col">
        {/* Header: Location + Badge */}
        <div className="flex justify-between items-center mb-1.5">
          <div className="flex items-center text-white/90 text-xs font-medium truncate max-w-[70%]">
            {item.location}
          </div>
          <div className="bg-[#008fff] px-1.5 py-0.5 rounded-md">
            <span className="text-white text-xs font-medium">{item.status}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15.6px] font-semibold text-white/90 leading-6 mb-0.5 truncate">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-[#9a9a9f] text-sm font-medium leading-[21px] line-clamp-2">
          {item.description}
        </p>

        {/* Footer: Button */}
        <div className="mt-auto">
          <button className="w-full h-[36px] flex items-center justify-center rounded-xl border border-[#808080] text-white text-[13px] font-semibold hover:bg-white/10 transition-colors">
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
