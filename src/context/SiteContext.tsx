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

  // Real-time "en caliente" listener across windows, tabs, and sessions
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === VISITORS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setVisitorLogs(parsed);
          }
        } catch (err) {
          console.error('Error syncing visitors from storage', err);
        }
      }
    };

    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('rbt_visitors_sync');
      bc.onmessage = (event) => {
        if (event.data && event.data.type === 'VISITORS_UPDATED' && Array.isArray(event.data.payload)) {
          setVisitorLogs(event.data.payload);
        }
      };
    }

    // Polling interval for live updates every 2 seconds
    const interval = setInterval(() => {
      try {
        const raw = localStorage.getItem(VISITORS_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setVisitorLogs(prev => {
              if (JSON.stringify(prev) !== raw) {
                return parsed;
              }
              return prev;
            });
          }
        }
      } catch (err) {
        // silent catch
      }
    }, 2000);

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (bc) bc.close();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(ADMIN_AUTH_KEY, isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Real IP Geolocation Lookup
  const getVisitorLocationData = async (): Promise<{ ip: string; location: string; isp?: string }> => {
    // 1. Try ipapi.co (detailed city, region, country, org)
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data.ip && !data.error) {
          const city = data.city || '';
          const region = data.region || data.region_code || '';
          const country = data.country_name || 'Argentina';
          
          const parts: string[] = [];
          if (city) parts.push(city);
          if (region && region.toLowerCase() !== city.toLowerCase()) parts.push(region);
          if (country) parts.push(country);

          const locationStr = parts.length > 0 ? parts.join(', ') : 'Argentina';
          return { ip: data.ip, location: locationStr, isp: data.org };
        }
      }
    } catch (e) {
      console.warn('ipapi.co fetch failed, trying ipwho.is', e);
    }

    // 2. Try ipwho.is as fallback
    try {
      const res = await fetch('https://ipwho.is/');
      if (res.ok) {
        const data = await res.json();
        if (data.ip && data.success !== false) {
          const city = data.city || '';
          const region = data.region || '';
          const country = data.country || 'Argentina';

          const parts: string[] = [];
          if (city) parts.push(city);
          if (region && region.toLowerCase() !== city.toLowerCase()) parts.push(region);
          if (country) parts.push(country);

          const locationStr = parts.length > 0 ? parts.join(', ') : 'Argentina';
          return { ip: data.ip, location: locationStr, isp: data.connection?.isp || data.org };
        }
      }
    } catch (e) {
      console.warn('ipwho.is fetch failed, trying ipify', e);
    }

    // 3. Fallback to ipify for IP only
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      if (res.ok) {
        const data = await res.json();
        if (data.ip) {
          return { ip: data.ip, location: 'Argentina' };
        }
      }
    } catch (e) {
      console.warn('ipify fetch failed', e);
    }

    return { ip: '190.228.18.42', location: 'Neuquén, Argentina' };
  };

  // Log current visitor and track section movements
  useEffect(() => {
    // Generate Google Analytics-style visitor_id UUID if not exists
    let visitorId = localStorage.getItem('visitor_id') || localStorage.getItem('rch_visitor_token');
    if (!visitorId) {
      if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        visitorId = crypto.randomUUID();
      } else {
        visitorId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
      localStorage.setItem('visitor_id', visitorId);
      localStorage.setItem('rch_visitor_token', visitorId);
    } else {
      localStorage.setItem('visitor_id', visitorId);
      localStorage.setItem('rch_visitor_token', visitorId);
    }

    const ua = navigator.userAgent;
    let devType: 'Escritorio' | 'Móvil' | 'Tablet' = 'Escritorio';
    if (/iPad|Tablet/i.test(ua)) devType = 'Tablet';
    else if (/Mobi|Android|iPhone/i.test(ua)) devType = 'Móvil';

    let browserName = 'Navegador Web';
    if (ua.includes('Chrome') && !ua.includes('Edg')) browserName = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browserName = 'Safari';
    else if (ua.includes('Firefox')) browserName = 'Firefox';
    else if (ua.includes('Edg')) browserName = 'Edge';

    const recordVisitAction = async (sectionOverride?: string) => {
      const currentTimestamp = new Date().toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const visitedSection = sectionOverride || window.location.hash || '#inicio';

      const { ip: ipAddr, location: locationStr } = await getVisitorLocationData();

      setVisitorLogs(prev => {
        // Find existing visitor log matching visitor_id OR matching IP + UserAgent
        const existingIdx = prev.findIndex(l => 
          l.visitor_id === visitorId ||
          l.id === visitorId ||
          l.visitorToken === visitorId ||
          (l.ip === ipAddr && l.userAgent === ua)
        );

        if (existingIdx !== -1) {
          // Existing returning visitor
          const existing = prev[existingIdx];
          const firstSeen = existing.firstSeen || existing.timestamp || currentTimestamp;
          
          const existingHistory = Array.isArray(existing.visitHistory) && existing.visitHistory.length > 0
            ? existing.visitHistory
            : [{ timestamp: existing.timestamp || currentTimestamp, visitedSection: existing.visitedSection || '#inicio' }];

          const latestHistorySection = existingHistory[0]?.visitedSection;

          // Check session gap (if visit is more than 3 minutes apart or section hash changed)
          const isNewSession = !existing.timestamp || (Date.now() - new Date(existing.timestamp).getTime() > 180000);
          const newVisitCount = isNewSession ? (existing.visitCount || 1) + 1 : (existing.visitCount || 1);

          let newHistory = existingHistory;
          if (latestHistorySection !== visitedSection || isNewSession) {
            newHistory = [{ timestamp: currentTimestamp, visitedSection }, ...existingHistory];
          }

          const updatedEntry: VisitorLog = {
            ...existing,
            id: visitorId!,
            visitor_id: visitorId!,
            visitorToken: visitorId!,
            ip: ipAddr,
            firstSeen,
            timestamp: currentTimestamp,
            visitCount: newVisitCount,
            visitHistory: newHistory,
            visitedSection,
            browser: `${browserName} (${devType})`,
            deviceType: devType,
            location: locationStr,
            userAgent: ua
          };

          const updatedLogs = [...prev];
          updatedLogs.splice(existingIdx, 1);
          return [updatedEntry, ...updatedLogs];
        } else {
          // First visit for this browser / visitor_id
          const newEntry: VisitorLog = {
            id: visitorId!,
            visitor_id: visitorId!,
            visitorToken: visitorId!,
            ip: ipAddr,
            firstSeen: currentTimestamp,
            timestamp: currentTimestamp,
            visitCount: 1,
            visitHistory: [{ timestamp: currentTimestamp, visitedSection }],
            deviceType: devType,
            browser: `${browserName} (${devType})`,
            location: locationStr,
            visitedSection,
            userAgent: ua
          };
          return [newEntry, ...prev];
        }
      });
    };

    // Initial visit call
    recordVisitAction();

    // Listen to section hash changes
    const handleHashChange = () => {
      recordVisitAction(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

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
    localStorage.removeItem(VISITORS_STORAGE_KEY);
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
