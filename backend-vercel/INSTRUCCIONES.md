# 🚀 Instrucciones para Desplegar en Vercel

## ✅ Archivos listos

Esta carpeta contiene todos los archivos necesarios para desplegar el API en Vercel.

## 📋 Pasos para Desplegar

### Opción 1: Desde Vercel Dashboard (Más fácil)

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** → **"Project"**
3. **Arrastra esta carpeta completa** (`backend-vercel`) a la ventana de Vercel
4. Vercel detectará automáticamente y hará el deploy

### Opción 2: Desde GitHub

Si ya tienes git configurado aquí:

1. Haz commit y push:
   ```bash
   git add .
   git commit -m "Backend API para Vercel"
   git push
   ```

2. En Vercel:
   - **Add New Project**
   - Conecta con GitHub
   - Selecciona este repositorio
   - Haz clic en **"Deploy"**

### Opción 3: Desde Vercel CLI

```bash
# Instalar Vercel CLI (si no lo tienes)
npm install -g vercel

# En esta carpeta
cd backend-vercel
vercel login
vercel
```

---

## ⚙️ Configurar Variables de Entorno

Después del deploy, en Vercel Dashboard:

1. Ve a tu proyecto
2. **Settings** → **Environment Variables**
3. Agrega estas variables:

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
- Reemplaza `TU-PROYECTO.vercel.app` con la URL real de Vercel
- Después de agregar variables, haz **Redeploy**

---

## 🔍 Obtener URL de Vercel

Después del deploy, Vercel te dará una URL como:
- `https://backend-vercel-xxx.vercel.app`

**Copia esa URL** - la necesitarás para actualizar el código del frontend.

---

## ✅ Verificar que Funciona

Visita: `https://TU-PROYECTO.vercel.app/api/health`

Deberías ver: `{"status":"OK",...}`

