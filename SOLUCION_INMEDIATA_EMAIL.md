# 🔧 Solución Inmediata: Por qué no recibes emails

## 🎯 Problema

El formulario intenta llamar a `/api/send-form-notification` en tu servidor, pero ese endpoint **solo existe en Vercel**.

## ✅ Solución: Desplegar API en Vercel

### Paso 1: Preparar archivos

Ejecuta este comando en PowerShell (en la carpeta del proyecto):

```powershell
powershell -ExecutionPolicy Bypass -File preparar-vercel.ps1
```

Esto creará una carpeta `vercel-backend-temp` con los archivos necesarios.

---

### Paso 2: Desplegar en Vercel

**Opción A: Desde Vercel Dashboard (Más fácil)**

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** → **"Project"**
3. Si tienes GitHub:
   - Conecta tu cuenta
   - Crea un repositorio nuevo llamado "backend-vercel"
   - Sube el contenido de `vercel-backend-temp`
   - Haz clic en **"Import"**
4. Si NO tienes GitHub:
   - Descarga [Vercel CLI](https://vercel.com/cli)
   - Ejecuta:
     ```bash
     cd vercel-backend-temp
     vercel login
     vercel
     ```

**Opción B: Arrastrar y soltar (Más rápido)**

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** → **"Project"**
3. **Arrastra la carpeta `vercel-backend-temp`** a la ventana
4. Vercel detectará automáticamente y hará el deploy

---

### Paso 3: Configurar Variables de Entorno

Después del deploy:

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Haz clic en **"Add New"** y agrega estas variables:

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
- Reemplaza `TU-PROYECTO.vercel.app` con la URL real que te dio Vercel
- Después de agregar variables, haz clic en **"Redeploy"**

---

### Paso 4: Obtener URL de Vercel

Después del deploy, Vercel te dará una URL como:
- `https://vercel-backend-temp-xxx.vercel.app`

**Copia esa URL completa.**

---

### Paso 5: Actualizar Código

Una vez que tengas la URL de Vercel, necesito actualizar estos archivos:

1. `src/components/LeadForm.astro` (línea ~901)
2. `src/pages/inscripcion/[slug].astro` (línea ~260)

**O mejor:** Dime la URL de Vercel y yo actualizo el código automáticamente.

---

### Paso 6: Rebuild y Subir

Después de actualizar el código:

1. Ejecuta: `npm run build`
2. Sube el nuevo `dist/` a tu servidor
3. Prueba el formulario nuevamente

---

## 🎯 Resumen

1. ✅ Ejecutar `preparar-vercel.ps1`
2. ✅ Subir `vercel-backend-temp` a Vercel
3. ✅ Configurar variables de entorno
4. ✅ Obtener URL de Vercel
5. ✅ Actualizar código con la URL
6. ✅ Rebuild y subir `dist/`

---

## 💡 ¿Tienes la URL de Vercel?

Una vez que tengas la URL de tu proyecto en Vercel, dímela y actualizo el código automáticamente.

