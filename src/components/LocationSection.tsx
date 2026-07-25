import React from 'react';
import { useSiteContext } from '../context/SiteContext';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

interface LocationSectionProps {
  darkMode: boolean;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ darkMode }) => {
  const { siteData } = useSiteContext();
  const { companyInfo } = siteData;

  return (
    <section id="ubicacion" className={`py-20 transition-colors duration-300 ${
      darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`text-xs font-mono font-semibold uppercase tracking-widest ${
            darkMode ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            COBERTURA Y UBICACIÓN
          </span>
          <h2 className={`font-sans text-3xl sm:text-4xl font-extrabold mt-1 ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}>
            Dónde Encontrarnos
          </h2>
          <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Atención técnica presencial y remota para Neuquén y Buenos Aires.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Embed Card - Matching full height of right side card container */}
          <div className={`lg:col-span-7 rounded-2xl overflow-hidden border shadow-2xl relative flex flex-col min-h-[480px] ${
            darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-white'
          }`}>
            <iframe
              src={companyInfo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de RCH-BYTEC"
              className={`w-full h-full flex-1 min-h-[420px] transition-all duration-300 ${
                darkMode ? 'filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100' : 'filter contrast-100 opacity-100'
              }`}
            />
            
            <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-3 text-xs ${
              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin className={`w-4 h-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
                <span className={`font-semibold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{companyInfo.location}</span>
              </div>
              <a
                href="https://maps.google.com/?q=-38.951921,-68.058965"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors shadow-sm ${
                  darkMode ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
              >
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Contact Details & Schedule Card Container */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Phone Numbers Card */}
            <div className={`p-6 rounded-2xl border shadow-xl flex-1 flex flex-col justify-center ${
              darkMode ? 'border-zinc-800 bg-zinc-900/80' : 'border-zinc-200 bg-white'
            }`}>
              <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                <Phone className={`w-5 h-5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
                <span>Teléfonos Directos</span>
              </h3>

              <div className="space-y-3 text-sm">
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div>
                    <span className={`text-[10px] font-mono uppercase block ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Neuquén y Patagonia</span>
                    <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{companyInfo.phoneNeuquen}</span>
                  </div>
                  <a
                    href={`tel:${companyInfo.phoneNeuquenClean}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      darkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
                    }`}
                  >
                    Llamar
                  </a>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div>
                    <span className={`text-[10px] font-mono uppercase block ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Buenos Aires y CABA</span>
                    <span className={`font-mono font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{companyInfo.phoneBsAs}</span>
                  </div>
                  <a
                    href={`tel:${companyInfo.phoneBsAsClean}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      darkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
                    }`}
                  >
                    Llamar
                  </a>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                  <div>
                    <span className={`text-[10px] font-mono uppercase block ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Correo Electrónico</span>
                    <span className={`font-mono font-bold ${darkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{companyInfo.email}</span>
                  </div>
                  <a
                    href={`mailto:${companyInfo.email}`}
                    className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                      darkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-200 text-zinc-700 hover:text-zinc-900'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className={`p-6 rounded-2xl border shadow-xl flex-1 flex flex-col justify-center ${
              darkMode ? 'border-zinc-800 bg-zinc-900/80' : 'border-zinc-200 bg-white'
            }`}>
              <h3 className={`font-bold text-lg mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                <Clock className={`w-5 h-5 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`} />
                <span>Horarios de Atención</span>
              </h3>

              <ul className={`space-y-2.5 text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {companyInfo.hours.map((h, i) => (
                  <li key={i} className={`flex items-center justify-between py-1.5 border-b last:border-0 ${
                    darkMode ? 'border-zinc-800/80' : 'border-zinc-200'
                  }`}>
                    <span className={`font-medium ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>{h.days}</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

