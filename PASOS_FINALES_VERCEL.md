# ✅ Pasos Finales para Completar la Configuración con Vercel

## 📋 Lo que ya tienes listo:
- ✅ `dist/` subido a tu servidor
- ✅ Acceso a cuenta de Vercel
- ✅ Código actualizado para usar Vercel

## 🔧 Lo que falta hacer:

### Paso 1: Obtener URL de tu proyecto en Vercel

1. En Vercel Dashboard, ve a tu proyecto "backend-vercel"
2. Copia la URL (algo como: `https://backend-vercel-xxx.vercel.app`)
3. O si tienes dominio personalizado, usa ese

### Paso 2: Actualizar código con tu URL de Vercel

1. Abre `src/pages/inscripcion/[slug].astro`
2. Busca la línea 260: `const VERCEL_API_URL = 'https://TU-PROYECTO-VERCEL.vercel.app';`
3. Reemplaza `https://TU-PROYECTO-VERCEL.vercel.app` con tu URL real de Vercel
4. Guarda el archivo

### Paso 3: Verificar/Actualizar archivos en Vercel

Asegúrate de que Vercel tenga los archivos actualizados:
- `api/vercel.js` (con webhooks y emails)
- `api/middleware/` (carpeta completa)
- `package.json`
- `vercel.json`

### Paso 4: Configurar Variables de Entorno en Vercel

En Vercel → Tu Proyecto → Settings → Environment Variables:

```env
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=informes@escuelaiade.com
SMTP_PASS=wcbtlramigavmlnm
EMAIL_FROM=informes@escuelaiade.com
EMAIL_NOTIFICACIONES=informes@escuelaiade.com
WEBHOOK_URL=https://TU-PROYECTO-VERCEL.vercel.app
NODE_ENV=production
```

⚠️ **IMPORTANTE:** Después de agregar `WEBHOOK_URL`, haz un **Redeploy** en Vercel.

### Paso 5: Reconstruir y Subir dist/

1. Actualiza la URL de Vercel en el código (Paso 2)
2. Ejecuta: `npm run build`
3. Sube el nuevo `dist/` a tu servidor

### Paso 6: Configurar Webhook en MercadoPago

1. Ve a tu panel de MercadoPago
2. Configuración → Webhooks
3. URL: `https://TU-PROYECTO-VERCEL.vercel.app/api/webhook`
4. Eventos: `payment.created`, `payment.updated`

### Paso 7: Verificar

1. **API Health Check:**
   ```
   https://TU-PROYECTO-VERCEL.vercel.app/api/health
   ```
   Debe responder: `{"status":"OK",...}`

2. **Probar pago:**
   - Completa formulario
   - Realiza pago de prueba ($1)
   - Verifica email de "Pago aprobado"

---

## 🎯 Resumen Rápido

1. ✅ Copia tu URL de Vercel
2. ✅ Actualiza línea 260 en `src/pages/inscripcion/[slug].astro`
3. ✅ Configura variables de entorno en Vercel
4. ✅ Haz redeploy en Vercel
5. ✅ Rebuild: `npm run build`
6. ✅ Sube nuevo `dist/` a tu servidor
7. ✅ Configura webhook en MercadoPago
8. ✅ Prueba un pago

---

## 💡 Pregunta Importante

**¿Cuál es la URL de tu proyecto en Vercel?**

Con esa información puedo ayudarte a actualizar el código directamente.

