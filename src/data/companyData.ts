import { HeroSlide, BannerOffer, ServiceItem } from '../types';

export const COMPANY_INFO = {
  name: "RCH-BYTEC",
  fullName: "RCH-BYTEC SRL",
  slogan: "Tu Asesor Tecnológico",
  subtitle: "Tu Asesor Tecnológico Especializado",
  phoneNeuquen: "+54 (0299) 154 631 278",
  phoneNeuquenClean: "542994631278",
  phoneBsAs: "+54 (011) 152 470 1301",
  phoneBsAsClean: "541124701301",
  email: "info@rch-bytec.com.ar",
  location: "Neuquén y Buenos Aires, Argentina",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4387.989395829607!2d-68.05896528319977!3d-38.95192127507566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1495393191408",
  couponCode: "MYADC1518PC",
  couponDiscount: "Presupuesto y Descuento Especial",
  couponDescription: "Cuando solicite alguno de nuestros servicios o un presupuesto técnico, mencione este código de cupón para obtener un beneficio exclusivo en mano de obra o repuestos.",
  hours: [
    { days: "Lunes a Viernes", time: "08:00 a 20:00 hs" },
    { days: "Sábados (Mañana)", time: "08:00 a 14:00 hs" },
    { days: "Sábados (Tarde)", time: "Guardias técnicas activas" },
    { days: "Domingos y Feriados", time: "Cerrado (Solo emergencias al WA)" }
  ],
  socials: [
    { name: "Facebook", url: "https://es-la.facebook.com/", icon: "Facebook" },
    { name: "Twitter/X", url: "https://twitter.com/?lang=es", icon: "Twitter" },
    { name: "Instagram", url: "https://www.instagram.com/?hl=es", icon: "Instagram" },
    { name: "YouTube", url: "https://www.youtube.com/?hl=es", icon: "Youtube" },
    { name: "LinkedIn", url: "https://ar.linkedin.com/", icon: "Linkedin" }
  ]
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-solar",
    title: "Kits de Energía Solar",
    subtitle: "Venta, Instalación y Soporte",
    description: "Vendemos, instalamos, configuramos y brindamos soporte integral a equipos de energía solar fotovoltaica para proyectos residenciales y rurales.",
    badge: "Energía Limpia",
    ctaText: "Consultar Kits Solares",
    ctaCategory: "solar",
    imageBg: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(15, 23, 42, 0.95))",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "slide-computers",
    title: "Equipos de Computación",
    subtitle: "Service Técnico y Mantenimiento",
    description: "Reparación, limpieza profunda y recambio de componentes para Notebooks, Netbooks, PCs de escritorio y All In Ones con diagnóstico en el día.",
    badge: "Laboratorio Técnico",
    ctaText: "Solicitar Diagnóstico",
    ctaCategory: "repair",
    imageBg: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(15, 23, 42, 0.95))",
    imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "slide-cctv",
    title: "Cámaras y Seguridad",
    subtitle: "Sistemas IP, CCTV y Alarmas",
    description: "Instalación de cámaras de videovigilancia de alta definición, centrales de alarma domiciliarias e industriales con monitoreo remoto 3G/4G desde su smartphone.",
    badge: "Protección 24/7",
    ctaText: "Cotizar Seguridad",
    ctaCategory: "security",
    imageBg: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(15, 23, 42, 0.95))",
    imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "slide-office",
    title: "Oficina y Hogar",
    subtitle: "Service y Soporte IT",
    description: "Instalación de periféricos, cambio y recarga de cartuchos y toners, configuración de impresoras, faxes y mantenimiento técnico corporativo.",
    badge: "Soporte Integral",
    ctaText: "Servicios de Oficina",
    ctaCategory: "repair",
    imageBg: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(15, 23, 42, 0.95))",
    imageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "slide-mobile",
    title: "Tablets y Celulares",
    subtitle: "Hardware y Software Mobile",
    description: "Servicio técnico especializado para iPhone y Android. Cambio de módulos, pines de carga, optimización de software y actualización de aplicaciones.",
    badge: "Soporte Mobile",
    ctaText: "Reparar Dispositivo",
    ctaCategory: "mobile",
    imageBg: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(15, 23, 42, 0.95))",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80"
  }
];

