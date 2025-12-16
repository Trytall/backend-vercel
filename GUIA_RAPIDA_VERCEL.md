# 🚀 Guía Rápida: Subir backend-vercel a Vercel

## Opción 1: Vercel CLI (MÁS RÁPIDO) ⭐

### Paso 1: Instalar Vercel CLI

Abre PowerShell o Terminal en la carpeta del proyecto y ejecuta:

```bash
npm install -g vercel
```

### Paso 2: Ejecutar el script automático

En la carpeta raíz del proyecto (donde está `backend-vercel/`):

```powershell
powershell -ExecutionPolicy Bypass -File deploy-vercel-backend.ps1
```

O manualmente:

```bash
cd backend-vercel
vercel login
vercel
```

**Sigue las instrucciones:**
- ¿Set up and deploy? → **Yes** (presiona Enter)
- ¿Which scope? → Selecciona tu cuenta
- ¿Link to existing project? → **No** (presiona Enter)
- ¿What's your project's name? → Presiona Enter (o escribe `backend-vercel`)
- ¿In which directory is your code located? → **./** (presiona Enter)
- ¿Want to override the settings? → **No** (presiona Enter)

¡Listo! Vercel te dará una URL al finalizar.

---

## Opción 2: Desde GitHub

### Paso 1: Subir a GitHub

1. Ve a la carpeta `backend-vercel`
2. Abre Git Bash o Terminal allí
3. Ejecuta:

```bash
git init
git add .
git commit -m "Backend API para Vercel"

# Crear repositorio en GitHub primero, luego:
git remote add origin https://github.com/TU-USUARIO/backend-vercel.git
git branch -M main
git push -u origin main
```

### Paso 2: Importar en Vercel

1. En la página de Vercel donde estás
2. Haz clic en **"Install"** si aparece (para conectar GitHub)
3. Busca tu repositorio `backend-vercel`
4. Haz clic en **"Import"**

---

## ⚙️ Después del Deploy

### 1. Obtener URL

Vercel te dará una URL como:
- `https://backend-vercel-xxx.vercel.app`

**¡Copia esa URL!**

### 2. Configurar Variables de Entorno

1. Ve a tu proyecto en Vercel Dashboard
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

⚠️ Reemplaza `TU-PROYECTO.vercel.app` con tu URL real de Vercel

4. Haz clic en **"Redeploy"**

### 3. Compartir URL

Una vez tengas la URL de Vercel, compártela conmigo y actualizo el código automáticamente.

---

## ✅ Verificar

Visita: `https://TU-PROYECTO.vercel.app/api/health`

Deberías ver: `{"status":"OK",...}`

