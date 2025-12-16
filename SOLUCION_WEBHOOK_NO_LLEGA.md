# 🔧 Solución: Webhook de MercadoPago No Llega

## ✅ Confirmado
- ✅ El sistema de envío de emails funciona (test exitoso)
- ✅ La configuración SMTP está correcta
- ❌ El webhook de MercadoPago NO está llegando al backend

## 🔍 Verificar Qué Está Pasando

### **Paso 1: Revisar Logs de Vercel Después del Pago**

1. Hacé un **pago de prueba de $1** desde la página
2. Inmediatamente después, ve a: https://vercel.com/dashboard
3. Seleccioná tu proyecto `backend-vercel-silk`
4. Click en **"Logs"**
5. Buscá estos mensajes:

**✅ Si el webhook LLEGA, verás:**
```
🔔 ========== WEBHOOK RECIBIDO ==========
🔔 Type: payment
🔔 Payment info: { status: 'approved', ... }
✅ Payment approved, sending email notification...
```

**❌ Si el webhook NO LLEGA:**
- NO verás ningún mensaje que diga "WEBHOOK RECIBIDO"
- Solo verás logs de cuando se crea la preferencia (al hacer clic en el botón de pago)
- Esto confirma que MercadoPago NO está enviando el webhook

### **Paso 2: Verificar notification_url en la Preferencia**

Cuando hacés clic en el botón de pago, en los logs deberías ver:

```
🔗 Creando preferencia de MercadoPago:
🔗 Webhook URL configurado: https://backend-vercel-silk.vercel.app/api/webhook
🔗 WEBHOOK_URL env: https://backend-vercel-silk.vercel.app
```

**Verificá que:**
- El `Webhook URL configurado` sea: `https://backend-vercel-silk.vercel.app/api/webhook`
- Si es diferente o dice "NOT SET", el problema es la variable `WEBHOOK_URL` en Vercel

---

## 🎯 Solución: Configurar Webhook en MercadoPago

El problema es que **MercadoPago no sabe a dónde enviar la notificación** cuando se aprueba un pago.

### **Opción A: Webhook Global (Recomendado)**

Cuando tengas acceso a MercadoPago:

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Seleccioná tu aplicación
3. Ve a **"Webhooks"** o **"Notificaciones"**
4. Click en **"Crear webhook"** o **"Configurar notificaciones"**
5. Configurá:
   - **URL:** `https://backend-vercel-silk.vercel.app/api/webhook`
   - **Eventos:** 
     - ✅ `payment.created` (cuando se crea un pago)
     - ✅ `payment.updated` (cuando se actualiza un pago - **IMPORTANTE para aprobaciones**)
6. Guardá

### **Opción B: Verificar notification_url en Preferencias Existentes**

Si ya tenés pagos aprobados:

1. Ve a tu cuenta de MercadoPago
2. Buscá el pago de $1 que hiciste
3. Verificá los detalles del pago
4. Buscá la "Preferencia" asociada
5. Verificá que el `notification_url` sea: `https://backend-vercel-silk.vercel.app/api/webhook`

---

## 🔧 Verificar Variables en Vercel

1. Ve a: https://vercel.com/dashboard
2. Seleccioná tu proyecto `backend-vercel-silk`
3. Click en **"Settings"** → **"Environment Variables"**
4. Verificá que `WEBHOOK_URL` sea:
   ```
   https://backend-vercel-silk.vercel.app
   ```
   (sin `/api/webhook`, sin barra final)

5. Si está incorrecta, **actualizala** y hacé un **redeploy**

---

## 📋 Checklist de Diagnóstico

Después de hacer un pago, verificá:

- [ ] ¿Aparece "WEBHOOK RECIBIDO" en los logs de Vercel?
  - ✅ SÍ → El webhook está funcionando, el problema es otro
  - ❌ NO → El webhook NO está configurado o no está llegando

- [ ] ¿El `notification_url` en los logs es correcto?
  - ✅ SÍ → `https://backend-vercel-silk.vercel.app/api/webhook`
  - ❌ NO → Actualizar `WEBHOOK_URL` en Vercel

- [ ] ¿El pago está "Aprobado" en MercadoPago?
  - ✅ SÍ → El webhook debería dispararse
  - ❌ NO → Esperar a que se apruebe

---

## 🆘 Si el Webhook Sigue Sin Llegar

### **Problema 1: Webhook no configurado en MercadoPago**
- **Solución**: Configurar webhook global en MercadoPago Dashboard (ver Opción A arriba)

### **Problema 2: WEBHOOK_URL incorrecta en Vercel**
- **Solución**: Actualizar variable en Vercel y redeployar

### **Problema 3: MercadoPago no está enviando webhooks**
- **Solución**: Verificar en MercadoPago Dashboard → "Notificaciones" → Ver historial de webhooks enviados

---

## ✅ Después de Configurar el Webhook

1. Hacé otro pago de prueba de $1
2. Revisá los logs de Vercel
3. Deberías ver: `🔔 WEBHOOK RECIBIDO`
4. Deberías ver: `✅ Email enviado exitosamente`
5. El email debería llegar a `informes@escuelaiade.com`

---

## 📝 Nota Importante

**El webhook global en MercadoPago es necesario** porque:
- Cuando creás una preferencia con `notification_url`, MercadoPago debería enviar el webhook
- Pero si el webhook global NO está configurado, MercadoPago puede no enviarlo
- El webhook global asegura que TODOS los pagos generen notificaciones
