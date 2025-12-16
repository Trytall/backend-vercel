// Nuevo modelo unificado de cursos con modalidades y temario por versión
// Generado a partir de los datos existentes en src/data/cursos.js

import legacyCursos from './cursos.js';
import fs from 'fs';
import path from 'path';

export type Unidad = string;

export interface ModuloTemario {
  modulo: number;
  titulo: string;
  unidades: Unidad[];
}

export interface Modalidad {
  tipo: 'online' | 'presencial';
  sede?: string; // solo presencial
  temario: ModuloTemario[] | string; // Puede ser array de módulos o HTML string
  duracion: string;
  precio: string;
}

export interface ModuloPresencial {
  modulo: number;
  titulo: string;
  contenido: string[];
}

export interface Curso {
  id: number;
  slug: string;
  nombre: string;
  titulo?: string; // Para cursos presenciales con títulos específicos
  subtitulo?: string; // Subtítulo adicional
  descripcion: string;
  imagen?: string;
  certificacion?: string;
  tipoTrayecto?: string;
  modalidadEstudio?: string;
  duracionCompleta?: string;
  objetivosGenerales?: string;
  temario?: ModuloPresencial[]; // Para cursos presenciales
  salidaLaboral?: string[];
  modalidadEvaluacion?: string;
  modalidades: Modalidad[];
}

