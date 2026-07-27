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

interface TypewriterPhoneProps {
  companyInfo: any;
  headerPhoneConfig: any;
  darkMode: boolean;
  isMobile?: boolean;
}

const TypewriterPhone: React.FC<TypewriterPhoneProps> = ({
  companyInfo,
  headerPhoneConfig,
  darkMode,
  isMobile = false
}) => {
  const phoneConfig = headerPhoneConfig || {
    mode: 'both_typewriter',
    effect: 'typewriter',
    displayDurationSec: 3,
    typingSpeedMs: 70,
    erasingSpeedMs: 35,
  };

  const effect = phoneConfig.effect || 'typewriter';

  const items = React.useMemo(() => {
    const list: Array<{ text: string; cleanPhone: string }> = [];
    const mode = phoneConfig.mode || 'both_typewriter';

    if (companyInfo?.phoneNeuquen && (mode === 'both_typewriter' || mode === 'phone1')) {
      list.push({
        text: companyInfo.phoneNeuquen,
        cleanPhone: companyInfo.phoneNeuquenClean || '542994631278'
      });
    }
    if (companyInfo?.phoneBsAs && (mode === 'both_typewriter' || mode === 'phone2')) {
      list.push({
        text: companyInfo.phoneBsAs,
        cleanPhone: companyInfo.phoneBsAsClean || '541158249102'
      });
    }

    if (list.length === 0) {
      list.push({
        text: companyInfo?.phoneNeuquen || '+54 299 463-1278',
        cleanPhone: companyInfo?.phoneNeuquenClean || '542994631278'
      });
    }
    return list;
  }, [companyInfo?.phoneNeuquen, companyInfo?.phoneBsAs, companyInfo?.phoneNeuquenClean, companyInfo?.phoneBsAsClean, phoneConfig.mode]);

  const [itemIndex, setItemIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing'>('typing');

  const currentItem = items[itemIndex % items.length] || items[0];

  // Typewriter effect state machine
  useEffect(() => {
    if (effect !== 'typewriter') return;
    if (!items || items.length === 0) return;

    const fullText = currentItem.text;
    let timer: NodeJS.Timeout;

    if (phase === 'typing') {
      if (displayedText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, phoneConfig.typingSpeedMs ?? 70);
      } else {
        timer = setTimeout(() => {
          if (items.length > 1 && phoneConfig.mode === 'both_typewriter') {
            setPhase('erasing');
          }
        }, (phoneConfig.displayDurationSec ?? 3) * 1000);
      }
    } else if (phase === 'erasing') {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, phoneConfig.erasingSpeedMs ?? 35);
      } else {
        setItemIndex((prev) => (prev + 1) % items.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timer);
  }, [effect, displayedText, phase, itemIndex, items, currentItem.text, phoneConfig.typingSpeedMs, phoneConfig.erasingSpeedMs, phoneConfig.displayDurationSec, phoneConfig.mode]);

  // Rotational timer for other effects (marquee, fade, slide_up, flip, zoom)
  useEffect(() => {
    if (effect === 'typewriter') return;
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setItemIndex((prev) => (prev + 1) % items.length);
    }, (phoneConfig.displayDurationSec ?? 3) * 1000);

    return () => clearInterval(interval);
  }, [effect, items.length, phoneConfig.displayDurationSec]);

  useEffect(() => {
    setItemIndex(0);
    setDisplayedText('');
    setPhase('typing');
  }, [phoneConfig.mode, effect, items.length]);

  const whatsappHref = `https://wa.me/${currentItem.cleanPhone}?text=${encodeURIComponent('Hola RCH-BYTEC, quisiera realizar una consulta técnica.')}`;

  const renderEffectContent = () => {
    if (effect === 'typewriter') {
      return (
        <span className="font-mono tracking-tight text-xs inline-block w-[106px] text-left whitespace-nowrap overflow-hidden">
          {displayedText}
          <span className="animate-pulse text-emerald-500 font-bold ml-0.5">|</span>
        </span>
      );
    }

    if (effect === 'marquee') {
      return (
        <div className="w-[106px] overflow-hidden whitespace-nowrap relative flex items-center">
          <motion.div
            key={itemIndex}
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{
              repeat: Infinity,
              duration: Math.max(3, (phoneConfig.displayDurationSec ?? 3) * 1.5),
              ease: 'linear'
            }}
            className="font-mono tracking-tight text-xs inline-block whitespace-nowrap text-emerald-400"
          >
            {currentItem.text}
          </motion.div>
        </div>
      );
    }

    const transitionProps = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.35 }
      },
      slide_up: {
        initial: { y: 10, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -10, opacity: 0 },
        transition: { duration: 0.3 }
      },
      flip: {
        initial: { rotateX: 90, opacity: 0 },
        animate: { rotateX: 0, opacity: 1 },
        exit: { rotateX: -90, opacity: 0 },
        transition: { duration: 0.35 }
      },
      zoom: {
        initial: { scale: 0.7, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.15, opacity: 0 },
        transition: { duration: 0.3 }
      }
    };

    const currentProps = transitionProps[effect as keyof typeof transitionProps] || transitionProps.fade;

    return (
      <div className="w-[106px] h-[18px] relative overflow-hidden flex items-center justify-start">
        <AnimatePresence mode="wait">
          <motion.span
            key={itemIndex}
            {...currentProps}
            className="font-mono tracking-tight text-xs inline-block whitespace-nowrap absolute left-0"
          >
            {currentItem.text}
          </motion.span>
        </AnimatePresence>
      </div>
    );
  };

  if (isMobile) {
    return (
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full py-2 px-3 rounded-lg text-center text-xs font-semibold border flex items-center justify-center gap-2 ${
          darkMode
            ? 'bg-zinc-900 border-zinc-700 text-zinc-200'
            : 'bg-zinc-100 border-zinc-300 text-zinc-800'
        }`}
      >
        <PhoneCall className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        {renderEffectContent()}
      </a>
    );
  }

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
        darkMode
          ? 'bg-zinc-900 text-zinc-200 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500'
          : 'bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200'
      }`}
      title="Contactar directamente por WhatsApp"
    >
      <PhoneCall className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
      {renderEffectContent()}
    </a>
  );
};

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const { 
    siteData, 
    setSiteData,
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
  const [isResetGlow, setIsResetGlow] = useState(false);
  const [redTimeLeft, setRedTimeLeft] = useState(5);
  const [secretInputValue, setSecretInputValue] = useState('');

  const lastClickRef = useRef<number>(0);
  const clickCountRef = useRef<number>(0);
  const redTimerRef = useRef<NodeJS.Timeout | null>(null);
  const redIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const keyBufferRef = useRef<string>('');
  const activeInputRef = useRef<HTMLInputElement>(null);

  const { companyInfo, headerLinks, adminCredentials, themeConfig, headerPhoneConfig } = siteData;
  const allowToggle = themeConfig?.allowToggle ?? true;

  const requiredClicks = adminCredentials?.requiredClicks ?? 5;
  const maxClickIntervalSec = adminCredentials?.maxClickIntervalSec ?? 2;
  const triggerWindowSeconds = adminCredentials?.triggerWindowSeconds ?? 5;
  const triggerKeyword = (adminCredentials?.triggerKeyword || 'admin').trim().toLowerCase();

  const resetRedState = () => {
    setIsRedActive(false);
    setRedTimeLeft(triggerWindowSeconds);
    setSecretInputValue('');
    clickCountRef.current = 0;
    keyBufferRef.current = '';
    if (activeInputRef.current) {
      activeInputRef.current.blur();
    }
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

  const handleLogoClick = (e: React.MouseEvent) => {
    const isShiftCtrl = e.shiftKey && e.ctrlKey;
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

      // Special combination: Shift + Ctrl + 5 clicks -> Factory Reset
      if (isShiftCtrl) {
        resetRedState();

        const factoryCredentials = {
          ...adminCredentials,
          triggerWindowSeconds: 5,
          triggerKeyword: 'admin',
          requiredClicks: 5,
          maxClickIntervalSec: 2,
        };

        setSiteData((prev) => ({
          ...prev,
          adminCredentials: factoryCredentials,
        }));

        setIsResetGlow(true);
        setNotificationMsg('Acceso de administración restaurado a valores de fábrica (5s, admin, 5 clics, 2s).');

        setTimeout(() => {
          setIsResetGlow(false);
        }, 2000);

        return;
      }

      // Standard trigger window activation
      keyBufferRef.current = '';
      setSecretInputValue('');
      setIsRedActive(true);
      setRedTimeLeft(triggerWindowSeconds);

      // Focus input synchronously within click event to trigger mobile OS virtual keyboard
      if (activeInputRef.current) {
        activeInputRef.current.value = '';
        activeInputRef.current.focus();
      }

      if (redTimerRef.current) clearTimeout(redTimerRef.current);
      if (redIntervalRef.current) clearInterval(redIntervalRef.current);

      let countdown = triggerWindowSeconds;
      redIntervalRef.current = setInterval(() => {
        countdown -= 1;
        setRedTimeLeft(countdown);
        if (countdown <= 0 && redIntervalRef.current) {
          clearInterval(redIntervalRef.current);
        }
      }, 1000);

      redTimerRef.current = setTimeout(() => {
        resetRedState();
      }, triggerWindowSeconds * 1000);
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
      const target = triggerKeyword.toLowerCase();

      if (currentTyped.endsWith(target) || currentTyped === target) {
        resetRedState();
        setIsLoginModalOpen(true);
        setNotificationMsg('Acceso verificado por palabra clave secreta. Inicie sesión.');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRedActive, triggerKeyword, setIsLoginModalOpen, setNotificationMsg]);

  return (
    <>
      {/* Invisible input to capture secret trigger word on mobile/desktop without any visible box */}
      <input
        ref={activeInputRef}
        type="text"
        inputMode="text"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck={false}
        value={secretInputValue}
        onChange={(e) => {
          const val = e.target.value;
          setSecretInputValue(val);
          const currentTyped = val.trim().toLowerCase();
          keyBufferRef.current = currentTyped;
          const target = triggerKeyword.toLowerCase();
          if (currentTyped.endsWith(target) || currentTyped === target) {
            resetRedState();
            setIsLoginModalOpen(true);
            setNotificationMsg('Acceso verificado por palabra clave secreta. Inicie sesión.');
          }
        }}
        className="fixed top-0 left-0 w-1 h-1 opacity-0 pointer-events-none z-[-1]"
      />

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
              className={`flex items-center gap-2.5 group cursor-pointer select-none touch-manipulation transition-all duration-300 ${
                isResetGlow ? 'scale-105 p-1 rounded-xl bg-emerald-500/10 ring-2 ring-emerald-500/50' : isRedActive ? 'scale-105' : ''
              }`}
              title={companyInfo.fullName || 'RCH-BYTEC SRL'}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-mono font-bold text-lg sm:text-xl tracking-wider leading-none transition-colors duration-300 ${
                    isResetGlow
                      ? 'text-emerald-500 font-black animate-pulse drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]'
                      : isRedActive 
                      ? 'text-red-600 dark:text-red-500 font-black animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' 
                      : darkMode ? 'text-white' : 'text-zinc-900'
                  }`}>
                    {companyInfo.fullName || 'RCH-BYTEC SRL'}
                  </span>
                  {isResetGlow && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-extrabold animate-pulse shadow-md">
                      RESETEADO
                    </span>
                  )}
                  {!isResetGlow && isRedActive && (
                    <span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-extrabold animate-bounce shadow-md">
                      {redTimeLeft}s
                    </span>
                  )}
                </div>
                <span className={`text-[10.2px] sm:text-[11.1px] font-semibold tracking-[0.025em] uppercase mt-1 leading-none block whitespace-nowrap transition-colors duration-300 ${
                  isResetGlow
                    ? 'text-emerald-400 font-extrabold animate-pulse'
                    : isRedActive 
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
              <TypewriterPhone
                companyInfo={companyInfo}
                headerPhoneConfig={headerPhoneConfig}
                darkMode={darkMode}
              />

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
                <TypewriterPhone
                  companyInfo={companyInfo}
                  headerPhoneConfig={headerPhoneConfig}
                  darkMode={darkMode}
                  isMobile
                />
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
