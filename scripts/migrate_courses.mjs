import fs from 'fs';
import path from 'path';

// Función para extraer datos de un archivo PHP
function extractCourseData(phpContent) {
  const data = {};
  
  // Extraer título
  const tituloMatch = phpContent.match(/\$curso_titulo\s*=\s*"([^"]+)"/);
  if (tituloMatch) data.title = tituloMatch[1];
  
  // Extraer descripción
  const descripcionMatch = phpContent.match(/\$curso_descripcion\s*=\s*"([^"]+)"/);
  if (descripcionMatch) data.description = descripcionMatch[1];
  
  // Extraer duración
  const duracionMatch = phpContent.match(/\$curso_duracion\s*=\s*"([^"]+)"/);
  if (duracionMatch) data.duration = duracionMatch[1];
  
  // Extraer modalidad
  const modalidadMatch = phpContent.match(/\$curso_modalidad\s*=\s*"([^"]+)"/);
  if (modalidadMatch) data.modality = modalidadMatch[1];
  
  // Extraer sedes
  const sedesMatch = phpContent.match(/\$curso_sedes\s*=\s*"([^"]+)"/);
  if (sedesMatch) data.campuses = sedesMatch[1];
  
  // Extraer imagen
  const imagenMatch = phpContent.match(/\$curso_imagen\s*=\s*"([^"]+)"/);
  if (imagenMatch) {
    data.image = imagenMatch[1].replace('../images/', '/images/');
  }
  
  // Extraer temario
  const temarioMatch = phpContent.match(/\$curso_temario\s*=\s*\[([\s\S]*?)\];/);
  if (temarioMatch) {
    try {
      // Convertir el array PHP a formato JSON
      const temarioStr = temarioMatch[1];
      const modules = [];
      
      // Extraer módulos usando regex
      const moduleMatches = temarioStr.match(/\[\s*'titulo'\s*=>\s*'([^']+)',\s*'temas'\s*=>\s*\[([\s\S]*?)\]\s*\]/g);
      
      if (moduleMatches) {
        moduleMatches.forEach(moduleStr => {
          const titleMatch = moduleStr.match(/'titulo'\s*=>\s*'([^']+)'/);
          const topicsMatch = moduleStr.match(/'temas'\s*=>\s*\[([\s\S]*?)\]/);
          
          if (titleMatch && topicsMatch) {
            const title = titleMatch[1];
            const topicsStr = topicsMatch[1];
            
            // Extraer temas individuales
            const topics = topicsStr.match(/'([^']+)'/g)?.map(t => t.replace(/'/g, '')) || [];
            
            modules.push({
              title,
              topics
            });
          }
        });
      }
      
      data.syllabus = modules;
    } catch (error) {
      console.error('Error parsing syllabus:', error);
      data.syllabus = [];
    }
  }
  
  return data;
}

// Función para generar slug desde el título
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Función principal
async function migrateCourses() {
  const sourceDir = '../LANDING PAGE/cursos';
  const outputDir = './src/data/courses';
  
  // Crear directorio de salida si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Leer todos los archivos PHP
  const files = fs.readdirSync(sourceDir).filter(file => 
    file.startsWith('curso-de-') && file.endsWith('.php')
  );
  
  const allCourses = [];
  
  for (const file of files) {
    console.log(`Procesando: ${file}`);
    
    const filePath = path.join(sourceDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const courseData = extractCourseData(content);
    
    if (courseData.title) {
      // Generar slug
      const slug = generateSlug(courseData.title);
      
      const course = {
        title: courseData.title,
        slug,
        description: courseData.description || '',
        duration: courseData.duration || '6 meses',
        modality: courseData.modality || 'Online y Presencial',
        campuses: courseData.campuses || 'Morón, Laferrere, Lomas de Zamora, Avellaneda',
        image: courseData.image || '/images/curso-default.jpg',
        syllabus: courseData.syllabus || []
      };
      
      allCourses.push(course);
      
      // Guardar curso individual
      const individualFile = path.join(outputDir, `${slug}.json`);
      fs.writeFileSync(individualFile, JSON.stringify(course, null, 2));
      
      console.log(`✅ ${course.title} -> ${slug}.json`);
    }
  }
  
  // Guardar archivo con todos los cursos
  const allCoursesFile = path.join(outputDir, 'all-courses.json');
  fs.writeFileSync(allCoursesFile, JSON.stringify(allCourses, null, 2));
  
  console.log(`\n🎉 Migración completada!`);
  console.log(`📁 ${allCourses.length} cursos migrados`);
  console.log(`📄 Archivo principal: ${allCoursesFile}`);
  console.log(`📂 Cursos individuales en: ${outputDir}`);
}

// Ejecutar migración
migrateCourses().catch(console.error); 