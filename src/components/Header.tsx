import React, { useState, useEffect, useRef } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const { 
    siteData, 
    isAdminLoggedIn, 
    setIsLoginModalOpen, 
    setIsAdminPanelOpen,
    setNotificationMsg 
  } = useSiteContext();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 5-click secret trigger state
  const lastClickRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current <= 2000) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickRef.current = now;

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      if (isAdminLoggedIn) {
        setIsAdminPanelOpen(true);
        setNotificationMsg('Panel de Administración abierto.');
      } else {
        setIsLoginModalOpen(true);
        setNotificationMsg('Modo Administrador activado (5 clics). Inicie sesión.');
      }
    }
  };

  const { companyInfo, headerLinks } = siteData;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? darkMode
              ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 shadow-xl py-3'
              : 'bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-md py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo with 5-click secret trigger */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group cursor-pointer select-none"
              title="RCH-BYTEC (Haga 5 clics rápidos para acceso Administrador)"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono font-bold text-lg sm:text-xl tracking-wider leading-none ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {companyInfo.fullName || 'RCH-BYTEC SRL'}
                  </span>
                </div>
                <span className={`text-[10.2px] sm:text-[11.1px] font-semibold tracking-[0.025em] uppercase mt-1 leading-none block whitespace-nowrap ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  {companyInfo.slogan || 'Tu Asesor Tecnológico'}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {headerLinks.map((link, idx) => (
                <a
                  key={`desk-hdr-${link.id || 'link'}-${idx}`}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    darkMode
                      ? 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                      : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions: Phone, Admin Quick Button, Dark Toggle, Menu */}
            <div className="flex items-center gap-2.5">
              {isAdminLoggedIn && (
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  className={`p-2 rounded-lg border transition-colors ${
                    darkMode
                      ? 'bg-zinc-900 border-emerald-500/40 text-emerald-400 hover:bg-zinc-800 hover:text-emerald-300'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800'
                  }`}
                  aria-label="Panel de Administración"
                  title="Abrir Panel de Administración"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )}

              {/* WhatsApp / Call quick action */}
              <a
                href={`https://wa.me/${companyInfo.phoneNeuquenClean || '542994631278'}?text=${encodeURIComponent('Hola RCH-BYTEC, quisiera realizar una consulta técnica.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  darkMode
                    ? 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500'
                    : 'bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200'
                }`}
                title="Contactar directamente por WhatsApp"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                <span>{companyInfo.phoneNeuquen}</span>
              </a>

              {/* Dark / Light Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
                aria-label="Alternar modo oscuro/claro"
                title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg border transition-colors ${
                  darkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                    : 'bg-zinc-100 border-zinc-200 text-zinc-700 hover:bg-zinc-200'
                }`}
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed inset-x-0 top-[60px] z-40 md:hidden p-5 shadow-2xl border-b ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex flex-col gap-2">
              {headerLinks.map((link, idx) => (
                <a
                  key={`mob-hdr-${link.id || 'link'}-${idx}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    darkMode
                      ? 'text-zinc-200 hover:bg-zinc-900'
                      : 'text-zinc-800 hover:bg-zinc-100'
                  }`}
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-zinc-800/50 flex flex-col gap-2">
                <a
                  href={`tel:${companyInfo.phoneNeuquenClean}`}
                  className={`w-full py-2.5 px-4 rounded-lg text-center text-xs font-semibold border flex items-center justify-center gap-2 ${
                    darkMode
                      ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
                      : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                  }`}
                >
                  <PhoneCall className="w-4 h-4 text-emerald-500" />
                  Neuquén: {companyInfo.phoneNeuquen}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
