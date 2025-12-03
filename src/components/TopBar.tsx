import React from 'react';

export function TopBar() {
  return (
    <div className="flex justify-end py-8 px-8">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-white/10 cursor-pointer">
        <img 
          src="https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?w=100&h=100&fit=crop" 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
