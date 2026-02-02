
import React from 'react';
import { MapPin as MapPinIcon } from 'lucide-react';

interface MapPinProps {
  top: string;
  left: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
  ariaLabel?: string;
}

const MapPin: React.FC<MapPinProps> = ({ top, left, label, onClick, isActive, ariaLabel }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer group z-10 transition-transform duration-300 hover:scale-110 focus:outline-none"
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || `View details for ${label}`}
      aria-pressed={isActive}
    >
      {/* Pulse Effect */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className={`ring-pulse ${isActive ? 'opacity-100 scale-150' : ''}`}></div>
        <div className={`
          relative z-10 p-1.5 rounded-full shadow-lg transition-all duration-300 border-2
          ${isActive
            ? 'bg-gold-500 border-white text-diplomatic-900 scale-110'
            : 'bg-diplomatic-900 border-white text-white group-hover:bg-gold-400 group-hover:text-diplomatic-900 group-focus:ring-2 group-focus:ring-gold-400 group-focus:ring-offset-2'}
        `}>
          <MapPinIcon className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Label */}
      <div className={`
        mt-2 px-3 py-1 rounded-full text-xs font-bold shadow-md transition-all duration-300 border backdrop-blur-sm
        ${isActive
          ? 'bg-gold-500 text-diplomatic-900 border-white scale-110'
          : 'bg-white/90 text-diplomatic-900 border-diplomatic-100 opacity-80 group-hover:opacity-100 group-focus:opacity-100'}
      `}>
        {label}
      </div>
    </div>
  );
};

export default MapPin;
