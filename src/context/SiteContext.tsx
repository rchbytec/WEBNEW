import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  COMPANY_INFO as initialCompanyInfo, 
  HERO_SLIDES as initialHeroSlides, 
  QUICK_BANNERS as initialQuickBanners, 
  SERVICES_LIST as initialServicesList, 
  BRANDS as initialBrands 
} from '../data/companyData';
import { HeroSlide, BannerOffer, ServiceItem } from '../types';

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
  ctaTitle: '¿Desea automatizar su hogar, negocio o campo en Buenos Aires o Neuquén?',
  ctaDescription: 'Diseñamos instalaciones a medida de llaves GSM, bombas de agua inteligentes, alarmas, cámaras y domótica centralizada.',
  ctaButtonText: 'Solicitar Asesoramiento Técnico',
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
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'rch_site_data_v2';
const ADMIN_AUTH_KEY = 'rch_admin_authenticated';

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure adminCredentials exists
        if (!parsed.adminCredentials) {
          parsed.adminCredentials = defaultAdminCredentials;
        }
        if (!parsed.simulatorConfig) {
          parsed.simulatorConfig = defaultSimulatorConfig;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse site data from localStorage', e);
    }
    return defaultSiteData;
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
