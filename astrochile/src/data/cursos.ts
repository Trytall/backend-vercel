// Nuevo modelo unificado de cursos SOLO ONLINE para Chile
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
  tipo: 'online';
  temario: ModuloTemario[] | string; // Puede ser array de módulos o HTML string
  duracion: string;
  precio: string;
}

export interface Curso {
  id: number;
  slug: string;
  nombre: string;
  titulo?: string;
  subtitulo?: string; // Subtítulo adicional
  descripcion: string;
  imagen?: string;
  certificacion?: string;
  tipoTrayecto?: string;
  modalidadEstudio?: string;
  duracionCompleta?: string;
  objetivosGenerales?: string;
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

export const cursos: Curso[] = (legacyCursos as any[])
  .filter(c => {
    // Solo incluir cursos que tengan modalidad online
    const modalidadText = (c.modalidad || '').toLowerCase();
    return modalidadText.includes('online');
  })
  .map((c, idx) => {
    const id = idx + 1;
    const slug: string = c.slug;
    const nombre: string = c.titulo || c.nombre || c.title || '';
    const titulo: string | undefined = c.titulo;
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

    const modalidades: Modalidad[] = [
      {
        tipo: 'online',
        temario: temarioEstandar,
        duracion: 'Duración aproximada 2 a 3 meses',
        precio: 'Oferta $150.000 (En un pago)',
      }
    ];

    // Aplicar override si existe (reemplaza campos provistos)
    const override = loadOverrideForSlug(slug);
    if (override) {
      const merged: Curso = {
        id,
        slug,
        nombre,
        titulo,
        subtitulo,
        descripcion,
        imagen,
        certificacion,
        tipoTrayecto,
        modalidadEstudio,
        duracionCompleta,
        objetivosGenerales,
        salidaLaboral,
        modalidadEvaluacion,
        modalidades,
        ...override,
      } as Curso;
      // Asegurar id y slug correctos si no vinieron en override
      merged.id = typeof override.id === 'number' ? override.id : id;
      merged.slug = override.slug || slug;
      return merged;
    }

    return { 
      id, 
      slug, 
      nombre, 
      titulo,
      subtitulo,
      descripcion, 
      imagen,
      certificacion,
      tipoTrayecto,
      modalidadEstudio,
      duracionCompleta,
      objetivosGenerales,
      salidaLaboral,
      modalidadEvaluacion,
      modalidades 
    } as Curso;
  });

export default cursos;


