import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { COMPANY_INFO } from '../data/companyData';
import { ContactFormData, CaptchaChallenge, EmailJSConfig } from '../types';
import { 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare,
  Mail,
  User,
  Phone,
  FileText,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactFormProps {
  emailJsConfig: EmailJSConfig;
  darkMode: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ emailJsConfig, darkMode }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    captchaInput: ''
  });

  const [captcha, setCaptcha] = useState<CaptchaChallenge>({
    num1: 0,
    num2: 0,
    answer: 0,
    code: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Generate dynamic CAPTCHA challenge
  const generateNewCaptcha = () => {
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCaptcha({
      num1: n1,
      num2: n2,
      answer: n1 + n2,
      code
    });
  };

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = 'Ingrese un nombre válido (mínimo 3 caracteres)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Ingrese un correo electrónico válido (ej. usuario@dominio.com)';
    }

    const phoneRegex = /^[0-9+\s-]{8,20}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Ingrese un teléfono válido (entre 8 y 20 dígitos)';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    // CAPTCHA check: either correct math sum or exact code matching
    const captchaNum = parseInt(formData.captchaInput.trim(), 10);
    const isMathCorrect = !isNaN(captchaNum) && captchaNum === captcha.answer;
    const isCodeCorrect = formData.captchaInput.trim().toUpperCase() === captcha.code;

    if (!isMathCorrect && !isCodeCorrect) {
      newErrors.captchaInput = `CAPTCHA incorrecto. Resuelva la suma (${captcha.num1} + ${captcha.num2} = ${captcha.answer}) o escriba el código (${captcha.code})`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const serviceId = emailJsConfig.serviceId || import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = emailJsConfig.templateId || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = emailJsConfig.publicKey || import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            message: formData.message,
            coupon_code: COMPANY_INFO.couponCode,
            to_name: 'RCH-BYTEC Soporte'
          },
          publicKey
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', captchaInput: '' });
      generateNewCaptcha();
    } catch (err: any) {
      console.error('Error al enviar formulario:', err);
      setSubmitError('Ocurrió un error al despachar el mensaje por EmailJS. También puede enviar su consulta directamente por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const constructWhatsAppUrl = () => {
    const text = `Hola RCH-BYTEC,\n\nNombre: ${formData.name || 'Cliente'}\nEmail: ${formData.email || 'N/A'}\nTel: ${formData.phone || 'N/A'}\n\nMensaje: ${formData.message || 'Consulta sobre servicio técnico.'}`;
    return `https://wa.me/${COMPANY_INFO.phoneNeuquenClean}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="contacto" className={`py-20 relative transition-colors duration-300 ${
      darkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`text-xs font-mono font-semibold uppercase tracking-widest block mb-1 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            CONTACTO DIRECTO
          </span>
          <h2 className={`font-sans text-3xl sm:text-4xl font-extrabold ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}>
            Formulario de Consulta Técnica
          </h2>
          <p className={`text-sm sm:text-base mt-2 ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Escríbanos para presupuestos de servicio técnico, energía solar, cámaras o redes. Le responderemos en breve.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className={`rounded-2xl border p-6 sm:p-10 shadow-2xl relative transition-colors ${
            darkMode ? 'border-zinc-800 bg-zinc-900/90' : 'border-zinc-200 bg-white'
          }`}>
            
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-10 flex flex-col items-center gap-4"
                >
                  <div className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-lg ${
                    darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                  }`}>
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  </div>

                  <h3 className={`font-sans font-bold text-2xl ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
                    ¡Mensaje Recibido Correctamente!
                  </h3>

                  <p className={`text-sm max-w-md ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    Gracias por comunicarse con RCH-BYTEC. Un asesor técnico revisará su consulta y se pondrá en contacto a la brevedad.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className={`px-5 py-2.5 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                        darkMode ? 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'
                      }`}
                    >
                      Enviar otra consulta
                    </button>

                    <a
                      href={constructWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-lg font-bold text-xs transition-colors flex items-center gap-2 shadow-md ${
                        darkMode ? 'bg-zinc-100 text-zinc-900 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span>Abrir en WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {submitError && (
                    <div className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
                      darkMode ? 'bg-zinc-950 border-red-500/50 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Field: Nombre */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                      darkMode ? 'text-zinc-300' : 'text-zinc-700'
                    }`}>
                      <User className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                      <span>Nombre completo *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Martín González"
                      className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-zinc-500 focus:outline-none transition-colors ${
                        darkMode 
                          ? 'bg-zinc-950 text-white border-zinc-800 focus:border-zinc-500' 
                          : 'bg-zinc-50 text-zinc-900 border-zinc-300 focus:border-zinc-500'
                      } ${errors.name ? 'border-red-500/80 focus:border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                  </div>

                  {/* Grid 2 cols: Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                        darkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}>
                        <Mail className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span>Correo electrónico *</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ejemplo@correo.com"
                        className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-zinc-500 focus:outline-none transition-colors ${
                          darkMode 
                            ? 'bg-zinc-950 text-white border-zinc-800 focus:border-zinc-500' 
                            : 'bg-zinc-50 text-zinc-900 border-zinc-300 focus:border-zinc-500'
                        } ${errors.email ? 'border-red-500/80 focus:border-red-500' : ''}`}
                      />
                      {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                        darkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}>
                        <Phone className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span>Teléfono / WhatsApp *</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. +54299154631278"
                        className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-zinc-500 focus:outline-none transition-colors ${
                          darkMode 
                            ? 'bg-zinc-950 text-white border-zinc-800 focus:border-zinc-500' 
                            : 'bg-zinc-50 text-zinc-900 border-zinc-300 focus:border-zinc-500'
                        } ${errors.phone ? 'border-red-500/80 focus:border-red-500' : ''}`}
                      />
                      {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Field: Mensaje */}
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                      darkMode ? 'text-zinc-300' : 'text-zinc-700'
                    }`}>
                      <FileText className={`w-3.5 h-3.5 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                      <span>Mensaje o Consulta técnica *</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describa el equipo, falla, modelo de cámara, kit solar o consulta que desea realizar..."
                      className={`w-full px-4 py-3 rounded-lg border text-sm placeholder-zinc-500 focus:outline-none transition-colors ${
                        darkMode 
                          ? 'bg-zinc-950 text-white border-zinc-800 focus:border-zinc-500' 
                          : 'bg-zinc-50 text-zinc-900 border-zinc-300 focus:border-zinc-500'
                      } ${errors.message ? 'border-red-500/80 focus:border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>}
                  </div>

                  {/* CAPTCHA Validation Challenge */}
                  <div className={`p-4 rounded-xl border space-y-3 ${
                    darkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 text-xs font-bold ${
                        darkMode ? 'text-zinc-300' : 'text-zinc-700'
                      }`}>
                        <Lock className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        <span>Validación Anti-Spam CAPTCHA</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={generateNewCaptcha}
                        className={`p-1.5 rounded-md transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${
                          darkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                        }`}
                        title="Generar nuevo código"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Cambiar</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div className={`p-3 rounded-lg border flex items-center justify-between font-mono ${
                        darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-300'
                      }`}>
                        <div>
                          <span className={`text-[10px] block ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Resuelva la suma:</span>
                          <span className={`text-lg font-extrabold ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>{captcha.num1} + {captcha.num2} = ?</span>
                        </div>
                        <div className={`text-right border-l pl-3 ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                          <span className={`text-[10px] block ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>o copie token:</span>
                          <span className={`text-sm font-bold tracking-widest select-all ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{captcha.code}</span>
                        </div>
                      </div>

                      <div>
                        <input
                          type="text"
                          name="captchaInput"
                          value={formData.captchaInput}
                          onChange={handleChange}
                          placeholder="Resultado o Código"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm font-mono placeholder-zinc-500 focus:outline-none transition-colors ${
                            darkMode 
                              ? 'bg-zinc-900 text-white border-zinc-800 focus:border-zinc-500' 
                              : 'bg-white text-zinc-900 border-zinc-300 focus:border-zinc-500'
                          } ${errors.captchaInput ? 'border-red-500/80' : ''}`}
                        />
                      </div>
                    </div>

                    {errors.captchaInput && (
                      <p className="text-red-500 text-[11px] mt-1">{errors.captchaInput}</p>
                    )}
                  </div>

                  {/* Buttons Submit & WhatsApp */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm active:scale-95 disabled:opacity-50 transition-all cursor-pointer shadow-sm ${
                        darkMode 
                          ? 'bg-zinc-100 text-zinc-900 hover:bg-white' 
                          : 'bg-zinc-900 text-white hover:bg-zinc-800'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Despachando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Consulta</span>
                        </>
                      )}
                    </button>

                    <a
                      href={constructWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-xs border transition-all ${
                        darkMode
                          ? 'bg-zinc-800 text-zinc-200 border-zinc-700 hover:bg-zinc-700'
                          : 'bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span>WhatsApp Directo</span>
                    </a>
                  </div>

                </form>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
};
