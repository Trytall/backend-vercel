# 📋 Guía Rápida - Opción B (Dashboard de Vercel)

## ✅ Esta carpeta está lista para subir a Vercel

### Archivos importantes:

- `api/vercel.js` - API principal ✅
- `package.json` - Dependencias ✅
- `vercel.json` - Configuración ✅
- `VARIABLES_ENTORNO.txt` - Variables para copiar ✅

---

## 🚀 Cómo Subir (Opción B):

### Paso 1: Subir el proyecto a Vercel

**Método A - Arrastrar y Soltar:**
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra esta carpeta completa `backend-vercel` a Vercel
3. Haz clic en **"Deploy"**

**Método B - Desde GitHub:**
1. Crea un repositorio en GitHub
2. Sube esta carpeta
3. En Vercel: Import Project → Selecciona el repositorio

---

### Paso 2: Agregar Variables de Entorno

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Abre el archivo `VARIABLES_ENTORNO.txt` (está en esta carpeta)
4. **Copia cada línea** y agrégala:
   - Haz clic en **"Add New"**
   - En el campo **Key**, pega solo el nombre (ej: `MERCADOPAGO_ACCESS_TOKEN`)
   - En el campo **Value**, pega solo el valor (ej: `APP_USR-7278900707798742-...`)
   - O simplemente pega la línea completa `MERCADOPAGO_ACCESS_TOKEN=valor` y Vercel la separará
   - Marca **Production** (y Preview si quieres)
   - Guarda
   - Repite para cada línea del archivo

**Variables a agregar:**
```
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

---

### Paso 3: Hacer Redeploy

1. Ve a **Deployments**
2. Último deployment → **"..."** → **"Redeploy"**
3. Espera a que termine

---

### Paso 4: Verificar

Visita: `https://tu-proyecto.vercel.app/api/health`

Deberías ver: `{"status":"OK","mercadopago":true}`

---

## 📝 Archivos de ayuda:

- `VARIABLES_ENTORNO.txt` - Variables para copiar
- `COMO_SUBIR_VARIABLES.md` - Guía detallada
- `README_SUBIDA.md` - Instrucciones completas

