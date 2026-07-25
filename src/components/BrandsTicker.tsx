import React, { useState, useEffect, useRef } from 'react';
import { BRANDS } from '../data/companyData';
import { BrandLogo } from './BrandLogos';

interface BrandsTickerProps {
  darkMode: boolean;
}

export const BrandsTicker: React.FC<BrandsTickerProps> = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Repeat brands list to ensure endless step sliding with unique keys per set
  const extendedBrands = [
    ...BRANDS.map((b) => ({ ...b, id: `b1-${b.id}` })),
    ...BRANDS.map((b) => ({ ...b, id: `b2-${b.id}` })),
    ...BRANDS.map((b) => ({ ...b, id: `b3-${b.id}` }))
  ];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 2800); // 2.8s pause between card steps

    return () => clearInterval(interval);
  }, [isHovered]);

  // Seamless wrap-around when reaching extended bounds
  useEffect(() => {
    if (currentIndex >= BRANDS.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - BRANDS.length);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setIsTransitioning(true);
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(BRANDS.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(BRANDS.length - 1);
      }, 50);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); // Prevents default page scroll when scrolling wheel over carousel
      if (wheelTimeoutRef.current) return;

      if (e.deltaY > 0 || e.deltaX > 0) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 || e.deltaX < 0) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => {
          if (prev === 0) {
            return BRANDS.length - 1;
          }
          return prev - 1;
        });
      }

      wheelTimeoutRef.current = setTimeout(() => {
        wheelTimeoutRef.current = null;
      }, 180);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <section id="marcas" className={`py-12 border-y transition-colors duration-300 overflow-hidden ${
      darkMode 
        ? 'border-zinc-800 bg-zinc-950 text-white' 
        : 'border-zinc-200 bg-zinc-50 text-zinc-900'
    }`}>
      {/* Centered Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className={`text-xs font-mono font-semibold uppercase tracking-widest block mb-1 ${
          darkMode ? 'text-zinc-400' : 'text-zinc-500'
        }`}>
          GARANTÍA Y COMPATIBILIDAD
        </span>
        <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight ${
          darkMode ? 'text-white' : 'text-zinc-900'
        }`}>
          Nuestras Marcas
        </h3>
      </div>

      {/* Step-by-Step Auto-Sliding & Wheel Interactive Carousel Container */}
      <div 
        ref={containerRef}
        className="relative w-full overflow-hidden py-2 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Edge gradient masks */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r z-10 pointer-events-none ${
          darkMode ? 'from-zinc-950 to-transparent' : 'from-zinc-50 to-transparent'
        }`} />
        <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l z-10 pointer-events-none ${
          darkMode ? 'from-zinc-950 to-transparent' : 'from-zinc-50 to-transparent'
        }`} />

        <div 
          className={`flex items-center gap-4 ${
            isTransitioning ? 'transition-transform duration-500 ease-out' : ''
          }`}
          style={{
            transform: `translateX(calc(-${currentIndex} * 216px))`, // 200px card + 16px gap
          }}
        >
          {extendedBrands.map((brand, idx) => (
            <div
              key={`ticker-brand-${brand.id || 'b'}-${idx}`}
              className={`flex flex-col items-center justify-between w-[200px] h-28 px-4 py-3 rounded-xl border transition-all cursor-pointer shadow-md group shrink-0 select-none ${
                darkMode
                  ? 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-600'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              {/* Logo */}
              <div className="flex-1 w-full flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                <BrandLogo logoKey={brand.logoKey} className={`max-h-10 w-auto max-w-full opacity-90 group-hover:opacity-100 transition-opacity ${
                  darkMode ? 'text-zinc-100' : 'text-zinc-800'
                }`} />
              </div>

              {/* Category */}
              <div className={`w-full text-center pt-2 border-t ${darkMode ? 'border-zinc-800/80' : 'border-zinc-200'}`}>
                <span className={`text-[10px] block font-mono font-medium truncate ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {brand.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
