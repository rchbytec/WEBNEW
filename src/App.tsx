import React, { useState, useEffect } from 'react';
import { SiteProvider, useSiteContext } from './context/SiteContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { QuickOffers } from './components/QuickOffers';
import { DomoticsDemo } from './components/DomoticsDemo';
import { ServicesGrid } from './components/ServicesGrid';
import { SpecialCoupon } from './components/SpecialCoupon';
import { BrandsTicker } from './components/BrandsTicker';
import { LocationSection } from './components/LocationSection';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminControlPanel } from './components/AdminControlPanel';
import { EmailJSConfig } from './types';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const { notificationMsg, setNotificationMsg } = useSiteContext();

  const [emailJsConfig] = useState<EmailJSConfig>(() => {
    const saved = localStorage.getItem('rch_emailjs_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved EmailJS config', e);
      }
    }
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
    };
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      {/* Header */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main One Page Body */}
      <main className="relative">
        <HeroBanner darkMode={darkMode} />
        <QuickOffers darkMode={darkMode} />
        <DomoticsDemo darkMode={darkMode} />
        <ServicesGrid darkMode={darkMode} />
        <SpecialCoupon darkMode={darkMode} />
        <BrandsTicker darkMode={darkMode} />
        <LocationSection darkMode={darkMode} />
        <ContactForm emailJsConfig={emailJsConfig} darkMode={darkMode} />
      </main>

      {/* Footer */}
      <Footer darkMode={darkMode} />

      {/* Admin Modals */}
      <AdminLoginModal darkMode={darkMode} />
      <AdminControlPanel darkMode={darkMode} />

      {/* Notification Toast */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-5 right-5 z-50 max-w-md p-4 rounded-xl border bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-2xl backdrop-blur-md flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs leading-relaxed font-semibold">
              {notificationMsg}
            </div>
            <button
              onClick={() => setNotificationMsg(null)}
              className="text-emerald-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <AppContent />
    </SiteProvider>
  );
}
