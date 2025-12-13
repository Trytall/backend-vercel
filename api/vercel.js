// Servidor optimizado para Vercel
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import nodemailer from 'nodemailer';

// Load environment variables (solo para desarrollo local)
// En Vercel, las variables se inyectan automáticamente en process.env
// NO usar dotenv en Vercel - las variables vienen de las configuraciones del dashboard
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;
if (!isVercel && process.env.NODE_ENV !== 'production') {
  dotenv.config();
} else {
  // En Vercel, loguear qué variables están disponibles para debugging
  console.log('🌐 Running on Vercel - Variables disponibles:', {
    hasMercadoPago: !!process.env.MERCADOPAGO_ACCESS_TOKEN,
    hasSMTP: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    envKeys: Object.keys(process.env).filter(k => 
      k.includes('MERCADOPAGO') || k.includes('SMTP') || k.includes('EMAIL')
    )
  });
}

const app = express();

// Configurar trust proxy para Vercel (necesario para rate limiting)
// DEBE estar ANTES de cualquier middleware que use rate limiting
app.set('trust proxy', true);

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://www.mercadopago.com"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.mercadopago.com"],
      frameSrc: ["https://www.mercadopago.com"]
    }
  }
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// Specific rate limiting for payment endpoints
const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 payment requests per windowMs
  message: 'Too many payment attempts from this IP, please try again later.',
});

// CORS Configuration - Allow specific origins
const allowedOrigins = [
  'https://escuelasiade.com.ar',
  'https://www.escuelasiade.com.ar',
  'http://localhost:4321',
  'http://localhost:3000',
  'http://127.0.0.1:4321',
  'http://127.0.0.1:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for now, but log it
      console.log('⚠️ CORS: Request from unlisted origin:', origin);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS ya maneja OPTIONS automáticamente, no necesitamos app.options explícito

// Configure MercadoPago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

// Store for temporary data (in production, use a database)
const pendingPayments = new Map();

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Backend API de Escuelas IADE',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      debug: '/api/debug',
      createPreference: '/api/create-preference',
      sendFormNotification: '/api/send-form-notification',
      webhook: '/api/webhook'
    }
  });
});

