
import React, { useState, useRef, useEffect } from 'react';
import { RegionData, RegionID, Language } from '../types';
import MapPin from './MapPin';
import { ZoomIn, ZoomOut, Maximize, Move, Info, X, MapPin as PinIcon } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface InteractiveMapProps {
  regions: RegionData[];
  activeRegionId: string | null;
  onRegionSelect: (id: string) => void;
  language: Language;
}

// Coordinates in Percentage (0-100) on the map image
const VIETNAM_COORDS = { x: 77.5, y: 56 }; // Approximate location of Vietnam

const APEC_PARTNERS = [
  { name: 'USA', x: 22, y: 89 },
  { name: 'China', x: 79, y: 38 },
  { name: 'Japan', x: 86, y: 34 },
  { name: 'Russia', x: 75, y: 18 },
  { name: 'South Korea', x: 83, y: 36 },
  { name: 'Australia', x: 86, y: 75 },
  { name: 'Canada', x: 22, y: 25 },
  { name: 'Singapore', x: 77, y: 62 },
];

const InteractiveMap: React.FC<InteractiveMapProps> = ({ regions, activeRegionId, onRegionSelect, language }) => {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [expandedClusterId, setExpandedClusterId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const isVi = language === 'vi';

  const texts = {
    zoomIn: isVi ? 'Phóng to' : 'Zoom in',
    zoomOut: isVi ? 'Thu nhỏ' : 'Zoom out',
    reset: isVi ? 'Đặt lại' : 'Reset',
    legend: isVi ? 'Chú thích' : 'Legend',
    hub: isVi ? 'Trung tâm Ngoại giao' : 'Diplomatic Hub',
    active: isVi ? 'Đang chọn / Hoạt động' : 'Selected / Active',
    route: isVi ? 'Tuyến kết nối' : 'Connection Route',
    zoomHint: isVi ? 'Nhấp đúp hoặc dùng +/- để phóng to' : 'Double-click or use +/- to zoom',
    panHint: isVi ? 'Dùng chuột để kéo bản đồ' : 'Drag to pan',
  };

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.5;

  const handleZoomIn = () => setScale(prev => Math.min(prev + ZOOM_STEP, MAX_SCALE));
  const handleZoomOut = () => setScale(prev => Math.max(prev - ZOOM_STEP, MIN_SCALE));
  const handleReset = () => setScale(1);

  // --- SVG Path Generator for APEC ---
  const renderConnectionLines = () => {
    if (activeRegionId !== RegionID.APEC) return null;

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {APEC_PARTNERS.map((partner, idx) => {
          const midX = (VIETNAM_COORDS.x + partner.x) / 2;
          const midY = (VIETNAM_COORDS.y + partner.y) / 2;
          const controlX = midX;
          const controlY = Math.min(VIETNAM_COORDS.y, partner.y) - 10;

          return (
            <motion.g
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <motion.path
                d={`M ${VIETNAM_COORDS.x} ${VIETNAM_COORDS.y} Q ${controlX} ${controlY} ${partner.x} ${partner.y}`}
                fill="none"
                stroke="#ffc107"
                strokeWidth="0.3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                filter="url(#glow)"
              />
              <motion.circle
                cx={partner.x}
                cy={partner.y}
                r="0.5"
                fill="#ffc107"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="animate-pulse"
              />
            </motion.g>
          );
        })}
        <circle cx={VIETNAM_COORDS.x} cy={VIETNAM_COORDS.y} r="0.8" fill="#ef4444" className="animate-ping" />
      </svg>
    );
  };

  return (
    <div
      className="relative w-full aspect-[16/9] bg-diplomatic-900 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden border-4 border-white group select-none touch-none focus:outline-none focus:ring-4 focus:ring-gold-400"
      ref={containerRef}
      tabIndex={0}
      aria-label="Interactive map"
    >
      {/* Invisible constraint container that scales with the map content */}
      <div ref={constraintsRef} className="absolute inset-0 pointer-events-none"
        style={{
          width: `${scale * 100}%`,
          height: `${scale * 100}%`,
          left: `${(1 - scale) * 50}%`,
          top: `${(1 - scale) * 50}%`
        }}
      />

      {/* Interaction Layer */}
      <motion.div
        className="w-full h-full relative cursor-grab active:cursor-grabbing origin-center"
        animate={{ scale: scale }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        drag={scale > 1}
        dragConstraints={containerRef}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        // If not scaled, clicking shouldn't drag
        onPointerDown={(e) => { if (scale === 1) e.stopPropagation(); }}
      >
        {/* World Map Image Background */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')",
            filter: 'sepia(20%) saturate(80%) hue-rotate(190deg) contrast(110%)'
          }}
        ></div>

        {/* Overlay for aesthetic tint */}
        <div className="absolute inset-0 bg-diplomatic-900/10 pointer-events-none z-0"></div>

        {renderConnectionLines()}

        {regions.map((region) => {
          const isCluster = !!region.subRegions && region.subRegions.length > 0;
          const isExpanded = expandedClusterId === region.id;

          return (
            <React.Fragment key={region.id}>
              {/* Main Pin (Cluster or Single) */}
              <MapPin
                top={region.coordinates.top}
                left={region.coordinates.left}
                label={region.name}
                isActive={activeRegionId === region.id || isExpanded}
                ariaLabel={isVi ? `Xem chi tiết về ${region.name}` : `View details for ${region.name}`}
                onClick={() => {
                  if (isDragging) return;

                  if (isCluster) {
                    setExpandedClusterId(isExpanded ? null : region.id);
                  } else {
                    onRegionSelect(region.id);
                  }
                }}
              />

              {/* Cluster List Menu */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="absolute z-30 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 p-2 min-w-[160px] flex flex-col gap-1 origin-top-left"
                    style={{
                      top: 'calc(' + region.coordinates.top + ' + 20px)',
                      left: 'calc(' + region.coordinates.left + ' + 20px)',
                    }}
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  >
                    {region.subRegions?.map(sub => (
                      <button
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onRegionSelect(sub.id);
                        }}
                        className="flex items-center gap-3 p-2 hover:bg-diplomatic-50 rounded-lg transition-colors text-left group"
                      >
                        <div className="w-6 h-6 rounded-full bg-diplomatic-100 flex items-center justify-center shrink-0 border border-diplomatic-200 group-hover:border-gold-400 group-hover:bg-gold-100 transition-colors">
                          <PinIcon className="w-3 h-3 text-diplomatic-600 group-hover:text-diplomatic-900" />
                        </div>
                        <span className="text-sm font-bold text-gray-700 group-hover:text-diplomatic-900">
                          {sub.name}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </React.Fragment>
          );
        })}
      </motion.div>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20 pointer-events-none">
        <div className="bg-white/90 backdrop-blur shadow-lg rounded-lg border border-white/50 p-1 flex flex-col gap-1 pointer-events-auto">
          <button
            onClick={handleZoomIn}
            disabled={scale >= MAX_SCALE}
            className="p-2 hover:bg-diplomatic-50 rounded-md text-diplomatic-900 disabled:opacity-30 transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-diplomatic-50 rounded-md text-diplomatic-900 transition-colors border-y border-gray-200"
          >
            <Maximize className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={scale <= MIN_SCALE}
            className="p-2 hover:bg-diplomatic-50 rounded-md text-diplomatic-900 disabled:opacity-30 transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2 pointer-events-none">

        <AnimatePresence>
          {isLegendOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-white/50 w-52 mb-2 origin-bottom-left pointer-events-auto"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-diplomatic-900 text-xs uppercase tracking-wider">{texts.legend}</h4>
                <button onClick={() => setIsLegendOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-diplomatic-900 border-2 border-white shadow-sm flex items-center justify-center">
                    <PinIcon className="w-2.5 h-2.5 text-white" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{texts.hub}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gold-500/50 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-gold-500 border-2 border-white rounded-full relative z-10"></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{texts.active}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg width="20" height="6" viewBox="0 0 20 6">
                      <line x1="0" y1="3" x2="20" y2="3" stroke="#eab308" strokeWidth="2" strokeDasharray="3 2" />
                      <circle cx="18" cy="3" r="1.5" fill="#eab308" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{texts.route}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className="bg-white/90 backdrop-blur hover:bg-white text-diplomatic-900 p-2.5 rounded-full shadow-lg border border-white/50 transition-all pointer-events-auto group"
          title={texts.legend}
        >
          <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

    </div>
  );
};

export default InteractiveMap;
