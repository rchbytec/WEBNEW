export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: 'solar' | 'security' | 'repair' | 'mobile' | 'network' | 'data' | 'domotics';
  icon: string;
  highlighted?: boolean;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  ctaText: string;
  ctaCategory: string;
  imageBg: string;
  imageUrl: string;
}

export interface BannerOffer {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  captchaInput: string;
}

export interface CaptchaChallenge {
  num1: number;
  num2: number;
  answer: number;
  code: string;
}

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  timestamp: string;
  deviceType: 'Escritorio' | 'Móvil' | 'Tablet';
  browser: string;
  location: string;
  visitedSection: string;
  userAgent?: string;
}
