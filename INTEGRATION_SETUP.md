# 🚀 Configuración de Integración MercadoPago + WhatsApp

## 📋 Pasos para Configurar

### 1. Configurar MercadoPago

1. **Crear cuenta en MercadoPago Developers:**
   - Ve a [developers.mercadopago.com](https://developers.mercadopago.com)
   - Crea una cuenta o inicia sesión
   - Ve a "Credenciales" en el panel

2. **Obtener credenciales:**
   - **Access Token:** Copia tu Access Token de producción
   - **Public Key:** Copia tu Public Key
   - **Webhook URL:** Configura `https://tu-dominio.com/api/webhook`

3. **Configurar webhooks:**
   - En el panel de MercadoPago, ve a "Notificaciones"
   - Agrega la URL: `https://tu-dominio.com/api/webhook`
   - Selecciona eventos: `payment`, `preference`

### 2. Configurar WhatsApp Business API

1. **Crear cuenta de WhatsApp Business:**
   - Ve a [business.whatsapp.com](https://business.whatsapp.com)
   - Crea una cuenta de WhatsApp Business API

2. **Obtener credenciales:**
   - **API Token:** Desde el panel de WhatsApp Business
   - **Phone ID:** ID del número de teléfono
   - **Business Account ID:** ID de la cuenta de negocio

3. **Configurar número de teléfono:**
   - Verifica tu número de WhatsApp Business
   - Asegúrate de que esté activo para recibir mensajes

### 3. Configurar Variables de Entorno

1. **Crear archivo `.env`:**
   ```bash
   cp env.example .env
   ```

2. **Editar `.env` con tus credenciales:**
   ```env
   # MercadoPago
   MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   
   # WhatsApp Business API
   WHATSAPP_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   WHATSAPP_PHONE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   WHATSAPP_BUSINESS_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   
   # Webhook
   WEBHOOK_URL=https://tu-dominio.com/api/webhook
   WEBHOOK_SECRET=tu_webhook_secret_aqui
   
   # Server
   PORT=3000
   NODE_ENV=development
   ```

### 4. Ejecutar el Sistema

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   npm run dev:full
   ```

3. **Ejecutar en producción:**
   ```bash
   npm run build
   npm run api
   ```

## 🔧 Estructura de Archivos

```
astro-landing-page/
├── api/
│   └── server.js              # Servidor API principal
├── src/
│   └── components/
│       └── LeadForm.astro     # Formulario modificado
├── .env                       # Variables de entorno
├── env.example               # Ejemplo de variables
└── package.json              # Dependencias y scripts
```

## 📱 Flujo de Funcionamiento

1. **Usuario completa formulario** → Datos se envían a API
2. **API crea preferencia de pago** → MercadoPago genera link
3. **Usuario es redirigido** → A MercadoPago para pagar
4. **Usuario realiza pago** → MercadoPago procesa transacción
5. **Webhook recibe notificación** → API procesa pago exitoso
6. **WhatsApp envía mensaje** → Al alumno con confirmación
7. **Alumno es dado de alta** → En tu plataforma

## 💬 Mensaje de WhatsApp

El sistema enviará automáticamente un mensaje con:

- ✅ Datos del alumno
- 📚 Cursos seleccionados
- 💰 Información del pago
- 📅 Fecha y hora
- 📋 Próximos pasos

## 🛠️ Personalización

### Modificar precios:
Edita en `src/components/LeadForm.astro`:
```javascript
const totalAmount = selectedCourses.length * 15000; // $15,000 por curso
```

### Modificar mensaje de WhatsApp:
Edita en `api/server.js` la función `formatWhatsAppMessage()`

### Agregar más campos:
Modifica el formulario en `src/components/LeadForm.astro`

## 🚨 Troubleshooting

### Error: "MercadoPago not configured"
- Verifica que `MERCADOPAGO_ACCESS_TOKEN` esté configurado
- Asegúrate de usar credenciales de producción

### Error: "WhatsApp not configured"
- Verifica que `WHATSAPP_API_TOKEN` esté configurado
- Confirma que el número esté verificado

### Error: "Webhook not working"
- Verifica que la URL del webhook sea accesible
- Confirma que el puerto 3000 esté disponible

## 📞 Soporte

Para problemas técnicos:
- Revisa los logs del servidor
- Verifica las credenciales
- Confirma la conectividad de red

¡Listo para recibir pagos y notificaciones automáticas! 🎉 