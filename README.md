# 🚀 Backend SIADE - Vercel

Backend Node.js/Express optimizado para desplegar en Vercel con integración de MercadoPago y WhatsApp Business API.

## **📋 Información del Proyecto**

- **Repositorio**: `Trytall/backend-vercel`
- **Dominio**: `https://escuelasiade.com.ar`
- **Backend**: Vercel (Node.js/Express)
- **Entry Point**: `api/vercel.js`

## **🔧 Configuración Actual**

### **Dependencias Instaladas**
- ✅ `express` - Framework web
- ✅ `cors` - Cross-origin resource sharing
- ✅ `express-rate-limit` - Rate limiting
- ✅ `helmet` - Security headers
- ✅ `mercadopago` - MercadoPago SDK
- ✅ `axios` - HTTP client
- ✅ `dotenv` - Environment variables

### **Archivos Configurados**
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `api/vercel.js` - Servidor principal (ESM)
- ✅ `api/server.js` - Servidor local para desarrollo
- ✅ `package.json` - Scripts y dependencias
- ✅ `.gitignore` - Archivos a ignorar
- ✅ `env.example` - Variables de entorno de ejemplo
- ✅ `health-check.js` - Script de health check
- ✅ `DEPLOYMENT_GUIDE.md` - Guía completa de despliegue

### **Scripts Disponibles**
```bash
npm run dev      # Servidor local (puerto 3000)
npm run start    # Servidor de producción
npm run health   # Health check del API
```

## **🌐 Endpoints Disponibles**

### **Health Check**
```
GET /api/health
```
**Respuesta:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-08T01:38:48.733Z",
  "mercadopago": true,
  "whatsapp": true
}
```

### **Create Payment Preference**
```
POST /api/create-preference
```
**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "1234567890",
  "provincia": "Buenos Aires",
  "localidad": "CABA",
  "modalidad": "online",
  "cursos": ["Curso de Electricidad"],
  "totalAmount": 150000
}
```

### **Webhook MercadoPago**
```
POST /api/webhook
```

## **🔒 Seguridad Implementada**

- ✅ **Rate Limiting**: 100 requests/15min general, 10 requests/15min para pagos
- ✅ **CORS**: Configurado para `escuelasiade.com.ar`
- ✅ **Helmet.js**: Security headers automáticos
- ✅ **Validación**: Datos de entrada validados
- ✅ **Sanitización**: Input sanitization

## **💳 Integración MercadoPago**

- ✅ **Create Preference**: Crear preferencias de pago
- ✅ **Webhook**: Recibir notificaciones de pago
- ✅ **Payment Info**: Obtener detalles del pago
- ✅ **Back URLs**: Redirección después del pago

## **📱 Integración WhatsApp**

- ✅ **Notificaciones automáticas** al completar pago
- ✅ **Formato de mensaje** personalizado
- ✅ **Datos del estudiante** incluidos
- ✅ **Estado del pago** en tiempo real

## **🚀 Próximos Pasos**

### **1. Crear Repositorio en GitHub**
```bash
git init
git add .
git commit -m "chore: backend listo para Vercel"
git branch -M main
git remote add origin https://github.com/Trytall/backend-vercel.git
git push -u origin main
```

### **2. Desplegar en Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. **Import Project** → **GitHub** → **backend-vercel**
3. Configura variables de entorno
4. Click **Deploy**

### **3. Configurar Variables de Entorno**
```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-194759099657032-080710-a9178f87cbb63114a063e8c046c86698-2239638495
WHATSAPP_API_TOKEN=tu_whatsapp_api_token
NODE_ENV=production
WEBHOOK_URL=https://backend-vercel.vercel.app/api/webhook
```

### **4. Configurar Webhook MercadoPago**
- **URL**: `https://backend-vercel.vercel.app/api/webhook`
- **Eventos**: `payment.created`, `payment.updated`

## **🧪 Pruebas Locales**

### **Health Check**
```bash
npm run health
```

### **Servidor Local**
```bash
npm run dev
```

### **Probar Create Preference**
```bash
curl -X POST http://localhost:3000/api/create-preference \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "email": "test@example.com",
    "telefono": "1234567890",
    "provincia": "Buenos Aires",
    "localidad": "CABA",
    "modalidad": "online",
    "cursos": ["Curso Test"],
    "totalAmount": 150000
  }'
```

## **📊 URLs Finales**

- **API Base**: `https://backend-vercel.vercel.app/api`
- **Health Check**: `https://backend-vercel.vercel.app/api/health`
- **Create Preference**: `https://backend-vercel.vercel.app/api/create-preference`
- **Webhook**: `https://backend-vercel.vercel.app/api/webhook`

## **🔗 Integración con Frontend**

En el frontend (Astro), actualiza la URL de la API:

```javascript
const API_BASE = import.meta.env.DEV 
  ? 'http://localhost:3000/api'
  : 'https://backend-vercel.vercel.app/api';

const response = await fetch(`${API_BASE}/create-preference`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(paymentData)
});
```

## **📝 Notas Técnicas**

- **ESM**: El proyecto usa ES Modules (`import/export`)
- **Entry Point**: `api/vercel.js` es el punto de entrada para Vercel
- **CORS**: Configurado para `escuelasiade.com.ar`
- **Rate Limiting**: Implementado para protección
- **Security Headers**: Helmet.js configurado
- **Webhooks**: MercadoPago → WhatsApp automático

## **✅ Estado Actual**

- ✅ **Dependencias instaladas**
- ✅ **Archivos configurados**
- ✅ **Servidor local funcionando**
- ✅ **Health check funcionando**
- ✅ **CORS configurado**
- ✅ **Rate limiting activo**
- ✅ **Security headers activos**
- ✅ **MercadoPago integrado**
- ✅ **WhatsApp integrado**

**🎉 ¡Backend listo para desplegar en Vercel!** 