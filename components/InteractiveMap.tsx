
import React, { useState, useRef, useEffect } from 'react';
import { RegionData, RegionID, Language } from '../types';
import MapPin from './MapPin';
import { ZoomIn, ZoomOut, Maximize, Move, Info, X, MapPin as PinIcon } from 'lucide-react';

interface InteractiveMapProps {
  regions: RegionData[];
  activeRegionId: string | null;
  onRegionSelect: (id: string) => void;
  language: Language;
}

// Coordinates in Percentage (0-100) on the map image
// Assuming the map image provided in App.tsx/index.html aligns roughly with these
const VIETNAM_COORDS = { x: 77.5, y: 56 }; // Approximate location of Vietnam

const APEC_PARTNERS = [
  { name: 'USA', x: 22, y: 35 },
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
    panHint: isVi ? 'Dùng phím mũi tên hoặc kéo để di chuyển' : 'Use arrow keys or drag to pan',
  };

  // Constants
  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  const ZOOM_STEP = 0.5;
  const PAN_STEP = 50;

  // --- Zoom Handlers ---
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + ZOOM_STEP, MAX_SCALE));
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - ZOOM_STEP, MIN_SCALE);
      if (newScale === MIN_SCALE) {
        setPosition({ x: 0, y: 0 }); // Reset position if zoomed out completely
      }
      return newScale;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // --- Drag/Pan Logic ---
  
  // Calculate boundaries to keep map within view
  const clampPosition = (x: number, y: number, currentScale: number) => {
    if (!containerRef.current) return { x, y };
    
    // If scale is 1, force center
    if (currentScale === 1) return { x: 0, y: 0 };

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // The visual size of the map
    const scaledWidth = width * currentScale;
    const scaledHeight = height * currentScale;

    // Calculate how much "overflow" we have on each side
    const maxDragX = (scaledWidth - width) / 2;
    const maxDragY = (scaledHeight - height) / 2;

    return {
      x: Math.min(Math.max(x, -maxDragX), maxDragX),
      y: Math.min(Math.max(y, -maxDragY), maxDragY)
    };
  };

  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (scale === 1) return; // Disable drag at default scale
    
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    setDragStart({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;

    setPosition(clampPosition(newX, newY, scale));
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  // --- Keyboard Navigation ---
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent default scrolling for map keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', '+', '-', '='].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowUp': // Move view North (Map moves Down/+Y)
        setPosition(prev => clampPosition(prev.x, prev.y + PAN_STEP, scale));
        break;
      case 'ArrowDown': // Move view South (Map moves Up/-Y)
        setPosition(prev => clampPosition(prev.x, prev.y - PAN_STEP, scale));
        break;
      case 'ArrowLeft': // Move view West (Map moves Right/+X)
        setPosition(prev => clampPosition(prev.x + PAN_STEP, prev.y, scale));
        break;
      case 'ArrowRight': // Move view East (Map moves Left/-X)
        setPosition(prev => clampPosition(prev.x - PAN_STEP, prev.y, scale));
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
      case '_':
        handleZoomOut();
        break;
      case '0':
      case 'Home':
        handleReset();
        break;
      default:
        break;
    }
  };

  // --- Wheel Zoom ---
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || scale > 1) { 
        // Optional: Implement complex wheel zoom if needed, 
        // currently disabled or simple to avoid scroll jank
    }
  };

  // Ensure content is reset if container resizes
  useEffect(() => {
    const handleResize = () => {
        if (scale === 1) setPosition({x:0, y:0});
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scale]);

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
            <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {APEC_PARTNERS.map((partner, idx) => {
          const midX = (VIETNAM_COORDS.x + partner.x) / 2;
          const midY = (VIETNAM_COORDS.y + partner.y) / 2;
          const controlX = midX;
          const controlY = Math.min(VIETNAM_COORDS.y, partner.y) - 10; 

          return (
            <g key={idx}>
              <path
                d={`M ${VIETNAM_COORDS.x} ${VIETNAM_COORDS.y} Q ${controlX} ${controlY} ${partner.x} ${partner.y}`}
                fill="none"
                stroke="#ffc107"
                strokeWidth="0.3"
                strokeLinecap="round"
                className="path-draw"
                filter="url(#glow)"
              />
              <circle 
                cx={partner.x} 
                cy={partner.y} 
                r="0.5" 
                fill="#ffc107"
                className="animate-pulse"
              />
            </g>
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
      role="region"
      aria-label="Interactive map of Vietnam's international connections. Use arrow keys to pan, plus and minus keys to zoom."
      onKeyDown={handleKeyDown}
    >
      {/* Interaction Layer */}
      <div 
        ref={contentRef}
        className="w-full h-full relative origin-center transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        onWheel={handleWheel}
        aria-hidden="true" // Hide background from screen readers, pins will be exposed
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

        {regions.map((region) => (
          <MapPin
            key={region.id}
            top={region.coordinates.top}
            left={region.coordinates.left}
            label={region.name}
            isActive={activeRegionId === region.id}
            onClick={() => {
              if (!isDragging) onRegionSelect(region.id);
            }}
          />
        ))}
      </div>

      {/* Controls Overlay */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20" role="toolbar" aria-label="Map controls">
        <div className="bg-white/90 backdrop-blur shadow-lg rounded-lg border border-white/50 p-1 flex flex-col gap-1">
            <button 
                onClick={handleZoomIn}
                disabled={scale >= MAX_SCALE}
                className="p-2 hover:bg-diplomatic-50 rounded-md text-diplomatic-900 disabled:opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
                title={texts.zoomIn}
                aria-label="Zoom in"
            >
                <ZoomIn className="w-5 h-5" />
            </button>
            <button 
                onClick={handleReset}
                className="p-2 hover:bg-diplomatic-50 rounded-md text-diplomatic-900 transition-colors border-y border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold-500"
                title={texts.reset}
                aria-label="Reset zoom and position"
            >
                <Maximize className="w-5 h-5" />
            </button>
            <button 
                onClick={handleZoomOut}
                disabled={scale <= MIN_SCALE}
                className="p-2 hover:bg-diplomatic-50 rounded-md text-diplomatic-900 disabled:opacity-30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-500"
                title={texts.zoomOut}
                aria-label="Zoom out"
            >
                <ZoomOut className="w-5 h-5" />
            </button>
        </div>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2">
        
        {/* Legend Content */}
        {isLegendOpen && (
           <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-xl border border-white/50 w-52 mb-2 animate-fade-in origin-bottom-left">
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
           </div>
        )}

        {/* Toggle Button */}
        <button 
          onClick={() => setIsLegendOpen(!isLegendOpen)}
          className="bg-white/90 backdrop-blur hover:bg-white text-diplomatic-900 p-2.5 rounded-full shadow-lg border border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-gold-500 group"
          aria-label="Toggle map legend"
          aria-expanded={isLegendOpen}
          title={texts.legend}
        >
           <Info className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Instructions Overlay */}
      {scale === 1 && (
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-diplomatic-900 shadow-sm border border-white/50 pointer-events-none z-10 hidden md:block" aria-hidden="true">
            {texts.zoomHint}
        </div>
      )}
      
      {scale > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-diplomatic-900/80 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 pointer-events-none animate-fade-in z-20" aria-hidden="true">
            <Move className="w-3 h-3" />
            {texts.panHint}
        </div>
      )}

    </div>
  );
};

export default InteractiveMap;
