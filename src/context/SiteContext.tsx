import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  COMPANY_INFO as initialCompanyInfo, 
  HERO_SLIDES as initialHeroSlides, 
  QUICK_BANNERS as initialQuickBanners, 
  SERVICES_LIST as initialServicesList, 
  BRANDS as initialBrands 
} from '../data/companyData';
import { HeroSlide, BannerOffer, ServiceItem, VisitorLog } from '../types';

export interface HeaderNavLink {
  id: string;
  name: string;
  href: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface SimulatorConfig {
  badge: string;
  title: string;
  description: string;
  initialLightsOn: boolean;
  initialLightBrightness: number;
  initialLightColor: 'warm' | 'neutral' | 'cool';
  initialCurtainsOpen: number;
  initialWaterPumpOn: boolean;
  initialWaterPressure: number;
  initialAcOn: boolean;
  initialAcTemp: number;
  initialAcMode: 'cool' | 'heat' | 'eco';
  initialAlarmArmed: boolean;
  initialGateOpen: boolean;
  dayScenarioLabel: string;
  nightScenarioLabel: string;
  waterPumpLabel: string;
  initialLogText: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
}

export interface SiteData {
  companyInfo: typeof initialCompanyInfo & {
    footerDescription: string;
    copyrightText: string;
  };
  headerLinks: HeaderNavLink[];
  heroSlides: HeroSlide[];
  quickBanners: BannerOffer[];
  servicesList: ServiceItem[];
  brands: typeof initialBrands;
  adminCredentials: AdminCredentials;
  simulatorConfig: SimulatorConfig;
}

const defaultHeaderLinks: HeaderNavLink[] = [
  { id: 'l1', name: 'Inicio', href: '#inicio' },
  { id: 'l2', name: 'Oferta', href: '#oferta' },
  { id: 'l3', name: 'Demo', href: '#demo' },
  { id: 'l4', name: 'Servicios', href: '#servicios' },
  { id: 'l5', name: 'Marcas', href: '#marcas' },
  { id: 'l6', name: 'Ubicación', href: '#ubicacion' },
  { id: 'l7', name: 'Contacto', href: '#contacto' },
];

const defaultAdminCredentials: AdminCredentials = {
  email: 'admin@rchbytecsrl.com.ar',
  password: 'Admin_123',
};

const defaultSimulatorConfig: SimulatorConfig = {
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
};

const defaultSiteData: SiteData = {
  companyInfo: {
    ...initialCompanyInfo,
    footerDescription: 'Soluciones tecnológicas integrales para Neuquén, CABA y GBA. Reparación de equipos, domótica, seguridad electrónica y energía solar.',
    copyrightText: '© RCH-BYTEC SRL. Todos los derechos reservados.'
  },
  headerLinks: defaultHeaderLinks,
  heroSlides: initialHeroSlides,
  quickBanners: initialQuickBanners,
  servicesList: initialServicesList,
  brands: initialBrands,
  adminCredentials: defaultAdminCredentials,
  simulatorConfig: defaultSimulatorConfig,
};

const defaultVisitorLogs: VisitorLog[] = [];

interface SiteContextType {
  siteData: SiteData;
  setSiteData: React.Dispatch<React.SetStateAction<SiteData>>;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (val: boolean) => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (val: boolean) => void;
  updateCompanyInfo: (updated: Partial<SiteData['companyInfo']>) => void;
  updateAdminCredentials: (newEmail: string, newPass: string) => void;
  resetToDefaults: () => void;
  notificationMsg: string | null;
  setNotificationMsg: (msg: string | null) => void;
  visitorLogs: VisitorLog[];
  clearVisitorLogs: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'rch_site_data_v2';
const VISITORS_STORAGE_KEY = 'rch_visitor_logs_v1';
const ADMIN_AUTH_KEY = 'rch_admin_authenticated';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged: SiteData = {
          ...defaultSiteData,
          ...parsed,
          companyInfo: {
            ...defaultSiteData.companyInfo,
            ...(parsed.companyInfo || {}),
            socials: Array.isArray(parsed?.companyInfo?.socials) ? parsed.companyInfo.socials : defaultSiteData.companyInfo.socials
          },
          adminCredentials: {
            ...defaultSiteData.adminCredentials,
            ...(parsed.adminCredentials || {})
          },
          simulatorConfig: {
            ...defaultSiteData.simulatorConfig,
            ...(parsed.simulatorConfig || {}),
            ctaTitle: '¿Desea automatizar su hogar, negocio o campo? Diseños a medida con garantía oficial.',
            ctaDescription: 'Instalaciones profesionales de llaves GSM, bombas de agua y riegos inteligentes, alarmas centrales, cámaras de seguridad monitorizadas y domótica centralizada. Próximamente sistemas centrales de IA integrados.',
            ctaButtonText: 'Solicitar Asesoramiento'
          },
          headerLinks: Array.isArray(parsed?.headerLinks) ? parsed.headerLinks : defaultSiteData.headerLinks,
          heroSlides: Array.isArray(parsed?.heroSlides) ? parsed.heroSlides : defaultSiteData.heroSlides,
          quickBanners: Array.isArray(parsed?.quickBanners) ? parsed.quickBanners : defaultSiteData.quickBanners,
          servicesList: Array.isArray(parsed?.servicesList) ? parsed.servicesList : defaultSiteData.servicesList,
          brands: Array.isArray(parsed?.brands) ? parsed.brands : defaultSiteData.brands
        };

