import { HeroSlide, BannerOffer, ServiceItem, Brand } from '../types';

export const COMPANY_INFO = {
  name: 'RCH-BYTEC',
  fullName: 'RCH-BYTEC SRL',
  slogan: 'Tu Asesor Tecnológico',
  subtitle: 'Servicios Informáticos, Domótica y Seguridad Electrónica',
  phoneNeuquen: '+54 299 463-1278',
  phoneNeuquenClean: '542994631278',
  phoneBsAs: '+54 11 5824-9102',
  phoneBsAsClean: '541158249102',
  email: 'contacto@rchbytecsrl.com.ar',
  location: 'Neuquén Capital y Buenos Aires (CABA / GBA), Argentina',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.7758223681!2d-68.06115368464805!3d-38.951921379562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a31818228373b%3A0x6b106e23293e828a!2sNeuqu%C3%A9n!5e0!3m2!1ses-419!2sar!4v1680000000000!5m2!1ses-419!2sar',
  hours: [
    { days: 'Lunes a Viernes', time: '08:00 a 20:00 hs' },
    { days: 'Sábados', time: '08:00 a 14:00 hs' },
    { days: 'Sábados Tarde', time: 'Guardia Técnica Pasiva' },
    { days: 'Domingos y Feriados', time: 'Cerrado' }
  ],
  socials: [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'Youtube' }
  ],
  couponCode: 'RCH2026',
  couponDiscount: '15% DE DESCUENTO EN SERVICIO TÉCNICO',
  couponDescription: 'Mencione este código o preséntelo al solicitar su presupuesto para obtener 15% de descuento directo en mano de obra técnica y diagnóstico gratuito.'
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    badge: 'Energía Limpia',
    subtitle: 'Kits de Energía Solar',
    title: 'Venta, Instalación y Soporte',
    description: 'Vendemos, instalamos, configuramos y brindamos soporte integral a equipos de energía solar fotovoltaica para proyectos residenciales y rurales.',
    ctaText: 'Solicitar Asesoramiento',
    ctaCategory: 'solar',
    imageBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(15, 23, 42, 0.95))',
    imageUrl: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'slide-2',
    badge: 'Laboratorio Técnico',
    subtitle: 'Equipos de Computación',
    title: 'Service Técnico y Mantenimiento',
    description: 'Reparación, limpieza profunda y recambio de componentes para Notebooks, Netbooks, PCs de escritorio y All In Ones con diagnóstico en el día.',
    ctaText: 'Diagnóstico Gratis',
    ctaCategory: 'repair',
    imageBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(15, 23, 42, 0.95))',
    imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'slide-3',
    badge: 'Protección 24/7',
    subtitle: 'Cámaras y Seguridad',
    title: 'Sistemas IP, CCTV y Alarmas',
    description: 'Instalación de cámaras de videovigilancia de alta definición, centrales de alarma domiciliarias e industriales con monitoreo remoto 3G/4G desde su smartphone.',
    ctaText: 'Ver Soluciones de Seguridad',
    ctaCategory: 'security',
    imageBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(15, 23, 42, 0.95))',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'slide-4',
    badge: 'Soporte Integral',
    subtitle: 'Oficina y Hogar',
    title: 'Service y Soporte IT',
    description: 'Instalación de periféricos, cambio y recarga de cartuchos y toners, configuración de impresoras, faxes y mantenimiento técnico corporativo.',
    ctaText: 'Consultar Servicio IT',
    ctaCategory: 'repair',
    imageBg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(15, 23, 42, 0.95))',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'slide-5',
    badge: 'Soporte Mobile',
    subtitle: 'Tablets y Celulares',
    title: 'Hardware y Software Mobile',
    description: 'Servicio técnico especializado para iPhone y Android. Cambio de módulos, pines de carga, optimización de software y actualización de aplicaciones.',
    ctaText: 'Reparar Celular / Tablet',
    ctaCategory: 'repair',
    imageBg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(15, 23, 42, 0.95))',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
  }
];

