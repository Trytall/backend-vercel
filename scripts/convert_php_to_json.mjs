// scripts/convert_php_to_json.mjs
// Convierte los archivos PHP de ./cursos a un archivo de datos JS para Astro.
import fg from 'fast-glob';
import fs from 'fs/promises';
import path from 'node:path';

const PHP_DIR = path.resolve('./cursos');           // carpeta con los .php copiados
const OUT_FILE = path.resolve('./src/data/courses.js');

function extractBetween(code, varName) {
  const re = new RegExp(`${varName}\\s*=\\s*"(.*?)"`);
  const m = code.match(re);
  return m ? m[1].trim() : '';
}

function parseTemario(block) {
  if (!block) return [];
  let json = block
    .replace(/=>/g, ':')
    .replace(/\$[a-zA-Z_][\\w]*/g, '')   // quita variables PHP
    .replace(/array\s*\(/g, '[')
    .replace(/\)/g, ']')
    .replace(/'/g, '"')
    .replace(/"titulo"/g, '"title"')
    .replace(/"temas"/g, '"topics"');
  try { return JSON.parse(json); } catch { return []; }
}

const files = await fg('*.php', { cwd: PHP_DIR });
if (files.length === 0) {
  console.error('No se encontraron .php en', PHP_DIR);
  process.exit(1);
}

const courses = [];
for (const file of files) {
  const raw = await fs.readFile(path.join(PHP_DIR, file), 'utf8');
  const course = {
    slug: file.replace('.php', ''),
    title:       extractBetween(raw, '\\$curso_titulo'),
    description: extractBetween(raw, '\\$curso_descripcion'),
    duration:    extractBetween(raw, '\\$curso_duracion'),
    modality:    extractBetween(raw, '\\$curso_modalidad'),
    campuses:    extractBetween(raw, '\\$curso_sedes'),
    image:       extractBetween(raw, '\\$curso_imagen').replace('..', ''),
    syllabus:    []
  };
  const temarioRaw = raw.split('$curso_temario =')[1];
  if (temarioRaw) {
    const arrBlock = temarioRaw.split('];')[0] + ']';
    course.syllabus = parseTemario(arrBlock);
  }
  courses.push(course);
}

courses.sort((a,b)=>a.title.localeCompare(b.title,'es'));
await fs.mkdir(path.dirname(OUT_FILE), { recursive:true });
await fs.writeFile(OUT_FILE, 'export default ' + JSON.stringify(courses, null, 2) + ';');

console.log(`✨ Cursos convertidos: ${courses.length}. Archivo generado en src/data/courses.js`);