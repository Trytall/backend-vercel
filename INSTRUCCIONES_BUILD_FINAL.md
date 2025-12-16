# 🔧 Instrucciones para Rebuild y Subir

## ⚠️ Problema Identificado:

El `dist/` que subiste **no tiene los cambios actualizados** con la URL de Vercel. Por eso:
- ❌ Los links de MercadoPago no funcionan
- ❌ Los emails no se envían

## ✅ Solución:

### Paso 1: Hacer Rebuild

Desde la carpeta raíz del proyecto (`astro-landing-page`):

```powershell
npx astro build
```

O si tienes el script:

```powershell
npm run build
```

### Paso 2: Verificar que el build fue exitoso

Deberías ver:
```
✓ Completed
178 page(s) built
```

### Paso 3: Subir el NUEVO dist/

1. Ve a la carpeta: `C:\xampp\htdocs\astro-landing-page\dist\`
2. **Sube TODO el contenido** a tu servidor
3. **Reemplaza TODOS los archivos anteriores**
4. **NO dejes archivos viejos**

### Paso 4: Limpiar Caché del Navegador

1. Presiona **Ctrl + Shift + Delete**
2. Selecciona "Caché" o "Imágenes y archivos en caché"
3. Elimina la caché

O mejor: Prueba en **modo incógnito** (Ctrl + Shift + N)

### Paso 5: Probar

1. Completa el formulario → Deberías recibir email
2. Intenta hacer un pago → Debería abrir MercadoPago

---

## 🔍 Verificación:

### En la consola del navegador (F12):

Cuando envíes el formulario o hagas clic en pagar, deberías ver en la consola:

```
Response status: 200
Preferencia creada: {success: true, preferenceId: "..."}
```

O para el formulario:

```
✅ Respuesta del servidor: {success: true, ...}
```

Si ves errores, compártelos conmigo.

---

## 📋 Checklist:

- [ ] Rebuild ejecutado desde la raíz
- [ ] Nuevo `dist/` subido al servidor
- [ ] Archivos viejos reemplazados
- [ ] Caché del navegador limpiada
- [ ] Prueba en modo incógnito
- [ ] Verificar consola del navegador
- [ ] Probar formulario y pagos



