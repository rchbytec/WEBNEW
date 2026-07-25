import React from 'react';

interface BrandLogoProps {
  logoKey: string;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ logoKey, className = "h-8 w-auto fill-current" }) => {
  switch (logoKey) {
    case 'apple':
      return (
        <svg viewBox="0 0 170 50" className={className} aria-label="Apple">
          <g transform="translate(10, 8) scale(1.1)" fill="currentColor">
            <path d="M15.2 7.1c-.8 1-2.1 1.7-3.4 1.6-.2-1.3.4-2.6 1.2-3.6.9-1 2.2-1.7 3.4-1.7.2 1.3-.4 2.6-1.2 3.7zm3.4 1.8c-1.9-.1-3.5 1.1-4.4 1.1-.9 0-2.2-1-3.7-1-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.5 1.4 11.3.9 1.4 2.1 2.9 3.5 2.8 1.4 0 2-.9 3.7-.9 1.7 0 2.2.9 3.7.9 1.5 0 2.5-1.4 3.4-2.7 1.1-1.6 1.5-3.1 1.5-3.2 0 0-3-1.1-3-4.5 0-2.8 2.3-4.2 2.4-4.3-1.3-1.9-3.4-2.1-4.1-2.2z" />
          </g>
          <text x="56" y="34" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" fontWeight="700" fontSize="28" fill="currentColor">Apple</text>
        </svg>
      );

    case 'nvidia':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="NVIDIA">
          <g transform="translate(6, 6)">
            <path d="M0,19 C0,8 10,0 22,0 C34,0 42,7 42,18 C42,27 34,35 23,35 C14,35 7,28 7,19 C7,12 12,8 18,8 C23,8 26,11 26,16 C26,20 22,23 18,23 C16,23 14,21 14,19" fill="none" stroke="#76B900" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M22,38 L32,38 C39,38 42,32 42,26 L42,18" fill="none" stroke="#76B900" strokeWidth="3" strokeLinecap="round" />
          </g>
          <text x="58" y="34" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="currentColor" letterSpacing="0.5">NVIDIA</text>
        </svg>
      );

    case 'dell':
      return (
        <svg viewBox="0 0 160 50" className={className} aria-label="Dell">
          <circle cx="24" cy="25" r="19" fill="none" stroke="#007DB8" strokeWidth="3.5" />
          <g transform="translate(54, 8)">
            <text x="0" y="27" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="currentColor" letterSpacing="1">D</text>
            <text x="21" y="27" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="#007DB8" transform="rotate(-22 26 22)">E</text>
            <text x="38" y="27" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="currentColor" letterSpacing="1">LL</text>
          </g>
        </svg>
      );

    case 'intel':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Intel">
          <text x="90" y="34" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="32" fill="currentColor" letterSpacing="-1">intel</text>
          <circle cx="67" cy="11" r="3" fill="#0071C5" />
          <path d="M20,18 C50,4 130,4 160,18" fill="none" stroke="#0071C5" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'amd':
      return (
        <svg viewBox="0 0 160 50" className={className} aria-label="AMD">
          <g transform="translate(6, 8)">
            <path d="M0,0 L18,0 L18,18 L34,18 L34,34 L0,34 Z" fill="#22C55E" />
            <path d="M22,0 L34,0 L34,14 L22,14 Z" fill="currentColor" />
          </g>
          <text x="46" y="36" fontFamily="sans-serif" fontWeight="900" fontSize="32" fill="currentColor" letterSpacing="1">AMD</text>
        </svg>
      );

    case 'asus':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="ASUS">
          <text x="90" y="35" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="32" fill="currentColor" letterSpacing="3">ASUS</text>
        </svg>
      );

    case 'lenovo':
      return (
        <svg viewBox="0 0 170 50" className={className} aria-label="Lenovo">
          <rect x="5" y="8" width="160" height="34" fill="#E11D48" rx="4" />
          <text x="16" y="33" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="24" fill="#FFFFFF" letterSpacing="0.5">Lenovo</text>
        </svg>
      );

    case 'hp':
      return (
        <svg viewBox="0 0 120 50" className={className} aria-label="HP">
          <ellipse cx="60" cy="25" rx="36" ry="22" fill="#0096D6" transform="rotate(-15 60 25)" />
          <text x="42" y="34" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="28" fill="#FFFFFF">hp</text>
        </svg>
      );

    case 'samsung':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Samsung">
          <ellipse cx="90" cy="25" rx="82" ry="20" fill="none" stroke="#034EA2" strokeWidth="2.5" transform="rotate(-5 90 25)" />
          <text x="22" y="32" fontFamily="sans-serif" fontWeight="900" fontSize="20" fill="currentColor" letterSpacing="2.5">SAMSUNG</text>
        </svg>
      );

    case 'dahua':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Dahua Technology">
          <text x="90" y="30" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="28" fill="currentColor" fontStyle="italic">dahua</text>
          <text x="90" y="43" textAnchor="middle" fontFamily="sans-serif" fontWeight="700" fontSize="9" fill="#0284C7" letterSpacing="3">TECHNOLOGY</text>
        </svg>
      );

    case 'hikvision':
      return (
        <svg viewBox="0 0 190 50" className={className} aria-label="Hikvision">
          <text x="5" y="32" fontFamily="sans-serif" fontWeight="900" fontStyle="italic" fontSize="26" fill="currentColor" letterSpacing="1">HIKVISION</text>
          <line x1="5" y1="39" x2="185" y2="39" stroke="#E11D48" strokeWidth="3.5" />
        </svg>
      );

    case 'x28':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="X-28 Alarmas">
          <rect x="5" y="8" width="58" height="32" rx="6" fill="#DC2626" />
          <text x="12" y="30" fontFamily="sans-serif" fontWeight="900" fontSize="18" fill="#FFFFFF">X-28</text>
          <text x="70" y="28" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="currentColor" letterSpacing="1">CÁMARAS</text>
          <text x="71" y="40" fontFamily="sans-serif" fontWeight="700" fontSize="9" fill="#71717A">ALARMAS</text>
        </svg>
      );

    case 'tplink':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="TP-Link">
          <g transform="translate(18, 12)" fill="#00AF9C">
            <path d="M12,2 C6,2 2,6 2,12 C2,18 6,22 12,22 L12,17 C8,17 6,15 6,12 C6,9 8,7 12,7 Z" />
            <path d="M15,2 L22,2 L22,22 L15,22 Z M22,12 C26,12 28,14 28,18 C28,22 26,22 22,22 Z" />
          </g>
          <text x="60" y="34" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="currentColor" letterSpacing="0.5">tp-link</text>
        </svg>
      );

    case 'cisco':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Cisco">
          <g stroke="#049FD9" strokeWidth="3" strokeLinecap="round">
            <line x1="66" y1="12" x2="66" y2="18" />
            <line x1="78" y1="7" x2="78" y2="18" />
            <line x1="90" y1="2" x2="90" y2="18" />
            <line x1="102" y1="7" x2="102" y2="18" />
            <line x1="114" y1="12" x2="114" y2="18" />
          </g>
          <text x="90" y="40" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="currentColor" letterSpacing="2">CISCO</text>
        </svg>
      );

    case 'wd':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Western Digital">
          <rect x="5" y="8" width="170" height="34" rx="6" fill="none" stroke="#0284C7" strokeWidth="2" />
          <text x="14" y="31" fontFamily="sans-serif" fontWeight="900" fontSize="17" fill="currentColor" letterSpacing="0.8">Western Digital</text>
        </svg>
      );

    case 'seagate':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Seagate">
          <circle cx="25" cy="25" r="14" fill="none" stroke="#00A859" strokeWidth="4" strokeDasharray="60 20" />
          <text x="48" y="33" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="currentColor" letterSpacing="1">SEAGATE</text>
        </svg>
      );

    case 'kingston':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Kingston">
          <text x="10" y="34" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="currentColor">Kingston</text>
          <circle cx="150" cy="20" r="8" fill="#E11D48" />
        </svg>
      );

    case 'cygnus':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="Cygnus Electronics">
          <text x="90" y="28" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="24" fill="currentColor" letterSpacing="1">CYGNUS</text>
          <text x="90" y="41" textAnchor="middle" fontFamily="sans-serif" fontWeight="600" fontSize="9" fill="#71717A" letterSpacing="2">ELECTRONICS</text>
        </svg>
      );

    case 'rbt_os':
    case 'phl':
      return (
        <svg viewBox="0 0 180 50" className={className} aria-label="RBT OS Domótica">
          <text x="90" y="27" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="26" fill="currentColor" fontStyle="italic">RBT OS</text>
          <text x="90" y="42" textAnchor="middle" fontFamily="sans-serif" fontWeight="800" fontSize="12" fill="#10B981" letterSpacing="3">DOMÓTICA</text>
        </svg>
      );

    default:
      return (
        <span className="font-bold text-sm uppercase font-mono">{logoKey}</span>
      );
  }
};
