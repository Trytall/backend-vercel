# ✅ Checklist Final - Configuración Completa

## ✅ Ya Completado:

- [x] API desplegado en Vercel
- [x] Variables de entorno configuradas en Vercel (Production y Preview)
- [x] Código actualizado con URL de Vercel
- [x] Build del frontend ejecutado (nuevo `dist/` generado)

## 📋 Pendiente:

- [ ] **Hacer Redeploy en Vercel** (para aplicar las variables de entorno)
- [ ] **Verificar Health Check** del API
- [ ] **Subir nuevo `dist/`** a tu servidor
- [ ] **Probar el formulario** y verificar que llega el email
- [ ] **Probar un pago** y verificar que llega el email de "Pago aprobado"

---

## 🚀 Pasos Inmediatos:

### 1. Redeploy en Vercel (5 minutos)

1. Ve a tu proyecto en Vercel
2. **Deployments** → Último deployment → **"..."** → **"Redeploy"**
3. Espera a que termine el deploy

### 2. Verificar API (1 minuto)

Visita: `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health`

Deberías ver: `{"status":"OK",...}`

### 3. Subir dist/ (5 minutos)

El `dist/` está en: `C:\xampp\htdocs\astro-landing-page\dist\`

Súbelo a tu servidor y reemplaza los archivos anteriores.

### 4. Probar (5 minutos)

1. Completa el formulario en tu sitio
2. Verifica que recibes el email en `informes@escuelaiade.com`
3. Realiza un pago de prueba
4. Verifica que recibes el email de "Pago aprobado"

---

## 🎯 Si algo no funciona:

1. **No llegan emails del formulario:**
   - Verifica que el redeploy en Vercel se completó
   - Revisa los logs en Vercel (Deployments → Latest → Logs)
   - Verifica que las variables SMTP están correctas

2. **No llegan emails de pagos:**
   - Verifica que el webhook está configurado en MercadoPago
   - Revisa los logs del webhook en Vercel
   - Verifica que `WEBHOOK_URL` apunta a la URL correcta de Vercel

3. **Health check no funciona:**
   - Verifica que el redeploy se completó correctamente
   - Revisa los logs en Vercel para ver errores

---

## 📞 URLs Importantes:

- **API Health:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health`
- **API Form:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/send-form-notification`
- **API Preference:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/create-preference`
- **API Webhook:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/webhook`