// Debug endpoint - muestra todas las variables de entorno (sin valores sensibles)
app.get('/debug', (req, res) => {
  const envVars = {
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN 
      ? `${process.env.MERCADOPAGO_ACCESS_TOKEN.substring(0, 10)}...` 
      : 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
    SMTP_PORT: process.env.SMTP_PORT || 'NOT SET',
    SMTP_USER: process.env.SMTP_USER || 'NOT SET',
    SMTP_PASS: process.env.SMTP_PASS ? 'SET (hidden)' : 'NOT SET',
    EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
    EMAIL_NOTIFICACIONES: process.env.EMAIL_NOTIFICACIONES || 'NOT SET',
    WEBHOOK_URL: process.env.WEBHOOK_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    // Verificar todas las variables relacionadas
    allEnvKeys: Object.keys(process.env).filter(key => 
      key.includes('MERCADOPAGO') || 
      key.includes('SMTP') || 
      key.includes('EMAIL') ||
      key === 'NODE_ENV' ||
      key === 'WEBHOOK_URL'
    )
  };
  
  console.log('🔍 Debug - Variables de entorno:', envVars);
  
  res.json({
    status: 'Debug Info',
    timestamp: new Date().toISOString(),
    environment: envVars,
    checks: {
      hasMercadoPago: !!process.env.MERCADOPAGO_ACCESS_TOKEN,
      hasSMTP: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      hasEmail: !!(process.env.EMAIL_FROM && process.env.EMAIL_NOTIFICACIONES)
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  // Debug: verificar variables de entorno disponibles
  const hasMercadoPago = !!process.env.MERCADOPAGO_ACCESS_TOKEN;
  const hasWhatsApp = !!process.env.WHATSAPP_API_TOKEN;
  const hasSMTP = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  
  // Obtener TODAS las claves de process.env para debugging
  const allEnvKeys = Object.keys(process.env);
  const relevantEnvKeys = allEnvKeys.filter(key => 
    key.includes('MERCADOPAGO') || 
    key.includes('SMTP') || 
    key.includes('EMAIL') ||
    key === 'NODE_ENV' ||
    key === 'WEBHOOK_URL' ||
    key === 'VERCEL'
  );
  
  // Información de debug para incluir en la respuesta
  const debugInfo = {
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN ? 'SET' : 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
    SMTP_USER: process.env.SMTP_USER ? 'SET' : 'NOT SET',
    SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
    EMAIL_FROM: process.env.EMAIL_FROM || 'NOT SET',
    EMAIL_NOTIFICACIONES: process.env.EMAIL_NOTIFICACIONES || 'NOT SET',
    WEBHOOK_URL: process.env.WEBHOOK_URL || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    VERCEL: process.env.VERCEL || 'NOT SET',
    // Lista de todas las variables de entorno relevantes disponibles
    availableEnvKeys: relevantEnvKeys,
    // Total de variables de entorno (para debugging)
    totalEnvKeys: allEnvKeys.length
  };
  
  // Log para debugging - SIEMPRE loguear en producción para diagnosticar
  console.log('🔍 Health Check Debug:', {
    hasMercadoPago,
    hasSMTP,
    relevantEnvKeys,
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN ? 'SET' : 'NOT SET',
    SMTP_HOST: process.env.SMTP_HOST || 'NOT SET'
  });
  
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mercadopago: hasMercadoPago,
    whatsapp: hasWhatsApp,
    email: hasSMTP,
    nodeEnv: process.env.NODE_ENV || 'not set',
    debug: debugInfo // Incluir información de debug en la respuesta
  });
});

// Create Payment Preference
app.post('/create-preference', paymentLimiter, async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const { 
      nombre, 
      dni,
      email, 
      telefono, 
      provincia, 
      localidad, 
      modalidad, 
      sede,
      cursos, 
      totalAmount,
      plan 
    } = req.body;

    // Validation
    const errors = [];
    
    if (!nombre || nombre.trim().length < 2) {
      errors.push('Nombre debe tener al menos 2 caracteres');
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Email inválido');
    }
    
    if (!telefono || telefono.length < 8) {
      errors.push('Teléfono inválido');
    }
    
    if (!provincia || provincia.trim().length < 2) {
      errors.push('Provincia requerida');
    }
    
    if (!localidad || localidad.trim().length < 2) {
      errors.push('Localidad requerida');
    }
    
    if (!modalidad || !['online', 'presencial'].includes(modalidad.toLowerCase())) {
      errors.push('Modalidad inválida');
    }
    
    if (!cursos || !Array.isArray(cursos) || cursos.length === 0) {
      errors.push('Debe seleccionar al menos un curso');
    }
    
    if (!totalAmount || isNaN(totalAmount) || totalAmount < 1000) {
      errors.push('Monto inválido');
    }
    
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }

    // Create preference
    console.log('Creating MercadoPago preference with data:', {
      title: `Inscripción SIADE - ${cursos.join(', ')}`,
      unit_price: parseFloat(totalAmount),
      payer: { name: nombre, email: email }
    });
    
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: `Inscripción SIADE - ${cursos.join(', ')}`,
            unit_price: parseFloat(totalAmount),
            quantity: 1,
            currency_id: 'ARS'
          }
        ],
        payer: {
          name: nombre,
          email: email
        },
        back_urls: {
          success: `https://escuelasiade.com.ar/success`,
          failure: `https://escuelasiade.com.ar/failure`,
          pending: `https://escuelasiade.com.ar/pending`
        },
        external_reference: `SIADE_${Date.now()}`,
        notification_url: process.env.WEBHOOK_URL 
          ? `${process.env.WEBHOOK_URL}/api/webhook`
          : `https://escuelasiade.com.ar/api/webhook`,
        metadata: {
          nombre: nombre || '',
          dni: dni || '',
          email: email || '',
          telefono: telefono || '',
          provincia: provincia || '',
          localidad: localidad || '',
          modalidad: modalidad || 'online',
          sede: sede || '',
          cursos: Array.isArray(cursos) ? cursos.join(', ') : (cursos || ''),
          plan: plan || 'contado'
        },
        expires: true,
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }
    });
    
    // Store payment data temporarily
    const paymentId = result.id;
    pendingPayments.set(paymentId, {
      nombre,
      dni: dni || '',
      email,
      telefono,
      provincia,
      localidad,
      modalidad,
      sede: sede || '',
      cursos,
      plan: plan || 'contado',
      totalAmount,
      createdAt: new Date()
    });

    res.json({
      success: true,
      preferenceId: paymentId,
      initPoint: result.init_point
    });

  } catch (error) {
    console.error('Error creating preference:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating payment preference'
    });
  }
});

