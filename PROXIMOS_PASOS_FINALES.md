# ✅ Próximos Pasos Finales

## ✅ Lo que YA está hecho:

1. ✅ URL de Vercel obtenida: `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app`
2. ✅ Código actualizado con la URL de Vercel
3. ✅ API desplegado en Vercel
4. ✅ Variables de entorno configuradas en Vercel (Production y Preview) ✅

## 📋 Lo que falta hacer:

### Paso 1: Hacer Redeploy en Vercel (IMPORTANTE)

Después de agregar las variables de entorno, **debes hacer un redeploy** para que se apliquen:

1. Ve a tu proyecto en Vercel
2. Ve a la sección **"Deployments"**
3. Haz clic en los **"..."** del último deployment
4. Selecciona **"Redeploy"**
5. Asegúrate de que dice **"Production"** o **"Preview"** según corresponda
6. Haz clic en **"Redeploy"**

⚠️ **IMPORTANTE:** Sin redeploy, las variables de entorno no se aplicarán al API.

### Paso 2: Verificar que el API funciona

Después del redeploy, verifica que el API está funcionando:

1. Visita: `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health`
2. Deberías ver una respuesta como: `{"status":"OK",...}`

Si ves un error, revisa los logs en Vercel (Deployments → Latest → "View Function Logs")

### Paso 3: Subir nuevo dist/ a tu servidor

El `dist/` ya está construido con el código actualizado (lo hicimos antes).

1. Sube el contenido del nuevo `dist/` a tu servidor
2. Reemplaza los archivos anteriores

### Paso 4: Verificar que Funciona

1. **Health Check del API:**
   - Visita: `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health`
   - Deberías ver: `{"status":"OK",...}`

2. **Probar el formulario:**
   - Completa el formulario en tu sitio
   - Verifica que recibes el email en `informes@escuelaiade.com`

3. **Probar un pago:**
   - Realiza un pago de prueba
   - Verifica que recibes el email de "Pago aprobado"

### Paso 5: Configurar Webhook en MercadoPago (Opcional pero recomendado)

1. Ve a tu panel de MercadoPago
2. Configuración → Webhooks
3. URL del webhook: `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/webhook`
4. Eventos: `payment.created`, `payment.updated`

---

## 🎯 Resumen de URLs

- **API Health:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health`
- **API Form Notification:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/send-form-notification`
- **API Create Preference:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/create-preference`
- **API Webhook:** `https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/webhook`

---

## ✅ Checklist Final

- [ ] Variables de entorno configuradas en Vercel
- [ ] Redeploy hecho después de agregar variables
- [ ] `npm run build` ejecutado
- [ ] Nuevo `dist/` subido al servidor
- [ ] Health check funciona
- [ ] Formulario envía emails ✅
- [ ] Pagos envían emails ✅

