import React, { useState } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { Tag, Copy, Check, ShieldCheck, Cpu, Wrench } from 'lucide-react';
import { motion } from 'motion/react';

interface SpecialCouponProps {
  darkMode: boolean;
}

export const SpecialCoupon: React.FC<SpecialCouponProps> = ({ darkMode }) => {
  const { siteData } = useSiteContext();
  const { companyInfo } = siteData;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(companyInfo.couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="oferta" className={`py-16 relative overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-2xl border p-8 sm:p-12 shadow-xl transition-colors ${
          darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content: Technical Expertise & Service Quality */}
            <div className="lg:col-span-7 flex flex-col items-start gap-4">
              <span className={`text-xs font-mono font-semibold uppercase tracking-widest block flex items-center gap-1.5 ${
                darkMode ? 'text-zinc-400' : 'text-zinc-500'
              }`}>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                CALIDAD & COMPROMISO TÉCNICO
              </span>

              <p className={`text-sm sm:text-base leading-relaxed ${
                darkMode ? 'text-zinc-200' : 'text-zinc-700'
              }`}>
                En <strong>{companyInfo.name}</strong> brindamos soporte técnico integral especializado con laboratorio propio. Nos enfocamos en diagnósticos rápidos en el día, repuestos garantizados y proyectos a medida para hogares, comercios y empresas en Neuquén y Buenos Aires.
              </p>

              {/* Service Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full py-1">
                <div className={`flex items-start gap-2.5 p-3.5 rounded-lg border ${
                  darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <Wrench className={`w-4 h-4 mt-0.5 shrink-0 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
                  <div>
                    <h4 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Laboratorio Técnico Equipado</h4>
                    <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Microelectrónica, reparación de placas mother y recambio de componentes.</p>
                  </div>
                </div>

                <div className={`flex items-start gap-2.5 p-3.5 rounded-lg border ${
                  darkMode ? 'bg-zinc-950/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <Cpu className={`w-4 h-4 mt-0.5 shrink-0 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
                  <div>
                    <h4 className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Domótica y Automatización</h4>
                    <p className={`text-[11px] mt-0.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Control inteligente de accesos, luces, cámaras y energía en tu smartphone.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card / Coupon Box */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className={`w-full max-w-sm rounded-xl border border-dashed p-6 flex flex-col items-center text-center shadow-lg relative ${
                  darkMode ? 'bg-zinc-950 border-zinc-700' : 'bg-zinc-50 border-zinc-300'
                }`}
              >
                <div className={`p-3 rounded-full border mb-3 ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-300' : 'bg-white border-zinc-200 text-zinc-700 shadow-sm'
                }`}>
                  <Tag className="w-6 h-6" />
                </div>

                <span className={`text-xs font-mono uppercase tracking-widest ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{companyInfo.couponDiscount || 'Código de Descuento'}</span>
                
                <div className={`my-3 px-4 py-2 rounded-lg border text-2xl font-mono font-extrabold tracking-wider flex items-center gap-3 ${
                  darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-300 text-zinc-900 shadow-sm'
                }`}>
                  <span>{companyInfo.couponCode}</span>
                  <button
                    onClick={handleCopy}
                    className={`p-1.5 rounded-md transition-colors ${
                      darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900'
                    }`}
                    title="Copiar código de cupón"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {copied && (
                  <span className="text-xs font-semibold text-emerald-500 mb-1">
                    ¡Copiado al portapapeles!
                  </span>
                )}

                <p className={`text-[11px] mt-2 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {companyInfo.couponDescription}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

