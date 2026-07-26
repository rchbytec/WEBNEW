import React, { useState, useEffect, useRef } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  PhoneCall,
  ShieldCheck,
  LogOut
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
    setIsAdminLoggedIn,
    setIsLoginModalOpen, 
    setIsAdminPanelOpen,
    setNotificationMsg,
    scrollToSection
  } = useSiteContext();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeaderLogoutModal, setShowHeaderLogoutModal] = useState(false);

  // Secret trigger state
  const [isRedActive, setIsRedActive] = useState(false);
  const [redTimeLeft, setRedTimeLeft] = useState(5);

  const lastClickRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);
  const redTimerRef = useRef<NodeJS.Timeout | null>(null);
  const redIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const keyBufferRef = useRef<string>('');

  const { companyInfo, headerLinks, adminCredentials, themeConfig } = siteData;
  const allowToggle = themeConfig?.allowToggle ?? true;

  const requiredClicks = adminCredentials?.requiredClicks ?? 5;
  const maxClickIntervalSec = adminCredentials?.maxClickIntervalSec ?? 1.5;
  const triggerKeyword = (adminCredentials?.triggerKeyword || 'admin').trim().toLowerCase();

  const resetRedState = () => {
    setIsRedActive(false);
    setRedTimeLeft(5);
    clickCountRef.current = 0;
    keyBufferRef.current = '';
    if (redTimerRef.current) clearTimeout(redTimerRef.current);
    if (redIntervalRef.current) clearInterval(redIntervalRef.current);
  };

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
    const intervalMs = maxClickIntervalSec * 1000;

    if (now - lastClickRef.current <= intervalMs) {
      clickCountRef.current += 1;
    } else {
      clickCountRef.current = 1;
    }
    lastClickRef.current = now;

    if (clickCountRef.current >= requiredClicks) {
      clickCountRef.current = 0;
      keyBufferRef.current = '';
      setIsRedActive(true);
      setRedTimeLeft(5);

      if (redTimerRef.current) clearTimeout(redTimerRef.current);
      if (redIntervalRef.current) clearInterval(redIntervalRef.current);

      let countdown = 5;
      redIntervalRef.current = setInterval(() => {
        countdown -= 1;
        setRedTimeLeft(countdown);
        if (countdown <= 0 && redIntervalRef.current) {
          clearInterval(redIntervalRef.current);
        }
      }, 1000);

      redTimerRef.current = setTimeout(() => {
        resetRedState();
      }, 5000);
    }
  };

  useEffect(() => {
    if (!isRedActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab', 'Escape'].includes(e.key)) {
        return;
      }

      if (e.key === 'Backspace') {
        keyBufferRef.current = keyBufferRef.current.slice(0, -1);
      } else if (e.key.length === 1) {
        keyBufferRef.current += e.key.toLowerCase();
      }

      const currentTyped = keyBufferRef.current.trim().toLowerCase();
      const target = triggerKeyword;

      if (currentTyped.endsWith(target) || currentTyped === target) {
        resetRedState();
        setIsLoginModalOpen(true);
        setNotificationMsg('Acceso verificado por palabra clave secret. Inicie sesión.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRedActive, triggerKeyword, setIsLoginModalOpen, setNotificationMsg]);

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
            {/* Logo with customizable secret trigger */}
            <div 
              onClick={handleLogoClick}
              className={`flex items-center gap-2.5 group cursor-pointer select-none transition-all duration-300 ${
                isRedActive ? 'scale-105' : ''
              }`}
              title={companyInfo.fullName || 'RCH-BYTEC SRL'}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono font-bold text-lg sm:text-xl tracking-wider leading-none transition-colors duration-300 ${
                    isRedActive 
                      ? 'text-red-600 dark:text-red-500 font-black animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                      : darkMode ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {companyInfo.fullName || 'RCH-BYTEC SRL'}
                  </span>
                  {isRedActive && (
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-extrabold animate-bounce shadow-md">
                      {redTimeLeft}s
                    </span>
                  )}
                </div>
                <span className={`text-[10.2px] sm:text-[11.1px] font-semibold tracking-[0.025em] uppercase mt-1 leading-none block whitespace-nowrap transition-colors duration-300 ${
                  isRedActive 
                    ? 'text-red-500 dark:text-red-400 font-extrabold animate-pulse' 
                    : darkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
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
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
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
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsAdminPanelOpen(true)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      darkMode
                        ? 'bg-zinc-900 border-emerald-500/40 text-emerald-400 hover:bg-zinc-800 hover:text-emerald-300'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800'
                    }`}
                    aria-label="Panel de Administración"
                    title="Abrir Panel de Administración"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setShowHeaderLogoutModal(true)}
                    className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                      darkMode
                        ? 'bg-zinc-900 border-red-500/40 text-red-400 hover:bg-zinc-800 hover:text-red-300'
                        : 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800'
                    }`}
                    aria-label="Cerrar Sesión"
                    title="Cerrar Sesión de Administrador"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
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

              {/* Dark / Light Toggle (Hidden if theme is fixed by Admin) */}
              {allowToggle && (
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
              )}

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
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToSection(link.href);
                  }}
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
      {/* Modal Confirmación Cerrar Sesión desde Header */}
      {showHeaderLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4 ${
              darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-red-500/15 text-red-500 border border-red-500/20">
                <LogOut className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold">Cerrar Sesión</h3>
                <p className="text-xs text-zinc-400">Panel de Control RCH-BYTEC</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              ¿Está seguro de que desea cerrar la sesión de Administrador?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-zinc-800/60">
              <button
                type="button"
                onClick={() => setShowHeaderLogoutModal(false)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                  darkMode ? 'border-zinc-800 hover:bg-zinc-800 text-zinc-300' : 'border-zinc-300 hover:bg-zinc-100 text-zinc-700'
                }`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowHeaderLogoutModal(false);
                  setIsAdminLoggedIn(false);
                  setIsAdminPanelOpen(false);
                  setNotificationMsg('Sesión de Administrador cerrada correctamente.');
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sí, Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
