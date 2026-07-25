import React, { useState, useEffect } from 'react';
import { useSiteContext } from '../context/SiteContext';
import { 
  Lightbulb, 
  Sun, 
  Moon,
  Droplets, 
  Wind, 
  ShieldCheck, 
  DoorClosed, 
  Power, 
  Sliders, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Lock, 
  Unlock,
  Gauge,
  Sparkles,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DomoticsDemoProps {
  darkMode?: boolean;
}

export const DomoticsDemo: React.FC<DomoticsDemoProps> = ({ darkMode = true }) => {
  const { siteData } = useSiteContext();
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
    ctaTitle: '¿Desea automatizar su hogar, negocio o campo en Buenos Aires o Neuquén?',
    ctaDescription: 'Diseñamos instalaciones a medida de llaves GSM, bombas de agua inteligentes, alarmas, cámaras y domótica centralizada.',
    ctaButtonText: 'Solicitar Asesoramiento Técnico',
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
    sim.initialGateOpen
  ]);

  // Activity Log
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; type: 'info' | 'success' | 'warning' }>>([
    { id: '1', time: '19:40:02', text: sim.initialLogText || 'Sistema RBT OS Domótica iniciado en línea.', type: 'info' },
    { id: '2', time: '19:40:15', text: 'Alarma perimetral y sensores PIR armados.', type: 'success' },
  ]);

  const addLog = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const timeStr = new Date().toLocaleTimeString('es-AR', { hour12: false });
    setLogs((prev) => [{ id: Math.random().toString(), time: timeStr, text, type }, ...prev.slice(0, 5)]);
  };

  // Water pump effect simulate flow rate
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (waterPumpOn) {
      setWaterFlowRate(22);
      setWaterPressure(2.8);
      interval = setInterval(() => {
        setWaterFlowRate(20 + Math.floor(Math.random() * 5));
        setWaterPressure(parseFloat((2.6 + Math.random() * 0.3).toFixed(1)));
      }, 1000);
    } else {
      setWaterFlowRate(0);
      setWaterPressure(0.8);
    }
    return () => clearInterval(interval);
  }, [waterPumpOn]);

  // Quick Scenarios
  const triggerNightMode = () => {
    setLightsOn(false);
    setCurtainsOpen(0);
    setWaterPumpOn(false);
    setAlarmArmed(true);
    setGateOpen(false);
    setAcTemp(24);
    addLog('Escenario "Modo Noche" activado: Luces OFF, Cortinas Roller 0%, Alarma & Sensores ON.', 'warning');
  };

  const triggerDayMode = () => {
    setLightsOn(true);
    setLightBrightness(60);
    setLightColor('warm');
    setCurtainsOpen(100);
    setAlarmArmed(false);
    setAcOn(true);
    setAcTemp(22);
    addLog('Escenario "Modo Día" activado: Cortinas 100%, Clima 22°C.', 'success');
  };

  const triggerIrrigation = () => {
    setWaterPumpOn(!waterPumpOn);
    addLog(
      !waterPumpOn 
        ? 'Bomba de Agua encendida - Sistema de Riego Activo (2.8 BAR)' 
        : 'Bomba de Agua apagada.',
      !waterPumpOn ? 'success' : 'info'
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

  return (
    <section id="demo" className={`py-16 border-y relative overflow-hidden transition-colors duration-300 ${
      darkMode ? 'border-zinc-800 bg-zinc-950 text-white' : 'border-zinc-200 bg-zinc-100 text-zinc-900'
    }`}>
      {/* Background glow decoration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
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

        {/* Quick Scenario Preset Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <span className={`text-xs font-mono uppercase tracking-wider mr-2 hidden sm:inline ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Escenarios rápidos:</span>
          <button
            onClick={triggerDayMode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-500 text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span>☀️ {sim.dayScenarioLabel || 'Escenario Día'}</span>
          </button>

          <button
            onClick={triggerNightMode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-semibold transition-all shadow-sm active:scale-95"
          >
            <Moon className="w-4 h-4 text-purple-400" />
            <span>🌙 {sim.nightScenarioLabel || 'Escenario Noche'}</span>
          </button>

          <button
            onClick={triggerIrrigation}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all shadow-sm active:scale-95 ${
              waterPumpOn 
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-cyan-500/20 shadow-lg animate-pulse'
                : 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 text-cyan-500'
            }`}
          >
            <Droplets className="w-4 h-4 text-cyan-500" />
            <span>💧 {waterPumpOn ? 'Detener Bomba de Agua' : (sim.waterPumpLabel || 'Encender Riego / Bomba')}</span>
          </button>
        </div>

        {/* Main Grid: Left Interactive SVG House View, Right Control Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 6 COLS: Interactive Virtual House Room SVG Diagram */}
          <div className={`lg:col-span-6 border rounded-2xl p-5 shadow-2xl relative flex flex-col justify-between min-h-[460px] ${
            darkMode ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white border-zinc-200'
          }`}>
            {/* Header Badge */}
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

            {/* Interactive SVG Rendering Container */}
            <div className="relative w-full h-[320px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center">
              
              {/* Dynamic Room Lighting Overlay Gradient */}
              <div 
                className="absolute inset-0 transition-all duration-700 pointer-events-none z-10"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${getLightGradient()} 0%, rgba(9, 9, 11, 0.85) 100%)`
                }}
              />

              {/* Water Pump Flow Animation Stream (if pump ON) */}
              <AnimatePresence>
                {waterPumpOn && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-6 right-6 h-12 border border-cyan-500/40 bg-cyan-950/40 rounded-lg p-2 z-20 flex items-center justify-between overflow-hidden"
                  >
                    <div className="flex items-center gap-2 z-10">
                      <Droplets className="w-5 h-5 text-cyan-400 animate-bounce" />
                      <div>
                        <div className="text-[11px] font-bold text-cyan-200">Bomba de Agua en Marcha</div>
                        <div className="text-[10px] text-cyan-400 font-mono">
                          Presión: {waterPressure} BAR | Caudal: {waterFlowRate} L/min
                        </div>
                      </div>
                    </div>

                    {/* Animated Water Ripples SVG */}
                    <div className="flex items-center gap-1 z-10">
                      <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/40 font-semibold animate-pulse">
                        FLUJO ACTIVO
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.25)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SVG House Vector Graphic */}
              <svg viewBox="0 0 500 300" className="w-full h-full p-4 relative z-0">
                {/* Background Room Outline */}
                <rect x="20" y="40" width="460" height="230" rx="12" fill="#09090b" stroke="#27272a" strokeWidth="3" />

                {/* PIR Infrarrojo Motion Sensor (Top Left Wall of Room) */}
                <g transform="translate(35, 65)">
                  {/* Wall Mount Base */}
                  <rect x="-4" y="0" width="8" height="14" rx="2" fill="#27272a" stroke="#52525b" strokeWidth="1" />
                  {/* PIR Main Sensor Body */}
                  <path d="M 0 6 L 22 6 L 18 26 L 4 26 Z" fill="#18181b" stroke={alarmArmed ? "#10b981" : "#52525b"} strokeWidth="1.5" />
                  {/* White Fresnel Lens Dome */}
                  <circle cx="11" cy="14" r="6" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="1" />
                  <circle cx="11" cy="14" r="2" fill={alarmArmed ? "#10b981" : "#71717a"} />
                  {/* Status LED */}
                  <circle cx="17" cy="9" r="1.5" fill={alarmArmed ? "#ef4444" : "#52525b"} className={alarmArmed ? "animate-pulse" : ""} />

                  {/* Infrared Detection Cone Beam when Armed */}
                  {alarmArmed && (
                    <g opacity="0.8">
                      <path d="M 11 14 L 60 70 L 10 100 Z" fill="rgba(16, 185, 129, 0.08)" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" className="animate-pulse" />
                      <g stroke="#10b981" strokeWidth="1.5" fill="none" className="animate-pulse">
                        <path d="M 22 25 A 16 16 0 0 1 32 38" opacity="0.9" />
                        <path d="M 30 35 A 28 28 0 0 1 46 54" opacity="0.6" />
                        <path d="M 38 45 A 40 40 0 0 1 60 70" opacity="0.3" />
                      </g>
                    </g>
                  )}
                  <text x="0" y="-4" fill={alarmArmed ? "#34d399" : "#71717a"} fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                    SENSOR PIR
                  </text>
                </g>

                {/* CCTV Smart Camera (Top Right Wall of Room) - Lowered */}
                <g transform="translate(415, 80)">
                  {/* Wall mounting bracket arm */}
                  <path d="M 36 6 L 24 6 L 24 16 L 16 16" fill="none" stroke="#52525b" strokeWidth="2.5" />
                  {/* Camera Main Body */}
                  <rect x="-12" y="4" width="32" height="20" rx="4" fill="#18181b" stroke={alarmArmed ? "#10b981" : "#52525b"} strokeWidth="2" />
                  {/* Sunshade hood */}
                  <rect x="-14" y="2" width="36" height="4" rx="1" fill="#27272a" />
                  {/* Camera Lens */}
                  <circle cx="-3" cy="14" r="5" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                  <circle cx="-3" cy="14" r="2" fill="#38bdf8" />
                  {/* Status LED */}
                  <circle cx="12" cy="10" r="2.5" fill={alarmArmed ? "#ef4444" : "#52525b"} className={alarmArmed ? "animate-pulse" : ""} />
                  
                  {/* Radiating Surveillance Waves when Armed */}
                  {alarmArmed && (
                    <g stroke="#10b981" strokeWidth="1.5" fill="none" className="animate-pulse">
                      <path d="M -20 18 A 12 12 0 0 0 -30 28" opacity="0.9" />
                      <path d="M -24 22 A 20 20 0 0 0 -38 36" opacity="0.6" />
                      <path d="M -28 26 A 28 28 0 0 0 -46 44" opacity="0.3" />
                    </g>
                  )}
                  <text x="5" y="-4" fill={alarmArmed ? "#34d399" : "#71717a"} fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="sans-serif">
                    CÁMARA CCTV
                  </text>
                </g>

                {/* Ceiling Lamp Glow */}
                <circle 
                  cx="250" 
                  cy="65" 
                  r={lightsOn ? (lightBrightness / 100) * 22 + 10 : 8} 
                  fill={lightsOn ? (lightColor === 'warm' ? '#FBBF24' : lightColor === 'neutral' ? '#FEF08A' : '#38BDF8') : '#3F3F46'} 
                  className="transition-all duration-500"
                  opacity={lightsOn ? 0.9 : 0.4}
                />
                <line x1="250" y1="40" x2="250" y2="57" stroke="#52525B" strokeWidth="2" />

                {/* Window & Vertical Roller Motorized Curtain Visualizer (Left side - Lowered) */}
                <g transform="translate(45, 110)">
                  {/* Window frame */}
                  <rect x="0" y="0" width="100" height="120" rx="4" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
                  {/* Sky/Sunlight inside window */}
                  <rect x="4" y="4" width="92" height="112" rx="2" fill={curtainsOpen > 30 ? "#0284c7" : "#0f172a"} opacity={curtainsOpen / 100} />
                  {curtainsOpen > 20 && (
                    <circle cx="70" cy="30" r="12" fill="#fef08a" opacity={curtainsOpen / 100} />
                  )}

                  {/* Roller Curtain Top Box / Cylinder */}
                  <rect x="2" y="2" width="96" height="8" rx="2" fill="#27272a" stroke="#52525b" strokeWidth="1" />

                  {/* Vertical Roller Curtain Fabric (sube y baja) */}
                  <rect 
                    x="4" 
                    y="10" 
                    width="92" 
                    height={Math.max(0, 104 * (1 - curtainsOpen / 100))} 
                    fill="#3f3f46" 
                    className="transition-all duration-500"
                    opacity="0.95"
                  />
                  {/* Bottom weighted rod on curtain */}
                  {(104 * (1 - curtainsOpen / 100)) > 2 && (
                    <line 
                      x1="4" 
                      y1={10 + 104 * (1 - curtainsOpen / 100)} 
                      x2="96" 
                      y2={10 + 104 * (1 - curtainsOpen / 100)} 
                      stroke="#a1a1aa" 
                      strokeWidth="2.5" 
                      className="transition-all duration-500"
                    />
                  )}

                  {/* Magnetic Sensor on Window Frame */}
                  <g transform="translate(92, 50)">
                    <rect x="0" y="0" width="5" height="14" rx="1" fill={alarmArmed ? "#10b981" : "#71717a"} />
                    {alarmArmed && (
                      <circle cx="2.5" cy="7" r="6" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" opacity="0.7" />
                    )}
                  </g>

                  <line x1="50" y1="10" x2="50" y2="116" stroke="#27272a" strokeWidth="1" opacity="0.3" />
                  <text x="50" y="135" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="sans-serif">
                    Cortina Roller {curtainsOpen}%
                  </text>
                </g>

                {/* Smart HVAC / AC Unit Visualizer (Centered in Room) */}
                <g transform="translate(190, 105)">
                  <rect x="0" y="0" width="120" height="36" rx="6" fill="#18181b" stroke={acOn ? "#10b981" : "#3f3f46"} strokeWidth="2" />
                  <circle cx="15" cy="18" r="4" fill={acOn ? "#10b981" : "#71717a"} />
                  <text x="65" y="22" textAnchor="middle" fill={acOn ? "#ffffff" : "#a1a1aa"} fontSize="12" fontWeight="bold">
                    {acOn ? `${acTemp}°C ${acMode.toUpperCase()}` : 'AC OFF'}
                  </text>
                  {/* Air flow lines if AC on */}
                  {acOn && (
                    <g opacity="0.7">
                      <path d="M 20 42 Q 35 52 50 42" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                      <path d="M 60 42 Q 75 52 90 42" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" className="animate-pulse" />
                    </g>
                  )}
                </g>

                {/* Smart Overhead Sectional Gate / Portón Levadizo Automático */}
                <g transform="translate(320, 168)">
                  {/* Outer Frame & Opening */}
                  <rect x="0" y="0" width="120" height="66" rx="4" fill="#09090b" stroke="#3f3f46" strokeWidth="2" />
                  
                  {/* Interior Garage view when gate is elevated/open */}
                  {gateOpen && (
                    <g opacity="0.7">
                      <rect x="4" y="4" width="112" height="58" rx="2" fill="#18181b" />
                      <text x="60" y="36" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                        GARAGE ABIERTO
                      </text>
                    </g>
                  )}

                  {/* Vertical Guide Tracks */}
                  <line x1="4" y1="4" x2="4" y2="62" stroke="#52525b" strokeWidth="1.5" strokeDasharray="3" />
                  <line x1="116" y1="4" x2="116" y2="62" stroke="#52525b" strokeWidth="1.5" strokeDasharray="3" />

                  {/* Sectional Gate Panel (Elevates UP when open) */}
                  <g 
                    className="transition-all duration-700 ease-in-out"
                    style={{
                      transform: gateOpen ? 'translateY(-48px)' : 'translateY(0px)',
                    }}
                  >
                    {/* Full Door Panel */}
                    <rect 
                      x="4" 
                      y="4" 
                      width="112" 
                      height="58" 
                      rx="2" 
                      fill="#334155" 
                      stroke="#0ea5e9" 
                      strokeWidth="1.5" 
                    />
                    
                    {/* Sectional Horizontal Panel Lines */}
                    <line x1="4" y1="18" x2="116" y2="18" stroke="#1e293b" strokeWidth="2" />
                    <line x1="4" y1="33" x2="116" y2="33" stroke="#1e293b" strokeWidth="2" />
                    <line x1="4" y1="47" x2="116" y2="47" stroke="#1e293b" strokeWidth="2" />

                    {/* Lock Handle in Center */}
                    <rect x="52" y="30" width="16" height="6" rx="1" fill="#0284c7" />
                  </g>

                  {/* Top Automatic Motor Drive Unit */}
                  <rect x="45" y="-6" width="30" height="8" rx="2" fill="#27272a" stroke="#0ea5e9" strokeWidth="1" />
                  <circle cx="60" cy="-2" r="1.5" fill={gateOpen ? "#10b981" : "#a1a1aa"} />

                  {/* Magnetic Contact Sensor on Gate Frame */}
                  <g transform="translate(-8, 25)">
                    <rect x="0" y="0" width="5" height="14" rx="1" fill={alarmArmed ? "#10b981" : "#71717a"} />
                    {alarmArmed && (
                      <circle cx="2.5" cy="7" r="6" fill="none" stroke="#10b981" strokeWidth="1.5" className="animate-ping" opacity="0.7" />
                    )}
                  </g>

                  <text x="60" y="80" textAnchor="middle" fill="#a1a1aa" fontSize="10" fontFamily="sans-serif">
                    Portón {gateOpen ? 'ELEVADO (ABIERTO)' : 'CERRADO'}
                  </text>
                </g>

                {/* Alarm Status Badge in Room */}
                <g transform="translate(185, 190)">
                  <rect x="0" y="0" width="120" height="30" rx="15" fill={alarmArmed ? "#064e3b" : "#451a03"} stroke={alarmArmed ? "#10b981" : "#f59e0b"} strokeWidth="1.5" />
                  <text x="60" y="19" textAnchor="middle" fill={alarmArmed ? "#34d399" : "#fbbf24"} fontSize="10" fontWeight="bold">
                    {alarmArmed ? '🛡️ ALARMA & PIR ON' : '🔓 DESARMADA'}
                  </text>
                </g>
              </svg>
            </div>

            {/* Event Logs Activity Terminal */}
            <div className="mt-4 pt-3 border-t border-zinc-800 bg-zinc-950/80 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  LOG DE EVENTOS EN TIEMPO REAL
                </span>
                <span className="text-[10px] text-zinc-600 font-mono">RBT OS v4.2</span>
              </div>
              <div className="space-y-1 max-h-20 overflow-y-auto font-mono text-[11px]">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center gap-2 text-zinc-300">
                    <span className="text-zinc-500 font-semibold">{log.time}</span>
                    <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-amber-400' : 'text-zinc-300'}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 6 COLS: Full Control Dashboard */}
          <div className="lg:col-span-6 space-y-4">
            
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
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    lightsOn 
                      ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-md shadow-amber-500/20' 
                      : darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {lightsOn ? 'ENCENDIDO' : 'APAGADO'}
                </button>
              </div>

              {/* Slider Brightness */}
              {lightsOn && (
                <div className={`space-y-3 pt-2 border-t ${darkMode ? 'border-zinc-800/80' : 'border-zinc-200'}`}>
                  <div className={`flex items-center justify-between text-xs ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                    <span>Intensidad de Luz</span>
                    <span className="font-mono font-bold text-amber-500">{lightBrightness}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={lightBrightness} 
                    onChange={(e) => setLightBrightness(Number(e.target.value))}
                    className={`w-full accent-amber-500 h-1.5 rounded-lg cursor-pointer ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}
                  />

                  {/* Color selector - Only 3 Tones: Cálida, Neutra, Fría */}
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Tono de ambiente:</span>
                    <div className="flex items-center gap-2">
                      {[
                        { id: 'warm', label: 'Cálida', bg: 'bg-amber-400' },
                        { id: 'neutral', label: 'Neutra', bg: 'bg-yellow-200' },
                        { id: 'cool', label: 'Fría', bg: 'bg-sky-400' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setLightColor(c.id as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
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
              )}
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
                    <h4 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Bomba de Agua & Riego GSM</h4>
                    <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Presión actual: {waterPressure} BAR</p>
                  </div>
                </div>

                <button
                  onClick={triggerIrrigation}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    waterPumpOn 
                      ? 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400 shadow-md shadow-cyan-500/20' 
                      : darkMode ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {waterPumpOn ? 'ACTIVADA' : 'DETENIDA'}
                </button>
              </div>

              {/* Real time metrics gauge bar */}
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
                    <Wind className="w-4 h-4 text-sky-500" />
                    <h5 className={`font-bold text-xs ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Climatización</h5>
                  </div>
                  <button 
                    onClick={() => setAcOn(!acOn)}
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${acOn ? 'bg-sky-500/20 text-sky-500 border border-sky-500/30' : darkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-zinc-200 text-zinc-500'}`}
                  >
                    {acOn ? 'ON' : 'OFF'}
                  </button>
                </div>

                {acOn && (
                  <div className={`flex items-center justify-between mt-2 pt-2 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setAcTemp(Math.max(18, acTemp - 1))}
                        className={`w-6 h-6 rounded font-bold text-xs ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'}`}
                      >
                        -
                      </button>
                      <span className={`font-mono text-sm font-bold px-1 ${darkMode ? 'text-white' : 'text-zinc-900'}`}>{acTemp}°C</span>
                      <button 
                        onClick={() => setAcTemp(Math.min(28, acTemp + 1))}
                        className={`w-6 h-6 rounded font-bold text-xs ${darkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex gap-1 text-[10px]">
                      {(['cool', 'heat', 'eco'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setAcMode(m)}
                          className={`px-1.5 py-0.5 rounded capitalize ${acMode === m ? 'bg-sky-500 text-zinc-950 font-bold' : darkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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
                    addLog(!alarmArmed ? 'Alarma armada' : 'Alarma desarmada', !alarmArmed ? 'success' : 'warning');
                  }}
                  className={`p-2.5 rounded-xl border transition-all ${
                    alarmArmed ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  }`}
                >
                  {alarmArmed ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </button>
                <div>
                  <div className={`text-xs font-bold ${darkMode ? 'text-white' : 'text-zinc-900'}`}>Alarma Perimetral</div>
                  <div className={`text-[10px] ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{alarmArmed ? 'Protección activa' : 'Desactivada'}</div>
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    gateOpen ? 'bg-sky-500/20 border-sky-500/40 text-sky-500' : darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-700'
                  }`}
                >
                  {gateOpen ? 'Portón Abierto' : 'Abrir Portón'}
                </button>
              </div>
            </div>

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
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-emerald-500/20"
          >
            {sim.ctaButtonText}
          </a>
        </div>

      </div>
    </section>
  );
};