export const QUICK_BANNERS: BannerOffer[] = [
  {
    id: "b-phones",
    title: "Celulares y Tablets",
    tagline: "Setup y Reparación",
    description: "Configuramos y reparamos smartphones iPhone y Android. Módulos, baterías y software.",
    iconName: "Smartphone"
  },
  {
    id: "b-hdd",
    title: "Hard Disk y USB",
    tagline: "Recuperación de Datos",
    description: "Restauración e inspección forense de datos en discos rígidos dañados, SSDs y memorias USB.",
    iconName: "HardDrive"
  },
  {
    id: "b-cartridges",
    title: "Cartuchos y Toners",
    tagline: "Reemplazo y Recarga",
    description: "Recarga exprés y sustitución de insumos para impresoras HP, Epson, Brother y Canon.",
    iconName: "Printer"
  },
  {
    id: "b-laptops",
    title: "Laptops y PCs",
    tagline: "Reparación y Diagnóstico",
    description: "Diagnósticos precisos en el día. Reemplazo de pantallas, teclados, motherboard y discos NVMe.",
    iconName: "Laptop"
  },
  {
    id: "b-tvs",
    title: "TV y Monitores",
    tagline: "Reparación y Service",
    description: "Solución a fallas de backlight, placas fuente, conectores HDMI y configuración Smart TV.",
    iconName: "Tv"
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "s1",
    title: "Cámaras de Vigilancia IP y Digitales",
    description: "Instalación, orientación y configuración de sistemas de videovigilancia CCTV HD, cámaras IP de última generación con visión nocturna y detección de movimiento.",
    category: "security",
    icon: "Camera",
    highlighted: true
  },
  {
    id: "s2",
    title: "Alarmas Domiciliarias e Industriales",
    description: "Centrales de alarma de alta fidelidad DSC, X28 y Alonso. Sensores infrarrojos, barreras fotosensibles y sirenas de alto impacto.",
    category: "security",
    icon: "ShieldAlert",
    highlighted: true
  },
  {
    id: "s3",
    title: "Kits de Energía Solar Fotovoltaica",
    description: "Sistemas on-grid y off-grid con paneles solares, reguladores MPPT, inversores de onda pura y banco de baterías. Venta e instalación llave en mano.",
    category: "solar",
    icon: "Sun",
    highlighted: true
  },
  {
    id: "s4",
    title: "Monitoreo Remoto 3G / 4G",
    description: "Conectividad garantizada para supervisar sus cámaras y alertas de seguridad directamente en su celular o tablet sin importar dónde se encuentre.",
    category: "security",
    icon: "Radio"
  },
  {
    id: "s5",
    title: "Reparación de Hardware y Software",
    description: "Limpieza profunda de componentes, cambio de pasta térmica, eliminación de virus/malware, formateo e instalación de sistemas operativos optimizados.",
    category: "repair",
    icon: "Cpu",
    highlighted: true
  },
  {
    id: "s6",
    title: "Smart TVs y Monitores LED/LCD",
    description: "Reparación de tiras LED de retroiluminación, placas lógicas, fuentes de alimentación y actualización de firmware en pantallas Smart TV.",
    category: "repair",
    icon: "Monitor"
  },
  {
    id: "s7",
    title: "Reparación de Tablets y Celulares",
    description: "Mantenimiento integral para iPhone, iPad y dispositivos Android. Recambio de displays, cristal touch, conectores de carga y recupero de software.",
    category: "mobile",
    icon: "Smartphone",
    highlighted: true
  },
  {
    id: "s8",
    title: "Recuperación de Datos HDD / SSD / USB",
    description: "Servicio especializado de recuperación de archivos perdidos, borrados o por fallas mecánicas y lógicas en discos rígidos, pendrives y tarjetas SD.",
    category: "data",
    icon: "Database",
    highlighted: true
  },
  {
    id: "s9",
    title: "Impresoras, Toners y Faxes",
    description: "Mantenimiento de mecanismos de impresión, desatasco de cabezales, reemplazo de rodillos y recarga de tóner láser y cartuchos de tinta.",
    category: "repair",
    icon: "Printer"
  },
  {
    id: "s10",
    title: "Cámaras Fotográficas y Equipos Ópticos",
    description: "Revisión técnica de lentes, mecanismos de obturación y electrónica de cámaras réflex y compactas.",
    category: "repair",
    icon: "Aperture"
  },
  {
    id: "s11",
    title: "PCs de Escritorio y All In One",
    description: "Armado de PCs a medida para oficina, diseño y gaming. Diagnóstico en el día de fuentes, motherboards, memorias RAM y tarjetas gráficas.",
    category: "repair",
    icon: "Server"
  },
  {
    id: "s12",
    title: "Notebooks y Netbooks",
    description: "Reemplazo de bisagras rotas, teclados, pantallas rotas, conectores jack de carga y upgrades a discos de estado sólido SSD ultra rápidos.",
    category: "repair",
    icon: "Laptop"
  },
  {
    id: "s13",
    title: "Redes LAN, Wi-Fi y Routers",
    description: "Cableado estructurado de red Cat 6, armado de fichas RJ45, configuración de routers, puntos de acceso mesh y extensión de cobertura Wi-Fi.",
    category: "network",
    icon: "Wifi"
  },
  {
    id: "s14",
    title: "Aplicaciones Móviles y Software",
    description: "Asesoramiento y configuración personalizada de herramientas de trabajo, sincronización en la nube y respaldo automatizado.",
    category: "mobile",
    icon: "AppWindow"
  },
  {
    id: "s15",
    title: "Domótica y Automatización Inteligente",
    description: "Control inteligente de iluminación, accesos, cerraduras digitales, cortinas motorizadas, sensores de presencia y climatización desde la app.",
    category: "domotics",
    icon: "Cpu",
    highlighted: true
  }
];

