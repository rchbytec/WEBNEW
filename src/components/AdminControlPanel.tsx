import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteContext } from '../context/SiteContext';
import { sendAdminEmail } from '../utils/emailNotifier';
import { HeroSlide, BannerOffer, ServiceItem } from '../types';
import { 
  X, 
  Save, 
  RefreshCw, 
  LogOut, 
  LayoutDashboard, 
  Sliders, 
  Layers, 
  Briefcase, 
  Phone, 
  Shield, 
  Plus, 
  Trash2, 
  Check, 
  Key, 
  Mail, 
  Globe, 
  MessageSquare,
  Sparkles,
  Info,
  Lock,
  Cpu,
  Lightbulb,
  Sun,
  Moon,
  Droplets,
  Wind,
  DoorClosed,
  Power,
  Users,
  Eye,
  AlertTriangle,
  Search,
  Laptop,
  Smartphone,
  Tablet,
  Clock,
  ChevronDown
} from 'lucide-react';

interface AdminControlPanelProps {
  darkMode: boolean;
}

export const AdminControlPanel: React.FC<AdminControlPanelProps> = ({ darkMode }) => {
  const {
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    setIsAdminLoggedIn,
    siteData,
    setSiteData,
    resetToDefaults,
    setNotificationMsg,
    visitorLogs,
    clearVisitorLogs,
  } = useSiteContext();

  const [activeTab, setActiveTab] = useState<'general' | 'header' | 'hero' | 'quick' | 'services' | 'simulator' | 'visitors' | 'socials' | 'admin'>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  // Security Modals
  const [showClearVisitorsModal, setShowClearVisitorsModal] = useState(false);
  const [confirmTextClearVisitors, setConfirmTextClearVisitors] = useState('');

  const [showRestoreFactoryModal, setShowRestoreFactoryModal] = useState(false);
  const [confirmTextRestoreFactory, setConfirmTextRestoreFactory] = useState('');

  // Search filter for visitor logs
  const [visitorSearchQuery, setVisitorSearchQuery] = useState('');
  const [expandedVisitorId, setExpandedVisitorId] = useState<string | null>(null);

  // Local draft state initialized safely from siteData
  const getSafeData = React.useCallback((data: any) => {
    if (!data) return siteData;
    return {
      ...data,
      companyInfo: {
        ...(siteData?.companyInfo || {}),
        ...(data?.companyInfo || {}),
        socials: Array.isArray(data?.companyInfo?.socials)
          ? data.companyInfo.socials
          : Array.isArray(siteData?.companyInfo?.socials)
          ? siteData.companyInfo.socials
          : []
      },
      headerLinks: Array.isArray(data?.headerLinks) ? data.headerLinks : siteData?.headerLinks || [],
      heroSlides: Array.isArray(data?.heroSlides) ? data.heroSlides : siteData?.heroSlides || [],
      quickBanners: Array.isArray(data?.quickBanners) ? data.quickBanners : siteData?.quickBanners || [],
      servicesList: Array.isArray(data?.servicesList) ? data.servicesList : siteData?.servicesList || [],
      brands: Array.isArray(data?.brands) ? data.brands : siteData?.brands || [],
      adminCredentials: {
        email: 'admin@rchbytecsrl.com.ar',
        password: 'Admin_123',
        ...(siteData?.adminCredentials || {}),
        ...(data?.adminCredentials || {})
      },
      simulatorConfig: {
        badge: 'DEMO INTERACTIVA EN VIVO',
        title: 'Simulación Domótica',
        description: 'Pruébelo usted mismo: controle la iluminación, cortinas motorizadas, bomba de agua, climatización y alarmas en tiempo real.',
        initialLightsOn: true,
        initialLightBrightness: 85,
        initialLightColor: 'warm',
        initialCurtainsOpen: 70,
        initialWaterPumpOn: false,
        initialWaterPressure: 2.4,
        initialAcOn: true,
        initialAcTemp: 23,
        initialAcMode: 'cool',
        initialAlarmArmed: true,
        initialGateOpen: false,
        dayScenarioLabel: 'Escenario Día',
        nightScenarioLabel: 'Escenario Noche',
        waterPumpLabel: 'Encender Riego / Bomba',
        initialLogText: 'Sistema RBT OS Domótica iniciado en línea.',
        ctaTitle: '¿Desea automatizar su hogar, negocio o campo? Diseños a medida con garantía oficial.',
        ctaDescription: 'Instalaciones profesionales de llaves GSM, bombas de agua y riegos inteligentes, alarmas centrales, cámaras de seguridad monitorizadas y domótica centralizada. Próximamente sistemas centrales de IA integrados.',
        ctaButtonText: 'Solicitar Asesoramiento',
        ...(siteData?.simulatorConfig || {}),
        ...(data?.simulatorConfig || {})
      }
    };
  }, [siteData]);

  const [formData, setFormData] = useState(() => getSafeData(siteData));

  // When panel opens, sync local draft
  React.useEffect(() => {
    if (isAdminPanelOpen && siteData) {
      setFormData(getSafeData(siteData));
    }
  }, [siteData, isAdminPanelOpen, getSafeData]);

  if (!isAdminPanelOpen) return null;

  const handleSaveAll = () => {
    setSiteData(formData);
    setSaveSuccess(true);
    setNotificationMsg('¡Todos los cambios del sitio web han sido guardados con éxito!');
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveAdminCredentials = async () => {
    const newEmail = formData.adminCredentials.email.trim();
    const newPassword = formData.adminCredentials.password.trim();

    if (!newEmail || !newPassword) {
      alert('Por favor complete el email y la nueva contraseña.');
      return;
    }

    setEmailSending(true);
    setSiteData(formData);

    const message = `Estimado Administrador de RCH-BYTEC,\n\nSe han actualizado correctamente sus credenciales de acceso al Panel de Control de la página web.\n\nNuevas credenciales:\n- Email: ${newEmail}\n- Contraseña Elegida: ${newPassword}\n\nGuarde estas credenciales en un lugar seguro. Si no realizó este cambio, contacte al soporte técnico de inmediato.`;

    const res = await sendAdminEmail({
      toEmail: newEmail,
      subject: 'Actualización de Credenciales Admin - RCH-BYTEC',
      message,
    });

    setEmailSending(false);
    setSaveSuccess(true);
    setNotificationMsg(`Credenciales guardadas. ${res.message}`);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className={`w-full max-w-6xl h-[92vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
            darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Top Bar */}
          <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${
            darkMode ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-black tracking-tight">Panel de Control RCH-BYTEC</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Modo Edición Total
                  </span>
                </div>
                <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
                  Modifique textos, contactos, banners, servicios, enlaces y credenciales de acceso.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveAll}
                className="px-4 py-2 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saveSuccess ? '¡Guardado!' : 'Guardar Todo'}</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('¿Desea cerrar la sesión de Administrador?')) {
                    setIsAdminLoggedIn(false);
                    setIsAdminPanelOpen(false);
                  }
                }}
                className={`p-2 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  darkMode ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAdminPanelOpen(false)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Layout: Tabs Left + Content Right */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Tabs */}
            <div className={`w-56 shrink-0 border-r p-3 space-y-1 overflow-y-auto ${
              darkMode ? 'border-zinc-800 bg-zinc-900/30' : 'border-zinc-200 bg-zinc-50/50'
            }`}>
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>Contacto & Datos</span>
              </button>

              <button
                onClick={() => setActiveTab('header')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'header'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Header y Menú</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Carrusel Hero</span>
              </button>

              <button
                onClick={() => setActiveTab('quick')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'quick'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Ofertas Rápidas</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Servicios ({formData.servicesList.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('simulator')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'simulator'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Simulador / Demo</span>
              </button>

              <button
                onClick={() => setActiveTab('visitors')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  activeTab === 'visitors'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Visitantes</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                  activeTab === 'visitors'
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {visitorLogs.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('socials')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'socials'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Redes Sociales</span>
              </button>

              <button
                onClick={() => setActiveTab('admin')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2.5 cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : darkMode ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-white' : 'text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Credenciales Admin</span>
              </button>

              <div className="pt-4 border-t border-zinc-800/50">
                <button
                  onClick={() => {
                    setConfirmTextRestoreFactory('');
                    setShowRestoreFactoryModal(true);
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-[11px] font-semibold border transition-colors flex items-center gap-2 cursor-pointer ${
                    darkMode ? 'border-zinc-800 text-red-400 hover:bg-red-500/10' : 'border-zinc-200 text-red-600 hover:bg-red-50'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restaurar Fábrica</span>
                </button>
              </div>

            </div>

            {/* Panel Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              
              {/* TAB 1: CONTACTO Y DATOS */}
              {activeTab === 'general' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800/40 pb-3">
                    <h3 className="font-bold text-lg">Información General & Contacto</h3>
                    <p className="text-xs text-zinc-400">Edite los teléfonos, slogan, cupón y mapa.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">Nombre Comercial</label>
                      <input
                        type="text"
                        value={formData.companyInfo.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, name: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Razón Social</label>
                      <input
                        type="text"
                        value={formData.companyInfo.fullName}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, fullName: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Slogan Principal</label>
                      <input
                        type="text"
                        value={formData.companyInfo.slogan}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, slogan: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Subtítulo Corporativo</label>
                      <input
                        type="text"
                        value={formData.companyInfo.subtitle}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, subtitle: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Teléfono Neuquén (Visible)</label>
                      <input
                        type="text"
                        value={formData.companyInfo.phoneNeuquen}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            companyInfo: { 
                              ...formData.companyInfo, 
                              phoneNeuquen: val,
                              phoneNeuquenClean: val.replace(/\D/g, '')
                            }
                          });
                        }}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Teléfono Buenos Aires (Visible)</label>
                      <input
                        type="text"
                        value={formData.companyInfo.phoneBsAs}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            companyInfo: { 
                              ...formData.companyInfo, 
                              phoneBsAs: val,
                              phoneBsAsClean: val.replace(/\D/g, '')
                            }
                          });
                        }}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Correo Electrónico de Contacto</label>
                      <input
                        type="email"
                        value={formData.companyInfo.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, email: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Ubicación Geográfica Texto</label>
                      <input
                        type="text"
                        value={formData.companyInfo.location}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, location: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold mb-1">URL de Google Maps Embed</label>
                    <input
                      type="text"
                      value={formData.companyInfo.mapEmbedUrl}
                      onChange={(e) => setFormData({
                        ...formData,
                        companyInfo: { ...formData.companyInfo, mapEmbedUrl: e.target.value }
                      })}
                      className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono text-xs ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                    />
                  </div>

                  <div className="border-t border-zinc-800/40 pt-4 space-y-3">
                    <h4 className="font-bold text-sm">Configuración del Cupón Especial</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1">Código de Cupón</label>
                        <input
                          type="text"
                          value={formData.companyInfo.couponCode}
                          onChange={(e) => setFormData({
                            ...formData,
                            companyInfo: { ...formData.companyInfo, couponCode: e.target.value }
                          })}
                          className={`w-full px-3.5 py-2 rounded-lg border text-sm font-mono ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1">Título / Beneficio</label>
                        <input
                          type="text"
                          value={formData.companyInfo.couponDiscount}
                          onChange={(e) => setFormData({
                            ...formData,
                            companyInfo: { ...formData.companyInfo, couponDiscount: e.target.value }
                          })}
                          className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">Descripción del Cupón</label>
                      <textarea
                        rows={2}
                        value={formData.companyInfo.couponDescription}
                        onChange={(e) => setFormData({
                          ...formData,
                          companyInfo: { ...formData.companyInfo, couponDescription: e.target.value }
                        })}
                        className={`w-full px-3.5 py-2 rounded-lg border text-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: HEADER Y LINKS */}
              {activeTab === 'header' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800/40 pb-3">
                    <h3 className="font-bold text-lg">Navegación del Header</h3>
                    <p className="text-xs text-zinc-400">Personalice los nombres visibles del menú de navegación superior.</p>
                  </div>

                  {/* Informative Banner */}
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed flex items-start gap-3 ${
                    darkMode ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}>
                    <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p><strong className="text-emerald-400">Nombre del Enlace (Editable):</strong> Puedes editar libremente el texto visible que ven los usuarios (ej. cambiar "Inicio" por "Portada", "Servicios" por "Nuestras Soluciones").</p>
                      <p><strong className="text-zinc-400">Destino de Sección (Solo Lectura):</strong> La variable de ancla (ej. <code className="text-emerald-400">#inicio</code>, <code className="text-emerald-400">#servicios</code>) está bloqueada en modo solo lectura para garantizar que los botones siempre desplacen correctamente a sus respectivas secciones.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-3 text-xs font-semibold px-1 text-zinc-400">
                      <div className="col-span-1">#</div>
                      <div className="col-span-6">Nombre Visible (Editable)</div>
                      <div className="col-span-5">Ancla Técnica de Sección (Fija / Solo Lectura)</div>
                    </div>

                    {formData.headerLinks.map((link, idx) => (
                      <div key={`admin-hdr-${link.id || 'l'}-${idx}`} className={`p-3 rounded-xl border grid grid-cols-12 items-center gap-3 ${
                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}>
                        <div className="col-span-1 text-xs font-mono font-bold text-zinc-500">#{idx + 1}</div>
                        
                        {/* Editable Name */}
                        <div className="col-span-6">
                          <input
                            type="text"
                            value={link.name}
                            onChange={(e) => {
                              const newLinks = [...formData.headerLinks];
                              newLinks[idx].name = e.target.value;
                              setFormData({ ...formData, headerLinks: newLinks });
                            }}
                            placeholder="Nombre del enlace"
                            className={`w-full px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                              darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-emerald-500/50' : 'bg-white border-zinc-300 text-zinc-900'
                            }`}
                          />
                        </div>

                        {/* Read-Only Technical Href */}
                        <div className="col-span-5 flex items-center gap-2">
                          <div className={`flex-1 px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center justify-between opacity-80 ${
                            darkMode ? 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400' : 'bg-zinc-200/80 border-zinc-300 text-zinc-600'
                          }`} title="Variable de ancla fija (Solo Lectura)">
                            <span>{link.href}</span>
                            <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: HERO SLIDES */}
              {activeTab === 'hero' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Carrusel Hero Banner ({formData.heroSlides.length} Slides)</h3>
                      <p className="text-xs text-zinc-400">Modifique títulos, descripciones e imágenes del banner principal.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newSlide: HeroSlide = {
                          id: `slide-${Date.now()}`,
                          title: 'Nuevo Servicio Técnico',
                          subtitle: 'Especialistas Certificados',
                          description: 'Descripción del nuevo servicio ofrecido por RCH-BYTEC.',
                          badge: 'Nuevo',
                          ctaText: 'Consultar Ahora',
                          ctaCategory: 'repair',
                          imageBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.95))',
                          imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
                        };
                        setFormData({ ...formData, heroSlides: [...formData.heroSlides, newSlide] });
                      }}
                      className="px-3.5 py-1.5 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Slide</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {formData.heroSlides.map((slide, idx) => (
                      <div key={`admin-slide-${slide.id || 's'}-${idx}`} className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}>
                        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-2">
                          <span className="font-mono text-xs font-bold text-emerald-500">Slide #{idx + 1} ({slide.id})</span>
                          <button
                            onClick={() => {
                              if (formData.heroSlides.length <= 1) {
                                alert('Debe haber al menos 1 slide en el carrusel.');
                                return;
                              }
                              const updated = formData.heroSlides.filter((_, i) => i !== idx);
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold mb-1">Título del Slide</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => {
                                const updated = [...formData.heroSlides];
                                updated[idx].title = e.target.value;
                                setFormData({ ...formData, heroSlides: updated });
                              }}
                              className={`w-full px-3 py-1.5 rounded-lg border text-xs font-bold ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold mb-1">Subtítulo</label>
                            <input
                              type="text"
                              value={slide.subtitle}
                              onChange={(e) => {
                                const updated = [...formData.heroSlides];
                                updated[idx].subtitle = e.target.value;
                                setFormData({ ...formData, heroSlides: updated });
                              }}
                              className={`w-full px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold mb-1">Etiqueta / Badge</label>
                            <input
                              type="text"
                              value={slide.badge}
                              onChange={(e) => {
                                const updated = [...formData.heroSlides];
                                updated[idx].badge = e.target.value;
                                setFormData({ ...formData, heroSlides: updated });
                              }}
                              className={`w-full px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold mb-1">Texto Botón CTA</label>
                            <input
                              type="text"
                              value={slide.ctaText}
                              onChange={(e) => {
                                const updated = [...formData.heroSlides];
                                updated[idx].ctaText = e.target.value;
                                setFormData({ ...formData, heroSlides: updated });
                              }}
                              className={`w-full px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Descripción del Servicio</label>
                          <textarea
                            rows={2}
                            value={slide.description}
                            onChange={(e) => {
                              const updated = [...formData.heroSlides];
                              updated[idx].description = e.target.value;
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            className={`w-full px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold mb-1">URL de la Imagen</label>
                          <input
                            type="text"
                            value={slide.imageUrl}
                            onChange={(e) => {
                              const updated = [...formData.heroSlides];
                              updated[idx].imageUrl = e.target.value;
                              setFormData({ ...formData, heroSlides: updated });
                            }}
                            className={`w-full px-3 py-1.5 rounded-lg border text-xs font-mono ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: QUICK OFFERS */}
              {activeTab === 'quick' && (
                <div className="space-y-6 max-w-3xl">
                  <div className="border-b border-zinc-800/40 pb-3">
                    <h3 className="font-bold text-lg">Banners de Ofertas Rápidas</h3>
                    <p className="text-xs text-zinc-400">Modifique las tarjetas de oferta debajo del Hero.</p>
                  </div>

                  <div className="space-y-4">
                    {formData.quickBanners.map((banner, idx) => (
                      <div key={`admin-quick-${banner.id || 'b'}-${idx}`} className={`p-4 rounded-xl border space-y-2 ${
                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}>
                        <div className="font-mono text-xs font-bold text-emerald-500">Banner #{idx + 1}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={banner.title}
                            onChange={(e) => {
                              const updated = [...formData.quickBanners];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, quickBanners: updated });
                            }}
                            placeholder="Título"
                            className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                          />
                          <input
                            type="text"
                            value={banner.tagline}
                            onChange={(e) => {
                              const updated = [...formData.quickBanners];
                              updated[idx].tagline = e.target.value;
                              setFormData({ ...formData, quickBanners: updated });
                            }}
                            placeholder="Eslogan"
                            className={`px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                          />
                        </div>
                        <textarea
                          rows={2}
                          value={banner.description}
                          onChange={(e) => {
                            const updated = [...formData.quickBanners];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, quickBanners: updated });
                          }}
                          placeholder="Descripción"
                          className={`w-full px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SERVICIOS */}
              {activeTab === 'services' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">Catálogo de Servicios ({formData.servicesList.length})</h3>
                      <p className="text-xs text-zinc-400">Agregue, edite o elimine servicios ofrecidos.</p>
                    </div>
                    <button
                      onClick={() => {
                        const newServ: ServiceItem = {
                          id: `s-${Date.now()}`,
                          title: 'Nuevo Servicio Técnico Especializado',
                          description: 'Descripción detallada de la prestación técnica.',
                          category: 'repair',
                          icon: 'Cpu',
                          highlighted: false
                        };
                        setFormData({ ...formData, servicesList: [...formData.servicesList, newServ] });
                      }}
                      className="px-3 py-1.5 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Servicio</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.servicesList.map((serv, idx) => (
                      <div key={`admin-serv-${serv.id || 's'}-${idx}`} className={`p-4 rounded-xl border space-y-2 relative ${
                        darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-emerald-500">#{idx + 1} - {serv.category}</span>
                          <button
                            onClick={() => {
                              const updated = formData.servicesList.filter((_, i) => i !== idx);
                              setFormData({ ...formData, servicesList: updated });
                            }}
                            className="p-1 rounded text-red-400 hover:bg-red-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={serv.title}
                          onChange={(e) => {
                            const updated = [...formData.servicesList];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, servicesList: updated });
                          }}
                          className={`w-full px-3 py-1.5 rounded-lg border text-xs font-bold ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                        />

                        <textarea
                          rows={3}
                          value={serv.description}
                          onChange={(e) => {
                            const updated = [...formData.servicesList];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, servicesList: updated });
                          }}
                          className={`w-full px-3 py-1.5 rounded-lg border text-xs ${darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'}`}
                        />

                        <div className="flex items-center justify-between text-xs pt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={serv.highlighted || false}
                              onChange={(e) => {
                                const updated = [...formData.servicesList];
                                updated[idx].highlighted = e.target.checked;
                                setFormData({ ...formData, servicesList: updated });
                              }}
                              className="rounded border-zinc-700 text-emerald-500 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-[11px] font-semibold">Destacado</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB FOR SIMULADOR */}
              {activeTab === 'simulator' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-emerald-500" />
                        <span>Configuración del Simulador Domótico</span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Personalice los títulos, textos, llamado a la acción y el estado inicial en que aparecen las luces, cortinas, riego, aire y alarmas cuando un visitante abre la demo.
                      </p>
                    </div>
                  </div>

                  {/* SECCIÓN 1: TÍTULOS Y TEXTOS */}
                  <div className={`p-4 rounded-xl border space-y-4 ${
                    darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Textos y Encabezados del Simulador</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1">Insignia / Badge Superior</label>
                        <input
                          type="text"
                          value={formData.simulatorConfig.badge}
                          onChange={(e) => setFormData({
                            ...formData,
                            simulatorConfig: { ...formData.simulatorConfig, badge: e.target.value }
                          })}
                          placeholder="DEMO INTERACTIVA EN VIVO"
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs font-medium ${
                            darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1">Título Principal de la Sección</label>
                        <input
                          type="text"
                          value={formData.simulatorConfig.title}
                          onChange={(e) => setFormData({
                            ...formData,
                            simulatorConfig: { ...formData.simulatorConfig, title: e.target.value }
                          })}
                          placeholder="Simulación Domótica"
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs font-bold ${
                            darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Subtítulo / Descripción Bajada</label>
                      <textarea
                        rows={2}
                        value={formData.simulatorConfig.description}
                        onChange={(e) => setFormData({
                          ...formData,
                          simulatorConfig: { ...formData.simulatorConfig, description: e.target.value }
                        })}
                        placeholder="Pruébelo usted mismo: controle la iluminación, cortinas..."
                        className={`w-full px-3.5 py-2 rounded-lg border text-xs ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Mensaje Inicial en la Terminal de Eventos</label>
                      <input
                        type="text"
                        value={formData.simulatorConfig.initialLogText}
                        onChange={(e) => setFormData({
                          ...formData,
                          simulatorConfig: { ...formData.simulatorConfig, initialLogText: e.target.value }
                        })}
                        placeholder="Sistema RBT OS Domótica iniciado en línea."
                        className={`w-full px-3.5 py-2 rounded-lg border text-xs font-mono ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* SECCIÓN 2: ESTADOS INICIALES */}
                  <div className={`p-4 rounded-xl border space-y-4 ${
                    darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                      <Sliders className="w-4 h-4" />
                      <span>Estado Inicial de Dispositivos (Al Cargar por Primera Vez)</span>
                    </h4>

                    {/* Grid Iluminación y Cortinas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Iluminación */}
                      <div className={`p-3 rounded-lg border space-y-3 ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4 text-amber-400" />
                            <span>Iluminación Dimerizable</span>
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.simulatorConfig.initialLightsOn}
                              onChange={(e) => setFormData({
                                ...formData,
                                simulatorConfig: { ...formData.simulatorConfig, initialLightsOn: e.target.checked }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-medium">
                            <span>Brillo Inicial:</span>
                            <span className="font-mono text-amber-400 font-bold">{formData.simulatorConfig.initialLightBrightness}%</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={formData.simulatorConfig.initialLightBrightness}
                            onChange={(e) => setFormData({
                              ...formData,
                              simulatorConfig: { ...formData.simulatorConfig, initialLightBrightness: Number(e.target.value) }
                            })}
                            className="w-full accent-emerald-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Tono Inicial de Luz</label>
                          <div className="grid grid-cols-3 gap-1.5">
                            {(['warm', 'neutral', 'cool'] as const).map((colorMode, idx) => (
                              <button
                                key={`admin-colormode-${colorMode}-${idx}`}
                                type="button"
                                onClick={() => setFormData({
                                  ...formData,
                                  simulatorConfig: { ...formData.simulatorConfig, initialLightColor: colorMode }
                                })}
                                className={`py-1 rounded text-[10px] font-bold border capitalize transition-all cursor-pointer ${
                                  formData.simulatorConfig.initialLightColor === colorMode
                                    ? 'bg-emerald-500 text-white border-emerald-400'
                                    : darkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                                }`}
                              >
                                {colorMode === 'warm' ? '☀️ Cálida' : colorMode === 'neutral' ? '⚖️ Neutra' : '❄️ Fría'}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Cortinas Motorizadas */}
                      <div className={`p-3 rounded-lg border space-y-3 ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}>
                        <span className="font-bold text-xs flex items-center gap-1.5">
                          <DoorClosed className="w-4 h-4 text-purple-400" />
                          <span>Cortinas Roller Motorizadas</span>
                        </span>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] font-medium">
                            <span>Apertura Inicial:</span>
                            <span className="font-mono text-purple-400 font-bold">{formData.simulatorConfig.initialCurtainsOpen}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.simulatorConfig.initialCurtainsOpen}
                            onChange={(e) => setFormData({
                              ...formData,
                              simulatorConfig: { ...formData.simulatorConfig, initialCurtainsOpen: Number(e.target.value) }
                            })}
                            className="w-full accent-purple-500 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                          />
                        </div>
                        <p className="text-[10px] text-zinc-400">
                          0% es totalmente cerrada, 100% es totalmente abierta.
                        </p>
                      </div>
                    </div>

                    {/* Grid Riego/Bomba y Climatización */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Bomba de Agua */}
                      <div className={`p-3 rounded-lg border space-y-3 ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-1.5">
                            <Droplets className="w-4 h-4 text-cyan-400" />
                            <span>Bomba de Agua & Riego GSM</span>
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.simulatorConfig.initialWaterPumpOn}
                              onChange={(e) => setFormData({
                                ...formData,
                                simulatorConfig: { ...formData.simulatorConfig, initialWaterPumpOn: e.target.checked }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold mb-1">Presión de Trabajo (BAR)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="6.0"
                            value={formData.simulatorConfig.initialWaterPressure}
                            onChange={(e) => setFormData({
                              ...formData,
                              simulatorConfig: { ...formData.simulatorConfig, initialWaterPressure: Number(e.target.value) }
                            })}
                            className={`w-full px-3 py-1.5 rounded border text-xs font-mono ${
                              darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Climatización (AC) */}
                      <div className={`p-3 rounded-lg border space-y-3 ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs flex items-center gap-1.5">
                            <Wind className="w-4 h-4 text-sky-400" />
                            <span>Climatización (Aire Ac.)</span>
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.simulatorConfig.initialAcOn}
                              onChange={(e) => setFormData({
                                ...formData,
                                simulatorConfig: { ...formData.simulatorConfig, initialAcOn: e.target.checked }
                              })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold mb-1">Temperatura (°C)</label>
                            <input
                              type="number"
                              min="16"
                              max="30"
                              value={formData.simulatorConfig.initialAcTemp}
                              onChange={(e) => setFormData({
                                ...formData,
                                simulatorConfig: { ...formData.simulatorConfig, initialAcTemp: Number(e.target.value) }
                              })}
                              className={`w-full px-3 py-1.5 rounded border text-xs font-mono ${
                                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'
                              }`}
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold mb-1">Modo Inicial</label>
                            <select
                              value={formData.simulatorConfig.initialAcMode}
                              onChange={(e) => setFormData({
                                ...formData,
                                simulatorConfig: { ...formData.simulatorConfig, initialAcMode: e.target.value as 'cool' | 'heat' | 'eco' }
                              })}
                              className={`w-full px-2 py-1.5 rounded border text-xs ${
                                darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-zinc-900'
                              }`}
                            >
                              <option value="cool">❄️ Frío</option>
                              <option value="heat">🔥 Calor</option>
                              <option value="eco">🌱 ECO</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid Alarmas y Portón */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Alarma */}
                      <div className={`p-3 rounded-lg border space-y-2 flex items-center justify-between ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}>
                        <div>
                          <span className="font-bold text-xs block">Alarma Perimetral</span>
                          <span className="text-[10px] text-zinc-400">Armar o desarmar por defecto al iniciar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.simulatorConfig.initialAlarmArmed}
                            onChange={(e) => setFormData({
                              ...formData,
                              simulatorConfig: { ...formData.simulatorConfig, initialAlarmArmed: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>

                      {/* Portón Automático */}
                      <div className={`p-3 rounded-lg border space-y-2 flex items-center justify-between ${
                        darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200'
                      }`}>
                        <div>
                          <span className="font-bold text-xs block">Portón Vehicular</span>
                          <span className="text-[10px] text-zinc-400">Abierto o cerrado por defecto al iniciar</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.simulatorConfig.initialGateOpen}
                            onChange={(e) => setFormData({
                              ...formData,
                              simulatorConfig: { ...formData.simulatorConfig, initialGateOpen: e.target.checked }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 3: BOTONES Y ESCENARIOS RÁPIDOS */}
                  <div className={`p-4 rounded-xl border space-y-4 ${
                    darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                      <Sun className="w-4 h-4" />
                      <span>Nombres de Escenarios y Accesos Rápidos</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1">Escenario Día</label>
                        <input
                          type="text"
                          value={formData.simulatorConfig.dayScenarioLabel}
                          onChange={(e) => setFormData({
                            ...formData,
                            simulatorConfig: { ...formData.simulatorConfig, dayScenarioLabel: e.target.value }
                          })}
                          placeholder="Escenario Día"
                          className={`w-full px-3 py-2 rounded border text-xs font-semibold ${
                            darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1">Escenario Noche</label>
                        <input
                          type="text"
                          value={formData.simulatorConfig.nightScenarioLabel}
                          onChange={(e) => setFormData({
                            ...formData,
                            simulatorConfig: { ...formData.simulatorConfig, nightScenarioLabel: e.target.value }
                          })}
                          placeholder="Escenario Noche"
                          className={`w-full px-3 py-2 rounded border text-xs font-semibold ${
                            darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold mb-1">Botón Bomba de Agua</label>
                        <input
                          type="text"
                          value={formData.simulatorConfig.waterPumpLabel}
                          onChange={(e) => setFormData({
                            ...formData,
                            simulatorConfig: { ...formData.simulatorConfig, waterPumpLabel: e.target.value }
                          })}
                          placeholder="Encender Riego / Bomba"
                          className={`w-full px-3 py-2 rounded border text-xs font-semibold ${
                            darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECCIÓN 4: TARJETA DE LLAMADO A LA ACCIÓN */}
                  <div className={`p-4 rounded-xl border space-y-4 ${
                    darkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <h4 className="font-bold text-sm text-emerald-500 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>Llamado a la Acción Inferior del Simulador</span>
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Título del Llamado</label>
                      <input
                        type="text"
                        value={formData.simulatorConfig.ctaTitle}
                        onChange={(e) => setFormData({
                          ...formData,
                          simulatorConfig: { ...formData.simulatorConfig, ctaTitle: e.target.value }
                        })}
                        placeholder="¿Desea automatizar su hogar, negocio o campo...?"
                        className={`w-full px-3.5 py-2 rounded-lg border text-xs font-bold ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Descripción del Llamado</label>
                      <textarea
                        rows={2}
                        value={formData.simulatorConfig.ctaDescription}
                        onChange={(e) => setFormData({
                          ...formData,
                          simulatorConfig: { ...formData.simulatorConfig, ctaDescription: e.target.value }
                        })}
                        placeholder="Diseñamos instalaciones a medida de llaves GSM..."
                        className={`w-full px-3.5 py-2 rounded-lg border text-xs ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">Texto del Botón</label>
                      <input
                        type="text"
                        value={formData.simulatorConfig.ctaButtonText}
                        onChange={(e) => setFormData({
                          ...formData,
                          simulatorConfig: { ...formData.simulatorConfig, ctaButtonText: e.target.value }
                        })}
                        placeholder="Solicitar Asesoramiento Técnico"
                        className={`w-full px-3.5 py-2 rounded-lg border text-xs font-bold ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB VISITANTES */}
              {activeTab === 'visitors' && (
                <div className="space-y-6 max-w-5xl">
                  {/* Header tab */}
                  <div className="border-b border-zinc-800/40 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-cyan-400" />
                        <span>Registro de Visitantes y Direcciones IP</span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Historial en tiempo real de accesos al sitio web, contabilidad de tráfico, direcciones IP y métricas de dispositivos.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setConfirmTextClearVisitors('');
                        setShowClearVisitorsModal(true);
                      }}
                      disabled={visitorLogs.length === 0}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold border border-red-500/40 text-red-400 hover:bg-red-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Vaciar Registros</span>
                    </button>
                  </div>

                  {/* Metrics cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Total de Ingresos</span>
                      <div className="text-2xl font-black font-mono text-emerald-400">
                        {visitorLogs.reduce((acc, l) => acc + (l.visitCount || 1), 0)}
                      </div>
                      <span className="text-[10px] text-zinc-500">Sesiones y reingresos acumulados</span>
                    </div>

                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Dispositivos Únicos</span>
                      <div className="text-2xl font-black font-mono text-cyan-400">
                        {visitorLogs.length}
                      </div>
                      <span className="text-[10px] text-zinc-500">Equipos / IPs reconocidos</span>
                    </div>

                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Dispositivos</span>
                      <div className="flex items-center gap-2 text-xs font-bold mt-1">
                        <span className="flex items-center gap-1 text-emerald-400">
                          <Laptop className="w-3.5 h-3.5" />
                          {visitorLogs.filter(l => l.deviceType === 'Escritorio').length}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="flex items-center gap-1 text-purple-400">
                          <Smartphone className="w-3.5 h-3.5" />
                          {visitorLogs.filter(l => l.deviceType === 'Móvil').length}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500">Escritorio / Móvil</span>
                    </div>

                    <div className={`p-4 rounded-xl border ${darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                      <span className="text-[11px] font-semibold text-zinc-400 block mb-1">Última Visita</span>
                      <div className="text-xs font-bold font-mono text-amber-400 truncate mt-1">
                        {visitorLogs[0]?.timestamp || 'Sin visitas'}
                      </div>
                      <span className="text-[10px] text-zinc-500 truncate block">
                        {visitorLogs[0]?.location || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Search filter bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={visitorSearchQuery}
                      onChange={(e) => setVisitorSearchQuery(e.target.value)}
                      placeholder="Buscar por dirección IP, ciudad, dispositivo o navegador..."
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium ${
                        darkMode ? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500' : 'bg-white border-zinc-300 text-zinc-900'
                      }`}
                    />
                  </div>

                  {/* Visitor logs list/table */}
                  <div className={`rounded-xl border overflow-hidden ${darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    {visitorLogs.length === 0 ? (
                      <div className="p-8 text-center text-zinc-500 text-xs">
                        <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        No hay registros de visitas en el historial. El registro está vacío.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className={`text-[11px] font-bold border-b ${
                              darkMode ? 'bg-zinc-950/80 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
                            }`}>
                              <th className="py-3 px-4">Dirección IP</th>
                              <th className="py-3 px-4">Estado / Reingresos</th>
                              <th className="py-3 px-4">Último Acceso</th>
                              <th className="py-3 px-4">Ubicación</th>
                              <th className="py-3 px-4">Dispositivo / Navegador</th>
                              <th className="py-3 px-4 text-center">Historial</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-800/30 text-xs">
                            {visitorLogs
                              .filter(log => {
                                if (!log) return false;
                                const q = (visitorSearchQuery || '').toLowerCase().trim();
                                if (!q) return true;
                                const ip = String(log.ip || '').toLowerCase();
                                const loc = String(log.location || '').toLowerCase();
                                const browser = String(log.browser || '').toLowerCase();
                                const devType = String(log.deviceType || '').toLowerCase();
                                const section = String(log.visitedSection || '').toLowerCase();
                                return (
                                  ip.includes(q) ||
                                  loc.includes(q) ||
                                  browser.includes(q) ||
                                  devType.includes(q) ||
                                  section.includes(q)
                                );
                              })
                              .map((log, index) => {
                                const isExpanded = expandedVisitorId === log.id;
                                const visits = log.visitHistory || [{ timestamp: log.timestamp, visitedSection: log.visitedSection || '#inicio' }];
                                return (
                                  <React.Fragment key={`admin-vlog-${log.id || 'vl'}-${index}`}>
                                    <tr className={`hover:bg-zinc-800/20 transition-colors ${
                                      darkMode ? 'text-zinc-300' : 'text-zinc-800'
                                    }`}>
                                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                                        {log.ip}
                                      </td>
                                      <td className="py-3 px-4 font-mono text-[11px]">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                          (log.visitCount || 1) > 1
                                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                        }`}>
                                          {(log.visitCount || 1) > 1 
                                            ? `Volvió a ingresar (${log.visitCount} veces)` 
                                            : 'Primer ingreso'}
                                        </span>
                                      </td>
                                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-300">
                                        {log.timestamp}
                                      </td>
                                      <td className="py-3 px-4 font-semibold text-zinc-300">
                                        {log.location}
                                      </td>
                                      <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5">
                                          {log.deviceType === 'Móvil' ? (
                                            <Smartphone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                          ) : log.deviceType === 'Tablet' ? (
                                            <Tablet className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                          ) : (
                                            <Laptop className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                          )}
                                          <span className="truncate max-w-[160px]">{log.browser}</span>
                                        </div>
                                      </td>
                                      <td className="py-3 px-4 text-center">
                                        <button
                                          onClick={() => setExpandedVisitorId(isExpanded ? null : log.id)}
                                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[11px] font-semibold border border-zinc-700 transition-colors cursor-pointer"
                                        >
                                          <Clock className="w-3 h-3 text-cyan-400" />
                                          <span>Historial ({visits.length})</span>
                                          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                      </td>
                                    </tr>
                                    {isExpanded && (
                                      <tr className={darkMode ? 'bg-zinc-950/90' : 'bg-zinc-50'}>
                                        <td colSpan={6} className="p-4 border-b border-zinc-800">
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between text-xs font-bold text-zinc-400 border-b border-zinc-800/60 pb-2">
                                              <span className="flex items-center gap-2">
                                                <Users className="w-3.5 h-3.5 text-cyan-400" />
                                                Historial Completo de Accesos — IP: {log.ip}
                                              </span>
                                              <span className="text-[11px] font-mono text-zinc-500">
                                                {log.visitCount || visits.length} ingresos registrados
                                              </span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-52 overflow-y-auto pt-1">
                                              {visits.map((v, vIdx) => (
                                                <div 
                                                  key={`vhist-${log.id}-${vIdx}`}
                                                  className={`flex items-center justify-between p-2.5 rounded-lg border text-[11px] font-mono ${
                                                    darkMode ? 'bg-zinc-900/90 border-zinc-800 text-zinc-200' : 'bg-white border-zinc-200 text-zinc-800'
                                                  }`}
                                                >
                                                  <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full shrink-0 ${vIdx === 0 ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
                                                    <div className="flex flex-col">
                                                      <span className="font-bold">{v.timestamp}</span>
                                                      <span className="text-[10px] text-zinc-500">
                                                        {vIdx === 0 ? 'Última entrada' : `Ingreso N° ${visits.length - vIdx}`}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-cyan-300 text-[10px] border border-zinc-700">
                                                    {v.visitedSection || '#inicio'}
                                                  </span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}


              {/* TAB 6: REDES SOCIALES */}
              {activeTab === 'socials' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="border-b border-zinc-800/40 pb-3">
                    <h3 className="font-bold text-lg">Redes Sociales</h3>
                    <p className="text-xs text-zinc-400">Configure los enlaces oficiales a sus redes sociales.</p>
                  </div>

                  <div className="space-y-3">
                    {formData.companyInfo.socials.map((soc, idx) => (
                      <div key={`admin-soc-${soc.name || 's'}-${idx}`} className="space-y-1">
                        <label className="block text-xs font-semibold">{soc.name}</label>
                        <input
                          type="text"
                          value={soc.url}
                          onChange={(e) => {
                            const newSocials = [...formData.companyInfo.socials];
                            newSocials[idx].url = e.target.value;
                            setFormData({
                              ...formData,
                              companyInfo: { ...formData.companyInfo, socials: newSocials }
                            });
                          }}
                          className={`w-full px-3.5 py-2 rounded-lg border text-xs font-mono ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-300'}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: CREDENCIALES ADMIN */}
              {activeTab === 'admin' && (
                <div className="space-y-6 max-w-xl">
                  <div className="border-b border-zinc-800/40 pb-3">
                    <h3 className="font-bold text-lg">Credenciales de Acceso Administrador</h3>
                    <p className="text-xs text-zinc-400">Cambie el correo o clave por las que usted desee. Se enviará un correo con la confirmación.</p>
                  </div>

                  <div className={`p-4 rounded-xl border space-y-4 ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div>
                      <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Nuevo Correo Electrónico Admin</span>
                      </label>
                      <input
                        type="email"
                        value={formData.adminCredentials.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          adminCredentials: { ...formData.adminCredentials, email: e.target.value }
                        })}
                        placeholder="admin@rchbytecsrl.com.ar"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Nueva Contraseña Admin</span>
                      </label>
                      <input
                        type="text"
                        value={formData.adminCredentials.password}
                        onChange={(e) => setFormData({
                          ...formData,
                          adminCredentials: { ...formData.adminCredentials, password: e.target.value }
                        })}
                        placeholder="Nueva Contraseña"
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-semibold ${
                          darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-300'
                        }`}
                      />
                    </div>

                    <button
                      onClick={handleSaveAdminCredentials}
                      disabled={emailSending}
                      className="w-full py-3 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      {emailSending ? (
                        <span className="inline-block animate-spin font-mono">Enviando correo...</span>
                      ) : (
                        <>
                          <Mail className="w-4 h-4" />
                          <span>Guardar y Enviar Notificación por Correo</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-300 text-zinc-600'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                      <Info className="w-4 h-4" />
                      <span>Nota de Seguridad</span>
                    </div>
                    <p>
                      Al hacer clic en "Guardar y Enviar Notificación por Correo", la nueva contraseña será configurada como activa y se despachará un correo electrónico formal a la nueva dirección ingresada.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL DE SEGURIDAD: VACIAR REGISTROS DE VISITANTES */}
      <AnimatePresence>
        {showClearVisitorsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-5 ${
                darkMode ? 'bg-zinc-950 border-red-500/30 text-white' : 'bg-white border-red-300 text-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3 text-red-500">
                <div className="p-3 rounded-full bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Vaciar Registro de Visitantes</h3>
                  <p className="text-xs text-red-400/90">Acción de seguridad irreversible</p>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                darkMode ? 'bg-red-950/20 border-red-500/20 text-red-200' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <p className="font-semibold">
                  ⚠️ Se eliminarán de forma permanente todos los registros de accesos, direcciones IP y métricas de visitantes guardadas. Esta acción no se puede deshacer.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold">
                  Para confirmar, escriba exactamente la palabra <span className="text-red-400 font-mono font-black underline">BORRAR</span> a continuación:
                </label>
                <input
                  type="text"
                  value={confirmTextClearVisitors}
                  onChange={(e) => setConfirmTextClearVisitors(e.target.value)}
                  placeholder="Escriba BORRAR aquí"
                  className={`w-full px-4 py-2.5 rounded-xl border font-mono text-sm tracking-widest font-bold text-center uppercase ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-red-400 placeholder-zinc-600' : 'bg-zinc-50 border-zinc-300 text-red-600 placeholder-zinc-400'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowClearVisitorsModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={confirmTextClearVisitors.trim().toUpperCase() !== 'BORRAR'}
                  onClick={() => {
                    clearVisitorLogs();
                    setShowClearVisitorsModal(false);
                    setNotificationMsg('Se ha vaciado correctamente todo el registro de visitantes.');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Vaciar Registros</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE SEGURIDAD: RESTAURAR DE FÁBRICA */}
      <AnimatePresence>
        {showRestoreFactoryModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-5 ${
                darkMode ? 'bg-zinc-950 border-red-500/30 text-white' : 'bg-white border-red-300 text-zinc-900'
              }`}
            >
              <div className="flex items-center gap-3 text-red-500">
                <div className="p-3 rounded-full bg-red-500/10 border border-red-500/30">
                  <RefreshCw className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Restaurar Datos de Fábrica</h3>
                  <p className="text-xs text-red-400/90">Restablecimiento total del sitio web</p>
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                darkMode ? 'bg-red-950/20 border-red-500/20 text-red-200' : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <p className="font-semibold">
                  ⚠️ Esta acción restablecerá toda la información, ofertas, sliders, servicios e imágenes del sitio web a sus valores originales de fábrica. Perderá todos sus cambios personalizados.
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold">
                  Para confirmar, escriba exactamente la palabra <span className="text-red-400 font-mono font-black underline">RESTAURAR</span> a continuación:
                </label>
                <input
                  type="text"
                  value={confirmTextRestoreFactory}
                  onChange={(e) => setConfirmTextRestoreFactory(e.target.value)}
                  placeholder="Escriba RESTAURAR aquí"
                  className={`w-full px-4 py-2.5 rounded-xl border font-mono text-sm tracking-widest font-bold text-center uppercase ${
                    darkMode ? 'bg-zinc-900 border-zinc-800 text-red-400 placeholder-zinc-600' : 'bg-zinc-50 border-zinc-300 text-red-600 placeholder-zinc-400'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRestoreFactoryModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-zinc-700 text-xs font-bold hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={confirmTextRestoreFactory.trim().toUpperCase() !== 'RESTAURAR'}
                  onClick={() => {
                    resetToDefaults();
                    setFormData(siteData);
                    setShowRestoreFactoryModal(false);
                    setNotificationMsg('Se han restaurado con éxito los datos originales de fábrica.');
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restaurar Fábrica</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </AnimatePresence>
  );
};
