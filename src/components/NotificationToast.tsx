import React, { useEffect } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { notificationMsg, setNotificationMsg } = useSiteContext();

  useEffect(() => {
    if (!notificationMsg) return;
    const timer = setTimeout(() => {
      setNotificationMsg(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [notificationMsg, setNotificationMsg]);

  if (!notificationMsg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] max-w-md p-4 rounded-xl border bg-zinc-900 border-emerald-500/40 text-white shadow-2xl flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-zinc-100 leading-snug">
            {notificationMsg}
          </p>
        </div>

        <button
          onClick={() => setNotificationMsg(null)}
          className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
