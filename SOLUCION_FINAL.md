# ✅ Solución Final: Cómo Funciona tu Servidor

## Situación Actual

Tienes **archivos PHP** en `dist/api/` que funcionan para crear preferencias de pago, pero **NO tienen webhooks**, por lo que no puedes recibir emails automáticos.

## Dos Opciones

### Opción 1: Solo subir `dist/` (Actual - SIN emails automáticos)

**✅ Ventajas:**
- Simple: Solo subes la carpeta `dist/`
- Funciona: Los pagos se procesan correctamente
- No necesitas Node.js corriendo

**❌ Desventajas:**
- **NO recibes emails automáticos** cuando se aprueba/rechaza un pago
- Solo recibes el email cuando se completa el formulario (antes del pago)

**Conclusión:** Los pagos funcionan, pero no recibes notificaciones automáticas de pagos aprobados/rechazados.

---

### Opción 2: Subir `dist/` + Configurar Node.js (Con emails automáticos)

**✅ Ventajas:**
- Recibes emails automáticos cuando:
  - Se aprueba un pago ✅
  - Se rechaza un pago ❌
  - Un pago está pendiente ⏳
- Sistema completo de notificaciones

**❌ Desventajas:**
- Más complejo: Necesitas tener Node.js corriendo
- Necesitas configurar `.env`
- Necesitas mantener el servidor API corriendo

---

## Mi Recomendación

**Para tu situación actual:**

1. **Sube solo el `dist/`** por ahora
2. Los pagos funcionarán perfectamente
3. **NO recibirás emails automáticos** de pagos (solo del formulario)
4. Más adelante, si quieres los emails, configuras Node.js

---

## Si Quieres Emails Automáticos AHORA

Necesitas:
1. Subir `dist/` (sitio web)
2. Subir archivos del API Node.js (`api/vercel.js`, `package.json`, etc.)
3. Configurar `.env` con variables
4. Tener Node.js corriendo en el servidor
5. Modificar el código para que llame a `/api/create-preference` (Node.js) en lugar de `/api/create-preference.php` (PHP)

---

## Resumen

**Pregunta:** ¿Solo subo `dist/` y funciona todo?

**Respuesta:** 
- ✅ **Sí**, los pagos funcionarán
- ❌ **No**, NO recibirás emails automáticos de pagos aprobados/rechazados
- ✅ **Sí**, seguirás recibiendo emails cuando se completa el formulario

**¿Necesitas los emails automáticos de pagos?**
- Si **SÍ** → Necesitas Node.js
- Si **NO** → Solo sube `dist/`

