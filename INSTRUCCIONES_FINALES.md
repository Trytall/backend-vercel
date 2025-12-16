# 🚀 INSTRUCCIONES FINALES - DESPLIEGUE

## **📁 Archivos para subir al hosting:**

### **1. Contenido completo de la carpeta `dist/`**
```
dist/
├── index.html
├── cursos/ (carpeta completa)
├── _astro/ (carpeta completa)
├── images/ (carpeta completa)
├── api/
│   └── create-preference.php
├── .htaccess
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

### **2. Pasos de despliegue:**

#### **Paso 1: Subir archivos**
1. Ve a tu panel de control del hosting
2. Navega a `public_html/`
3. **Sube TODO el contenido** de la carpeta `dist/`
4. **Reemplaza todos los archivos** existentes

#### **Paso 2: Configurar token de MercadoPago**
1. Edita el archivo `public_html/api/create-preference.php`
2. Reemplaza esta línea:
   ```php
   'Authorization: Bearer APP_USR-1234567890abcdef1234567890abcdef-123456-123456'
   ```
3. Con tu token real de MercadoPago (producción o test)

#### **Paso 3: Verificar**
1. Limpia la caché del navegador (Ctrl+F5)
2. Visita `https://escuelasiade.com.ar`
3. Prueba el pago en cualquier curso

## **✅ Verificaciones post-despliegue:**

### **1. Assets funcionando:**
- ✅ `https://escuelasiade.com.ar/pattern.svg` devuelve 200
- ✅ `https://escuelasiade.com.ar/images/logo.png` carga correctamente
- ✅ CSS y JS cargan sin errores

### **2. API funcionando:**
- ✅ `https://escuelasiade.com.ar/api/create-preference.php` responde
- ✅ No hay errores de CORS
- ✅ Pago redirige a MercadoPago

### **3. Rutas funcionando:**
- ✅ Páginas de cursos cargan correctamente
- ✅ Formulario de inscripción funciona
- ✅ Navegación entre páginas sin errores

## **🔧 Solución de problemas:**

### **Si hay error 500 en el pago:**
1. Verifica que el token de MercadoPago esté correcto
2. Revisa los logs del hosting
3. Asegúrate de que PHP tenga cURL habilitado

### **Si hay errores de CORS:**
1. Verifica que el archivo `.htaccess` esté en la raíz
2. Asegúrate de que el hosting soporte `mod_rewrite`
3. Limpia la caché del navegador

### **Si los assets no cargan:**
1. Verifica que las rutas sean correctas
2. Asegúrate de que los archivos estén en las carpetas correctas
3. Revisa que el `.htaccess` no interfiera con archivos estáticos

## **🎯 URLs finales:**
- **Frontend**: `https://escuelasiade.com.ar`
- **API**: `https://escuelasiade.com.ar/api/create-preference.php`
- **MercadoPago**: Integración directa

## **📞 Soporte:**
Si tienes problemas después del despliegue:
1. Revisa los logs del hosting
2. Verifica la configuración de PHP
3. Prueba el endpoint PHP directamente

**¡Listo para desplegar!** 🎉

---

**Nota importante:** Recuerda reemplazar el token de MercadoPago con tu token real antes de hacer el despliegue final. 