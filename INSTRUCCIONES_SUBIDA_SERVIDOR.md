# 🚀 INSTRUCCIONES PARA SUBIR A LATINOAMERICAHOSTING

## 📋 ARCHIVOS PREPARADOS PARA SUBIDA

El proyecto está completamente compilado y listo para subir. Todos los cambios implementados están incluidos:

### ✅ **CARACTERÍSTICAS IMPLEMENTADAS:**

1. **Secciones de conversión en cursos online** - "¿Por qué elegir este curso?" y "¿Listo para comenzar?"
2. **Curso de Refrigeración en primera posición** - Aparece primero en todos los listados
3. **WhatsApp funcional** - Botones funcionando correctamente en todas las sedes
4. **Direcciones actualizadas** - Todas las sedes con información correcta
5. **Catálogos filtrados** - Cursos correctos por sede y modalidad
6. **Temarios completos** - Todos los cursos con contenido detallado

## 📁 ARCHIVOS A SUBIR

### **Opción 1: Subir solo la carpeta `dist` (RECOMENDADO)**
```
📦 dist/
├── index.html
├── cursos/
├── inscripcion/
├── _astro/
├── images/
├── sitemap-index.xml
└── ... (todos los archivos estáticos)
```

### **Opción 2: Subir todo el proyecto (para desarrollo)**
```
📦 astro-landing-page/
├── src/
├── dist/
├── package.json
├── astro.config.mjs
└── ... (archivos de desarrollo)
```

## 🌐 CONFIGURACIÓN DEL SERVIDOR

### **1. Acceso al servidor:**
- **Panel de control:** cPanel de LatinoamericaHosting
- **File Manager:** Para subir archivos
- **FTP:** Si prefieres usar cliente FTP

### **2. Ubicación de subida:**
```
📁 public_html/
└── 📁 escuelasiadearg.com/
    └── 📁 (aquí van los archivos)
```

### **3. Configuración de dominio:**
- **Dominio principal:** escuelasiadearg.com
- **Subdominios:** configurados automáticamente
- **SSL:** Certificado incluido en el hosting

## 📤 PASOS PARA LA SUBIDA

### **PASO 1: Acceder al cPanel**
1. Ir a `https://tudominio.com/cpanel`
2. Iniciar sesión con credenciales de LatinoamericaHosting
3. Buscar "File Manager" o "Administrador de Archivos"

### **PASO 2: Navegar a la carpeta correcta**
1. En File Manager, ir a `public_html`
2. Si existe una carpeta del dominio, entrar en ella
3. Si no existe, crear una nueva carpeta

### **PASO 3: Subir archivos**
1. **Opción A - Subir carpeta completa:**
   - Comprimir la carpeta `dist` en un archivo ZIP
   - Subir el ZIP al servidor
   - Extraer en `public_html`

2. **Opción B - Subir archivos individuales:**
   - Seleccionar todos los archivos de `dist`
   - Subir al servidor
   - Verificar que se mantenga la estructura

### **PASO 4: Verificar permisos**
```
📁 Archivos: 644
📁 Carpetas: 755
📁 .htaccess: 644 (si existe)
```

## 🔧 VERIFICACIÓN POST-SUBIDA

### **1. Página principal:**
- ✅ `https://escuelasiadearg.com/` - Debe cargar correctamente
- ✅ Estilos CSS aplicados
- ✅ Imágenes visibles
- ✅ Formulario funcional

### **2. Cursos online:**
- ✅ `https://escuelasiadearg.com/cursos` - Catálogo completo
- ✅ Refrigeración aparece primero
- ✅ Secciones de conversión visibles

### **3. Cursos presenciales:**
- ✅ URLs correctas para cada sede
- ✅ WhatsApp funcionando
- ✅ Mapas de Google visibles

### **4. Formularios:**
- ✅ Inscripción online funcional
- ✅ Inscripción presencial funcional
- ✅ Redirección correcta

## 🚨 SOLUCIÓN DE PROBLEMAS COMUNES

### **Problema: Estilos no se cargan**
```
❌ Causa: Ruta base incorrecta
✅ Solución: Verificar astro.config.mjs (base: '/' está comentado)
```

### **Problema: Imágenes no se ven**
```
❌ Causa: Rutas relativas incorrectas
✅ Solución: Verificar que images/ esté en la raíz
```

### **Problema: Páginas dan 404**
```
❌ Causa: .htaccess no configurado
✅ Solución: Crear .htaccess con rewrite rules
```

### **Problema: WhatsApp no funciona**
```
❌ Causa: JavaScript no se ejecuta
✅ Solución: Verificar permisos de archivos JS
```

## 📱 .HTACCESS RECOMENDADO

Crear archivo `.htaccess` en la raíz con:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /$1.html [L]

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 📞 CONTACTO Y SOPORTE

### **Si algo no funciona:**
1. Verificar consola del navegador (F12)
2. Revisar logs del servidor
3. Confirmar permisos de archivos
4. Verificar configuración de dominio

### **Archivos de respaldo:**
- `src/` - Código fuente completo
- `package.json` - Dependencias
- `astro.config.mjs` - Configuración

---

## 🎯 RESUMEN DE CAMBIOS IMPLEMENTADOS

✅ **Secciones de conversión** en todos los cursos online
✅ **Curso de Refrigeración** en primera posición
✅ **WhatsApp funcional** en todas las sedes
✅ **Direcciones actualizadas** (Morón, Lomas, Avellaneda)
✅ **Catálogos filtrados** correctamente
✅ **Temarios completos** para todos los cursos
✅ **URLs corregidas** para Lomas de Zamora
✅ **Formularios sincronizados** con catálogo

**¡El sitio está 100% funcional y listo para producción!** 🚀
