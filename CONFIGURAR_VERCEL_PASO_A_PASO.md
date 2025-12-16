# 🚀 Configurar Vercel - Paso a Paso

## Paso 1: Verificar qué tienes en Vercel

En la imagen veo que tienes deployments de "backend-vercel". 

**Verifica:**
1. ¿Tienes un proyecto llamado "backend-vercel"?
2. ¿Cuál es la URL de ese proyecto? (algo como `https://backend-vercel-xxx.vercel.app`)

---

## Paso 2: Actualizar el API en Vercel

### 2.1 Subir archivos actualizados

Tienes dos opciones:

#### Opción A: Desde GitHub (Recomendado)
1. Crea un repositorio en GitHub (o usa uno existente)
2. Sube estos archivos:
   - `api/vercel.js` (actualizado con webhooks)
   - `api/middleware/` (carpeta completa)
   - `package.json`
   - `vercel.json`
3. En Vercel: Conecta el repositorio o haz Redeploy

#### Opción B: Vercel CLI
```bash
# En la carpeta del proyecto
vercel --prod
```

### 2.2 Archivos a subir a Vercel

```
proyecto-vercel/
├── api/
│   ├── vercel.js          ← El actualizado con webhooks
│   └── middleware/
│       ├── security-logger.js
│       └── validation.js
├── package.json
└── vercel.json
```

---

## Paso 3: Configurar Variables de Entorno en Vercel

En Vercel Dashboard → Tu Proyecto → Settings → Environment Variables:

**Agregar estas variables:**

```env
# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=informes@escuelaiade.com
SMTP_PASS=wcbtlramigavmlnm
EMAIL_FROM=informes@escuelaiade.com
EMAIL_NOTIFICACIONES=informes@escuelaiade.com

# Webhook URL (IMPORTANTE: Actualiza con tu URL de Vercel)
WEBHOOK_URL=https://tu-proyecto-vercel.vercel.app

# Otros
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Después de agregar `WEBHOOK_URL`, haz un **Redeploy** para que tome efecto.

---

## Paso 4: Actualizar Frontend para usar Vercel

Necesitas modificar el código para que use la URL de Vercel en lugar de PHP.

### 4.1 Obtener URL de Vercel

Después del deploy, Vercel te dará una URL como:
- `https://backend-vercel-xxx.vercel.app`
- O tu dominio personalizado si lo configuraste

### 4.2 Actualizar código del frontend

El código debe llamar a: `https://tu-proyecto-vercel.vercel.app/api/create-preference`

---

## Paso 5: Configurar Webhook en MercadoPago

1. Ve a tu panel de MercadoPago
2. Configuración → Webhooks
3. URL del webhook: `https://tu-proyecto-vercel.vercel.app/api/webhook`
4. Eventos: `payment.created`, `payment.updated`

---

## ✅ Verificación Final

1. **Health Check:**
   ```
   https://tu-proyecto-vercel.vercel.app/api/health
   ```
   Debe responder: `{"status":"OK",...}`

2. **Probar pago:**
   - Completa el formulario
   - Realiza un pago
   - Verifica que recibes email de "Pago aprobado"

---

## 🔍 Si ya tienes un proyecto en Vercel

Si ya tienes "backend-vercel" desplegado:

1. Ve a ese proyecto en Vercel
2. Settings → Environment Variables
3. Verifica/actualiza las variables
4. Deployments → Haz un nuevo deploy con el código actualizado
5. Copia la URL del proyecto

