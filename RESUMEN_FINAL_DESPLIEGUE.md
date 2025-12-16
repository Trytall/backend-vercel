# 📦 Resumen Final: Qué Subir al Servidor

## ❌ NO es solo el `dist/`

El contenido de `dist/` es solo la parte del **sitio web estático** (HTML, CSS, JavaScript del frontend).

Para que funcionen los **emails automáticos** y **webhooks**, necesitas también el **servidor API de Node.js**.

---

## ✅ Lo que SÍ necesitas subir:

### 1. Carpeta `dist/` (Sitio Web)
**Destino:** Carpeta pública del servidor web (`public_html`, `www`, etc.)
- Contiene todas las páginas HTML, CSS, imágenes
- El frontend actualizado con el nuevo código

### 2. Archivos del API (Servidor Node.js)
**Destino:** Carpeta donde corre Node.js (diferente a `dist/`)
- `api/vercel.js` o `api/server.js`
- `api/middleware/` (carpeta completa)
- `package.json`

### 3. Archivo `.env` (Configuración)
**Destino:** Misma carpeta que `package.json`
- Variables de entorno (token MercadoPago, email, etc.)
- Usa `env.produccion.txt` como base

---

## 🔄 Cómo Funciona

```
Usuario hace pago
    ↓
Sitio web (dist/) → Llama a /api/create-preference
    ↓
Servidor API (Node.js) → Crea preferencia con webhook
    ↓
MercadoPago procesa pago
    ↓
MercadoPago envía webhook a /api/webhook
    ↓
Servidor API recibe webhook → Envía email automático
```

---

## 📋 Checklist Completo

### Sitio Web (dist/):
- [ ] Subir carpeta `dist/` completa a carpeta pública
- [ ] Verificar que el sitio carga correctamente

### Servidor API:
- [ ] Subir archivos del API a carpeta de Node.js
- [ ] Tener `package.json` en esa carpeta
- [ ] Instalar dependencias: `npm install`
- [ ] Crear/configurar `.env` con todas las variables
- [ ] Servidor API corriendo (`node api/server.js` o PM2)

### Verificación:
- [ ] Sitio web funciona: `https://escuelasiade.com.ar`
- [ ] API funciona: `https://escuelasiade.com.ar/api/health`
- [ ] Webhook accesible: `https://escuelasiade.com.ar/api/webhook`
- [ ] Probar un pago y verificar email recibido

---

## ⚠️ Importante

**Dos ubicaciones diferentes:**

1. **`dist/`** → Servidor web (Apache/Nginx) → Público
2. **API** → Servidor Node.js → Puede estar en otra ubicación

**Ambos deben estar funcionando para que todo funcione correctamente.**

