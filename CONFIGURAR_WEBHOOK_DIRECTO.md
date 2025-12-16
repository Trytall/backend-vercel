# 🔧 Configurar Webhook en MercadoPago - Guía Directa

## 🎯 Tu Application ID
**Application ID:** `7278900707798742`

---

## 📋 Opción 1: Acceso Directo por URL

### **URL Directa de Configuración de Webhooks:**

```
https://www.mercadopago.com.ar/developers/panel/app/7278900707798742/webhooks
```

**Pasos:**
1. Copiá la URL de arriba y abrila en tu navegador (mientras estés logueado en MercadoPago)
2. Deberías ver la página de configuración de webhooks
3. Configurá:
   - **URL:** `https://backend-vercel-silk.vercel.app/api/webhook`
   - **Eventos:** `payment` o `payment.created` y `payment.updated`
4. Guardá

---

## 📋 Opción 2: Desde el Menú del Panel

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Seleccioná tu aplicación **"Escuelas IADE"**
3. En el menú lateral izquierdo, buscá:
   - **"Webhooks"** → Click → **"Configurar notificaciones"**
   - O **"Notificaciones"** → Click → **"Webhooks"**
4. Si no aparece en el menú, probá:
   - Click en **"Información general"** o cualquier sección
   - Buscá un botón o link que diga **"Configurar webhooks"** o **"Notificaciones"**

---

## 📋 Opción 3: Configurar vía API (MÁS FÁCIL - Recomendado)

Si no podés acceder desde el panel, podés usar el script que creé para configurarlo automáticamente.

### **Usar el Script Automático:**

1. Abrí PowerShell en la carpeta del proyecto
2. Ejecutá:
   ```powershell
   .\configurar-webhook.ps1
   ```

El script:
- ✅ Configura el webhook automáticamente
- ✅ Usa tu Access Token correcto
- ✅ Configura los eventos necesarios (`payment`, `payment.created`, `payment.updated`)
- ✅ Te muestra si funcionó o qué error hubo

### **Si preferís hacerlo manualmente:**

**Desde PowerShell:**
```powershell
$headers = @{
    "Authorization" = "Bearer APP_USR-7278900707798742-110117-84d48eff52400bed16c532ee0d698c89-2085180642"
    "Content-Type" = "application/json"
}

$body = @{
    url = "https://backend-vercel-silk.vercel.app/api/webhook"
    events = @("payment", "payment.created", "payment.updated")
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.mercadopago.com/applications/7278900707798742/webhooks" -Method POST -Headers $headers -Body $body
```

---

## ✅ Verificar que Funcionó

### **1. Verificar en el Panel:**
- Volvé a la URL: https://www.mercadopago.com.ar/developers/panel/app/7278900707798742/webhooks
- Deberías ver tu webhook configurado con la URL: `https://backend-vercel-silk.vercel.app/api/webhook`

### **2. Hacer Pago de Prueba:**
1. Hacé un pago de prueba de $1 desde tu página
2. Revisá los logs de Vercel: https://vercel.com/dashboard → tu proyecto → "Logs"
3. Deberías ver: `🔔 WEBHOOK RECIBIDO`

---

## 🆘 Si Ninguna Opción Funciona

1. **Contactá soporte de MercadoPago:**
   - Email: soporte@mercadopago.com.ar
   - Mencioná que necesitás configurar webhooks para la aplicación `7278900707798742`

2. **Verificá que tengas permisos:**
   - Asegurate de estar logueado con la cuenta que creó la aplicación
   - Verificá que tengas permisos de administrador en la aplicación

---

## 📝 Nota Importante

**El webhook global es necesario** porque:
- Cuando creás una preferencia con `notification_url`, MercadoPago debería enviar el webhook
- Pero si el webhook global NO está configurado, MercadoPago puede no enviarlo
- El webhook global asegura que TODOS los pagos generen notificaciones