export const QUICK_BANNERS: BannerOffer[] = [
  {
    id: 'qb-1',
    title: 'Reparación de Celulares y Tablets',
    tagline: 'MÓVILES & SMARTPHONES',
    description: 'Cambio de módulos, conectores de carga, baterías y reparaciones de placa en tiempo récord.',
    iconName: 'Smartphone'
  },
  {
    id: 'qb-2',
    title: 'Recuperación de Datos & SSD',
    tagline: 'ALMACENAMIENTO SEGURO',
    description: 'Recuperación de archivos en discos rígidos dañados, memorias SSD y configuración de respaldos RAID.',
    iconName: 'HardDrive'
  },
  {
    id: 'qb-3',
    title: 'Mantenimiento de Impresoras',
    tagline: 'EQUIPOS DE IMPRESIÓN',
    description: 'Service de impresoras láser y tinta, limpieza de cabezales, recarga y cambio de repuestos.',
    iconName: 'Printer'
  },
  {
    id: 'qb-4',
    title: 'Mantenimiento Corporativo PC',
    tagline: 'SOPORTE A EMPRESAS',
    description: 'Contratos de mantenimiento preventivo y correctivo para flotas de computadoras e infraestructura.',
    iconName: 'Laptop'
  },
  {
    id: 'qb-5',
    title: 'Instalación de Redes & Wi-Fi',
    tagline: 'CONECTIVIDAD DE ALTA VELOCIDAD',
    description: 'Cableado estructurado Cat6, enlaces punto a punto y routers de alto alcance para empresas y hogares.',
    iconName: 'Tv'
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Instalación de Cámaras IP & CCTV',
    description: 'Sistemas de seguridad con grabación digital DVR/NVR, visión nocturna infrarroja y monitoreo desde teléfono celular.',
    category: 'security',
    icon: 'Camera',
    highlighted: true
  },
  {
    id: 'srv-2',
    title: 'Alarmas Inalámbricas X-28 y Alonso',
    description: 'Sistemas anti-intrusión perimetrales con comunicador GSM/WiFi, sensores infrarrojos de movimiento y barreras fotoeléctricas.',
    category: 'security',
    icon: 'ShieldAlert',
    highlighted: true
  },
  {
    id: 'srv-3',
    title: 'Kits Fotovoltaicos de Energía Solar',
    description: 'Sistemas de energía solar aislados (Off-Grid) o conectados a red (On-Grid) con inversores inteligentes y baterías.',
    category: 'solar',
    icon: 'Sun',
    highlighted: true
  },
  {
    id: 'srv-4',
    title: 'Domótica RBT OS & Control por App',
    description: 'Centralización de luces, portones levadizos, persianas, riego por goteo y electrodomésticos en una sola aplicación.',
    category: 'domotics',
    icon: 'Radio',
    highlighted: true
  },
  {
    id: 'srv-5',
    title: 'Microelectrónica & Reparación de Motherboards',
    description: 'Laboratorio equipado con microscopio y estación de soldado SMD/BGA para arreglo de notebooks, placas de video y mothers.',
    category: 'repair',
    icon: 'Cpu',
    highlighted: true
  },
  {
    id: 'srv-6',
    title: 'Armado de Computadoras a Medida',
    description: 'Ensamblado de PCs para oficina, diseño gráfico, edición de video y Gaming con componentes optimizados.',
    category: 'repair',
    icon: 'Monitor'
  },
  {
    id: 'srv-7',
    title: 'Servicio Técnico Movil & Pantallas',
    description: 'Cambio de cristales, pin de carga, baterías originales y flex para todas las marcas de celulares.',
    category: 'mobile',
    icon: 'Smartphone'
  },
  {
    id: 'srv-8',
    title: 'Recuperación de Datos & Discos Rígidos',
    description: 'Restauración de archivos perdidos en discos HDD, unidades SSD, pendrives y memorias SD dañadas.',
    category: 'data',
    icon: 'Database'
  },
  {
    id: 'srv-9',
    title: 'Soporte y Reparación de Impresoras',
    description: 'Mantenimiento de impresoras láser multifunción, sistemas continuos, reemplazo de fusor y rodillos.',
    category: 'repair',
    icon: 'Printer'
  },
  {
    id: 'srv-10',
    title: 'Control de Accesos Biométricos',
    description: 'Terminales con huella dactilar, reconocimiento facial y tarjetas RFID para control de personal e ingreso.',
    category: 'security',
    icon: 'Aperture'
  },
  {
    id: 'srv-11',
    title: 'Servidores & Virtualización',
    description: 'Configuración de servidores Windows Server y Linux, Active Directory, backups automáticos y almacenamiento NAS.',
    category: 'network',
    icon: 'Server'
  },
  {
    id: 'srv-12',
    title: 'Cableado Estructurado & Wi-Fi Mesh',
    description: 'Tendidos de red Cat6/Cat6A, certificación de puntos de red, patch panels y cobertura total Wi-Fi.',
    category: 'network',
    icon: 'Wifi'
  }
];

export const BRANDS: Brand[] = [
  { id: 'apple', name: 'Apple', category: 'Laptops / Smartphones', logoKey: 'apple' },
  { id: 'nvidia', name: 'NVIDIA', category: 'Placas de Video / IA', logoKey: 'nvidia' },
  { id: 'dell', name: 'Dell', category: 'Servidores & Laptops', logoKey: 'dell' },
  { id: 'intel', name: 'Intel', category: 'Procesadores / NUC', logoKey: 'intel' },
  { id: 'amd', name: 'AMD', category: 'Procesadores Ryzen', logoKey: 'amd' },
  { id: 'asus', name: 'ASUS', category: 'Motherboards & PCs', logoKey: 'asus' },
  { id: 'lenovo', name: 'Lenovo', category: 'ThinkPad & Servidores', logoKey: 'lenovo' },
  { id: 'hp', name: 'HP', category: 'Impresoras & Laptops', logoKey: 'hp' },
  { id: 'samsung', name: 'Samsung', category: 'Pantallas & SSDs', logoKey: 'samsung' },
  { id: 'dahua', name: 'Dahua', category: 'Cámaras IP / CCTV', logoKey: 'dahua' },
  { id: 'hikvision', name: 'Hikvision', category: 'Seguridad / DVRs', logoKey: 'hikvision' },
  { id: 'x28', name: 'X-28', category: 'Alarmas & Sensores', logoKey: 'x28' },
  { id: 'tplink', name: 'TP-Link', category: 'Networking & Routers', logoKey: 'tplink' },
  { id: 'cisco', name: 'Cisco', category: 'Switches & Redes', logoKey: 'cisco' },
  { id: 'wd', name: 'Western Digital', category: 'Discos HDD & SSD', logoKey: 'wd' },
  { id: 'seagate', name: 'Seagate', category: 'Almacenamiento RAID', logoKey: 'seagate' },
  { id: 'kingston', name: 'Kingston', category: 'Memorias RAM & SSD', logoKey: 'kingston' },
  { id: 'cygnus', name: 'Cygnus', category: 'Cámaras & Control', logoKey: 'cygnus' },
  { id: 'rbt_os', name: 'RBT OS', category: 'Domótica & Control', logoKey: 'rbt_os' }
];