// Endpoint para enviar notificación de formulario completado
app.post('/send-form-notification', async (req, res) => {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('📧 [NUEVA SOLICITUD] Endpoint /api/send-form-notification llamado');
    console.log('📧 Timestamp:', new Date().toISOString());
    console.log('📧 Request body recibido:', JSON.stringify(req.body, null, 2));
    console.log('='.repeat(60) + '\n');
    
    const { nombre, dni, email, telefono, provincia, localidad, modalidad, sede, cursos } = req.body;
    
    // Validación básica
    if (!nombre || !email) {
      console.error('❌ Validación fallida: falta nombre o email');
      return res.status(400).json({ success: false, error: 'Nombre y email son requeridos' });
    }
    
    const formData = {
      nombre: nombre || '',
      dni: dni || '',
      email: email || '',
      telefono: telefono || '',
      provincia: provincia || '',
      localidad: localidad || '',
      modalidad: modalidad || 'No especificado',
      sede: sede || '',
      cursos: Array.isArray(cursos) ? cursos : (cursos ? [cursos] : ['No especificado'])
    };
    
    console.log('📧 Datos del formulario preparados para envío:');
    console.log('   👤 Nombre:', formData.nombre);
    console.log('   📧 Email:', formData.email);
    console.log('   📱 Teléfono:', formData.telefono);
    console.log('   📚 Cursos:', formData.cursos.join(', '));
    console.log('   💻 Modalidad:', formData.modalidad);
    
    // Enviar email de notificación
    console.log('📧 Iniciando envío de email...');
    const emailResult = await sendFormEmailNotification(formData);
    
    if (emailResult) {
      console.log('✅ Email enviado exitosamente a:', emailResult.envelope?.to || 'informes@escuelaiade.com');
      console.log('✅ Message ID:', emailResult.messageId);
      console.log('='.repeat(60) + '\n');
      res.status(200).json({ success: true, message: 'Notificación enviada' });
    } else {
      console.error('❌ Email no se pudo enviar');
      console.log('='.repeat(60) + '\n');
      res.status(500).json({ success: false, error: 'No se pudo enviar el email' });
    }
  } catch (error) {
    console.error('❌ Error sending form notification:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ success: false, error: 'Error al enviar notificación', details: error.message });
  }
});

// Función helper para obtener el transporter de email
function getEmailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Configuración SMTP personalizada
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  } else if (process.env.EMAIL_SERVICE && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Usar servicio de email configurado (Gmail, Outlook, etc.)
    return nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  return null;
}

