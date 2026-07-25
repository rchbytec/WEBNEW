import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSiteContext } from '../context/SiteContext';
import { sendAdminEmail } from '../utils/emailNotifier';
import { ShieldCheck, Lock, Mail, KeyRound, AlertCircle, CheckCircle2, X, ArrowLeft, Send, Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  darkMode: boolean;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ darkMode }) => {
  const { 
    isLoginModalOpen, 
    setIsLoginModalOpen, 
    setIsAdminLoggedIn, 
    setIsAdminPanelOpen, 
    siteData,
    setNotificationMsg 
  } = useSiteContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Recovery state
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState<string | null>(null);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);

  if (!isLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const currentAdmin = siteData.adminCredentials;
      if (
        email.trim().toLowerCase() === currentAdmin.email.toLowerCase() &&
        password.trim() === currentAdmin.password
      ) {
        setIsAdminLoggedIn(true);
        setIsLoginModalOpen(false);
        setIsAdminPanelOpen(true);
        setNotificationMsg('¡Sesión de Administrador iniciada con éxito!');
        setEmail('');
        setPassword('');
      } else {
        setError('Credenciales incorrectas. Verifique su correo y contraseña.');
      }
      setLoading(false);
    }, 400);
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);
    setRecoverySuccess(null);
    setLoading(true);

    const currentAdmin = siteData.adminCredentials;
    if (recoveryEmail.trim().toLowerCase() !== currentAdmin.email.toLowerCase()) {
      setRecoveryError('El correo ingresado no coincide con el correo de administrador configurado.');
      setLoading(false);
      return;
    }

    const message = `Estimado Administrador de RCH-BYTEC,\n\nHa solicitado la recuperación de credenciales de su Panel de Control.\n\nSus credenciales actuales de acceso son:\n- Email: ${currentAdmin.email}\n- Contraseña: ${currentAdmin.password}\n\nSi usted no realizó esta solicitud, le recomendamos ingresar al panel y actualizar su contraseña inmediatamente.`;

    const res = await sendAdminEmail({
      toEmail: currentAdmin.email,
      subject: 'Recuperación de Contraseña - RCH-BYTEC Admin',
      message,
    });

    if (res.success) {
      setRecoverySuccess(`Se han enviado las instrucciones de recuperación y su contraseña al correo ${currentAdmin.email}.`);
    } else {
      setRecoveryError('Ocurrió un error al enviar el correo. Por favor intente más tarde.');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className={`w-full max-w-md rounded-2xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden ${
            darkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
          }`}
        >
          {/* Close button */}
          <button
            onClick={() => {
              setIsLoginModalOpen(false);
              setIsRecoveryMode(false);
              setError(null);
              setRecoverySuccess(null);
              setRecoveryError(null);
            }}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 font-bold block">
                SISTEMA RCH-BYTEC
              </span>
              <h3 className="text-xl font-black">
                {isRecoveryMode ? 'Recuperar Contraseña' : 'Panel de Administración'}
              </h3>
            </div>
          </div>

          {!isRecoveryMode ? (
            /* LOGIN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Ingrese sus credenciales corporativas para gestionar contenidos, textos, contactos y banners.
              </p>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className={`block text-xs font-semibold mb-1 flex items-center gap-1.5 ${
                  darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  <Mail className="w-3.5 h-3.5" />
                  <span>Correo de Administrador</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@email.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-500' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-zinc-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 flex items-center gap-1.5 ${
                  darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Contraseña</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full px-3.5 py-2.5 pr-10 rounded-lg border text-sm focus:outline-none transition-colors ${
                      darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-500' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-zinc-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${
                      darkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                    title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsRecoveryMode(true);
                    setError(null);
                    setRecoveryEmail(email);
                  }}
                  className="text-xs font-semibold text-emerald-500 hover:underline"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-500 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                {loading ? (
                  <span className="inline-block animate-spin font-mono">...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Iniciar Sesión Admin</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* RECOVERY FORM */
            <form onSubmit={handleRecovery} className="space-y-4">
              <p className={`text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Ingrese el correo de administrador configurado para recibir sus datos de acceso por email.
              </p>

              {recoveryError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{recoveryError}</span>
                </div>
              )}

              {recoverySuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{recoverySuccess}</span>
                </div>
              )}

              <div>
                <label className={`block text-xs font-semibold mb-1 flex items-center gap-1.5 ${
                  darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  <Mail className="w-3.5 h-3.5" />
                  <span>Correo Configurado</span>
                </label>
                <input
                  type="email"
                  required
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="nombre@email.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors ${
                    darkMode ? 'bg-zinc-950 border-zinc-800 text-white focus:border-zinc-500' : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-zinc-500'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRecoveryMode(false)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold border transition-colors flex items-center gap-1 ${
                    darkMode ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-300 hover:bg-zinc-100'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Volver al Login</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-lg font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="inline-block animate-spin font-mono">...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Correo</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
