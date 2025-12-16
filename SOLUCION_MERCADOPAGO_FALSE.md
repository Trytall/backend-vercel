# ⚠️ Problema: `mercadopago: false` en Health Check

## 🔍 Diagnóstico

El health check muestra `"mercadopago": false`, lo que significa que la variable `MERCADOPAGO_ACCESS_TOKEN` no se está cargando correctamente.

## ✅ Soluciones:

### Opción 1: Verificar Variables en Vercel

1. Ve a tu proyecto en Vercel
2. **Settings** → **Environment Variables**
3. Verifica que:
   - `MERCADOPAGO_ACCESS_TOKEN` esté configurada
   - Esté marcada para **Production** (y Preview si quieres)
   - El valor sea correcto: `APP_USR-7278900707798742-110117-84d48eff52400bed16c532ee0d698c89-2085180642`

### Opción 2: Hacer Redeploy Manual

Después de verificar/actualizar las variables:

1. Ve a **Deployments**
2. Haz clic en **"..."** del último deployment
3. Selecciona **"Redeploy"**
4. Espera a que termine

### Opción 3: Verificar Logs

1. Ve a **Deployments**
2. Haz clic en el último deployment
3. Ve a **"View Function Logs"** o **"Logs"**
4. Busca errores relacionados con variables de entorno

---

## 🔧 Si el problema persiste:

Puede que las variables estén configuradas pero no se estén leyendo. En ese caso:

1. **Elimina todas las variables** en Vercel
2. **Agrégalas nuevamente** una por una
3. Asegúrate de que el **Environment** sea **Production** (o All)
4. **Haz Redeploy**

---

## ✅ Verificación Final:

Después del redeploy, el health check debería mostrar:

```json
{
  "status": "OK",
  "timestamp": "...",
  "mercadopago": true,  ← Debe ser true
  "whatsapp": false     ← Puede ser false si no usas WhatsApp
}
```

