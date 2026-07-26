import React, { useState, useEffect } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroBannerProps {
  darkMode: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ darkMode }) => {
  const { siteData, scrollToSection } = useSiteContext();
  const { heroSlides, companyInfo } = siteData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keep currentIndex in bounds if slides are removed
  useEffect(() => {
    if (currentIndex >= heroSlides.length) {
      setCurrentIndex(0);
    }
  }, [heroSlides.length, currentIndex]);

  useEffect(() => {
    if (isPaused || heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  if (!heroSlides || heroSlides.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const activeSlide = heroSlides[currentIndex] || heroSlides[0];

  return (
    <section 
      id="inicio" 
      className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Slider Container */}
        <div className={`relative rounded-2xl border p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors ${
          darkMode 
            ? 'bg-zinc-950 border-zinc-800 text-white' 
            : 'bg-white border-zinc-200 text-zinc-900 shadow-xl'
        }`}>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-active-${activeSlide?.id || 'slide'}-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Text Side */}
              <div className="lg:col-span-7 flex flex-col items-start gap-4">
                {/* Badge */}
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md border text-xs font-mono uppercase tracking-wider ${
                  darkMode 
                    ? 'bg-zinc-800 border-zinc-700 text-zinc-300' 
                    : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                }`}>
                  <ShieldCheck className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`} />
                  <span>{activeSlide.badge}</span>
                </div>

                {/* Subtitle */}
                <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  darkMode ? 'text-cyan-400' : 'text-cyan-700'
                }`}>
                  {activeSlide.subtitle}
                </span>

                {/* Title */}
                <h1 className={`font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight ${
                  darkMode ? 'text-white' : 'text-zinc-900'
                }`}>
                  {activeSlide.title}
                </h1>

                {/* Description */}
                <p className={`text-sm sm:text-base max-w-2xl leading-relaxed ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {activeSlide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#contacto"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('#contacto');
                    }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow-sm ${
                      darkMode
                        ? 'bg-zinc-100 text-zinc-900 hover:bg-white'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800'
                    }`}
                  >
                    <span>{activeSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={`https://wa.me/${companyInfo.phoneNeuquenClean || '542994631278'}?text=${encodeURIComponent(`Hola RCH-BYTEC, me interesa consultar sobre: ${activeSlide.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm border transition-colors ${
                      darkMode
                        ? 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700'
                        : 'bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-500" />
                    <span>Consulta WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Graphic Feature Card Side */}
              <div className="lg:col-span-5 flex justify-center">
                <div className={`relative w-full max-w-md rounded-xl p-5 sm:p-6 flex flex-col justify-between border shadow-xl overflow-hidden transition-colors ${
                  darkMode 
                    ? 'bg-zinc-900/90 border-zinc-800' 
                    : 'bg-zinc-50 border-zinc-200'
                }`}>
                  
                  {/* Expanded Topic Image Preview */}
                  <div className={`relative w-full h-64 sm:h-80 rounded-lg overflow-hidden border shadow-inner group mb-4 ${
                    darkMode ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-zinc-200'
                  }`}>
                    <img 
                      src={activeSlide.imageUrl} 
                      alt={activeSlide.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>

                  {/* Centered Bottom Stats */}
                  <div className={`pt-3 border-t flex justify-around items-center text-center ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <div>
                      <span className={`text-[11px] block ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Atención Técnica</span>
                      <p className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>En el Día</p>
                    </div>
                    <div className={`h-7 w-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                    <div>
                      <span className={`text-[11px] block ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Presupuestos</span>
                      <p className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>Sin Cargo</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls & Indicators */}
          <div className={`mt-8 pt-6 border-t flex flex-wrap items-center justify-between gap-4 ${darkMode ? 'border-zinc-800/80' : 'border-zinc-200'}`}>
            {/* Dots */}
            <div className="flex items-center gap-2">
              {heroSlides.map((slide, idx) => (
                <button
                  key={`hero-dot-${slide.id || 's'}-${idx}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? darkMode ? 'w-8 bg-zinc-200' : 'w-8 bg-zinc-900'
                      : darkMode ? 'w-2 bg-zinc-700 hover:bg-zinc-500' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Ir al slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className={`p-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800' 
                    : 'border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                aria-label="Slide anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className={`p-2 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800' 
                    : 'border-zinc-300 bg-zinc-100 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                aria-label="Slide siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