        // Ensure unique IDs
        const seenLinks = new Set<string>();
        merged.headerLinks = merged.headerLinks.map((item: any, i: number) => {
          let uniqueId = item.id;
          if (!uniqueId || seenLinks.has(uniqueId)) {
            uniqueId = `l-${i}-${Math.random().toString(36).substring(2, 6)}`;
          }
          seenLinks.add(uniqueId);
          return { ...item, id: uniqueId };
        });

        const seenSlides = new Set<string>();
        merged.heroSlides = merged.heroSlides.map((item: any, i: number) => {
          let uniqueId = item.id;
          if (!uniqueId || seenSlides.has(uniqueId)) {
            uniqueId = `slide-${i}-${Math.random().toString(36).substring(2, 6)}`;
          }
          seenSlides.add(uniqueId);

          // Fix chip image on solar slide if legacy or stale
          let imageUrl = item.imageUrl;
          let badge = item.badge;
          let subtitle = item.subtitle;
          let title = item.title;
          let description = item.description;

          if (i === 0) {
            badge = 'Energía Limpia';
            subtitle = 'Kits de Energía Solar';
            title = 'Venta, Instalación y Soporte';
            description = 'Vendemos, instalamos, configuramos y brindamos soporte integral a equipos de energía solar fotovoltaica para proyectos residenciales y rurales.';
            imageUrl = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80';
          } else if (
            (badge && (badge.toLowerCase().includes('solar') || badge.toLowerCase().includes('energía limpia'))) ||
            (subtitle && subtitle.toLowerCase().includes('solar')) ||
            (title && title.toLowerCase().includes('solar'))
          ) {
            imageUrl = 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80';
          }

          return { ...item, id: uniqueId, badge, subtitle, title, description, imageUrl };
        });

        const seenBanners = new Set<string>();
        merged.quickBanners = merged.quickBanners.map((item: any, i: number) => {
          let uniqueId = item.id;
          if (!uniqueId || seenBanners.has(uniqueId)) {
            uniqueId = `banner-${i}-${Math.random().toString(36).substring(2, 6)}`;
          }
          seenBanners.add(uniqueId);
          return { ...item, id: uniqueId };
        });

        const seenServices = new Set<string>();
        merged.servicesList = merged.servicesList.map((item: any, i: number) => {
          let uniqueId = item.id;
          if (!uniqueId || seenServices.has(uniqueId)) {
            uniqueId = `serv-${i}-${Math.random().toString(36).substring(2, 6)}`;
          }
          seenServices.add(uniqueId);
          return { ...item, id: uniqueId };
        });

