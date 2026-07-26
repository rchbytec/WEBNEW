import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { ChevronUp, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const { siteData, scrollToSection } = useSiteContext();
  const { companyInfo } = siteData;

  const scrollToTop = () => {
    scrollToSection('#inicio');
  };

  return (
    <footer className={`border-t pt-16 pb-12 text-xs transition-colors duration-300 ${
      darkMode 
        ? 'bg-zinc-950 border-zinc-800 text-zinc-400' 
        : 'bg-zinc-100 border-zinc-200 text-zinc-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        
        {/* Centered Brand Logo */}
        <a 
          href="#inicio" 
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#inicio');
          }}
          className="flex items-center gap-2.5 group mb-6"
        >
          <span className={`font-sans font-extrabold text-2xl tracking-tight ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            {companyInfo.fullName || 'RCH-BYTEC SRL'}
          </span>
        </a>

        <p className={`max-w-xl text-sm mb-10 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {companyInfo.fullName} — {companyInfo.slogan}. {companyInfo.subtitle}. Soluciones integrales de energía solar, cámaras de seguridad, alarmas y reparación técnica especializada.
        </p>

        {/* Four Centered Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl mb-12 text-center">
          {/* Column 1: Marcas */}
          <div className="flex flex-col items-center">
            <h4 className={`font-bold text-xs uppercase tracking-widest mb-3 font-mono ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
              MARCAS DESTACADAS
            </h4>
            <ul className={`space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>Hewlett Packard / Sony</li>
              <li>Compaq / Toshiba / LG</li>
              <li>Samsung / Asus / Dell</li>
              <li>Lenovo / MSI / Acer</li>
            </ul>
          </div>

          {/* Column 2: Servicios */}
          <div className="flex flex-col items-center">
            <h4 className={`font-bold text-xs uppercase tracking-widest mb-3 font-mono ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
              SERVICIOS ESPECIALES
            </h4>
            <ul className={`space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>Cámaras IP y CCTV Digital</li>
              <li>Alarmas X28 / DSC / Alonso</li>
              <li>Kits de Energía Solar</li>
              <li>Monitoreo Remoto 3G/4G</li>
            </ul>
          </div>

          {/* Column 3: Horarios */}
          <div className="flex flex-col items-center">
            <h4 className={`font-bold text-xs uppercase tracking-widest mb-3 font-mono ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
              HORARIOS DE ATENCIÓN
            </h4>
            <ul className={`space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>Lunes a Viernes: 8 a 20 hs</li>
              <li>Sábados: 8 a 14 hs</li>
              <li>Sábados tarde: Guardias</li>
              <li>Domingos y Feriados: Cerrado</li>
            </ul>
          </div>

          {/* Column 4: Contactos */}
          <div className="flex flex-col items-center">
            <h4 className={`font-bold text-xs uppercase tracking-widest mb-3 font-mono ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>
              DATOS DE CONTACTO
            </h4>
            <ul className={`space-y-1.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>{companyInfo.phoneNeuquen} (Neuquén)</li>
              <li>{companyInfo.phoneBsAs} (Bs. As.)</li>
              <li>{companyInfo.email}</li>
              <li>Neuquén y Buenos Aires, Arg.</li>
            </ul>
          </div>
        </div>

        {/* Centered Social Media Links */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {(companyInfo.socials || []).map((social, idx) => {
            const Icon = social.icon === 'Facebook' ? Facebook :
                         social.icon === 'Twitter' ? Twitter :
                         social.icon === 'Instagram' ? Instagram :
                         social.icon === 'Youtube' ? Youtube : Linkedin;

            return (
              <a
                key={`foot-soc-${idx}-${social.name || 's'}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`p-3 rounded-lg border transition-all ${
                  darkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Divider */}
        <div className={`w-full max-w-4xl border-t my-6 ${darkMode ? 'border-zinc-800/80' : 'border-zinc-300/80'}`} />

        {/* Centered Copyright & Back To Top */}
        <div className="flex flex-col items-center gap-4">
          <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
            Copyright © 2026. <span className={`font-semibold ${darkMode ? 'text-zinc-300' : 'text-zinc-800'}`}>{companyInfo.fullName}</span>. Todos los Derechos Reservados.
          </p>

          <button
            onClick={scrollToTop}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-semibold transition-all mt-2 cursor-pointer ${
              darkMode
                ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 shadow-sm'
            }`}
          >
            <span>Volver arriba</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