export const BRANDS = [
  { id: "intel", name: "Intel", category: "Procesadores & Chipsets", logoKey: "intel" },
  { id: "amd", name: "AMD", category: "Microprocesadores", logoKey: "amd" },
  { id: "nvidia", name: "NVIDIA", category: "Gráficas & Placas GPU", logoKey: "nvidia" },
  { id: "asus", name: "ASUS", category: "Motherboards & Laptops", logoKey: "asus" },
  { id: "lenovo", name: "Lenovo", category: "Computación & Servidores", logoKey: "lenovo" },
  { id: "dell", name: "Dell Technologies", category: "Laptops & Workstations", logoKey: "dell" },
  { id: "hp", name: "Hewlett Packard", category: "Computación e Impresión", logoKey: "hp" },
  { id: "apple", name: "Apple", category: "Mac &Dispositivos", logoKey: "apple" },
  { id: "samsung", name: "Samsung", category: "Electrónica & SSD", logoKey: "samsung" },
  { id: "dahua", name: "Dahua", category: "Seguridad & CCTV", logoKey: "dahua" },
  { id: "hikvision", name: "Hikvision", category: "Video Vigilancia", logoKey: "hikvision" },
  { id: "x28", name: "X28 Alarmas", category: "Alarmas & Cámaras", logoKey: "x28" },
  { id: "tplink", name: "TP-Link", category: "Redes & Wi-Fi", logoKey: "tplink" },
  { id: "cisco", name: "Cisco Systems", category: "Redes Corporativas", logoKey: "cisco" },
  { id: "wd", name: "Western Digital", category: "Almacenamiento SSD", logoKey: "wd" },
  { id: "seagate", name: "Seagate", category: "Discos HDD/SSD", logoKey: "seagate" },
  { id: "kingston", name: "Kingston", category: "Memorias & SSD", logoKey: "kingston" },
  { id: "cygnus", name: "Cygnus", category: "Monitoreo y Seguridad", logoKey: "cygnus" },
  { id: "rbt_os", name: "RBT OS", category: "Domótica & Automatización", logoKey: "rbt_os" }
];