        return merged;
      }
    } catch (e) {
      console.error('Failed to parse site data from localStorage', e);
    }
    return defaultSiteData;
  });

  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>(() => {
    try {
      const saved = localStorage.getItem(VISITORS_STORAGE_KEY);
      if (saved) {
        const parsed: any[] = JSON.parse(saved);
        const seenIds = new Set<string>();
        const sanitized: VisitorLog[] = [];

        for (let i = 0; i < parsed.length; i++) {
          const item = parsed[i];
          if (!item) continue;
          if (['vl-101', 'vl-102', 'vl-103', 'vl-104', 'vl-105'].includes(item.id)) {
            continue;
          }

          const vid = item.visitor_id || item.visitorToken || item.id || `v-${i}-${Date.now()}`;
          if (seenIds.has(vid)) {
            continue;
          }
          seenIds.add(vid);

          let cleanLoc = item.location || 'Argentina';
          if (cleanLoc.includes('Neuquén / Buenos Aires') || cleanLoc.includes('Neuquén, Argentina / Buenos Aires')) {
            cleanLoc = 'Neuquén, Argentina';
          }

          const firstSeen = item.firstSeen || item.timestamp || new Date().toLocaleString('es-AR');
          const timestamp = item.timestamp || firstSeen;

          sanitized.push({
            id: vid,
            visitor_id: vid,
            visitorToken: vid,
            ip: item.ip || '181.16.24.110',
            firstSeen,
            timestamp,
            visitCount: typeof item.visitCount === 'number' ? item.visitCount : 1,
            visitHistory: Array.isArray(item.visitHistory) && item.visitHistory.length > 0
              ? item.visitHistory
              : [{ timestamp, visitedSection: item.visitedSection || '#inicio' }],
            deviceType: item.deviceType || 'Escritorio',
            browser: item.browser || 'Chrome',
            location: cleanLoc,
            visitedSection: item.visitedSection || '#inicio',
            userAgent: item.userAgent || ''
          });
        }
        return sanitized;
      }
    } catch (e) {
      console.error('Failed to parse visitor logs', e);
    }
    return defaultVisitorLogs;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.error('Failed to save site data to localStorage', e);
    }
  }, [siteData]);

  useEffect(() => {
    try {
      localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(visitorLogs));
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('rbt_visitors_sync');
        bc.postMessage({ type: 'VISITORS_UPDATED', payload: visitorLogs });
        bc.close();
      }
    } catch (e) {
      console.error('Failed to save visitor logs', e);
    }
  }, [visitorLogs]);

  // Helper to safely get or create visitor_id using both Cookies and LocalStorage
  const getSafeVisitorId = (): string => {
    let vid = '';

    // 1. Check Cookie
    try {
      const match = document.cookie.match(/(?:^|; )rbt_vid=([^;]*)/);
      if (match && match[1]) {
        vid = decodeURIComponent(match[1]);
      }
    } catch (e) {
      // silent
    }

    // 2. Check LocalStorage
    if (!vid) {
      try {
        vid = localStorage.getItem('visitor_id') || localStorage.getItem('rch_visitor_token') || '';
      } catch (e) {
        // silent
      }
    }

    // 3. Generate if absent
    if (!vid) {
      try {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
          vid = crypto.randomUUID();
        }
      } catch (e) {
        // silent
      }
      if (!vid) {
        vid = 'vtok_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8);
      }
    }

    // Persist to Cookie & LocalStorage
    try {
      localStorage.setItem('visitor_id', vid);
      localStorage.setItem('rch_visitor_token', vid);
      document.cookie = `rbt_vid=${encodeURIComponent(vid)}; max-age=31536000; path=/; SameSite=Lax`;
    } catch (e) {
      // silent
    }

    return vid;
  };

  // Helper to parse local client info
  const getClientInfo = () => {
    const ua = navigator.userAgent;
    let devType: 'Escritorio' | 'Móvil' | 'Tablet' = 'Escritorio';
    if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) {
      devType = 'Tablet';
    } else if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|SM-J7|Samsung|Mobile/i.test(ua) || window.innerWidth <= 768) {
      devType = 'Móvil';
    }

    let browserName = 'Navegador Web';
    if (/Edg/i.test(ua)) browserName = 'Edge';
    else if (/Chrome|CriOS/i.test(ua)) browserName = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browserName = 'Safari';
    else if (/Firefox|FxiOS/i.test(ua)) browserName = 'Firefox';
    else if (/SamsungBrowser/i.test(ua)) browserName = 'Samsung Internet';

    return { devType, browserName, ua };
  };

  // Synchronize visitors with backend API in real time ("en caliente")
  useEffect(() => {
    let isMounted = true;

    // Helper to merge server logs with local state without losing items
    const mergeLogs = (serverLogs: VisitorLog[], localLogs: VisitorLog[]): VisitorLog[] => {
      const mergedMap = new Map<string, VisitorLog>();

      // Server logs first
      serverLogs.forEach(log => {
        mergedMap.set(log.visitor_id || log.id, log);
      });

      // Overlay local logs if newer
      localLogs.forEach(localLog => {
        const id = localLog.visitor_id || localLog.id;
        if (!mergedMap.has(id)) {
          mergedMap.set(id, localLog);
        } else {
          const existing = mergedMap.get(id)!;
          if (new Date(localLog.timestamp) > new Date(existing.timestamp)) {
            mergedMap.set(id, {
              ...existing,
              timestamp: localLog.timestamp,
              visitedSection: localLog.visitedSection,
              visitHistory: localLog.visitHistory || existing.visitHistory
            });
          }
        }
      });

      return Array.from(mergedMap.values()).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    };

    const fetchVisitorLogsFromServer = async () => {
      try {
        const res = await fetch('/api/visitors');
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.visitorLogs)) {
            if (isMounted) {
              setVisitorLogs(prev => {
                const combined = mergeLogs(data.visitorLogs, prev);
                try {
                  localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(combined));
                } catch (e) {}
                return combined;
              });
            }
          }
        }
      } catch (e) {
        // silent
      }
    };

    const registerVisit = async (sectionOverride?: string) => {
      const vid = getSafeVisitorId();
      const currentSection = sectionOverride || window.location.hash || '#inicio';
      const { devType, browserName, ua } = getClientInfo();
      const screenWidth = window.innerWidth;

      const currentTimestamp = new Date().toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // 1. Immediate local state update so it shows instantly in Admin Panel
      setVisitorLogs(prev => {
        const existingIdx = prev.findIndex(l => l.visitor_id === vid || l.id === vid);
        if (existingIdx !== -1) {
          const existing = prev[existingIdx];
          const history = Array.isArray(existing.visitHistory) ? existing.visitHistory : [];
          const newHistory = history[0]?.visitedSection !== currentSection
            ? [{ timestamp: currentTimestamp, visitedSection: currentSection }, ...history]
            : history;

          const updated: VisitorLog = {
            ...existing,
            timestamp: currentTimestamp,
            visitedSection: currentSection,
            visitCount: existing.visitCount + (history[0]?.visitedSection !== currentSection ? 1 : 0),
            visitHistory: newHistory,
            deviceType: devType,
            browser: `${browserName} (${devType})`,
            userAgent: ua
          };
          const nextLogs = [...prev];
          nextLogs.splice(existingIdx, 1);
          return [updated, ...nextLogs];
        } else {
          const newLog: VisitorLog = {
            id: vid,
            visitor_id: vid,
            visitorToken: vid,
            ip: 'Detectando...',
            firstSeen: currentTimestamp,
            timestamp: currentTimestamp,
            visitCount: 1,
            visitHistory: [{ timestamp: currentTimestamp, visitedSection: currentSection }],
            deviceType: devType,
            browser: `${browserName} (${devType})`,
            location: 'Argentina',
            visitedSection: currentSection,
            userAgent: ua
          };
          return [newLog, ...prev];
        }
      });

      // 2. Register on server
      try {
        const res = await fetch('/api/visitors/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitor_id: vid,
            visitedSection: currentSection,
            userAgent: ua,
            screenWidth
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.visitorLogs)) {
            if (isMounted) {
              setVisitorLogs(prev => {
                const combined = mergeLogs(data.visitorLogs, prev);
                try {
                  localStorage.setItem(VISITORS_STORAGE_KEY, JSON.stringify(combined));
                } catch (e) {}
                return combined;
              });
            }
          }
        }
      } catch (err) {
        console.warn('Server register visit failed', err);
      }
    };

    // Initial registration
    registerVisit();

    // Poll server every 2 seconds for live real-time updates ("en caliente") across devices
    const pollInterval = setInterval(() => {
      fetchVisitorLogsFromServer();
    }, 2000);

    // Listen to hash section changes
    const handleHashChange = () => {
      registerVisit(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(ADMIN_AUTH_KEY, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  const updateCompanyInfo = (updated: Partial<SiteData['companyInfo']>) => {
    setSiteData((prev) => ({
      ...prev,
      companyInfo: {
        ...prev.companyInfo,
        ...updated,
      },
    }));
  };

  const updateAdminCredentials = (newEmail: string, newPass: string) => {
    setSiteData((prev) => ({
      ...prev,
      adminCredentials: {
        email: newEmail,
        password: newPass,
      },
    }));
  };

  const resetToDefaults = () => {
    setSiteData(defaultSiteData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const clearVisitorLogs = () => {
    setVisitorLogs([]);
    try {
      localStorage.removeItem(VISITORS_STORAGE_KEY);
      fetch('/api/visitors', { method: 'DELETE' }).catch(() => {});
    } catch (e) {
      // silent
    }
  };

  return (
    <SiteContext.Provider
      value={{
        siteData,
        setSiteData,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        updateCompanyInfo,
        updateAdminCredentials,
        resetToDefaults,
        notificationMsg,
        setNotificationMsg,
        visitorLogs,
        clearVisitorLogs,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};
