# 🚀 Guía de Despliegue - Backend Vercel

## **📋 Resumen**
- **Repositorio**: `Trytall/backend-vercel`
- **Dominio**: `https://escuelasiade.com.ar`
- **Backend**: Vercel (Node.js/Express)
- **Entry Point**: `api/vercel.js`

## **🔧 Paso 1: Desarrollo Local**

### **1.1 Instalar dependencias**
```bash
npm install
```

### **1.2 Variables de entorno**
Copia `env.example` a `.env` y configura:
```env
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui
WHATSAPP_API_TOKEN=tu_token_aqui
NODE_ENV=development
```

### **1.3 Ejecutar servidor local**
```bash
npm run dev
```

### **1.4 Probar endpoints**
```bash
# Health check
npm run health

# O manualmente:
curl http://localhost:3000/api/health
```

## **🌐 Paso 2: Despliegue en Vercel**

### **2.1 Crear repositorio en GitHub**
```bash
git init
git add .
git commit -m "chore: backend listo para Vercel"
git branch -M main
git remote add origin https://github.com/Trytall/backend-vercel.git
git push -u origin main
```

### **2.2 Conectar a Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. **Import Project** → **GitHub** → **backend-vercel**
3. **Framework Preset**: Node.js
4. **Root Directory**: `./`
5. **Build Command**: (dejar vacío)
6. **Output Directory**: (dejar vacío)
7. **Install Command**: `npm install`

### **2.3 Configurar Variables de Entorno**
En Vercel Dashboard → Project Settings → Environment Variables:

```env
# MercadoPago (Producción)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-194759099657032-080710-a9178f87cbb63114a063e8c046c86698-2239638495
MERCADOPAGO_PUBLIC_KEY=APP_USR-405ba438-ece4-45b9-9ee3-efa2f89681e0

# WhatsApp Business API
WHATSAPP_API_TOKEN=tu_whatsapp_api_token_produccion
WHATSAPP_PHONE_ID=tu_whatsapp_phone_id_produccion
WHATSAPP_BUSINESS_ACCOUNT_ID=tu_whatsapp_business_account_id_produccion

# Servidor
NODE_ENV=production
WEBHOOK_URL=https://backend-vercel.vercel.app/api/webhook

# Seguridad
SESSION_SECRET=tu_session_secret_muy_largo_y_seguro
JWT_SECRET=tu_jwt_secret_muy_largo_y_seguro

# CORS
ALLOWED_ORIGINS=https://escuelasiade.com.ar,https://www.escuelasiade.com.ar
```

### **2.4 Deploy**
Click **Deploy** en Vercel Dashboard

## **⚙️ Paso 3: Configuraciones Adicionales**

### **3.1 Configurar MercadoPago Webhook**
1. Ve a tu cuenta de MercadoPago
2. **Configuración** → **Webhooks**
3. **URL del webhook**: `https://backend-vercel.vercel.app/api/webhook`
4. **Eventos**: `payment.created`, `payment.updated`

### **3.2 Configurar WhatsApp Business API**
1. Obtén credenciales de WhatsApp Business API
2. Configura en Vercel las variables de entorno
3. Prueba notificaciones con un pago de prueba

### **3.3 Dominio Personalizado (Opcional)**
1. En Vercel: **Settings** → **Domains**
2. Agrega: `api.escuelasiade.com.ar`
3. Configura DNS en tu proveedor

## **🧪 Paso 4: Pruebas**

### **4.1 Verificar Backend**
```bash
# Probar health check
curl https://backend-vercel.vercel.app/api/health

# Debería responder:
{
  "status": "OK",
  "timestamp": "2025-08-07T...",
  "mercadopago": true,
  "whatsapp": true
}
```

### **4.2 Probar Create Preference**
```bash
curl -X POST https://backend-vercel.vercel.app/api/create-preference \
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

### **4.3 Verificar CORS**
El backend está configurado para aceptar requests desde:
- `https://escuelasiade.com.ar`
- `https://www.escuelasiade.com.ar`

## **📊 Paso 5: Monitoreo**

### **5.1 Vercel Dashboard**
- **Logs en tiempo real**
- **Métricas de rendimiento**
- **Alertas automáticas**
- **Deployments automáticos**

### **5.2 Health Check**
```bash
# Verificar estado del backend
curl -s https://backend-vercel.vercel.app/api/health | jq
```

## **🔧 Troubleshooting**

### **Error: CORS**
```javascript
// En api/vercel.js, verifica:
app.use(cors({
  origin: ['https://escuelasiade.com.ar', 'https://www.escuelasiade.com.ar'],
  credentials: true
}));
```

### **Error: MercadoPago**
1. Verifica tokens en Vercel
2. Prueba en sandbox primero
3. Revisa logs en Vercel

### **Error: WhatsApp**
1. Verifica credenciales en Vercel
2. Prueba con número de prueba
3. Revisa formato del mensaje

### **Error: Deploy**
1. Verifica `vercel.json`
2. Revisa logs de build
3. Verifica variables de entorno

## **💰 Costos Estimados**

### **Vercel (Backend)**
- **Plan Gratuito**: 100GB/mes, 10 segundos timeout
- **Plan Pro**: $20/mes para más recursos

## **✅ Checklist Final**

- [ ] **Repositorio creado** en GitHub
- [ ] **Backend desplegado** en Vercel
- [ ] **Variables de entorno** configuradas
- [ ] **MercadoPago webhook** configurado
- [ ] **WhatsApp API** configurado
- [ ] **Health check** funcionando
- [ ] **CORS** configurado correctamente
- [ ] **Pruebas completadas** exitosamente

## **🎉 URLs Finales**

- **API Base**: `https://backend-vercel.vercel.app/api`
- **Health Check**: `https://backend-vercel.vercel.app/api/health`
- **Create Preference**: `https://backend-vercel.vercel.app/api/create-preference`
- **Webhook**: `https://backend-vercel.vercel.app/api/webhook`

## **🔗 Integración con Frontend**

En el frontend (Astro), actualiza la URL de la API:

```javascript
// En src/pages/inscripcion/[slug].astro
const API_BASE = import.meta.env.DEV 
  ? 'http://localhost:3000/api'
  : 'https://backend-vercel.vercel.app/api';

const response = await fetch(`${API_BASE}/create-preference`, {
  // ... resto del código
});
```

## **📝 Notas Importantes**

1. **ESM**: El proyecto usa ES Modules (`import/export`)
2. **Entry Point**: `api/vercel.js` es el punto de entrada para Vercel
3. **CORS**: Configurado para `escuelasiade.com.ar`
4. **Rate Limiting**: Implementado para protección
5. **Security Headers**: Helmet.js configurado
6. **Webhooks**: MercadoPago → WhatsApp automático

## **🚀 Comandos Útiles**

```bash
# Desarrollo local
npm run dev

# Health check
npm run health

# Deploy manual (si es necesario)
vercel --prod

# Ver logs
vercel logs
``` 