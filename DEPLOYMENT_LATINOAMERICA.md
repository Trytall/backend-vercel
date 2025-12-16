# 🚀 Guía de Despliegue - Latinoamérica Hosting

## **📋 Información del Proyecto**

- **Frontend**: Astro (HTML estático)
- **Backend**: Node.js/Express en Vercel
- **Dominio**: `https://escuelasiadearg.com`
- **Backend URL**: `https://backend-vercel-8905o5teg-tomasarielmb-gmailcoms-projects.vercel.app`

## **📦 Archivos Listos para Subir**

### **Ubicación de los archivos:**
```
C:\xampp\htdocs\astro-landing-page\dist\
```

### **Contenido de la carpeta dist/:**
- `index.html` - Página principal
- `cursos/` - Todas las páginas de cursos
- `inscripcion/` - Formularios de inscripción
- `conocenos/` - Página "Conócenos"
- `images/` - Imágenes del sitio
- `_astro/` - Assets de Astro
- `favicon.ico` - Icono del sitio

## **🌐 Pasos para Latinoamérica Hosting**

### **1. Acceder al Panel de Control**
- Ingresa a tu panel de control de Latinoamérica Hosting
- Ve a la sección "Administrador de archivos" o "File Manager"

### **2. Subir Archivos**
- Navega a la carpeta `public_html` o `www`
- **Sube TODO el contenido** de la carpeta `dist/` a esta ubicación
- Asegúrate de que los archivos estén en la raíz del dominio

### **3. Verificar Estructura**
La estructura final debe ser:
```
public_html/
├── index.html
├── cursos/
│   ├── index.html
│   ├── curso-de-administracion-y-gestion-en-salud/
│   ├── curso-de-auxiliar-de-farmacia/
│   └── ... (todos los cursos)
├── inscripcion/
│   ├── curso-de-administracion-y-gestion-en-salud/
│   ├── curso-de-auxiliar-de-farmacia/
│   └── ... (todos los formularios)
├── conocenos/
│   └── index.html
├── images/
│   └── ... (todas las imágenes)
└── _astro/
    └── ... (assets de Astro)
```

### **4. Configurar Dominio**
- Asegúrate de que `escuelasiade.com.ar` esté configurado correctamente
- Verifica que apunte a la carpeta `public_html`

### **5. Probar el Sitio**
- Visita `https://escuelasiadearg.com`
- Verifica que todas las páginas funcionen
- Prueba el formulario de inscripción

## **🔧 Configuración del Backend**

### **Variables de Entorno en Vercel:**
Ya configuradas:
- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_PUBLIC_KEY`
- `NODE_ENV=production`

### **URLs del Backend:**
- **API Base**: `https://backend-vercel-8905o5teg-tomasarielmb-gmailcoms-projects.vercel.app`
- **Health Check**: `https://backend-vercel-8905o5teg-tomasarielmb-gmailcoms-projects.vercel.app/api/health`
- **Create Preference**: `https://backend-vercel-8905o5teg-tomasarielmb-gmailcoms-projects.vercel.app/api/create-preference`

## **✅ Verificación Final**

### **1. Páginas Principales:**
- ✅ Página de inicio
- ✅ Catálogo de cursos
- ✅ Página "Conócenos"

### **2. Funcionalidades:**
- ✅ Formularios de inscripción
- ✅ Integración con MercadoPago
- ✅ WhatsApp Business API
- ✅ Navegación entre páginas

### **3. Backend:**
- ✅ API funcionando en Vercel
- ✅ Variables de entorno configuradas
- ✅ CORS configurado para el dominio

## **🚨 Solución de Problemas**

### **Si el sitio no carga:**
1. Verifica que los archivos estén en `public_html`
2. Comprueba que el dominio esté configurado correctamente
3. Revisa los logs de error del hosting

### **Si los formularios no funcionan:**
1. Verifica que la URL del backend esté correcta
2. Comprueba que las variables de entorno estén configuradas en Vercel
3. Revisa la consola del navegador para errores

### **Si las imágenes no cargan:**
1. Verifica que la carpeta `images/` esté subida
2. Comprueba las rutas de las imágenes en el código

## **📞 Soporte**

- **Backend**: Vercel Dashboard
- **Frontend**: Latinoamérica Hosting Panel
- **Dominio**: Configuración del hosting

---

**¡El sitio está listo para producción!** 🎉 