# 🔍 Diagnóstico: Email No Recibido

## 🔍 Pasos para Diagnosticar:

### 1. Verificar que el formulario llama al API correcto

**Abre la consola del navegador (F12) cuando envías el formulario:**

1. Completa el formulario
2. Abre la consola (F12 → Console)
3. Envía el formulario
4. Busca errores o mensajes que digan:
   - `Error enviando notificación de email`
   - `ERR_CONNECTION_REFUSED`
   - `404 Not Found`
   - O cualquier error en rojo

### 2. Verificar logs en Vercel

1. Ve a tu proyecto en Vercel
2. **Deployments** → Último deployment
3. Haz clic en **"View Function Logs"** o **"Logs"**
4. Busca:
   - Errores relacionados con SMTP
   - Errores de autenticación de email
   - Peticiones a `/api/send-form-notification`

### 3. Probar el endpoint directamente

Prueba hacer una petición POST directamente al API:

**Desde la consola del navegador (en tu sitio):**
```javascript
fetch('https://backend-vercelnew-8fxarrxku-tomasarielmb-gmailcoms-projects.vercel.app/api/send-form-notification', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'Test',
    dni: '12345678',
    email: 'test@test.com',
    telefono: '1234567890',
    provincia: 'Buenos Aires',
    localidad: 'CABA',
    modalidad: 'online',
    sede: '',
    cursos: ['Curso Test']
  })
})
.then(r => r.json())
.then(data => console.log('Respuesta:', data))
.catch(err => console.error('Error:', err));
```

### 4. Verificar variables SMTP en Vercel

1. Ve a **Settings** → **Environment Variables**
2. Verifica que estas variables estén configuradas:
   - `SMTP_HOST=smtp.gmail.com`
   - `SMTP_PORT=587`
   - `SMTP_SECURE=false`
   - `SMTP_USER=informes@escuelaiade.com`
   - `SMTP_PASS=wcbtlramigavmlnm`
   - `EMAIL_FROM=informes@escuelaiade.com`
   - `EMAIL_NOTIFICACIONES=informes@escuelaiade.com`

---

## 🔧 Posibles Problemas:

### Problema 1: CORS
Si ves errores de CORS en la consola, el API no está permitiendo requests desde tu dominio.

### Problema 2: URL incorrecta
El formulario podría estar llamando a una URL incorrecta.

### Problema 3: Variables SMTP incorrectas
El servidor SMTP podría estar rechazando la conexión.

### Problema 4: Email en spam
Revisa la carpeta de spam en `informes@escuelaiade.com`.

---

## ✅ Qué hacer:

1. **Revisa la consola del navegador** cuando envías el formulario
2. **Revisa los logs de Vercel** para ver errores del servidor
3. **Comparte los errores** que encuentres para poder ayudarte mejor



