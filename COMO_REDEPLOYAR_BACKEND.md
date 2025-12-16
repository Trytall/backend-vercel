# 🚀 Cómo Redeployar el Backend en Vercel

## ⚠️ Problema Actual
El backend en producción (`backend-vercel-silk.vercel.app`) todavía tiene la validación antigua que rechaza montos menores a $1000.

## ✅ Solución: Redeployar el Backend

---

## 📋 Opción 1: Redeploy Manual desde Vercel Dashboard (MÁS FÁCIL)

### Paso 1: Acceder a Vercel
1. Ve a: https://vercel.com/dashboard
2. Iniciá sesión con tu cuenta

### Paso 2: Encontrar tu Proyecto
1. Buscá el proyecto llamado **`backend-vercel-silk`** (o el nombre que tenga)
2. Click en el proyecto

### Paso 3: Redeployar
1. Click en la pestaña **"Deployments"** (arriba)
2. Encontrá el **último deployment** (el más reciente)
3. Click en los **3 puntos** (`...`) a la derecha del deployment
4. Seleccioná **"Redeploy"**
5. Confirmá el redeploy

### Paso 4: Esperar
- Esperá 1-2 minutos a que termine el deployment
- Verás un indicador de progreso

### Paso 5: Verificar
1. Una vez terminado, probá hacer un pago de $1 nuevamente
2. Debería funcionar sin el error "Monto inválido"

---

## 📋 Opción 2: Subir Archivos Actualizados Manualmente

Si el proyecto NO está conectado a Git:

### Paso 1: Identificar la Carpeta Correcta
El proyecto usa la carpeta `backend-vercel/` o `vercel-backend/`

### Paso 2: Subir Archivos
1. En Vercel Dashboard → tu proyecto → **"Settings"**
2. Buscá **"Git"** o **"Source"**
3. Si no está conectado a Git:
   - Podés conectar un repositorio de GitHub, o
   - Usar Vercel CLI (ver Opción 3)

---

## 📋 Opción 3: Usar Vercel CLI (Si lo tenés instalado)

### Paso 1: Abrir Terminal
Abrí PowerShell o CMD en la carpeta del proyecto

### Paso 2: Navegar a la Carpeta del Backend
```powershell
cd backend-vercel
# O
cd vercel-backend
```

### Paso 3: Login (si no estás logueado)
```powershell
npx vercel login
```

### Paso 4: Deployar
```powershell
npx vercel --prod
```

### Paso 5: Seguir las Instrucciones
- Vercel te preguntará algunas cosas
- Respondé según corresponda
- Esperá a que termine

---

## 🔍 Verificar que el Cambio Está Activo

Después del redeploy, podés verificar haciendo una prueba rápida:

### Opción A: Desde el Navegador
1. Hacé un pago de prueba desde la página
2. Debería funcionar sin error

### Opción B: Desde la Terminal (PowerShell)
```powershell
curl -X POST https://backend-vercel-silk.vercel.app/api/create-preference `
  -H "Content-Type: application/json" `
  -d '{\"nombre\":\"Test\",\"email\":\"test@test.com\",\"telefono\":\"1234567890\",\"provincia\":\"Buenos Aires\",\"localidad\":\"CABA\",\"modalidad\":\"online\",\"cursos\":[\"Test\"],\"totalAmount\":1}'
```

Si responde con `"success": true`, el cambio está activo ✅

---

## 📝 Archivos que Fueron Actualizados

Los siguientes archivos ya tienen la validación actualizada (mínimo $1):
- ✅ `vercel-backend/api/vercel.js`
- ✅ `backend-vercel/api/vercel.js`
- ✅ `api/vercel.js`
- ✅ `api/middleware/validation.js`
- ✅ `backend-vercel/api/middleware/validation.js`

---

## ⚠️ Importante

**El código local está actualizado, pero el código en Vercel (producción) todavía tiene la versión antigua.**

**Necesitás hacer el redeploy para que los cambios surtan efecto.**

---

## 🆘 Si Aún No Funciona

1. **Verificá los logs de Vercel:**
   - Vercel Dashboard → tu proyecto → "Logs"
   - Buscá errores recientes

2. **Verificá que el deployment haya terminado:**
   - El deployment debe estar en estado "Ready" (verde)

3. **Esperá unos minutos:**
   - A veces hay un pequeño delay en la propagación

4. **Verificá que estés usando el proyecto correcto:**
   - El error viene de `backend-vercel-silk.vercel.app`
   - Asegurate de estar redeployando ese proyecto

---

## ✅ Después del Redeploy

Una vez que el redeploy esté completo:

1. ✅ El pago de $1 debería funcionar
2. ✅ El webhook debería dispararse cuando se apruebe el pago
3. ✅ El email debería enviarse a `informes@escuelaiade.com`