// Función para enviar email cuando se complete un formulario
async function sendFormEmailNotification(formData) {
  try {
    const emailTo = process.env.EMAIL_NOTIFICACIONES || 'informes@escuelaiade.com';
    console.log('📧 Preparando envío de email a:', emailTo);
    console.log('📧 SMTP_HOST:', process.env.SMTP_HOST);
    console.log('📧 SMTP_USER:', process.env.SMTP_USER);
    console.log('📧 SMTP_PASS está configurada:', !!process.env.SMTP_PASS);
    
    // Configurar transporter de nodemailer
    let transporter = getEmailTransporter();
    if (!transporter) {
      console.error('❌ Email configuration not found. Email not sent.');
      console.error('❌ Form notification that should be sent:', { to: emailTo, data: formData });
      return null;
    }
    
    console.log('✅ Transporter configurado correctamente');
    
    // Contenido del email
    const emailSubject = `📝 Nueva Solicitud de Información - Escuelas IADE`;
    const sedeLabel = formData.sede ? 
      (formData.sede === 'moron' ? 'Morón' : 
       formData.sede === 'lomas' ? 'Lomas de Zamora' : 
       formData.sede === 'avellaneda' ? 'Avellaneda' : formData.sede) : 
      'No especificado';
    
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
          .info-box { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid #2196F3; }
          .label { font-weight: bold; color: #2196F3; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📝 Nueva Solicitud de Información</h1>
          </div>
          <div class="content">
            <p>Se ha completado un nuevo formulario de contacto en el sitio web.</p>
            
            <h2>Datos del Contacto</h2>
            <div class="info-box">
              <p><span class="label">Nombre:</span> ${formData.nombre || 'No especificado'}</p>
              <p><span class="label">DNI:</span> ${formData.dni || 'No especificado'}</p>
              <p><span class="label">Email:</span> ${formData.email || 'No especificado'}</p>
              <p><span class="label">Teléfono:</span> ${formData.telefono || 'No especificado'}</p>
              <p><span class="label">Provincia:</span> ${formData.provincia || 'No especificado'}</p>
              <p><span class="label">Localidad:</span> ${formData.localidad || 'No especificado'}</p>
            </div>
            
            <h2>Interés en Cursos</h2>
            <div class="info-box">
              <p><span class="label">Cursos:</span> ${formData.cursos.join(', ') || 'No especificado'}</p>
              <p><span class="label">Modalidad:</span> ${formData.modalidad || 'No especificado'}</p>
              ${formData.sede ? `<p><span class="label">Sede:</span> ${sedeLabel}</p>` : ''}
            </div>
            
            <div style="background-color: #e3f2fd; padding: 15px; margin-top: 20px; border-left: 4px solid #2196F3;">
              <p><strong>💬 Acción Requerida:</strong></p>
              <p>Contactar al interesado por WhatsApp para brindar más información y proceder con la inscripción.</p>
              <p><strong>WhatsApp:</strong> ${formData.telefono ? `<a href="https://wa.me/${formData.telefono.replace(/\D/g, '')}">${formData.telefono}</a>` : 'No disponible'}</p>
            </div>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático del sistema de Escuelas IADE.</p>
            <p>No responder a este email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const emailText = `
📝 NUEVA SOLICITUD DE INFORMACIÓN - ESCUELAS IADE

Se ha completado un nuevo formulario de contacto en el sitio web.

Datos del Contacto:
- Nombre: ${formData.nombre || 'No especificado'}
- DNI: ${formData.dni || 'No especificado'}
- Email: ${formData.email || 'No especificado'}
- Teléfono: ${formData.telefono || 'No especificado'}
- Provincia: ${formData.provincia || 'No especificado'}
- Localidad: ${formData.localidad || 'No especificado'}

Interés en Cursos:
- Cursos: ${formData.cursos.join(', ') || 'No especificado'}
- Modalidad: ${formData.modalidad || 'No especificado'}
${formData.sede ? `- Sede: ${sedeLabel}` : ''}

💬 ACCIÓN REQUERIDA: Contactar al interesado por WhatsApp para brindar más información y proceder con la inscripción.

---
Este es un mensaje automático del sistema de Escuelas IADE.
No responder a este email.
    `;
    
    // Enviar email
    const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@escuelasiade.com.ar';
    console.log('📧 Enviando email desde:', emailFrom);
    console.log('📧 Asunto:', emailSubject);
    
    const info = await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: emailSubject,
      text: emailText,
      html: emailHtml
    });
    
    console.log('✅ Form email notification sent successfully');
    console.log('✅ Message ID:', info.messageId);
    console.log('✅ Response:', info.response);
    return info;
  } catch (error) {
    console.error('❌ Error sending form email notification:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error command:', error.command);
    console.error('❌ Error response:', error.response);
    console.error('❌ Error responseCode:', error.responseCode);
    console.error('❌ Stack trace:', error.stack);
    return null;
  }
}

