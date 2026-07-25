import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Smartphone, HardDrive, Printer, Laptop, Tv, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface QuickOffersProps {
  darkMode: boolean;
}

export const QuickOffers: React.FC<QuickOffersProps> = ({ darkMode }) => {
  const { siteData } = useSiteContext();
  const quickBanners = siteData.quickBanners || [];

  const getBannerIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-zinc-200" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-zinc-200" />;
      case 'Printer': return <Printer className="w-5 h-5 text-zinc-200" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-zinc-200" />;
      default: return <Tv className="w-5 h-5 text-zinc-200" />;
    }
  };

  return (
    <section className={`py-12 border-y transition-colors duration-300 ${
      darkMode 
        ? 'border-zinc-800/80 bg-zinc-950 text-white' 
        : 'border-zinc-200 bg-zinc-50 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`text-xs font-mono font-semibold uppercase tracking-widest block mb-1 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            SERVICIOS RÁPIDOS
          </span>
          <h2 className={`font-sans text-2xl sm:text-3xl font-extrabold ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}>
            Soluciones Prioritarias
          </h2>
          <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Atención preferencial para reparación de dispositivos móviles, almacenamiento, insumos e informática.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickBanners.map((banner, index) => (
            <motion.div
              key={`quick-offer-${banner.id || 'b'}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`group relative p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between shadow-md ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700'
                  : 'border-zinc-200 bg-white hover:border-zinc-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-lg border ${
                    darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
                  }`}>
                    {getBannerIcon(banner.iconName)}
                  </div>
                </div>

                <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider block mb-1 ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}>
                  {banner.tagline}
                </span>

                <h3 className={`font-bold text-sm ${
                  darkMode ? 'text-white' : 'text-zinc-900'
                }`}>
                  {banner.title}
                </h3>

                <p className={`text-xs mt-2 leading-relaxed ${
                  darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                  {banner.description}
                </p>
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-medium ${
                darkMode ? 'border-zinc-800/80 text-zinc-500' : 'border-zinc-200 text-zinc-400'
              }`}>
                <span>RCH-BYTEC</span>
                <a
                  href="#contacto"
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded border transition-all shadow-sm ${
                    darkMode
                      ? 'bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 border-zinc-700'
                      : 'bg-zinc-100 text-zinc-800 hover:text-zinc-900 hover:bg-zinc-200 border-zinc-300'
                  }`}
                >
                  <span>Consultar</span>
                  <ArrowUpRight className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
