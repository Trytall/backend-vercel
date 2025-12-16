# 🚀 Cómo Subir backend-vercel a Vercel

## Método 1: Vercel CLI (MÁS RÁPIDO - Recomendado)

### Paso 1: Instalar Vercel CLI

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install -g vercel
```

### Paso 2: Login en Vercel

```powershell
vercel login
```

Esto abrirá el navegador para que te autentiques.

### Paso 3: Subir el proyecto

```powershell
cd backend-vercel
vercel
```

Sigue las instrucciones:
- ¿Set up and deploy? → **Y** (Yes)
- ¿Which scope? → Selecciona tu cuenta
- ¿Link to existing project? → **N** (No, crear nuevo)
- ¿What's your project's name? → `backend-vercel` (o presiona Enter)
- ¿In which directory is your code located? → **./** (Enter, está en la raíz)

### Paso 4: Para producción

```powershell
vercel --prod
```

✅ **¡Listo!** Vercel te dará una URL como `https://backend-vercel-xxx.vercel.app`

---

## Método 2: Desde GitHub (Alternativa)

### Paso 1: Crear repositorio en GitHub

1. Ve a [github.com](https://github.com)
2. Crea un nuevo repositorio llamado `backend-vercel`
3. NO inicialices con README

### Paso 2: Subir código a GitHub

En PowerShell, desde la carpeta `backend-vercel`:

```powershell
git init
git add .
git commit -m "Initial commit - Backend API"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/backend-vercel.git
git push -u origin main
```

### Paso 3: Importar en Vercel

1. En Vercel, en la página donde estás (New Project)
2. En la sección "Import Git Repository"
3. Busca tu repositorio `backend-vercel`
4. Haz clic en **"Import"**

---

## Método 3: Arrastrar y Soltar (Si está disponible)

1. En Vercel, busca la opción de **"Upload"** o **"Drag and drop"**
2. Arrastra la carpeta `backend-vercel` completa
3. Vercel hará el deploy automáticamente

---

## ⚠️ IMPORTANTE: Después del Deploy

1. **Obtén la URL** de Vercel (ej: `https://backend-vercel-xxx.vercel.app`)
2. **Configura variables de entorno** (Settings → Environment Variables)
3. **Haz Redeploy** después de agregar las variables
4. **Comparte la URL** conmigo para actualizar el código del frontend

