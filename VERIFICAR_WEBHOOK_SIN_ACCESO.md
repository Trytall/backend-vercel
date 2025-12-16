# 🔍 Verificar Webhook Sin Acceso a MercadoPago

## ✅ Lo que Podés Verificar AHORA (sin acceso a MercadoPago)

### **1. Verificar Variables de Entorno en Vercel**

1. Ve a: https://vercel.com/dashboard
2. Seleccioná tu proyecto `backend-vercel-silk`
3. Click en **"Settings"** → **"Environment Variables"**
4. Buscá la variable `WEBHOOK_URL`
5. **Verificá que sea:**
   ```
   https://backend-vercel-silk.vercel.app
   ```
   (sin `/api/webhook` al final, sin barra final)

6. Si está incorrecta o apunta a otro proyecto, **actualizala**

### **2. Verificar Logs de Vercel Después de un Pago**

1. Hacé un **pago de prueba de $1**
2. Inmediatamente después, ve a: https://vercel.com/dashboard
3. Seleccioná tu proyecto → **"Logs"**
4. Buscá estos mensajes:

**✅ Si el webhook ESTÁ funcionando, verás:**
```
🔔 ========== WEBHOOK RECIBIDO ==========
🔔 Type: payment
🔔 Payment info: { status: 'approved', ... }
✅ Payment approved, sending email notification...
📧 Email destino: informes@escuelaiade.com
✅ Email enviado exitosamente
```

**❌ Si el webhook NO está funcionando:**
- NO verás ningún mensaje que diga "WEBHOOK RECIBIDO"
- Solo verás logs de cuando se crea la preferencia
- Esto significa que MercadoPago NO está enviando el webhook

### **3. Probar el Envío de Email con Endpoint de Prueba (SIN MercadoPago)**

He creado un endpoint especial para probar el envío de email sin necesidad de hacer un pago real:

**Desde PowerShell:**
```powershell
curl -X POST https://backend-vercel-silk.vercel.app/api/test-webhook `
  -H "Content-Type: application/json" `
  -d '{\"nombre\":\"Tomas Marin\",\"email\":\"tomasarielmb@gmail.com\",\"telefono\":\"01158886601\",\"provincia\":\"Buenos Aires\",\"localidad\":\"CABA\",\"modalidad\":\"online\",\"cursos\":[\"Curso de Prueba\"],\"totalAmount\":1}'
```

**O desde el navegador (usando una herramienta como Postman o curl):**
- URL: `https://backend-vercel-silk.vercel.app/api/test-webhook`
- Método: POST
- Headers: `Content-Type: application/json`
- Body (JSON):
```json
{
  "nombre": "Tomas Marin",
  "email": "tomasarielmb@gmail.com",
  "telefono": "01158886601",
  "provincia": "Buenos Aires",
  "localidad": "CABA",
  "modalidad": "online",
  "cursos": ["Curso de Prueba"],
  "totalAmount": 1
}
```

**Esto simulará un pago aprobado y debería enviar el email a `informes@escuelaiade.com`**

**Después de ejecutar el test:**
1. Revisá los logs de Vercel
2. Deberías ver: `✅ Email de prueba enviado exitosamente`
3. Verificá si llegó el email a `informes@escuelaiade.com`

### **4. Verificar Logs al Crear Preferencia**

Cuando hacés un pago, en los logs de Vercel deberías ver:

```
🔗 Creando preferencia de MercadoPago:
🔗 Webhook URL configurado: https://backend-vercel-silk.vercel.app/api/webhook
🔗 WEBHOOK_URL env: https://backend-vercel-silk.vercel.app
```

Esto confirma que la preferencia se está creando con el webhook URL correcto.

---

## 🔧 Qué Hacer Cuando Tengas Acceso a MercadoPago

### **Configurar Webhook Global en MercadoPago**

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Seleccioná tu aplicación
3. Ve a **"Webhooks"** o **"Notificaciones"**
4. Click en **"Crear webhook"** o **"Configurar notificaciones"**
5. Configurá:
   - **URL:** `https://backend-vercel-silk.vercel.app/api/webhook`
   - **Eventos:** 
     - ✅ `payment.created`
     - ✅ `payment.updated`
6. Guardá

---

## 🎯 Diagnóstico Rápido

### **Escenario A: Webhook Llega pero Email No Se Envía**

**Síntomas:**
- ✅ Ves "WEBHOOK RECIBIDO" en logs
- ✅ Ves "Payment approved"
- ❌ NO ves "Email enviado exitosamente"

**Solución:**
- Verificar variables SMTP en Vercel
- Revisar logs de errores de SMTP

### **Escenario B: Webhook NO Llega**

**Síntomas:**
- ❌ NO ves "WEBHOOK RECIBIDO" en logs
- ✅ Solo ves logs de creación de preferencia

**Solución:**
- Configurar webhook en MercadoPago (cuando tengas acceso)
- Verificar que `WEBHOOK_URL` en Vercel sea correcta

### **Escenario C: Todo Funciona pero Email No Llega**

**Síntomas:**
- ✅ Ves "WEBHOOK RECIBIDO"
- ✅ Ves "Email enviado exitosamente"
- ❌ Email no llega a la bandeja de entrada

**Solución:**
- Verificar carpeta de spam
- Verificar que el email destino sea correcto
- Verificar logs de SMTP para errores de autenticación

---

## 📋 Checklist Mientras Esperás Acceso a MercadoPago

- [ ] Verificar `WEBHOOK_URL` en Vercel (debe ser `https://backend-vercel-silk.vercel.app`)
- [ ] Hacer pago de prueba de $1
- [ ] Revisar logs de Vercel inmediatamente después
- [ ] Verificar si aparece "WEBHOOK RECIBIDO" en logs
- [ ] Verificar si aparece "Email enviado exitosamente" en logs
- [ ] Probar endpoint del webhook manualmente con curl
- [ ] Verificar variables SMTP en Vercel

---

## 🆘 Si Necesitás Ayuda Inmediata

Compartí conmigo:
1. **Screenshot de los logs de Vercel** después de hacer un pago
2. **Valor de `WEBHOOK_URL`** en Vercel (Settings → Environment Variables)
3. **Qué mensajes ves** en los logs (especialmente si aparece "WEBHOOK RECIBIDO")

Con esa información puedo decirte exactamente qué está pasando y qué falta configurar.