// Webhook endpoint for MercadoPago
app.post('/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    console.log('Webhook received:', { type, data });
    
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Get payment details from MercadoPago
      const paymentInfo = await getPaymentInfo(paymentId);
      
      if (!paymentInfo) {
        console.error('Payment info not found for ID:', paymentId);
        return res.status(200).json({ received: true, error: 'Payment info not found' });
      }
      
      console.log('Payment info:', {
        id: paymentInfo.id,
        status: paymentInfo.status,
        transaction_amount: paymentInfo.transaction_amount,
        external_reference: paymentInfo.external_reference,
        preference_id: paymentInfo.preference_id
      });
      
      // Buscar datos del pago usando external_reference o payment ID
      let paymentData = null;
      
      // Intentar buscar por external_reference si existe
      if (paymentInfo.external_reference) {
        // El external_reference puede contener información útil
        for (const [key, value] of pendingPayments.entries()) {
          // Buscar en los datos pendientes
          if (key === paymentId || value.email === paymentInfo.payer?.email) {
            paymentData = value;
            break;
          }
        }
      }
      
      // Si no encontramos los datos en pendingPayments, intentar obtener la preferencia para acceder a metadata
      if (!paymentData && paymentInfo.preference_id) {
        try {
          const preferenceInfo = await getPreferenceInfo(paymentInfo.preference_id);
          if (preferenceInfo && preferenceInfo.metadata) {
            paymentData = {
              nombre: preferenceInfo.metadata.nombre || paymentInfo.payer?.first_name + ' ' + (paymentInfo.payer?.last_name || '') || '',
              email: preferenceInfo.metadata.email || paymentInfo.payer?.email || '',
              telefono: preferenceInfo.metadata.telefono || paymentInfo.payer?.phone?.number || '',
              dni: preferenceInfo.metadata.dni || '',
              provincia: preferenceInfo.metadata.provincia || '',
              localidad: preferenceInfo.metadata.localidad || '',
              modalidad: preferenceInfo.metadata.modalidad || 'online',
              cursos: preferenceInfo.metadata.curso ? [preferenceInfo.metadata.curso] : [paymentInfo.description || 'Curso IADE'],
              sede: preferenceInfo.metadata.sede || '',
              plan: preferenceInfo.metadata.plan || '', // Plan de pago (contado, 3cuotas, 6cuotas)
              totalAmount: paymentInfo.transaction_amount || 0
            };
          }
        } catch (error) {
          console.error('Error getting preference info:', error);
        }
      }
      
      // Si aún no encontramos los datos, buscar en metadata directamente del pago (si existe)
      if (!paymentData && paymentInfo.metadata) {
        paymentData = {
          nombre: paymentInfo.metadata.nombre || paymentInfo.payer?.first_name + ' ' + (paymentInfo.payer?.last_name || '') || '',
          email: paymentInfo.metadata.email || paymentInfo.payer?.email || '',
          telefono: paymentInfo.metadata.telefono || paymentInfo.payer?.phone?.number || '',
          dni: paymentInfo.metadata.dni || '',
          provincia: paymentInfo.metadata.provincia || '',
          localidad: paymentInfo.metadata.localidad || '',
          modalidad: paymentInfo.metadata.modalidad || 'online',
          cursos: paymentInfo.metadata.curso ? [paymentInfo.metadata.curso] : [paymentInfo.description || 'Curso IADE'],
          sede: paymentInfo.metadata.sede || '',
          plan: paymentInfo.metadata.plan || '', // Plan de pago
          totalAmount: paymentInfo.transaction_amount || 0
        };
      }
      
      // Si aún no encontramos los datos, usar los datos del pago de MercadoPago como último recurso
      if (!paymentData && paymentInfo.payer) {
        paymentData = {
          nombre: paymentInfo.payer.first_name + ' ' + (paymentInfo.payer.last_name || ''),
          email: paymentInfo.payer.email || '',
          telefono: paymentInfo.payer.phone?.number || '',
          provincia: '',
          localidad: '',
          modalidad: 'online',
          cursos: [paymentInfo.description || 'Curso IADE'],
          totalAmount: paymentInfo.transaction_amount || 0
        };
      }
      
      // Enviar email según el estado del pago
      if (paymentData) {
        if (paymentInfo.status === 'approved') {
          console.log('Payment approved, sending email notification...');
          await sendPaymentEmailNotification(paymentData, paymentInfo, 'approved');
        } else if (paymentInfo.status === 'rejected' || paymentInfo.status === 'cancelled' || paymentInfo.status === 'refunded') {
          console.log(`Payment ${paymentInfo.status}, sending email notification...`);
          await sendPaymentEmailNotification(paymentData, paymentInfo, paymentInfo.status);
        } else if (paymentInfo.status === 'pending') {
          console.log('Payment pending, sending email notification...');
          await sendPaymentEmailNotification(paymentData, paymentInfo, 'pending');
        }
      }
      
      // Enviar notificación de WhatsApp si hay datos
      if (paymentData) {
        await sendWhatsAppNotification(paymentData, paymentInfo);
      }
      
      // Remover de pending payments si estaba ahí
      if (pendingPayments.has(paymentId)) {
        pendingPayments.delete(paymentId);
      }
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed', message: error.message });
  }
});

