# 🔧 Solución: Error de CORS

## 🔍 Problema Identificado:

El error muestra:
```
Access to fetch at 'https://backend-vercelnew-...' from origin 'https://escuelasiade.com.ar' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present
```

**Causa:** El API de Vercel no está permitiendo requests desde `https://escuelasiade.com.ar`.

## ✅ Solución Aplicada:

He actualizado el código del API para permitir requests desde tu dominio.

### Archivos Actualizados:

1. ✅ `api/vercel.js` (código fuente)
2. ✅ `backend-vercel/api/vercel.js` (para Vercel)

### Cambios Realizados:

- Agregado `https://escuelasiade.com.ar` a los orígenes permitidos
- Agregado `https://www.escuelasiade.com.ar` también
- Mantenidos los orígenes de desarrollo (localhost)

---

## 📋 Pasos para Aplicar la Solución:

### Paso 1: Subir el código actualizado a Vercel

**Opción A - Desde Vercel CLI:**

```powershell
cd backend-vercel
npx vercel --prod
```

**Opción B - Desde GitHub:**

1. Si tienes GitHub conectado, haz commit y push:
   ```powershell
   cd backend-vercel
   git add api/vercel.js
   git commit -m "Fix CORS: Allow escuelasiade.com.ar"
   git push
   ```
2. Vercel hará deploy automáticamente

**Opción C - Desde Dashboard:**

1. Ve a tu proyecto en Vercel
2. **Deployments** → **"..."** → **"Redeploy"**
3. Pero primero necesitas subir el archivo actualizado

### Paso 2: Verificar que el deploy se completó

1. Ve a **Deployments** en Vercel
2. Espera a que el nuevo deployment termine
3. Debería mostrar "Ready" en verde

### Paso 3: Probar nuevamente

1. Limpia la caché del navegador (Ctrl + Shift + Delete)
2. O prueba en modo incógnito
3. Intenta enviar el formulario o hacer un pago
4. **Debería funcionar ahora** ✅

---

## 🔍 Verificación:

Después del deploy, prueba en la consola del navegador:

```javascript
fetch('https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/health', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' }
})
.then(r => r.json())
.then(data => console.log('✅ Health check OK:', data))
.catch(err => console.error('❌ Error:', err));
```

**Deberías ver:** `✅ Health check OK: {status: "OK", ...}`

---

## ⚠️ Si el problema persiste:

1. **Verifica que el deploy se completó** en Vercel
2. **Espera 1-2 minutos** después del deploy (a veces hay delay)
3. **Limpia la caché** del navegador completamente
4. **Prueba en modo incógnito**

Si aún no funciona, comparte los nuevos errores de la consola.



