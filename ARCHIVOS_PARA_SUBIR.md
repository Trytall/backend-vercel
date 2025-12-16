# 📁 ARCHIVOS PARA SUBIR AL HOSTING

## **🎯 Archivos principales:**

### **1. Contenido de la carpeta `dist/`**
- ✅ `index.html`
- ✅ `cursos/` (carpeta completa)
- ✅ `_astro/` (carpeta completa)
- ✅ `images/` (carpeta completa)
- ✅ `favicon.svg`
- ✅ `robots.txt`
- ✅ `sitemap.xml`

### **2. Archivo `.htaccess`**
- ✅ Subir `.htaccess-proxy` como `.htaccess` a la raíz de `public_html/`

## **📋 INSTRUCCIONES DE SUBIDA:**

### **Paso 1: Subir archivos del frontend**
1. Ve a tu panel de control del hosting
2. Navega a `public_html/`
3. **Sube TODO el contenido** de la carpeta `dist/`
4. **Reemplaza todos los archivos** existentes

### **Paso 2: Configurar el proxy**
1. Sube el archivo `.htaccess-proxy` como `.htaccess`
2. Colócalo en la **raíz** de `public_html/`
3. Asegúrate de que reemplace cualquier `.htaccess` existente

### **Paso 3: Verificar**
1. Limpia la caché del navegador (Ctrl+F5)
2. Visita `https://escuelasiade.com.ar`
3. Prueba el pago en cualquier curso

## **🎯 URLs finales:**
- **Frontend**: `https://escuelasiade.com.ar`
- **Backend**: `https://backend-vercel-cm5jrokqw-tomasarielmb-gmailcoms-projects.vercel.app`
- **API Proxy**: `/api/*` → Backend de Vercel

## **✅ Resultado esperado:**
- ✅ Sin errores de CORS
- ✅ Pago funcional
- ✅ Redirección a MercadoPago
- ✅ Todo funcionando correctamente

**¡Los archivos están listos para subir!** 🚀 