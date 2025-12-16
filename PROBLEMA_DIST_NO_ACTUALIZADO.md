# ⚠️ Problema: dist/ No Tiene los Cambios Actualizados

## 🔍 Diagnóstico:

Si los links de MercadoPago no se abren y los emails no funcionan, es muy probable que el `dist/` subido **no tenga los cambios actualizados** con la URL de Vercel.

## ✅ Solución:

### Paso 1: Verificar que el código fuente tiene los cambios

El código fuente (`src/`) ya está actualizado con:
- ✅ URL de Vercel en `LeadForm.astro`
- ✅ URL de Vercel en `inscripcion/[slug].astro`

### Paso 2: Reconstruir el dist/

Debes hacer un **nuevo build** para que los cambios se reflejen en `dist/`:

```powershell
# Desde la carpeta raíz del proyecto
npx astro build
```

O si tienes el script configurado:

```powershell
npm run build
```

### Paso 3: Verificar que el dist/ tiene los cambios

Después del build, verifica que el `dist/` tiene la URL de Vercel:

1. Busca archivos `.js` en `dist/_astro/` que contengan `LeadForm` o `inscripcion`
2. Busca en esos archivos la URL: `backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app`

### Paso 4: Subir el nuevo dist/

1. Sube TODO el contenido del nuevo `dist/` a tu servidor
2. **Asegúrate de reemplazar todos los archivos anteriores**
3. Limpia la caché del navegador (Ctrl+Shift+Delete)

---

## 🔍 Verificación Rápida:

### Antes de subir, verifica en el código fuente:

**Archivo:** `src/components/LeadForm.astro` (línea ~901)
```javascript
const VERCEL_API_URL = 'https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app';
```

**Archivo:** `src/pages/inscripcion/[slug].astro` (línea ~260)
```javascript
const VERCEL_API_URL = 'https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app';
```

Si ambos tienen la URL correcta, entonces necesitas hacer rebuild.

---

## 📋 Pasos Completos:

1. ✅ Verificar código fuente (ya está actualizado)
2. 🔄 **Ejecutar `npx astro build`** (NUEVO BUILD)
3. ✅ Subir nuevo `dist/` al servidor
4. ✅ Limpiar caché del navegador
5. ✅ Probar formulario y pagos



