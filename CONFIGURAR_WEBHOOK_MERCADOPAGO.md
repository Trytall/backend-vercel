# 🔧 Configurar Webhook Global en MercadoPago

## ⚠️ Problema Actual

Cuando usás un **link directo de MercadoPago** (`https://mpago.la/2KJkmce`), MercadoPago **NO sabe a dónde enviar la notificación** porque ese link no tiene asociado un webhook.

## ✅ Solución: Configurar Webhook Global

Necesitás configurar un **webhook global** en tu cuenta de MercadoPago para que escuche **TODOS los pagos**, no solo los de preferencias creadas por la API.

---

## 📋 Pasos para Configurar el Webhook

### **Paso 1: Acceder al Panel de MercadoPago**

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Iniciá sesión con tu cuenta de MercadoPago
3. Seleccioná tu aplicación o creá una nueva si no tenés

### **Paso 2: Configurar Webhook**

**Desde la pantalla que estás viendo:**

1. En la sección **"Notificaciones Webhooks"** (donde dice "Configuración pendiente 0%")
2. Click en el link **"Saber más"** (o en el botón de configuración si aparece)
3. Esto te llevará a la página de configuración de webhooks

**Si no aparece el link "Saber más", seguí estos pasos alternativos:**

1. En el menú lateral izquierdo, buscá **"Webhooks"** o **"Notificaciones"**
2. Si no aparece en el menú, podés acceder directamente a:
   - https://www.mercadopago.com.ar/developers/panel/app/YOUR_APP_ID/webhooks
   - (Reemplazá `YOUR_APP_ID` con el número de aplicación que ves en la pantalla: `72789007077...`)

**En la página de configuración de webhooks:**

1. Click en **"Crear webhook"** o **"Configurar notificaciones"** o **"Agregar URL"**
2. Configurá lo siguiente:

   **URL del Webhook:**
   ```
   https://backend-vercel-silk.vercel.app/api/webhook
   ```
   (Copiá y pegá exactamente esta URL, sin espacios ni barras finales)
   
   **Eventos a escuchar:**
   - ✅ `payment` (todos los eventos de pago) **O**
   - ✅ `payment.created` (cuando se crea un pago)
   - ✅ `payment.updated` (cuando se actualiza un pago - **IMPORTANTE para aprobaciones**)

3. Guardá la configuración (botón "Guardar" o "Crear")

### **Paso 3: Verificar que el Webhook Funciona**

1. Hacé un **pago de prueba** usando el link `https://mpago.la/2KJkmce`
2. Revisá los **logs de Vercel**:
   - Ve a: https://vercel.com/dashboard
   - Seleccioná tu proyecto `backend-vercel-silk`
   - Click en **"Logs"**
   - Buscá mensajes que digan: `Webhook received:` o `Payment approved`

3. Si ves los logs, el webhook está funcionando ✅

---

## 🔍 Verificar Configuración Actual

### **Opción 1: Verificar en MercadoPago Dashboard**

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Seleccioná tu aplicación
3. Ve a **"Webhooks"** o **"Notificaciones"**
4. Verificá que tengas configurado:
   - URL: `https://backend-vercel-silk.vercel.app/api/webhook`
   - Eventos: `payment.created`, `payment.updated`

### **Opción 2: Verificar Logs de Vercel**

1. Ve a: https://vercel.com/dashboard
2. Seleccioná tu proyecto `backend-vercel-silk`
3. Click en **"Logs"**
4. Buscá mensajes recientes que contengan:
   - `Webhook received:`
   - `Payment info:`
   - `Payment approved, sending email notification...`

---

## 🐛 Si el Webhook No Funciona

### **Problema 1: Webhook no configurado**
- **Solución**: Seguí los pasos de arriba para configurarlo

### **Problema 2: URL incorrecta**
- **Verificá** que la URL sea exactamente: `https://backend-vercel-silk.vercel.app/api/webhook`
- **Sin** barra final (`/`) al final

### **Problema 3: Eventos no seleccionados**
- Asegurate de tener seleccionados: `payment.created` y `payment.updated`

### **Problema 4: Backend no responde**
- Verificá que el backend esté desplegado y funcionando:
  ```bash
  curl https://backend-vercel-silk.vercel.app/api/health
  ```
- Debería responder con `{"status":"OK"}`

---

## 📧 Verificar Envío de Emails

Una vez configurado el webhook, cuando hagas un pago:

1. **El webhook debería recibir la notificación** (ver logs de Vercel)
2. **El email debería enviarse** a `informes@escuelaiade.com`

### **Verificar logs de email:**

En los logs de Vercel, buscá mensajes como:
- `📧 Preparando envío de email a: informes@escuelaiade.com`
- `✅ Email notification sent successfully`
- `✅ Message ID: ...`

Si ves errores de SMTP, verificá las variables de entorno en Vercel:
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER=informes@escuelaiade.com`
- `SMTP_PASS=wcbtlramigavmlnm`
- `EMAIL_NOTIFICACIONES=informes@escuelaiade.com`

---

## ✅ Checklist Final

- [ ] Webhook configurado en MercadoPago Dashboard
- [ ] URL correcta: `https://backend-vercel-silk.vercel.app/api/webhook`
- [ ] Eventos seleccionados: `payment.created`, `payment.updated`
- [ ] Backend funcionando (verificado con `/api/health`)
- [ ] Variables SMTP configuradas en Vercel
- [ ] Pago de prueba realizado
- [ ] Logs de Vercel muestran recepción del webhook
- [ ] Email recibido en `informes@escuelaiade.com`

---

## 🆘 Si Aún No Funciona

1. **Revisá los logs de Vercel** para ver qué error específico está ocurriendo
2. **Verificá que el pago esté aprobado** en MercadoPago Dashboard
3. **Contactá soporte de MercadoPago** si el webhook no se está disparando
