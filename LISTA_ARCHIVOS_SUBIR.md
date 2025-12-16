# 📋 Lista de Archivos a Subir al Servidor

## ✅ Carpeta `dist/` (COMPLETA)
**Todo el contenido debe subirse a la carpeta pública del servidor web**

- **Total:** 256 archivos
- **Tamaño aproximado:** ~15.18 MB
- **Destino:** `public_html/` o `www/` (según tu servidor)

### Estructura principal:
```
dist/
├── index.html
├── cursos/
├── inscripcion/
├── images/
├── css/
├── _astro/
├── api/
├── conocenos/
├── faq/
├── terminos/
├── politica-privacidad/
├── pago-exitoso/
├── pago-fallido/
├── pago-pendiente/
├── robots.txt
└── sitemap*.xml
```

---

## ✅ Archivos del API (Servidor Node.js)

### Carpeta `api/`:
```
api/
├── vercel.js                    ← Archivo principal
├── server.js                    ← Archivo de servidor
└── middleware/
    ├── security-logger.js
    └── validation.js
```

### Archivos raíz:
```
package.json                     ← Dependencias Node.js
```

**Destino:** Carpeta accesible para Node.js en el servidor

---

## ✅ Archivo de Configuración

### Archivo `.env`:
Crea este archivo en el servidor basándote en `env.produccion.txt`

**Variables a configurar:**
- `MERCADOPAGO_ACCESS_TOKEN` - Tu token de MercadoPago
- `SMTP_*` - Configuración de email (ya incluida)
- `WEBHOOK_URL` - URL pública de tu servidor
- `PORT` - Puerto del servidor (default: 3000)

---

## 📝 Pasos de Instalación en el Servidor

### 1. Subir archivos
```bash
# Sube la carpeta dist/ completa a la carpeta pública del servidor
# Sube los archivos del API a donde correrás Node.js
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
# Copia env.produccion.txt como .env
cp env.produccion.txt .env

# Edita .env y completa MERCADOPAGO_ACCESS_TOKEN
nano .env  # o usa tu editor favorito
```

### 4. Iniciar servidor API
```bash
# Opción 1: Directo
node api/server.js

# Opción 2: Con PM2 (recomendado para producción)
pm2 start api/server.js --name "iade-api"
pm2 save
pm2 startup
```

---

## ✅ Checklist Pre-Despliegue

- [ ] Carpeta `dist/` lista (256 archivos)
- [ ] Archivos del API listos (`api/vercel.js`, `api/server.js`, `api/middleware/`)
- [ ] `package.json` incluido
- [ ] `env.produccion.txt` como referencia para crear `.env`
- [ ] Instrucciones de despliegue leídas (`INSTRUCCIONES_DESPLIEGUE.md`)

---

## 🔍 Post-Despliegue: Verificaciones

1. **API funcionando:**
   ```
   https://escuelasiade.com.ar/api/health
   ```
   Debe responder: `{"status":"OK",...}`

2. **Webhook accesible:**
   ```
   https://escuelasiade.com.ar/api/webhook
   ```
   MercadoPago debe poder acceder a este endpoint

3. **Sitio web funcionando:**
   ```
   https://escuelasiade.com.ar
   ```
   Debe cargar correctamente

4. **Prueba de pago:**
   - Realiza un pago de prueba
   - Verifica que recibas email de "Pago aprobado"

---

## 📞 Archivos de Referencia Creados

1. `INSTRUCCIONES_DESPLIEGUE.md` - Guía completa de despliegue
2. `ARCHIVOS_A_SUBIR.txt` - Lista rápida
3. `LISTA_ARCHIVOS_SUBIR.md` - Este archivo
4. `env.produccion.txt` - Template para crear `.env`

