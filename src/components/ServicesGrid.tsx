import React, { useState, useMemo } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { 
  Camera, 
  ShieldAlert, 
  Sun, 
  Radio, 
  Cpu, 
  Monitor, 
  Smartphone, 
  Database, 
  Printer, 
  Aperture, 
  Server, 
  Laptop, 
  Wifi, 
  AppWindow,
  Search,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesGridProps {
  darkMode: boolean;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ darkMode }) => {
  const { siteData } = useSiteContext();
  const { servicesList, companyInfo } = siteData;

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-5 h-5 text-zinc-200" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-zinc-200" />;
      case 'Sun': return <Sun className="w-5 h-5 text-zinc-200" />;
      case 'Radio': return <Radio className="w-5 h-5 text-zinc-200" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-zinc-200" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-zinc-200" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-zinc-200" />;
      case 'Database': return <Database className="w-5 h-5 text-zinc-200" />;
      case 'Printer': return <Printer className="w-5 h-5 text-zinc-200" />;
      case 'Aperture': return <Aperture className="w-5 h-5 text-zinc-200" />;
      case 'Server': return <Server className="w-5 h-5 text-zinc-200" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-zinc-200" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-zinc-200" />;
      default: return <AppWindow className="w-5 h-5 text-zinc-200" />;
    }
  };

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'domotics', label: 'Domótica' },
    { id: 'security', label: 'Seguridad' },
    { id: 'solar', label: 'Energía Solar' },
    { id: 'repair', label: 'Reparación' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'data', label: 'Datos' },
    { id: 'network', label: 'Redes' },
  ];

  const filteredServices = useMemo(() => {
    return (servicesList || []).filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [servicesList, selectedCategory, searchQuery]);

  return (
    <section id="servicios" className={`py-20 relative transition-colors duration-300 ${
      darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className={`text-xs font-mono font-semibold uppercase tracking-widest block mb-1 ${
              darkMode ? 'text-zinc-400' : 'text-zinc-500'
            }`}>
              CATÁLOGO TÉCNICO COMPLETO
            </span>
            <h2 className={`font-sans text-3xl sm:text-4xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-zinc-900'
            }`}>
              Servicios Especializados
            </h2>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              darkMode ? 'text-zinc-500' : 'text-zinc-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar servicio (ej. cámaras, disco...)"
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm placeholder-zinc-500 focus:outline-none transition-colors ${
                darkMode
                  ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                  : 'bg-white border-zinc-300 text-zinc-900 focus:border-zinc-400 shadow-sm'
              }`}
            />
          </div>
        </div>

        {/* Filter Category Chips - Single Line Segmented Bar */}
        <div className={`w-full p-1.5 rounded-xl border mb-8 overflow-x-auto no-scrollbar ${
          darkMode ? 'bg-zinc-900/90 border-zinc-800/80' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-max md:min-w-0 justify-between">
            {categories.map((cat, idx) => (
              <button
                key={`srv-cat-${cat.id || 'c'}-${idx}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-1 min-w-[80px] sm:min-w-0 text-center px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? darkMode
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md'
                      : 'bg-zinc-900 text-white font-bold shadow-md'
                    : darkMode
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className={`text-center py-16 rounded-xl border ${
            darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          }`}>
            <p className={`text-base ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              No se encontraron servicios que coincidan con la búsqueda "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className={`mt-3 text-xs font-semibold hover:underline ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={`srv-item-${service.id || 's'}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                viewport={{ once: true }}
                className={`group relative p-6 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  darkMode
                    ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg border ${
                      darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                    }`}>
                      {getServiceIcon(service.icon)}
                    </div>
                    {service.highlighted && (
                      <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        darkMode
                          ? 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          : 'bg-zinc-100 text-zinc-700 border-zinc-300'
                      }`}>
                        Destacado
                      </span>
                    )}
                  </div>

                  <h3 className={`font-bold text-base transition-colors ${
                    darkMode ? 'text-white group-hover:text-zinc-100' : 'text-zinc-900 group-hover:text-zinc-800'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`text-xs mt-2 leading-relaxed ${
                    darkMode ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    {service.description}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
                  darkMode ? 'border-zinc-800' : 'border-zinc-200'
                }`}>
                  <span className={`text-[11px] flex items-center gap-1 font-mono ${
                    darkMode ? 'text-zinc-500' : 'text-zinc-400'
                  }`}>
                    <CheckCircle className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                    Garantía RCH
                  </span>

                  <a
                    href={`https://wa.me/${companyInfo.phoneNeuquenClean || '542994631278'}?text=${encodeURIComponent(`Hola, quisiera solicitar presupuesto para: ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      darkMode
                        ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border-zinc-700'
                        : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200 border-zinc-300'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Presupuestar</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

