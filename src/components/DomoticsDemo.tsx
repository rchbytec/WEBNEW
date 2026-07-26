import React, { useState, useEffect } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { 
  Lightbulb, 
  Sun, 
  Moon,
  Droplets, 
  Wind, 
  Activity, 
  CheckCircle2, 
  Lock, 
  Unlock,
  Gauge,
  Sparkles,
  DoorClosed,
  Play,
  X,
  ShieldAlert,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DomoticsDemoProps {
  darkMode?: boolean;
}

export const DomoticsDemo: React.FC<DomoticsDemoProps> = ({ darkMode = true }) => {
  const { siteData, scrollToSection } = useSiteContext();
  const sim = siteData.simulatorConfig || {
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

  // Device States initialized from simulatorConfig
  const [lightsOn, setLightsOn] = useState<boolean>(sim.initialLightsOn);
  const [lightBrightness, setLightBrightness] = useState<number>(sim.initialLightBrightness);
  const [lightColor, setLightColor] = useState<'warm' | 'neutral' | 'cool'>(sim.initialLightColor || 'warm');
  
  const [curtainsOpen, setCurtainsOpen] = useState<number>(sim.initialCurtainsOpen);
  
  const [waterPumpOn, setWaterPumpOn] = useState<boolean>(sim.initialWaterPumpOn);
  const [waterPressure, setWaterPressure] = useState<number>(sim.initialWaterPressure);
  const [waterFlowRate, setWaterFlowRate] = useState<number>(0);

  const [acOn, setAcOn] = useState<boolean>(sim.initialAcOn);
  const [acTemp, setAcTemp] = useState<number>(sim.initialAcTemp);
  const [acMode, setAcMode] = useState<'cool' | 'heat' | 'eco'>(sim.initialAcMode || 'cool');

  const [alarmArmed, setAlarmArmed] = useState<boolean>(sim.initialAlarmArmed);
  const [gateOpen, setGateOpen] = useState<boolean>(sim.initialGateOpen);

  // Active scenario identifier for UI pulsing/glow highlight ('day' | 'night' | 'none')
  const [activeScenario, setActiveScenario] = useState<'day' | 'night' | 'none'>('day');

  // Sync state if sim config updates from admin panel
  useEffect(() => {
    setLightsOn(sim.initialLightsOn);
    setLightBrightness(sim.initialLightBrightness);
    setLightColor(sim.initialLightColor);
    setCurtainsOpen(sim.initialCurtainsOpen);
    setWaterPumpOn(sim.initialWaterPumpOn);
    setWaterPressure(sim.initialWaterPressure);
    setAcOn(sim.initialAcOn);
    setAcTemp(sim.initialAcTemp);
    setAcMode(sim.initialAcMode);
    setAlarmArmed(sim.initialAlarmArmed);
    setGateOpen(sim.initialGateOpen);
  }, [
    sim.initialLightsOn,
    sim.initialLightBrightness,
    sim.initialLightColor,
    sim.initialCurtainsOpen,
    sim.initialWaterPumpOn,
    sim.initialWaterPressure,
    sim.initialAcOn,
    sim.initialAcTemp,
    sim.initialAcMode,
    sim.initialAlarmArmed,
    sim.initialGateOpen,
  ]);

  // Realtime System Activity Logs
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; type: 'info' | 'success' | 'warning' }>>([
    {
      id: '1',
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text: sim.initialLogText || 'Sistema RBT OS Domótica iniciado en línea.',
      type: 'success'
    },
    {
      id: '2',
      time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text: 'Conexión Modbus RS485 & Módulos Relé OK.',
      type: 'info'
    }
  ]);

  // Mobile Popup / Modal State
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileModalOpen]);

  // Simulate water pressure & flow rate dynamics when pump is active
  useEffect(() => {
    let interval: any;
    if (waterPumpOn) {
      setWaterPressure(3.8);
      setWaterFlowRate(18.5);
      interval = setInterval(() => {
        setWaterPressure(+(3.6 + Math.random() * 0.4).toFixed(1));
        setWaterFlowRate(+(17.5 + Math.random() * 2.0).toFixed(1));
      }, 1000);
    } else {
      setWaterPressure(sim.initialWaterPressure);
      setWaterFlowRate(0);
    }
    return () => clearInterval(interval);
  }, [waterPumpOn, sim.initialWaterPressure]);

  const addLog = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const timeStr = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      { id: Math.random().toString(36).substring(2, 9), time: timeStr, text, type },
      ...prev.slice(0, 12)
    ]);
  };

  const triggerDayMode = () => {
    setActiveScenario('day');
    setLightsOn(true);
    setLightBrightness(100);
    setLightColor('cool');
    setCurtainsOpen(100);
    setAcOn(true);
    setAcTemp(24);
    setAcMode('cool');
    setAlarmArmed(false);
    addLog('Escenario Día: Iluminación 100%, Cortinas Abiertas, Alarma Desarmada', 'success');
  };

  const triggerNightMode = () => {
    setActiveScenario('night');
    setLightsOn(true);
    setLightBrightness(30);
    setLightColor('warm');
    setCurtainsOpen(0);
    setAcOn(true);
    setAcTemp(21);
    setAcMode('eco');
    setAlarmArmed(true);
    setGateOpen(false);
    addLog('Escenario Noche: Cortinas 0%, Alarma Perimetral Armada, Luz Cálida 30%', 'success');
  };

  const triggerIrrigation = () => {
    const nextState = !waterPumpOn;
    setWaterPumpOn(nextState);
    addLog(
      nextState ? 'Bomba de Agua ON: Carga a Tanque de Techo + Riego' : 'Bomba de Agua & Riego Detenido',
      nextState ? 'success' : 'info'
    );
  };

  const getLightGradient = () => {
    if (!lightsOn) return 'rgba(15, 23, 42, 0.95)';
    const opacity = (lightBrightness / 100) * 0.6;
    switch (lightColor) {
      case 'neutral':
        return `rgba(254, 240, 138, ${opacity})`;
      case 'cool':
        return `rgba(56, 189, 248, ${opacity})`;
      case 'warm':
      default:
        return `rgba(251, 191, 36, ${opacity})`;
    }
  };

  // Renderer for Virtual House SVG Graphic
  const renderHouseSVG = (isCompactMobile = false) => (
    <div className={`relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center transition-all ${
      isCompactMobile ? 'h-[210px]' : 'h-[310px] sm:h-[330px]'
    }`}>
      {/* Dynamic Room Lighting Overlay Gradient */}
      <div 
        className="absolute inset-0 transition-all duration-700 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at 45% 35%, ${getLightGradient()} 0%, rgba(9, 9, 11, 0.85) 100%)`
        }}
      />

      {/* Water Pump Flow Animation Stream (Irrigation Drops at Bottom) */}
      <AnimatePresence>
        {waterPumpOn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-2 left-6 right-6 z-20 flex items-center justify-around pointer-events-none"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`water-drop-${i}`}
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.9, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vector House Blueprint Graphic */}
      <svg 
        viewBox="0 0 520 340" 
        className="w-full h-full p-1 z-10 drop-shadow-2xl select-none"
      >
        {/* Scenario Indicator: Half Sun or Half Moon peeking from top-left corner vertex */}
        {activeScenario === 'day' ? (
          <g transform="translate(0, 0)">
            <circle cx="0" cy="0" r="35" fill="#fbbf24" opacity="0.2" className="animate-pulse" />
            <circle cx="0" cy="0" r="22" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
          </g>
        ) : (
          <g transform="translate(0, 0)">
            <circle cx="0" cy="0" r="35" fill="#a855f7" opacity="0.2" className="animate-pulse" />
            <path d="M 0,30 A 30,30 0 0,0 30,0 A 24,24 0 0,1 0,30 Z" fill="#c084fc" stroke="#e9d5ff" strokeWidth="1.5" />
            <circle cx="36" cy="14" r="1.5" fill="#f43f5e" className="animate-ping" />
            <circle cx="18" cy="38" r="1.5" fill="#38bdf8" className="animate-ping" />
            <circle cx="42" cy="24" r="1" fill="#fef08a" className="animate-pulse" />
          </g>
        )}

        {/* Roof Water Tank (Tanque de Agua en el Techo) */}
        <g transform="translate(340, 12)">
          {/* Tank Cylinder Base */}
          <rect x="0" y="8" width="48" height="34" rx="4" fill="#18181b" stroke={waterPumpOn ? "#0284c7" : "#3f3f46"} strokeWidth="1.5" />
          <ellipse cx="24" cy="8" rx="24" ry="6" fill="#27272a" stroke={waterPumpOn ? "#0284c7" : "#3f3f46"} strokeWidth="1.5" />
          
          {/* Water level indicator inside tank */}
          <rect 
            x="3" 
            y={waterPumpOn ? "12" : "24"} 
            width="42" 
            height={waterPumpOn ? "26" : "14"} 
            rx="2" 
            fill="#0284c7" 
            opacity="0.8" 
            className="transition-all duration-700"
          />
          <text x="24" y="28" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
            {waterPumpOn ? 'TANQUE LLENANDO' : 'TANQUE 80%'}
          </text>
        </g>

        {/* Outer House Roof */}
        <polygon 
          points="250,30 470,110 30,110" 
          fill="#18181b" 
          stroke={darkMode ? "#3f3f46" : "#52525b"} 
          strokeWidth="3" 
        />
        
        {/* House Main Body Outline */}
        <rect 
          x="50" 
          y="110" 
          width="400" 
          height="175" 
          rx="6" 
          fill="#09090b" 
          stroke={darkMode ? "#27272a" : "#3f3f46"} 
          strokeWidth="3" 
        />

        {/* Hydraulic Pipe from Ground Pump up to Roof Water Tank */}
        {/* Vertical Pipe on right wall outside house */}
        <path 
          d="M 471,252 L 471,40 L 388,40" 
          fill="none" 
          stroke={waterPumpOn ? "#0284c7" : "#3f3f46"} 
          strokeWidth="3" 
          strokeDasharray={waterPumpOn ? "4 2" : "none"}
          className={waterPumpOn ? "animate-pulse" : ""}
        />

        {/* Lower Irrigation Pipe from Pump to Garden Sprinklers (Lowered to absolute bottom edge) */}
        <path 
          d="M 471,274 L 471,332 L 10,332" 
          fill="none" 
          stroke={waterPumpOn ? "#0284c7" : "#3f3f46"} 
          strokeWidth="2.5" 
          strokeDasharray={waterPumpOn ? "4 2" : "none"}
          className={waterPumpOn ? "animate-pulse" : ""}
        />

        {/* Garden Sprinklers along lower irrigation line */}
        {[60, 150, 240, 330, 420].map((xPos, idx) => (
          <g key={`sprinkler-${xPos}-${idx}`} transform={`translate(${xPos}, 330)`}>
            <rect x="-3" y="0" width="6" height="4" rx="1" fill={waterPumpOn ? "#0ea5e9" : "#52525b"} />
            {waterPumpOn && (
              <g>
                <path d="M -7,-5 Q 0,-11 7,-5" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" className="animate-pulse" />
                <path d="M -11,-9 Q 0,-16 11,-9" fill="none" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.8" className="animate-pulse" />
              </g>
            )}
          </g>
        ))}

        {/* Pump Unit icon on ground to the right of house */}
        <g transform="translate(452, 252)">
          <rect x="0" y="0" width="38" height="22" rx="3" fill={waterPumpOn ? "#0284c7" : "#27272a"} stroke="#0ea5e9" strokeWidth="1" />
          <text x="19" y="14" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">BOMBA</text>
        </g>

        {/* Room 1: Living Room / Kitchen & Entrance Door (Left) */}
        <g transform="translate(65, 122)">
          <rect x="0" y="0" width="180" height="150" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          
          {/* Windows & Motorized Vertical Roller Curtain (Bajada) */}
          <rect x="8" y="48" width="82" height="64" rx="3" fill="#09090b" stroke="#3f3f46" strokeWidth="1.5" />
          
          {/* Vertical Roller Shade: height scales from top (y=48) downward */}
          <rect 
            x="8" 
            y="48" 
            width="82" 
            height={64 * (1 - curtainsOpen / 100)} 
            rx="2" 
            fill="#312e81" 
            opacity="0.9" 
            className="transition-all duration-300"
          />
          {/* Blind slats horizontal lines for realism */}
          {curtainsOpen < 90 && (
            <path 
              d={`M 8,61 L 90,61 M 8,74 L 90,74 M 8,87 L 90,87 M 8,100 L 90,100`} 
              stroke="#4338ca" 
              strokeWidth="1" 
              opacity="0.7" 
            />
          )}
          <text x="49" y="83" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            {curtainsOpen > 50 ? 'Cortina Abierta' : 'Cortina Cerrada'}
          </text>

          {/* Rectangular Magnetic Window Sensor (Centrado a la mitad del borde derecho de la ventana) */}
          <g transform="translate(87, 74)">
            <rect x="0" y="0" width="6" height="12" rx="1" fill={alarmArmed ? "#10b981" : "#71717a"} />
            {alarmArmed && (
              <circle cx="3" cy="6" r="8" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" opacity="0.8" />
            )}
          </g>

          {/* Light bulb indicator (Subido en la parte superior) */}
          <circle 
            cx="140" 
            cy="32" 
            r="15" 
            fill={lightsOn ? (lightColor === 'cool' ? '#38bdf8' : lightColor === 'neutral' ? '#fef08a' : '#fbbf24') : '#27272a'} 
            opacity={lightsOn ? lightBrightness / 100 : 0.3} 
          />
          <text x="140" y="36" textAnchor="middle" fill={lightsOn ? '#000' : '#71717a'} fontSize="9.5" fontWeight="bold">
            {lightsOn ? `${lightBrightness}%` : 'OFF'}
          </text>

          {/* Front Entrance Door (Corregida hacia la derecha) */}
          <g transform="translate(122, 76)">
            <rect x="0" y="0" width="38" height="66" rx="3" fill="#27272a" stroke="#52525b" strokeWidth="1.5" />
            {/* Door Handle */}
            <circle cx="30" cy="34" r="2.5" fill="#fbbf24" />
            <text x="19" y="55" textAnchor="middle" fill="#e4e4e7" fontSize="8.5" fontWeight="bold">PUERTA</text>

            {/* Magnetic Door Sensor */}
            <g transform="translate(31, 2)">
              <rect x="0" y="0" width="6" height="12" rx="1" fill={alarmArmed ? "#10b981" : "#71717a"} />
              {alarmArmed && (
                <circle cx="3" cy="6" r="8" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" opacity="0.8" />
              )}
            </g>
          </g>

          {/* PIR Ceiling Motion Sensor */}
          <g transform="translate(80, 2)">
            <path d="M 0,0 L 20,0 L 15,8 L 5,8 Z" fill={alarmArmed ? "#10b981" : "#52525b"} />
            {alarmArmed && (
              <path d="M -5,12 A 15,15 0 0,0 25,12" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" className="animate-pulse" />
            )}
          </g>
        </g>

        {/* Room 2: HVAC Control Hub (Right Top) */}
        <g transform="translate(255, 122)">
          <rect x="0" y="0" width="180" height="70" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          <text x="90" y="18" textAnchor="middle" fill="#71717a" fontSize="10" fontFamily="sans-serif" fontWeight="bold">CLIMATIZACIÓN A/C</text>
          
          {/* AC Unit Display (Dynamic Color: Cool = Sky Blue, Heat = Rose/Red, Eco = Emerald) */}
          <rect 
            x="15" 
            y="26" 
            width="150" 
            height="32" 
            rx="4" 
            fill={
              !acOn ? "#09090b" : acMode === 'heat' ? "#450a0a" : acMode === 'eco' ? "#064e3b" : "#0c4a6e"
            } 
            stroke={
              !acOn ? "#27272a" : acMode === 'heat' ? "#f43f5e" : acMode === 'eco' ? "#10b981" : "#0284c7"
            } 
            strokeWidth="1.5" 
          />
          <text 
            x="90" 
            y="46" 
            textAnchor="middle" 
            fill={
              !acOn ? "#52525b" : acMode === 'heat' ? "#fda4af" : acMode === 'eco' ? "#34d399" : "#38bdf8"
            } 
            fontSize="10" 
            fontFamily="monospace" 
            fontWeight="bold"
          >
            {!acOn ? 'CLIMA STANDBY' : acMode === 'heat' ? `🔥 CALOR: ${acTemp}°C` : acMode === 'eco' ? `🌱 ECO: ${acTemp}°C` : `❄️ FRÍO: ${acTemp}°C`}
          </text>
        </g>

        {/* Garage & Gate (Right Bottom) */}
        <g transform="translate(255, 202)">
          <rect x="0" y="0" width="180" height="70" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
          
          {/* Gate Sliding Graphic */}
          <rect x="15" y="12" width="150" height="42" rx="2" fill="#09090b" stroke="#3f3f46" />
          <rect 
            x="15" 
            y="12" 
            width="150" 
            height={gateOpen ? 8 : 42} 
            rx="2" 
            fill="#3f3f46" 
            className="transition-all duration-500"
          />
          
          {/* Gate Magnetic Alarm Sensor */}
          <g transform="translate(160, 20)">
            <rect x="0" y="0" width="6" height="12" rx="1" fill={alarmArmed ? "#10b981" : "#71717a"} />
            {alarmArmed && (
              <circle cx="3" cy="6" r="8" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" opacity="0.8" />
            )}
          </g>

          <text x="90" y="37" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            Portón {gateOpen ? 'Abierto' : 'Cerrado'}
          </text>
        </g>

        {/* Alarm Status Badge */}
        <g transform="translate(140, 278)">
          <rect x="0" y="0" width="220" height="24" rx="12" fill={alarmArmed ? "#064e3b" : "#451a03"} stroke={alarmArmed ? "#10b981" : "#f59e0b"} strokeWidth="1.5" />
          <text x="110" y="16" textAnchor="middle" fill={alarmArmed ? "#34d399" : "#fbbf24"} fontSize="9.5" fontWeight="bold">
            {alarmArmed ? '🛡️ SENSORES PIR & MAGNÉTICOS ON' : '🔓 ALARMA DESARMADA'}
          </text>
        </g>
      </svg>
    </div>
  );

  // Renderer for Event Logs Terminal
  const renderEventLogs = () => (
    <div className="mt-4 pt-3 border-t border-zinc-800 bg-zinc-950/80 rounded-xl p-3 shrink-0 h-[135px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          LOG DE EVENTOS EN TIEMPO REAL
        </span>
        <span className="text-[10px] text-zinc-600 font-mono">RBT OS v4.2</span>
      </div>
      <div className="space-y-1 h-[85px] overflow-y-auto font-mono text-[11px] pr-1">
        {logs.map((log, index) => (
          <div key={`demo-log-${log.id || 'l'}-${index}`} className="flex items-center gap-2 text-zinc-300">
            <span className="text-zinc-500 font-semibold shrink-0">{log.time}</span>
            <span className={`truncate ${log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-amber-400' : 'text-zinc-300'}`}>
              {log.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderer for Quick Presets
  const renderPresets = (isMobile = false) => (
    <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${isMobile ? 'mb-2' : 'mb-8'}`}>
      {!isMobile && (
        <span className={`text-xs font-mono uppercase tracking-wider mr-2 hidden sm:inline ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Escenarios rápidos:</span>
      )}
      <button
        onClick={triggerDayMode}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer ${
          activeScenario === 'day'
            ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-amber-500/30 shadow-lg animate-pulse ring-2 ring-amber-400/50'
            : 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-500'
        }`}
      >
        <Sun className="w-4 h-4 text-amber-400" />
        <span>☀️ {sim.dayScenarioLabel || 'Escenario Día'}</span>
      </button>

      <button
        onClick={triggerNightMode}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer ${
          activeScenario === 'night'
            ? 'bg-purple-500/25 border-purple-400 text-purple-300 shadow-purple-500/30 shadow-lg animate-pulse ring-2 ring-purple-400/50'
            : 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 text-purple-400'
        }`}
      >
        <Moon className="w-4 h-4 text-purple-400" />
        <span>🌙 {sim.nightScenarioLabel || 'Escenario Noche'}</span>
      </button>

      <button
        onClick={triggerIrrigation}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer ${
          waterPumpOn 
            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-cyan-500/20 shadow-lg animate-pulse'
            : 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-500'
        }`}
      >
        <Droplets className="w-4 h-4 text-cyan-500" />
        <span>💧 {waterPumpOn ? 'Detener Bomba' : (sim.waterPumpLabel || 'Encender Riego / Bomba')}</span>
      </button>
    </div>
  );

  // Renderer for All Control Dashboard Cards
  const renderControlCards = () => (
    <div className="h-full flex flex-col justify-between gap-3">
      {/* Control Card 1: Iluminación Inteligente */}
      <div className={`border rounded-2xl p-5 shadow-lg transition-colors ${
        darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${lightsOn ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' : darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-500' : 'bg-zinc-100 border-zinc-300 text-zinc-500'}`}>
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Iluminación Inteligente</h4>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Regulación dimmable y tonos de luz</p>
            </div>
          </div>

          <button
            onClick={() => {
              setLightsOn(!lightsOn);
              addLog(!lightsOn ? 'Luces encendidas' : 'Luces apagadas', !lightsOn ? 'success' : 'info');
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              lightsOn 
                ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-md shadow-amber-500/20' 
                : darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {lightsOn ? 'ENCENDIDO' : 'APAGADO'}
          </button>
        </div>

        {/* Slider Brightness & Tones (Always visible, disabled when OFF) */}
        <div className={`space-y-3 pt-2 border-t ${darkMode ? 'border-zinc-800/80' : 'border-zinc-200'} ${
          !lightsOn ? 'opacity-40 pointer-events-none' : ''
        }`}>
          <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <span>Intensidad de Luz</span>
            <span className="font-mono font-bold text-amber-500">{lightBrightness}%</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="100" 
            value={lightBrightness} 
            disabled={!lightsOn}
            onChange={(e) => setLightBrightness(Number(e.target.value))}
            className={`w-full accent-amber-500 h-1.5 rounded-lg ${lightsOn ? 'cursor-pointer' : 'cursor-not-allowed'} ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}
          />

          {/* Color selector */}
          <div className="flex items-center justify-between pt-1">
            <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Tono de ambiente:</span>
            <div className="flex items-center gap-2">
              {[
                { id: 'warm', label: 'Cálida', bg: 'bg-amber-400' },
                { id: 'neutral', label: 'Neutra', bg: 'bg-yellow-200' },
                { id: 'cool', label: 'Fría', bg: 'bg-sky-400' },
              ].map((c, idx) => (
                <button
                  key={`domo-color-${c.id}-${idx}`}
                  disabled={!lightsOn}
                  onClick={() => setLightColor(c.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                    lightsOn ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    lightColor === c.id 
                      ? darkMode ? 'bg-zinc-800 text-white border-zinc-600 ring-2 ring-emerald-500/50' : 'bg-zinc-100 text-zinc-900 border-zinc-400 ring-2 ring-emerald-500/50'
                      : darkMode ? 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200' : 'bg-white text-zinc-600 border-zinc-200 hover:text-zinc-900'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${c.bg}`} />
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Control Card 2: Bomba de Agua & Riego */}
      <div className={`border rounded-2xl p-5 shadow-lg transition-colors ${
        darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${waterPumpOn ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 animate-pulse' : darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-500' : 'bg-zinc-100 border-zinc-300 text-zinc-500'}`}>
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Bomba de Agua & Carga a Tanque</h4>
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Presión actual: {waterPressure} BAR</p>
            </div>
          </div>

          <button
            onClick={triggerIrrigation}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              waterPumpOn 
                ? 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20' 
                : darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {waterPumpOn ? 'ACTIVADA' : 'DETENIDA'}
          </button>
        </div>

        <div className={`pt-2 border-t flex items-center justify-between text-xs ${
          darkMode ? 'border-zinc-800/80 text-zinc-400' : 'border-zinc-200 text-zinc-600'
        }`}>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-500" />
            <span>Presión Hidráulica: <strong className={darkMode ? 'text-white' : 'text-zinc-900'}>{waterPressure} BAR</strong></span>
          </div>
          <div className="font-mono text-cyan-500 font-bold">
            {waterFlowRate} L/min
          </div>
        </div>
      </div>

      {/* Control Card 3: Cortinas Motorizadas & Clima */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Cortinas Motorizadas */}
        <div className={`border rounded-2xl p-4 shadow-lg transition-colors ${
          darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500" />
              <h5 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Cortinas Motorizadas</h5>
            </div>
            <span className="font-mono text-xs text-emerald-500 font-bold">{curtainsOpen}%</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={curtainsOpen} 
            onChange={(e) => setCurtainsOpen(Number(e.target.value))}
            className={`w-full accent-emerald-500 h-1.5 rounded-lg cursor-pointer ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}
          />
          <div className={`flex justify-between text-[10px] mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
            <span>0% (Cerrado)</span>
            <span>100% (Abierto)</span>
          </div>
        </div>

        {/* Climatización AC */}
        <div className={`border rounded-2xl p-4 shadow-lg transition-colors ${
          darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wind className={`w-4 h-4 ${acOn && acMode === 'heat' ? 'text-rose-500' : 'text-sky-500'}`} />
              <h5 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Climatización</h5>
            </div>
            <button 
              onClick={() => setAcOn(!acOn)}
              className={`text-[10px] px-2 py-0.5 rounded font-bold cursor-pointer ${
                acOn 
                  ? acMode === 'heat' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-sky-500/20 text-sky-500 border border-sky-500/30' 
                  : darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-200 text-zinc-500'
              }`}
            >
              {acOn ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className={`flex items-center justify-between mt-2 pt-2 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'} ${
            !acOn ? 'opacity-40 pointer-events-none' : ''
          }`}>
            <div className="flex items-center gap-1">
              <button 
                disabled={!acOn}
                onClick={() => setAcTemp(Math.max(18, acTemp - 1))}
                className={`w-6 h-6 rounded font-bold text-xs ${acOn ? 'cursor-pointer' : 'cursor-not-allowed'} ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'}`}
              >
                -
              </button>
              <span className={`font-mono text-sm font-bold px-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{acTemp}°C</span>
              <button 
                disabled={!acOn}
                onClick={() => setAcTemp(Math.min(28, acTemp + 1))}
                className={`w-6 h-6 rounded font-bold text-xs ${acOn ? 'cursor-pointer' : 'cursor-not-allowed'} ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'}`}
              >
                +
              </button>
            </div>

            {/* Mode Selectors with Heat = Red, Cool = Blue */}
            <div className="flex gap-1 text-[10px]">
              {(['cool', 'heat', 'eco'] as const).map((m, idx) => (
                <button
                  key={`domo-acmode-${m}-${idx}`}
                  disabled={!acOn}
                  onClick={() => {
                    setAcMode(m);
                    addLog(`Modo Clima cambiado a ${m.toUpperCase()}`, 'info');
                  }}
                  className={`px-1.5 py-0.5 rounded capitalize font-bold transition-colors ${acOn ? 'cursor-pointer' : 'cursor-not-allowed'} ${
                    acMode === m 
                      ? m === 'heat' 
                        ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30' 
                        : m === 'eco' 
                        ? 'bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/30' 
                        : 'bg-sky-500 text-zinc-950 shadow-sm shadow-sky-500/30'
                      : darkMode ? 'bg-zinc-800 text-zinc-400 hover:text-white' : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {m === 'heat' ? '🔥 Calor' : m === 'cool' ? '❄️ Frío' : '🌱 Eco'}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Control Card 4: Seguridad & Portón Automático */}
      <div className={`border rounded-2xl p-4 shadow-lg flex items-center justify-between gap-4 transition-colors ${
        darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
      }`}>
        {/* Alarma */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setAlarmArmed(!alarmArmed);
              addLog(!alarmArmed ? 'Alarma & Sensores PIR/Magnéticos activados' : 'Alarma desarmada', !alarmArmed ? 'success' : 'warning');
            }}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              alarmArmed ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
            }`}
          >
            {alarmArmed ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
          </button>
          <div>
            <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Alarma Perimetral</div>
            <div className={`text-[10px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{alarmArmed ? 'PIR & Puerta/Ventanas ON' : 'Desactivada'}</div>
          </div>
        </div>

        <div className={`h-8 w-px ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} />

        {/* Portón */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setGateOpen(!gateOpen);
              addLog(!gateOpen ? 'Portón abriendo...' : 'Portón cerrando...', 'info');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              gateOpen ? 'bg-sky-500/20 border-sky-500/40 text-sky-500' : darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
            }`}
          >
            {gateOpen ? 'Portón Abierto' : 'Abrir Portón'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="demo" className={`py-16 border-y relative overflow-hidden transition-colors duration-300 ${
      darkMode ? 'border-zinc-800 bg-zinc-950 text-white' : 'border-zinc-200 bg-zinc-100 text-zinc-900'
    }`}>
      {/* Background glow decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{sim.badge}</span>
          </div>
          <h2 className={`font-sans text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            {sim.title}
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {sim.description}
          </p>
        </div>

        {/* MOBILE ONLY: "Simular" Button */}
        <div className="lg:hidden flex flex-col items-center justify-center mb-6">
          <button
            onClick={() => setIsMobileModalOpen(true)}
            className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-extrabold text-base transition-all shadow-xl shadow-emerald-500/25 active:scale-95 cursor-pointer w-full max-w-xs"
          >
            <Play className="w-5 h-5 fill-zinc-950" />
            <span>Simular</span>
          </button>
        </div>

        {/* DESKTOP ONLY: Quick Scenario Preset Buttons */}
        <div className="hidden lg:block">
          {renderPresets(false)}
        </div>

        {/* DESKTOP VIEW: 2-Column Grid with PERFECT EQUAL HEIGHT (items-stretch) */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT 6 COLS: House Card + Event Logs (stretches to full height of right column) */}
          <div className={`col-span-6 border rounded-2xl p-5 shadow-2xl relative flex flex-col justify-between h-full ${
            darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className={`flex items-center justify-between mb-4 border-b pb-3 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className={`font-mono text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Vista Previa Casa Inteligente
                </span>
              </div>
              <span className={`text-[11px] font-mono ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                100% Sincronizado
              </span>
            </div>

            <div className="flex-1 flex flex-col justify-center my-auto">
              {renderHouseSVG(false)}
            </div>

            <div className="mt-auto">
              {renderEventLogs()}
            </div>
          </div>

          {/* RIGHT 6 COLS: Control Cards */}
          <div className="col-span-6 flex flex-col justify-between h-full">
            {renderControlCards()}
          </div>

        </div>

        {/* MOBILE PAGE VIEW: Clean House Card directly below "Simular" button */}
        <div className="lg:hidden max-w-xl mx-auto">
          <div className={`border rounded-2xl p-4 shadow-2xl relative flex flex-col justify-between ${
            darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            <div className={`flex items-center justify-between mb-3 border-b pb-2.5 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className={`font-mono text-xs font-semibold uppercase tracking-wide ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                  Vista Previa Casa Inteligente
                </span>
              </div>
            </div>

            {renderHouseSVG(false)}
          </div>
        </div>

        {/* CTA Footer note */}
        <div className={`mt-10 text-center border rounded-2xl p-6 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
          darkMode 
            ? 'bg-zinc-900 border-zinc-800 text-white' 
            : 'bg-white border-zinc-200 text-zinc-900 shadow-xl'
        }`}>
          <div className="text-left">
            <h4 className={`font-bold text-sm flex items-center gap-2 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {sim.ctaTitle}
            </h4>
            <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {sim.ctaDescription}
            </p>
          </div>

          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contacto');
            }}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/20"
          >
            {sim.ctaButtonText}
          </a>
        </div>

      </div>

      {/* MOBILE POPUP / FULLSCREEN MODAL FOR INTERACTIVE SIMULATOR */}
      {/* PERFECT IMPLEMENTATION: Top area (Header + House) is STRICTLY FIXED, bottom area is SCROLLABLE */}
      <AnimatePresence>
        {isMobileModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col h-screen overflow-hidden lg:hidden"
          >
            {/* 1. FIXED TOP REGION: Header + Fixed SVG House Preview */}
            <div className="shrink-0 bg-zinc-900/98 border-b border-zinc-800 shadow-2xl p-3 z-20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-extrabold text-sm text-white font-sans">Simulación Domótica en Vivo</span>
                </div>

                {/* ONLY clean 'X' button */}
                <button
                  onClick={() => setIsMobileModalOpen(false)}
                  className="p-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-zinc-700 active:scale-95"
                  aria-label="Cerrar simulación"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* House SVG fixed preview locked at top */}
              {renderHouseSVG(true)}
            </div>

            {/* 2. SCROLLABLE BOTTOM REGION: Presets, Controls & Event Logs */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-12">
              <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">Escenarios Rápidos</span>
                {renderPresets(true)}
              </div>

              {/* Control Cards */}
              {renderControlCards()}

              {/* Event Logs */}
              {renderEventLogs()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
