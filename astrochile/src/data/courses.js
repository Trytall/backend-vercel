import fs from 'fs';
import path from 'path';

// Leer todos los cursos desde los archivos JSON
const coursesDir = path.join(process.cwd(), 'src/data/courses');
const allCoursesFile = path.join(coursesDir, 'all-courses.json');

let courses = [];

try {
  if (fs.existsSync(allCoursesFile)) {
    const data = fs.readFileSync(allCoursesFile, 'utf8');
    courses = JSON.parse(data);
  }
} catch (error) {
  console.error('Error loading courses:', error);
  // Fallback a datos básicos si hay error
  courses = [
    {
      title: "CURSO DE REFRIGERACIÓN Y AIRE ACONDICIONADO",
      slug: "curso-de-refrigeracion-y-aire-acondicionado",
      image: "/images/curso-refrigeracion-aire.jpg",
      description: "Mantenimiento y reparación de sistemas de refrigeración doméstica y comercial."
    }
  ];
}

export default courses;