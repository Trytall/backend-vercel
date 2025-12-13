# 📋 Cómo Subir Variables de Entorno desde el Dashboard de Vercel

## Opción B: Desde el Dashboard (Manual)

### Método 1: Copiar y Pegar Individualmente

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Abre el archivo `VARIABLES_ENTORNO.txt` que está en esta carpeta
4. Copia cada línea y pégalas una por una:
   - Haz clic en **"Add New"**
   - Pega la línea (ej: `MERCADOPAGO_ACCESS_TOKEN=APP_USR-...`)
   - Vercel detectará automáticamente el nombre y valor
   - Selecciona **Production** (y Preview si quieres)
   - Guarda
   - Repite para cada variable

### Método 2: Usar el archivo .env.production

Si Vercel permite importar desde archivo:

1. Ve a **Settings** → **Environment Variables**
2. Busca la opción **"Import"** o **"Upload"**
3. Selecciona el archivo `.env.production` de esta carpeta
4. Selecciona el entorno (**Production** y **Preview**)
5. Haz clic en **"Import"**

---

## ⚠️ IMPORTANTE:

Después de agregar todas las variables, **DEBES hacer redeploy**:

1. Ve a **Deployments**
2. Haz clic en **"..."** del último deployment
3. Selecciona **"Redeploy"**
4. Espera a que termine

---

## ✅ Verificación:

Después del redeploy, verifica el health check:

`https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health`

Deberías ver:
```json
{
  "status": "OK",
  "mercadopago": true,  ← Debe ser true
  "whatsapp": false
}
```

