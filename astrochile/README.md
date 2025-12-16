# Escuelas IADE Chile - Landing Page

Esta es la versión de Chile de la landing page de Escuelas IADE, enfocada exclusivamente en cursos online.

## 🚀 Características

- **Solo cursos online**: Filtrado automático para mostrar únicamente cursos en modalidad online
- **Adaptado para Chile**: Número de contacto +56 9 8552 8932
- **Ubicación**: Santiago, Chile
- **Email**: informes@escuelaiade.cl
- **Dominio**: escuelasiade.cl

## 📁 Estructura del Proyecto

```
astrochile/
├── src/
│   ├── components/          # Componentes reutilizables
│   ├── data/               # Datos de cursos (filtrados para online)
│   ├── layouts/            # Layouts de página
│   ├── pages/              # Páginas del sitio
│   └── styles/             # Estilos CSS
├── public/                 # Archivos estáticos
├── images/                 # Imágenes del sitio
├── css/                    # Estilos CSS adicionales
├── js/                     # JavaScript del sitio
└── config/                 # Configuraciones
```

## 🔧 Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🌟 Diferencias con la Versión Argentina

### Cambios Principales:
- ✅ Solo cursos online (eliminados presenciales)
- ✅ Número de contacto: +56 9 8552 8932
- ✅ Email: informes@escuelaiade.cl
- ✅ Ubicación: Santiago, Chile
- ✅ Dominio: escuelasiade.cl
- ✅ WhatsApp: 56985528932
- ✅ Títulos y descripciones adaptados para Chile

### Archivos Modificados:
- `src/data/cursos.ts` - Filtrado solo para cursos online
- `src/components/Header.astro` - Número de contacto
- `src/components/Footer.astro` - Contacto y ubicación
- `src/components/WhatsAppButton.astro` - Número de WhatsApp
- `src/components/LeadForm.astro` - Solo modalidad online
- `src/components/Conocenos.astro` - Contenido específico de Chile
- `src/layouts/Layout.astro` - Metadatos y SEO para Chile
- Todas las páginas principales adaptadas

## 📱 Páginas Disponibles

- **Inicio** (`/`) - Landing principal con cursos destacados
- **Cursos** (`/cursos`) - Catálogo completo de cursos online
- **Conócenos** (`/conocenos`) - Información sobre la institución
- **FAQ** (`/faq`) - Preguntas frecuentes
- **Términos** (`/terminos`) - Términos y condiciones
- **Privacidad** (`/politica-privacidad`) - Política de privacidad

## 🎨 Tecnologías Utilizadas

- **Astro** - Framework de sitios estáticos
- **Tailwind CSS** - Framework de CSS utilitario
- **TypeScript** - Tipado estático
- **JavaScript** - Funcionalidad interactiva

## 📞 Contacto

- **Teléfono**: +56 9 8552 8932
- **Email**: informes@escuelaiade.cl
- **WhatsApp**: [56985528932](https://wa.me/56985528932)
- **Ubicación**: Santiago, Chile

## 📄 Licencia

© 2025 Escuelas IADE Chile. Todos los derechos reservados. 