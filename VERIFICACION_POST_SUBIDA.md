# 🔍 VERIFICACIÓN RÁPIDA POST-SUBIDA

## ✅ **CHECKLIST DE VERIFICACIÓN**

### **1. PÁGINA PRINCIPAL**
- [ ] `https://escuelasiadearg.com/` carga correctamente
- [ ] Estilos CSS aplicados (no página en blanco)
- [ ] Imágenes del banner visibles
- [ ] Formulario de inscripción visible
- [ ] Botón de WhatsApp funcional

### **2. CATÁLOGO DE CURSOS**
- [ ] `https://escuelasiadearg.com/cursos` accesible
- [ ] Filtros de modalidad funcionan
- [ ] **Refrigeración aparece PRIMERO** en cursos online
- [ ] Imágenes de cursos visibles
- [ ] Enlaces a páginas individuales funcionan

### **3. CURSOS ONLINE**
- [ ] `https://escuelasiadearg.com/cursos/curso-de-refrigeracion-y-aire-acondicionado-online/online`
- [ ] **Secciones de conversión visibles:**
  - [ ] "¿Por qué elegir este curso?" (3 tarjetas)
  - [ ] "¿Listo para comenzar?" (botones rojos)
- [ ] Temario expandible funciona
- [ ] Botones de inscripción y WhatsApp funcionan

### **4. CURSOS PRESENCIALES**
- [ ] **Morón:** WhatsApp envía a `+54 9 11 2658-9218`
- [ ] **Lomas:** WhatsApp envía a `011 15-2260-8327`
- [ ] **Avellaneda:** WhatsApp envía a `011 15-7072-5467`
- [ ] Mapas de Google visibles
- [ ] Direcciones correctas mostradas

### **5. FORMULARIOS**
- [ ] **Inscripción Online:** Todos los cursos disponibles
- [ ] **Inscripción Presencial:** Filtrado por sede
- [ ] Redirección correcta después del envío
- [ ] WhatsApp pre-llenado con información del curso

## 🚨 **PROBLEMAS COMUNES Y SOLUCIONES**

### **❌ Estilos no se cargan**
```
Síntoma: Página en blanco o sin estilos
Solución: Verificar que _astro/ esté en la raíz
```

### **❌ Imágenes no se ven**
```
Síntoma: Iconos de imagen rotos
Solución: Verificar que images/ esté en la raíz
```

### **❌ Páginas dan 404**
```
Síntoma: Error 404 en rutas como /cursos
Solución: Verificar .htaccess y permisos
```

### **❌ WhatsApp no funciona**
```
Síntoma: Botón no abre WhatsApp
Solución: Verificar permisos de archivos JS
```

## 📱 **PRUEBAS RÁPIDAS**

### **Test 1: Curso de Refrigeración**
1. Ir a `/cursos`
2. Filtrar por "Cursos Online"
3. **Verificar que Refrigeración esté PRIMERO**
4. Hacer clic en el curso
5. **Verificar secciones de conversión**

### **Test 2: WhatsApp Presencial**
1. Ir a cualquier curso presencial
2. Completar formulario
3. Hacer clic en botón WhatsApp
4. **Verificar número correcto por sede**

### **Test 3: Formulario Online**
1. Ir a página principal
2. Seleccionar modalidad "Online"
3. **Verificar que Refrigeración esté PRIMERO**
4. Completar formulario
5. Verificar redirección

## 🎯 **INDICADORES DE ÉXITO**

### **✅ SITIO FUNCIONANDO PERFECTAMENTE:**
- Refrigeración aparece primero en todos lados
- Secciones de conversión visibles en cursos online
- WhatsApp funciona en todas las sedes
- URLs correctas para Lomas de Zamora
- Formularios sincronizados con catálogo

### **⚠️ PROBLEMAS MENORES:**
- Algunas imágenes tardan en cargar
- Cache del navegador necesita limpieza
- SSL redirige correctamente

### **❌ PROBLEMAS CRÍTICOS:**
- Estilos no se cargan
- Páginas dan 404
- WhatsApp no funciona
- Formularios no envían

---

## 🚀 **RESULTADO ESPERADO**

Después de la subida exitosa, tu sitio debería tener:

1. **🎨 Diseño completo y funcional**
2. **📚 Curso de Refrigeración destacado**
3. **💬 WhatsApp funcionando en todas las sedes**
4. **📍 Direcciones y mapas correctos**
5. **📝 Formularios sincronizados**
6. **🔄 Secciones de conversión en cursos online**

**¡Si todo está funcionando, tu sitio está 100% listo para producción!** 🎉
