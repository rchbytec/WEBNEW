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

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  highlighted?: boolean;
}

export interface VisitHistoryEntry {
  timestamp: string;
  visitedSection: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  visitorToken?: string;
  timestamp: string;
  firstSeen?: string;
  visitCount: number;
  visitHistory?: VisitHistoryEntry[];
  deviceType: 'Escritorio' | 'Móvil' | 'Tablet';
  browser: string;
  location: string;
  visitedSection: string;
  userAgent: string;
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
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  logoKey: string;
}
