# 📦 Instrucciones de Despliegue - Escuelas IADE

## Archivos a Subir al Servidor

### 1. Carpeta `dist/` (COMPLETA)
**Todo el contenido de la carpeta `dist/` debe subirse a la raíz del servidor web.**

```
dist/
├── index.html
├── cursos/
├── inscripcion/
├── images/
├── css/
├── _astro/
└── ... (todos los archivos y carpetas)
```

### 2. Archivos del API (Servidor Node.js)

**Carpeta `api/`:**
```
api/
├── vercel.js (archivo principal del API)
├── server.js (opcional, si usas este)
└── (cualquier otro archivo necesario)
```

**Archivos raíz:**
```
package.json
.env (configurar según se indica abajo)
```

## ⚙️ Configuración del Servidor

### Paso 1: Subir archivos
1. Sube todo el contenido de `dist/` a la carpeta pública de tu servidor web (ej: `public_html/` o `www/`)
2. Sube los archivos del API a una carpeta accesible para Node.js

### Paso 2: Instalar dependencias Node.js
En el servidor, ejecuta:
```bash
npm install
```

### Paso 3: Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con estas variables:

```env
# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago_aqui

# Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=informes@escuelaiade.com
SMTP_PASS=wcbtlramigavmlnm
EMAIL_FROM=informes@escuelaiade.com
EMAIL_NOTIFICACIONES=informes@escuelaiade.com

# Webhook URL (URL pública de tu servidor)
WEBHOOK_URL=https://escuelasiade.com.ar

# Servidor
PORT=3000
NODE_ENV=production

# CORS (opcional)
ALLOWED_ORIGINS=https://escuelasiade.com.ar,https://www.escuelasiade.com.ar
```

### Paso 4: Iniciar el servidor API
Ejecuta uno de estos comandos según tu configuración:

```bash
# Si usas server.js
node api/server.js

# O si usas vercel.js directamente
node api/vercel.js

# O con PM2 (recomendado para producción)
pm2 start api/server.js --name "iade-api"
```

## ✅ Verificación Post-Despliegue

1. **Verificar API está corriendo:**
   - Accede a: `https://escuelasiade.com.ar/api/health`
   - Debe responder: `{"status":"OK",...}`

2. **Verificar webhook:**
   - El endpoint `/api/webhook` debe ser accesible públicamente
   - MercadoPago debe poder enviar notificaciones a: `https://escuelasiade.com.ar/api/webhook`

3. **Probar un pago:**
   - Realiza un pago de prueba
   - Verifica que recibas el email de "Pago aprobado"

## 📋 Checklist de Archivos

- [ ] Carpeta `dist/` completa subida al servidor web
- [ ] Archivos de `api/` subidos
- [ ] `package.json` subido
- [ ] `.env` configurado con todas las variables
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor API corriendo
- [ ] Webhook accesible públicamente
- [ ] Email de prueba enviado correctamente

## 🔍 Troubleshooting

### Si los webhooks no funcionan:
1. Verifica que `WEBHOOK_URL` esté configurado correctamente
2. Asegúrate de que el servidor API esté corriendo y sea accesible públicamente
3. Verifica los logs del servidor para ver si llegan las notificaciones

### Si los emails no se envían:
1. Verifica las credenciales SMTP en `.env`
2. Asegúrate de que el servidor API esté corriendo
3. Revisa los logs del servidor para errores

### Si los pagos no funcionan:
1. Verifica que `MERCADOPAGO_ACCESS_TOKEN` esté configurado
2. Asegúrate de que el endpoint `/api/create-preference` esté accesible
3. Revisa la consola del navegador para errores

## 📞 Soporte

Si tienes problemas, revisa:
- Logs del servidor Node.js
- Consola del navegador (F12)
- Logs de MercadoPago en su panel

