# 🔄 CAMBIOS REALIZADOS - MIGRACIÓN A PHP

## **📋 Resumen de cambios:**

### **✅ 1. Endpoint PHP creado**
- **Archivo**: `public/api/create-preference.php`
- **Función**: Reemplaza el endpoint Node.js con PHP
- **Características**:
  - Manejo de CORS con OPTIONS
  - Validación de datos JSON
  - Integración directa con MercadoPago API
  - Estructura de datos unificada

### **✅ 2. Frontend actualizado**
- **Archivo**: `src/pages/inscripcion/[slug].astro`
- **Cambios**:
  - Endpoint cambiado de `/api/create-preference` a `/api/create-preference.php`
  - Estructura de datos actualizada: `{nombre, dni, email, titulo, monto}`
  - Mejor manejo de errores con logging
  - Uso de `init_point` en lugar de `initPoint`

### **✅ 3. Configuración API actualizada**
- **Archivo**: `src/config/api.js`
- **Cambios**:
  - Endpoint actualizado a `/api/create-preference.php`
  - URLs base vacías (uso de rutas relativas)
  - Mejor manejo de errores

### **✅ 4. .htaccess para rutas limpias**
- **Archivo**: `public/.htaccess`
- **Función**:
  - Manejo de archivos estáticos (CSS, JS, imágenes)
  - Rutas limpias para SPA
  - No interfiere con archivos estáticos

### **✅ 5. Dominio corregido**
- **Cambios**: `escuelasiadeaarg.com` → `escuelasiade.com.ar`
- **Archivos actualizados**:
  - `ARCHIVOS_PARA_SUBIR.md`
  - Endpoint PHP (back_urls)

### **✅ 6. Assets corregidos**
- **pattern.svg**: Ya está en `/images/pattern.svg` (correcto)
- **Referencias**: Usan rutas absolutas desde la raíz

## **📁 Archivos modificados:**

### **Nuevos archivos:**
- ✅ `public/api/create-preference.php`
- ✅ `public/.htaccess`
- ✅ `dist/api/create-preference.php`
- ✅ `dist/.htaccess`

### **Archivos actualizados:**
- ✅ `src/pages/inscripcion/[slug].astro`
- ✅ `src/config/api.js`
- ✅ `ARCHIVOS_PARA_SUBIR.md`

## **🎯 Estructura de datos esperada:**

```javascript
{
  nombre: "Nombre del usuario",
  dni: "12345678",
  email: "usuario@email.com",
  telefono: "01112345678",
  provincia: "Buenos Aires",
  localidad: "Ciudad",
  modalidad: "Online",
  titulo: "CURSO DE REFRIGERACIÓN Y AIRE ACONDICIONADO",
  monto: 150000
}
```

## **📋 Instrucciones de despliegue:**

### **1. Subir archivos al hosting:**
```bash
# Subir TODO el contenido de dist/ a public_html/
# Incluye:
- index.html
- cursos/ (carpeta completa)
- _astro/ (carpeta completa)
- images/ (carpeta completa)
- api/create-preference.php
- .htaccess
```

### **2. Configurar token de MercadoPago:**
- Editar `public_html/api/create-preference.php`
- Reemplazar `APP_USR-1234567890abcdef1234567890abcdef-123456-123456` con tu token real

### **3. Verificar:**
- ✅ `https://escuelasiade.com.ar/pattern.svg` devuelve 200
- ✅ `https://escuelasiade.com.ar/api/create-preference.php` responde
- ✅ Pago funcional sin errores de CORS

## **🚀 Resultado esperado:**
- ✅ Sin errores de CORS
- ✅ Pago funcional con MercadoPago
- ✅ Rutas limpias funcionando
- ✅ Assets cargando correctamente
- ✅ Dominio correcto en todas las referencias

**¡Listo para desplegar!** 🎉 