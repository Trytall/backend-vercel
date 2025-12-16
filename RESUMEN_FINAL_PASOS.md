# ✅ Resumen: Qué hacer AHORA

## 🎯 Problema Actual

No recibes emails porque el formulario intenta llamar a `/api/send-form-notification` en tu servidor, pero ese endpoint **solo existe en Vercel**.

---

## ✅ Lo que YA tienes listo:

1. ✅ Carpeta `vercel-backend/` creada con todos los archivos necesarios
2. ✅ Código actualizado para usar Vercel (pero falta la URL)
3. ✅ `dist/` subido a tu servidor

---

## 📋 Pasos INMEDIATOS (10-15 minutos):

### Paso 1: Subir a Vercel

**Opción A - Desde Vercel Dashboard (MÁS FÁCIL):**

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** → **"Project"**
3. Arrastra la carpeta **`vercel-backend`** completa a la ventana de Vercel
4. Vercel detectará automáticamente y hará el deploy

**Opción B - Desde GitHub:**
1. Crea un repositorio en GitHub llamado "backend-vercel"
2. Sube el contenido de `vercel-backend/`
3. En Vercel: Import Project → Selecciona el repositorio

---

### Paso 2: Configurar Variables de Entorno

Después del deploy, ve a tu proyecto en Vercel:

1. **Settings** → **Environment Variables**
2. Haz clic en **"Add New"** y agrega estas variables:

```env
MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=informes@escuelaiade.com
SMTP_PASS=wcbtlramigavmlnm
EMAIL_FROM=informes@escuelaiade.com
EMAIL_NOTIFICACIONES=informes@escuelaiade.com
WEBHOOK_URL=https://TU-PROYECTO.vercel.app
NODE_ENV=production
```

⚠️ **IMPORTANTE:** 
- Reemplaza `TU-PROYECTO.vercel.app` con la URL real que te dio Vercel (ej: `https://vercel-backend-xxx.vercel.app`)
- Después de agregar todas las variables, haz clic en **"Redeploy"** (o "Redeploy" desde Deployments)

---

### Paso 3: Obtener URL de Vercel

Después del deploy, Vercel te dará una URL como:
- `https://vercel-backend-xxx.vercel.app`
- O algo similar según el nombre del proyecto

**Copia esa URL completa.**

---

### Paso 4: Actualizar Código con la URL

Una vez que tengas la URL de Vercel:

**Opción 1 - Dime la URL:**
- Compárteme la URL de Vercel
- Yo actualizo el código automáticamente

**Opción 2 - Actualizar manualmente:**
1. Abre `src/components/LeadForm.astro`
2. Busca la línea ~901: `const VERCEL_API_URL = 'https://TU-PROYECTO-VERCEL.vercel.app';`
3. Reemplaza con tu URL real

4. Abre `src/pages/inscripcion/[slug].astro`
5. Busca la línea ~260: `const VERCEL_API_URL = 'https://TU-PROYECTO-VERCEL.vercel.app';`
6. Reemplaza con tu URL real

---

### Paso 5: Rebuild y Subir

Después de actualizar el código:

1. Ejecuta: `npm run build`
2. Sube el nuevo `dist/` a tu servidor
3. Prueba el formulario nuevamente
4. ✅ Deberías recibir el email

---

## 🎯 Checklist

- [ ] Carpeta `vercel-backend/` lista ✅
- [ ] Proyecto desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] URL de Vercel obtenida
- [ ] Código actualizado con la URL
- [ ] `npm run build` ejecutado
- [ ] Nuevo `dist/` subido al servidor
- [ ] Formulario probado y email recibido ✅

---

## 💡 ¿Necesitas ayuda?

Si tienes la URL de Vercel, dímela y actualizo el código automáticamente. Si no, puedo guiarte paso a paso para obtenerla.

