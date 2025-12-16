# 🔧 Solución: Email No Recibido

## 🔍 Paso 1: Verificar Consola del Navegador

1. Abre tu sitio web
2. Presiona **F12** para abrir las herramientas de desarrollador
3. Ve a la pestaña **"Console"**
4. Completa y envía el formulario
5. **Busca mensajes de error** (texto en rojo)

**¿Qué buscar?**
- `❌ Error enviando notificación de email`
- `CORS`
- `404 Not Found`
- `Network Error`
- Cualquier error en rojo

**Comparte conmigo los errores que veas.**

---

## 🔍 Paso 2: Verificar Logs de Vercel

1. Ve a tu proyecto en Vercel
2. **Deployments** → Último deployment
3. Haz clic en **"View Function Logs"** o **"Logs"**
4. Envía el formulario nuevamente
5. Revisa los logs en tiempo real

**¿Qué buscar?**
- Errores de SMTP
- Errores de autenticación
- `POST /api/send-form-notification`
- Errores relacionados con email

---

## 🔍 Paso 3: Probar el Endpoint Directamente

Abre la consola del navegador (F12 → Console) y ejecuta:

```javascript
fetch('https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/send-form-notification', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Test Usuario',
    dni: '12345678',
    email: 'test@test.com',
    telefono: '1234567890',
    provincia: 'Buenos Aires',
    localidad: 'CABA',
    modalidad: 'online',
    sede: '',
    cursos: ['Curso de Test']
  })
})
.then(r => r.json())
.then(data => {
  console.log('✅ Respuesta del servidor:', data);
  if (data.success) {
    alert('Email enviado correctamente!');
  } else {
    alert('Error: ' + JSON.stringify(data));
  }
})
.catch(err => {
  console.error('❌ Error:', err);
  alert('Error: ' + err.message);
});
```

**¿Qué resultado obtienes?**
- ¿Muestra "Email enviado correctamente"?
- ¿Muestra algún error?

---

## 🔍 Paso 4: Verificar Variables SMTP en Vercel

1. Ve a **Settings** → **Environment Variables**
2. Verifica que estas variables estén correctas:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=informes@escuelaiade.com`
   - `SMTP_PASS=wcbtlramigavmlnm`
   - `EMAIL_FROM=informes@escuelaiade.com`
   - `EMAIL_NOTIFICACIONES=informes@escuelaiade.com`

**Si alguna está incorrecta, corrígela y haz redeploy.**

---

## 🔍 Paso 5: Verificar CORS

Si ves errores de CORS, necesitamos agregar tu dominio al API.

**Comparte tu dominio** (ej: `escuelasiade.com.ar`) para agregarlo a la configuración de CORS.

---

## 🔍 Paso 6: Revisar Carpeta de Spam

A veces los emails van a spam. Revisa la carpeta de **spam/correo no deseado** en `informes@escuelaiade.com`.

---

## 📋 Información que Necesito:

Para ayudarte mejor, comparte:

1. **Errores de la consola** (Paso 1)
2. **Logs de Vercel** (Paso 2)
3. **Resultado del test directo** (Paso 3)
4. **Tu dominio** (si hay errores de CORS)

Con esa información podré darte la solución exacta.