export const slugify = (text: string): string => {
  return (text || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

function buildTemarioFromFlatList(tituloBase: string, flat: string[] = []): ModuloTemario[] {
  if (!flat.length) return [];
  // Construimos un temario básico: cada entrada del array plano será una unidad dentro de un único módulo
  return [
    {
      modulo: 1,
      titulo: tituloBase || 'Contenido del curso',
      unidades: flat,
    },
  ];
}

// Sedes presenciales conocidas en el proyecto actual
const SEDES_PRESENCIALES = ['Morón', 'Lomas de Zamora', 'Avellaneda'];

const removeCursoPrefix = (value?: string): string => {
  if (!value) return '';
  const cleaned = value.replace(/^\s*curso\s+de\s+/i, '').trim();
  return cleaned || value.trim();
};

const cleanModuloTitle = (value: string): string => {
  return value
    .replace(/^\s*[\p{So}\p{Sk}\p{Sm}\p{Sc}]+\s*/u, '')
    .replace(/^módulo\s+\d+\s*:\s*/i, '')
    .replace(/^módulo\s+\d+\s*/i, '')
    .trim();
};

const sanitizeModalidadTemario = (temario?: ModuloTemario[] | string): ModuloTemario[] | string | undefined => {
  if (!Array.isArray(temario)) return temario;
  return temario.map(modulo => ({
    ...modulo,
    titulo: (() => {
      if (!modulo.titulo) {
        return modulo.modulo ? `Módulo ${modulo.modulo}` : '';
      }
      const cleaned = cleanModuloTitle(modulo.titulo);
      if (cleaned.length === 0) {
        return modulo.modulo ? `Módulo ${modulo.modulo}` : modulo.titulo;
      }
      return cleaned;
    })(),
  }));
};

const sanitizeCursoTitles = <T extends { nombre?: string; titulo?: string; temario?: ModuloTemario[] | string; modalidades?: Modalidad[] }>(curso: T): T => {
  if (curso.nombre) {
    curso.nombre = removeCursoPrefix(curso.nombre);
  }
  if (curso.titulo) {
    curso.titulo = removeCursoPrefix(curso.titulo);
  }
  curso.temario = sanitizeModalidadTemario(curso.temario) ?? curso.temario;
  if (Array.isArray(curso.modalidades)) {
    curso.modalidades = curso.modalidades.map(modalidad => ({
      ...modalidad,
      temario: sanitizeModalidadTemario(modalidad.temario) ?? modalidad.temario,
    }));
  }
  return curso;
};

function loadOverrideForSlug(slug: string): Partial<Curso> | null {
  try {
    const overridesDir = path.join(process.cwd(), 'src', 'data', 'cursos_v2');
    const overrideFile = path.join(overridesDir, `${slug}.json`);
    if (fs.existsSync(overrideFile)) {
      const raw = fs.readFileSync(overrideFile, 'utf8');
      const parsed = JSON.parse(raw);
      return parsed as Partial<Curso>;
    }
  } catch (e) {
    console.warn(`[cursos.ts] No se pudo leer override para ${slug}:`, (e as Error).message);
  }
  return null;
}

export const cursos: Curso[] = (legacyCursos as any[]).map((c, idx) => {
  const id = idx + 1;
  const slug: string = c.slug;
  const rawNombre: string = c.titulo || c.nombre || c.title || '';
  const rawTitulo: string | undefined = c.titulo;
  const subtitulo: string | undefined = c.subtitulo;
  const descripcion: string = c.descripcion || c.description || '';
  const imagen: string | undefined = c.imagen || c.image;
  const certificacion: string | undefined = c.certificacion;
  const tipoTrayecto: string | undefined = c.tipoTrayecto;
  const modalidadEstudio: string | undefined = c.modalidadEstudio;
  const duracionCompleta: string | undefined = c.duracionCompleta;
  const objetivosGenerales: string | undefined = c.objetivosGenerales;
  const salidaLaboral: string[] | undefined = c.salidaLaboral;
  const modalidadEvaluacion: string | undefined = c.modalidadEvaluacion;
  const modalidadText: string = (c.modalidad || '').toLowerCase();
  const hasOnline = modalidadText.includes('online');
  const hasPresencial = modalidadText.includes('presencial');
  const duracion: string = c.duracion || c.duration || '';
  const precioDefault = 'Consultar';

  // Verificar si el temario ya tiene la estructura de ModuloTemario
  let temarioEstandar: ModuloTemario[] | string;
  
  if (Array.isArray(c.temario) && c.temario.length > 0 && typeof c.temario[0] === 'object' && c.temario[0].modulo) {
    // Ya tiene la estructura correcta de ModuloTemario
    temarioEstandar = c.temario as ModuloTemario[];
  } else if (typeof c.temario === 'string') {
    // Es un string HTML
    temarioEstandar = c.temario;
  } else if (Array.isArray(c.temario)) {
    // Es un array plano de strings
    temarioEstandar = buildTemarioFromFlatList('Temario general', c.temario);
  } else {
    // Fallback
    temarioEstandar = [];
  }

  const modalidades: Modalidad[] = [];
  if (hasOnline) {
    modalidades.push({
      tipo: 'online',
      temario: temarioEstandar,
      duracion: 'Duración aproximada 2 a 3 meses',
      precio: 'Oferta $150.000 (En un pago)',
    });
  }
  if (hasPresencial) {
    // Detectar sedes específicas mencionadas en la modalidad
    const sedesEspecificas = [];
    if (modalidadText.includes('morón') || modalidadText.includes('moron')) {
      sedesEspecificas.push('Morón');
    }
    if (modalidadText.includes('lomas')) {
      sedesEspecificas.push('Lomas de Zamora');
    }
    if (modalidadText.includes('avellaneda')) {
      sedesEspecificas.push('Avellaneda');
    }
    
    // Solo usar sedes específicas si están explícitamente mencionadas
    // Si no se especifican sedes, NO crear modalidades presenciales
    const sedesAUsar = sedesEspecificas.length > 0 ? sedesEspecificas : [];
    
    for (const sede of sedesAUsar) {
      modalidades.push({
        tipo: 'presencial',
        sede,
        temario: temarioEstandar,
        duracion,
        precio: precioDefault,
      });
    }
  }

  // Aplicar override si existe (reemplaza campos provistos)
  const override = loadOverrideForSlug(slug);
  if (override) {
    const merged: Curso = {
      id,
      slug,
      nombre: rawNombre,
      titulo: rawTitulo,
      subtitulo,
      descripcion,
      imagen,
      certificacion,
      tipoTrayecto,
      modalidadEstudio,
      duracionCompleta,
      objetivosGenerales,
      temario: c.temario, // Mantener el temario original del curso presencial
      salidaLaboral,
      modalidadEvaluacion,
      modalidades,
      ...override,
    } as Curso;
    // Asegurar id y slug correctos si no vinieron en override
    merged.id = typeof override.id === 'number' ? override.id : id;
    merged.slug = override.slug || slug;
    return sanitizeCursoTitles(merged);
  }

  const result = { 
    id, 
    slug, 
    nombre: rawNombre, 
    titulo: rawTitulo,
    subtitulo,
    descripcion, 
    imagen,
    certificacion,
    tipoTrayecto,
    modalidadEstudio,
    duracionCompleta,
    objetivosGenerales,
    temario: c.temario,
    salidaLaboral,
    modalidadEvaluacion,
    modalidades 
  } as Curso;

  return sanitizeCursoTitles(result);
});

export default cursos;


