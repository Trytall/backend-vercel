# 🔍 Diagnóstico: Email de Pago Aprobado No Se Envía

## ⚠️ Problema Actual
El pago de $1 se procesa correctamente, pero **NO se envía el email** a `informes@escuelaiade.com` cuando el pago es aprobado.

## 🔍 Posibles Causas

### 1. Webhook No Configurado en MercadoPago
El webhook de MercadoPago puede no estar configurado o apuntar a una URL incorrecta.

### 2. WEBHOOK_URL Incorrecta en Vercel
La variable `WEBHOOK_URL` en Vercel puede estar apuntando a un proyecto diferente.

### 3. Webhook No Llega al Backend
MercadoPago puede estar intentando enviar el webhook pero no llega al backend.

---

## ✅ Solución Paso a Paso

### **Paso 1: Verificar Variables de Entorno en Vercel**

1. Ve a: https://vercel.com/dashboard
2. Seleccioná tu proyecto `backend-vercel-silk` (o el nombre correcto)
3. Click en **"Settings"** → **"Environment Variables"**
4. Buscá la variable `WEBHOOK_URL`
5. **Verificá que apunte a:**
   ```
   https://backend-vercel-silk.vercel.app
   ```
   (o la URL correcta de tu backend)

6. Si está incorrecta, **actualizala** y hacé un **redeploy**

### **Paso 2: Configurar Webhook en MercadoPago**

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Seleccioná tu aplicación
3. Ve a **"Webhooks"** o **"Notificaciones"**
4. Configurá el webhook con:
   - **URL:** `https://backend-vercel-silk.vercel.app/api/webhook`
   - **Eventos:** `payment.created`, `payment.updated`
5. Guardá

### **Paso 3: Verificar Logs de Vercel**

1. Ve a: https://vercel.com/dashboard
2. Seleccioná tu proyecto
3. Click en **"Logs"**
4. Buscá mensajes que contengan:
   - `Webhook received:`
   - `Payment approved, sending email notification...`
   - `✅ Email notification sent successfully`

### **Paso 4: Verificar que el Pago Esté Aprobado**

1. Ve a tu cuenta de MercadoPago
2. Buscá el pago de $1 que hiciste
3. Verificá que el estado sea **"Aprobado"**
4. Si está "Pendiente", esperá a que se apruebe

---

## 🐛 Si el Webhook No Llega

### Opción A: Verificar URL del Webhook en la Preferencia

Cuando creás una preferencia, MercadoPago guarda el `notification_url`. Verificá que sea correcto:

1. En los logs de Vercel, buscá cuando se crea la preferencia
2. Verificá que el `notification_url` sea: `https://backend-vercel-silk.vercel.app/api/webhook`

### Opción B: Probar el Webhook Manualmente

Podés probar si el endpoint del webhook funciona:

```bash
curl -X POST https://backend-vercel-silk.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"payment","data":{"id":"123456"}}'
```

---

## 📧 Verificar Configuración de Email

Si el webhook SÍ está llegando pero el email no se envía:

1. Verificá las variables SMTP en Vercel:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_USER=informes@escuelaiade.com`
   - `SMTP_PASS=wcbtlramigavmlnm`
   - `EMAIL_NOTIFICACIONES=informes@escuelaiade.com`

2. Revisá los logs de Vercel para errores de SMTP:
   - `❌ Error sending email notification:`
   - `❌ Email configuration not found`

---

## ✅ Checklist de Verificación

- [ ] `WEBHOOK_URL` en Vercel apunta a la URL correcta del backend
- [ ] Webhook configurado en MercadoPago Dashboard
- [ ] URL del webhook en MercadoPago: `https://backend-vercel-silk.vercel.app/api/webhook`
- [ ] Eventos seleccionados: `payment.created`, `payment.updated`
- [ ] Variables SMTP configuradas correctamente en Vercel
- [ ] Pago está en estado "Aprobado" en MercadoPago
- [ ] Logs de Vercel muestran recepción del webhook
- [ ] Logs de Vercel muestran intento de envío de email

---

## 🆘 Si Aún No Funciona

1. **Revisá los logs de Vercel** para ver exactamente qué está pasando
2. **Verificá el estado del pago** en MercadoPago Dashboard
3. **Probar el webhook manualmente** con curl
4. **Verificá que el email no esté en spam** en `informes@escuelaiade.com`