// Helper functions
async function getPaymentInfo(paymentId) {
  try {
    const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting payment info:', error);
    return null;
  }
}

async function getPreferenceInfo(preferenceId) {
  try {
    const response = await axios.get(`https://api.mercadopago.com/checkout/preferences/${preferenceId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting preference info:', error);
    return null;
  }
}

async function sendWhatsAppNotification(paymentData, paymentInfo) {
  try {
    const message = formatWhatsAppMessage(paymentData, paymentInfo);
    
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: '5491130112419',
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('WhatsApp notification sent:', response.data);
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
  }
}

function formatWhatsAppMessage(paymentData, paymentInfo) {
  const status = paymentInfo?.status || 'unknown';
  const amount = paymentInfo?.transaction_amount || paymentData.totalAmount;
  
  return `🎓 *NUEVA INSCRIPCIÓN SIADE*

👤 *Estudiante:* ${paymentData.nombre}
📧 *Email:* ${paymentData.email}
📱 *Teléfono:* ${paymentData.telefono}
📍 *Ubicación:* ${paymentData.provincia}, ${paymentData.localidad}
📚 *Cursos:* ${paymentData.cursos.join(', ')}
💻 *Modalidad:* ${paymentData.modalidad}

💰 *Pago:* $${amount} (${status})
🆔 *ID de Pago:* ${paymentInfo?.id || 'N/A'}

✅ *Estado:* ${status === 'approved' ? 'APROBADO' : status.toUpperCase()}

---
*Notificación automática del sistema SIADE*`;
}

// Función para enviar email cuando se apruebe un pago (renombrada para coincidir con las llamadas)
async function sendPaymentEmailNotification(paymentData, paymentInfo, status) {
  try {
    const emailTo = process.env.EMAIL_NOTIFICACIONES || 'informes@escuelaiade.com';
    const paymentStatus = status || paymentInfo?.status || 'unknown';
    const amount = paymentInfo?.transaction_amount || paymentData.totalAmount;
    const paymentId = paymentInfo?.id || 'N/A';
    const paymentDate = paymentInfo?.date_approved || paymentInfo?.date_created || new Date().toISOString();
    
    // Configurar transporter de nodemailer
    let transporter = getEmailTransporter();
    if (!transporter) {
      console.log('⚠️ Email configuration not found. Email not sent.');
      console.log('Payment notification that should be sent:', {
        to: emailTo,
        status: paymentStatus,
        data: { paymentData, paymentInfo }
      });
      return;
    }
    
    // Determinar plan de pago
    let planLabel = '';
    if (paymentData.plan) {
      switch (paymentData.plan) {
        case 'contado':
          planLabel = '1 pago';
          break;
        case '3cuotas':
          planLabel = '3 cuotas';
          break;
        case '6cuotas':
          planLabel = '6 cuotas';
          break;
        default:
          planLabel = paymentData.plan;
      }
    }
    
    // Determinar colores y mensajes según el estado
    let statusLabel, statusColor, statusIcon, statusBg, statusMessage, actionMessage, emailTitle;
    switch (paymentStatus) {
      case 'approved':
        statusLabel = 'APROBADO';
        statusColor = '#28a745';
        statusIcon = '✅';
        statusBg = '#d4edda';
        statusMessage = 'El pago fue procesado exitosamente.';
        actionMessage = 'Por favor, dar de alta al estudiante en la plataforma y enviar las credenciales de acceso.';
        emailTitle = 'Pago aprobado';
        break;
      case 'rejected':
        statusLabel = 'RECHAZADO';
        statusColor = '#dc3545';
        statusIcon = '❌';
        statusBg = '#f8d7da';
        statusMessage = 'El pago fue rechazado.';
        actionMessage = 'Contactar al estudiante para informarle del problema y ofrecer alternativas de pago.';
        emailTitle = 'Pago rechazado';
        break;
      case 'cancelled':
        statusLabel = 'CANCELADO';
        statusColor = '#dc3545';
        statusIcon = '❌';
        statusBg = '#f8d7da';
        statusMessage = 'El pago fue cancelado.';
        actionMessage = 'Contactar al estudiante para informarle del problema y ofrecer alternativas de pago.';
        emailTitle = 'Pago cancelado';
        break;
      case 'refunded':
        statusLabel = 'REEMBOLSADO';
        statusColor = '#dc3545';
        statusIcon = '❌';
        statusBg = '#f8d7da';
        statusMessage = 'El pago fue reembolsado.';
        actionMessage = 'Contactar al estudiante para informarle del problema y ofrecer alternativas de pago.';
        emailTitle = 'Pago reembolsado';
        break;
      case 'pending':
        statusLabel = 'PENDIENTE';
        statusColor = '#ffc107';
        statusIcon = '⏳';
        statusBg = '#fff3cd';
        statusMessage = 'El pago está pendiente de confirmación.';
        actionMessage = 'Aguardar confirmación del pago. No dar de alta hasta que se apruebe.';
        emailTitle = 'Pago pendiente';
        break;
      default:
        statusLabel = paymentStatus.toUpperCase();
        statusColor = '#6c757d';
        statusIcon = '❓';
        statusBg = '#e9ecef';
        statusMessage = `El pago tiene estado: ${paymentStatus}.`;
        actionMessage = 'Revisar manualmente el estado del pago en MercadoPago.';
        emailTitle = `Pago ${statusLabel.toLowerCase()}`;
    }
    
    // Contenido del email
    const emailSubject = `${statusIcon} ${emailTitle} - Nueva Inscripción IADE`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: ${statusColor}; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
          .info-box { background-color: white; padding: 15px; margin: 10px 0; border-left: 4px solid ${statusColor}; }
          .label { font-weight: bold; color: ${statusColor}; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${statusIcon} ${emailTitle} - Nueva Inscripción</h1>
          </div>
          <div class="content">
            <p><strong>${statusMessage}</strong></p>
            
            <h2>Detalles del Pago</h2>
            <div class="info-box">
              <p><span class="label">ID de Pago:</span> ${paymentId}</p>
              <p><span class="label">Monto:</span> $${amount.toLocaleString('es-AR')}</p>
              <p><span class="label">Plan de Pago:</span> ${planLabel || 'No especificado'}</p>
              <p><span class="label">Estado:</span> ${statusLabel}</p>
              <p><span class="label">Fecha:</span> ${new Date(paymentDate).toLocaleString('es-AR')}</p>
            </div>
            
            <h2>Datos del Estudiante</h2>
            <div class="info-box">
              <p><span class="label">Nombre:</span> ${paymentData.nombre || 'No especificado'}</p>
              <p><span class="label">DNI:</span> ${paymentData.dni || 'No especificado'}</p>
              <p><span class="label">Email:</span> ${paymentData.email || 'No especificado'}</p>
              <p><span class="label">Teléfono:</span> ${paymentData.telefono || 'No especificado'}</p>
              <p><span class="label">Provincia:</span> ${paymentData.provincia || 'No especificado'}</p>
              <p><span class="label">Localidad:</span> ${paymentData.localidad || 'No especificado'}</p>
            </div>
            
            <h2>Detalles de la Inscripción</h2>
            <div class="info-box">
              <p><span class="label">Cursos:</span> ${Array.isArray(paymentData.cursos) ? paymentData.cursos.join(', ') : paymentData.cursos || 'No especificado'}</p>
              <p><span class="label">Modalidad:</span> ${paymentData.modalidad || 'No especificado'}</p>
              ${paymentData.sede ? `<p><span class="label">Sede:</span> ${paymentData.sede}</p>` : ''}
            </div>
            
            <div style="background-color: ${statusBg}; padding: 15px; margin-top: 20px; border-left: 4px solid ${statusColor};">
              <p><strong>${statusIcon} Acción Requerida:</strong></p>
              <p>${actionMessage}</p>
              ${paymentData.telefono ? `<p><strong>WhatsApp:</strong> <a href="https://wa.me/${paymentData.telefono.replace(/\D/g, '')}">${paymentData.telefono}</a></p>` : ''}
            </div>
          </div>
          <div class="footer">
            <p>Este es un mensaje automático del sistema de Escuelas IADE.</p>
            <p>No responder a este email.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const emailText = `
${statusIcon} ${emailTitle.toUpperCase()} - NUEVA INSCRIPCIÓN IADE

${statusMessage}

Detalles del Pago:
- ID de Pago: ${paymentId}
- Monto: $${amount.toLocaleString('es-AR')}
- Plan de Pago: ${planLabel || 'No especificado'}
- Estado: ${statusLabel}
- Fecha: ${new Date(paymentDate).toLocaleString('es-AR')}

Datos del Estudiante:
- Nombre: ${paymentData.nombre || 'No especificado'}
- DNI: ${paymentData.dni || 'No especificado'}
- Email: ${paymentData.email || 'No especificado'}
- Teléfono: ${paymentData.telefono || 'No especificado'}
- Provincia: ${paymentData.provincia || 'No especificado'}
- Localidad: ${paymentData.localidad || 'No especificado'}

Detalles de la Inscripción:
- Cursos: ${Array.isArray(paymentData.cursos) ? paymentData.cursos.join(', ') : paymentData.cursos || 'No especificado'}
- Modalidad: ${paymentData.modalidad || 'No especificado'}
${paymentData.sede ? `- Sede: ${paymentData.sede}` : ''}

${statusIcon} ACCIÓN REQUERIDA: ${actionMessage}
${paymentData.telefono ? `WhatsApp: ${paymentData.telefono}` : ''}

---
Este es un mensaje automático del sistema de Escuelas IADE.
No responder a este email.
    `;
    
    // Enviar email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'noreply@escuelasiade.com.ar',
      to: emailTo,
      subject: emailSubject,
      text: emailText,
      html: emailHtml
    });
    
    console.log('✅ Email notification sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email notification:', error);
    // No lanzar error para que el webhook no falle
    return null;
  }
}

// Export for Vercel
export default app; 