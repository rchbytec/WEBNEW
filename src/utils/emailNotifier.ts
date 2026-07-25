import emailjs from '@emailjs/browser';

interface EmailParams {
  toEmail: string;
  subject: string;
  message: string;
}

export const sendAdminEmail = async ({ toEmail, subject, message }: EmailParams): Promise<{ success: boolean; message: string }> => {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: toEmail,
          subject: subject,
          message: message,
          from_name: 'Sistema RCH-BYTEC Admin'
        },
        publicKey
      );
      return {
        success: true,
        message: `Correo enviado exitosamente a ${toEmail} vía EmailJS.`
      };
    } else {
      // Simulation mode when EmailJS API keys are not configured in environment
      console.log('Simulación de envío de correo Admin:', { toEmail, subject, message });
      await new Promise((resolve) => setTimeout(resolve, 800));
      return {
        success: true,
        message: `Las credenciales fueron actualizadas. Se simuló el envío de correo a ${toEmail}.`
      };
    }
  } catch (error: any) {
    console.error('Error al enviar correo de notificación admin:', error);
    return {
      success: false,
      message: 'No se pudo despachar el correo electrónico. Verifique la configuración de EmailJS o la dirección de destino.'
    };
  }
};
