# 🚀 Guía de Despliegue con Vercel (Recomendado)

## ✅ Arquitectura Recomendada

```
┌─────────────────────┐
│   Tu Servidor       │
│   (Apache/Nginx)    │ → Sitio web estático (dist/)
└─────────────────────┘

┌─────────────────────┐
│   Vercel            │ → API Node.js (webhooks + emails)
│   (backend)         │
└─────────────────────┘
```

---

## 📋 Paso 1: Desplegar API en Vercel

### 1.1 Preparar archivos para Vercel

Necesitas subir estos archivos a Vercel:

```
proyecto-vercel/
├── api/
│   └── vercel.js          ← API principal
├── package.json           ← Dependencias
├── vercel.json            ← Configuración Vercel
└── (NO necesitas dist/)
```

### 1.2 Opciones para desplegar

#### Opción A: Desde GitHub (Recomendado)
1. Crea un repositorio en GitHub
2. Sube solo los archivos del API:
   - `api/vercel.js`
   - `api/middleware/` (carpeta completa)
   - `package.json`
   - `vercel.json`
3. En Vercel: Import Project → GitHub
4. Configura variables de entorno

#### Opción B: Desde Vercel CLI
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# En la carpeta del proyecto
vercel

# Para producción
vercel --prod
```

### 1.3 Configurar Variables de Entorno en Vercel

En Vercel Dashboard → Project Settings → Environment Variables:

```env
# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=informes@escuelaiade.com
SMTP_PASS=wcbtlramigavmlnm
EMAIL_FROM=informes@escuelaiade.com
EMAIL_NOTIFICACIONES=informes@escuelaiade.com

# Webhook URL (URL de Vercel después del deploy)
WEBHOOK_URL=https://tu-proyecto.vercel.app

# Otros
NODE_ENV=production
```

---

## 📋 Paso 2: Actualizar Frontend para usar Vercel

### 2.1 Modificar código para usar API de Vercel

El frontend debe llamar a la URL de Vercel en lugar de `/api/create-preference.php`

### 2.2 URL del API de Vercel

Después de desplegar, Vercel te dará una URL como:
- `https://tu-proyecto.vercel.app`

Entonces el API estará en:
- `https://tu-proyecto.vercel.app/api/create-preference`
- `https://tu-proyecto.vercel.app/api/webhook`
- `https://tu-proyecto.vercel.app/api/send-form-notification`

---

## 📋 Paso 3: Subir Sitio Web a tu Servidor

1. **Sube solo la carpeta `dist/`** a tu servidor actual
2. **NO necesitas** archivos del API en tu servidor
3. El sitio web llamará al API de Vercel

---

## 🔄 Flujo Completo

```
Usuario completa formulario
    ↓
dist/ (tu servidor) → Llama a Vercel API
    ↓
Vercel API → Crea preferencia con webhook
    ↓
Usuario paga en MercadoPago
    ↓
MercadoPago → Envía webhook a Vercel
    ↓
Vercel API → Procesa webhook → Envía email automático ✅
```

---

## ✅ Ventajas de usar Vercel

1. ✅ **Webhooks funcionan automáticamente**
2. ✅ **No necesitas mantener servidor Node.js**
3. ✅ **Configuración simple** (solo variables de entorno)
4. ✅ **Escalable** y confiable
5. ✅ **Gratis** para este tipo de proyecto
6. ✅ **Logs integrados** para debugging

---

## 📊 Checklist Final

### Vercel:
- [ ] API desplegado en Vercel
- [ ] Variables de entorno configuradas
- [ ] Webhook URL configurada en variables
- [ ] Health check funciona: `https://tu-proyecto.vercel.app/api/health`

### Tu Servidor:
- [ ] `dist/` subido y funcionando
- [ ] Sitio web carga correctamente
- [ ] Frontend llama a API de Vercel (no a PHP)

### MercadoPago:
- [ ] Webhook configurado apuntando a: `https://tu-proyecto.vercel.app/api/webhook`

---

## 🔍 Verificación

1. **API Vercel:**
   ```bash
   curl https://tu-proyecto.vercel.app/api/health
   ```

2. **Sitio web:**
   - Visita `https://escuelasiade.com.ar`
   - Completa formulario
   - Realiza pago de prueba

3. **Email:**
   - Debe recibir email del formulario ✅
   - Debe recibir email cuando se aprueba el pago ✅

