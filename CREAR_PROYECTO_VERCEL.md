# 🚀 Crear Proyecto Backend en Vercel - Guía Rápida

## Método 1: Desde Vercel Dashboard (Más Fácil)

### Paso 1: Preparar Archivos

Crea una carpeta nueva llamada `vercel-backend` con estos archivos:

```
vercel-backend/
├── api/
│   ├── vercel.js
│   └── middleware/
│       ├── security-logger.js
│       └── validation.js
├── package.json
└── vercel.json
```

### Paso 2: Subir a Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Add New..."** → **"Project"**
3. **Opción A - Desde GitHub:**
   - Conecta tu cuenta de GitHub
   - Crea un repositorio nuevo o usa uno existente
   - Sube los archivos
   - Vercel detectará automáticamente el proyecto
   - Haz clic en **"Deploy"**
   
4. **Opción B - Desde CLI:**
   ```bash
   # Instalar Vercel CLI (si no lo tienes)
   npm install -g vercel
   
   # En la carpeta vercel-backend
   cd vercel-backend
   vercel login
   vercel
   ```

### Paso 3: Configurar Variables de Entorno

Después del deploy, ve a:
**Settings** → **Environment Variables**

Agrega estas variables:

```env
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui
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

**⚠️ IMPORTANTE:** Después de agregar variables, haz un **Redeploy**.

### Paso 4: Obtener URL

Después del deploy, Vercel te dará una URL como:
- `https://vercel-backend-xxx.vercel.app`

**Copia esa URL** - la necesitaremos para actualizar el código.

---

## Método 2: Copiar Archivos desde este Proyecto

Si prefieres, puedo ayudarte a copiar los archivos necesarios a una carpeta nueva.

¿Quieres que lo haga automáticamente?

