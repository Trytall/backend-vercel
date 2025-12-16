# 🚀 Cómo Subir Variables de Entorno a Vercel de una Vez

## Método 1: Vercel CLI (MÁS RÁPIDO - Recomendado)

### Paso 1: Instalar Vercel CLI (si no lo tienes)

```powershell
npm install -g vercel
```

### Paso 2: Login (si no estás logueado)

```powershell
npx vercel login
```

### Paso 3: Subir variables desde archivo .env

Desde la carpeta `backend-vercel`:

```powershell
cd backend-vercel
npx vercel env pull .env.production
```

Esto descargará las variables actuales (si las hay).

### Paso 4: Agregar todas las variables de una vez

Crea un archivo `.env.production` en la carpeta `backend-vercel` con este contenido:

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-7278900707798742-110117-84d48eff52400bed16c532ee0d698c89-2085180642
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=informes@escuelaiade.com
SMTP_PASS=wcbtlramigavmlnm
EMAIL_FROM=informes@escuelaiade.com
EMAIL_NOTIFICACIONES=informes@escuelaiade.com
WEBHOOK_URL=https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app
NODE_ENV=production
```

### Paso 5: Subir todas las variables

```powershell
npx vercel env push .env.production production
```

Esto subirá todas las variables de una vez para el entorno de **Production**.

Para **Preview** también:

```powershell
npx vercel env push .env.production preview
```

---

## Método 2: Desde el Dashboard de Vercel (Manual pero Visual)

### Opción A: Importar desde archivo

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Busca la opción **"Import"** o **"Bulk Import"** (si está disponible)
4. Selecciona el archivo `.env` o `.env.production`
5. Selecciona el entorno (Production/Preview)
6. Haz clic en **"Import"**

### Opción B: Copiar y pegar múltiples

1. Ve a **Settings** → **Environment Variables**
2. Haz clic en **"Add New"**
3. En el campo de valor, pega todas las variables en formato:
   ```
   MERCADOPAGO_ACCESS_TOKEN=valor1
   SMTP_HOST=valor2
   ...
   ```
4. Vercel las separará automáticamente

---

## Método 3: Script Automático (Más Avanzado)

Puedo crear un script que suba todas las variables automáticamente usando la API de Vercel.

---

## ✅ Recomendación

**Usa el Método 1 (Vercel CLI)** - Es el más rápido y confiable.

---

## 📋 Pasos Rápidos (Método 1):

```powershell
# 1. Ir a la carpeta backend-vercel
cd backend-vercel

# 2. Crear archivo .env.production (o copiar vercel-env.txt)
# (Ya creé vercel-env.txt para ti)

# 3. Subir todas las variables
npx vercel env push vercel-env.txt production
npx vercel env push vercel-env.txt preview
```

---

## ⚠️ IMPORTANTE:

Después de subir las variables, **DEBES hacer redeploy**:

```powershell
npx vercel --prod
```

O desde el Dashboard: **Deployments** → **"..."** → **"Redeploy"**

