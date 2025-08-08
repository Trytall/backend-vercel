// Servidor optimizado para Vercel
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import axios from 'axios';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

const app = express();

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

// CORS Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://escuelasiade.com.ar', 'https://www.escuelasiade.com.ar'] 
    : ['http://localhost:4321', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure MercadoPago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
});

// Store for temporary data (in production, use a database)
const pendingPayments = new Map();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    mercadopago: !!process.env.MERCADOPAGO_ACCESS_TOKEN,
    whatsapp: !!process.env.WHATSAPP_API_TOKEN
  });
});

// Create Payment Preference
app.post('/api/create-preference', paymentLimiter, async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    
    const { 
      nombre, 
      email, 
      telefono, 
      provincia, 
      localidad, 
      modalidad, 
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
        notification_url: `${process.env.WEBHOOK_URL}/webhook`,
        expires: true,
        expiration_date_to: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
      }
    });
    
    // Store payment data temporarily
    const paymentId = result.id;
    pendingPayments.set(paymentId, {
      nombre,
      email,
      telefono,
      provincia,
      localidad,
      modalidad,
      cursos,
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

// Webhook endpoint for MercadoPago
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      const paymentData = pendingPayments.get(paymentId);
      
      if (paymentData) {
        // Get payment details from MercadoPago
        const paymentInfo = await getPaymentInfo(paymentId);
        
        // Send WhatsApp notification
        await sendWhatsAppNotification(paymentData, paymentInfo);
        
        // Remove from pending payments
        pendingPayments.delete(paymentId);
      }
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
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

// Export for Vercel
export default app; 