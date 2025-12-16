// Script para verificar la configuración actual del servidor
// Ejecuta: node verificar_configuracion_actual.js

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verificando configuración del servidor...\n');
console.log('Directorio actual:', process.cwd());
console.log('Directorio del script:', __dirname);
console.log('');

// Intentar cargar .env desde diferentes ubicaciones
const posiblesUbicaciones = [
  join(process.cwd(), '.env'),
  join(__dirname, '.env'),
  join(process.cwd(), '..', '.env'),
  join(__dirname, '..', '.env'),
];

let envEncontrado = false;
for (const ubicacion of posiblesUbicaciones) {
  if (existsSync(ubicacion)) {
    console.log(`✅ Archivo .env encontrado en: ${ubicacion}`);
    envEncontrado = true;
    
    // Cargar y mostrar (sin mostrar valores sensibles)
    dotenv.config({ path: ubicacion });
    break;
  }
}

if (!envEncontrado) {
  console.log('⚠️  No se encontró archivo .env en las ubicaciones comunes');
  console.log('Intentando cargar desde ubicación por defecto...');
  dotenv.config();
}

console.log('\n📋 Variables de entorno detectadas:');
console.log('─'.repeat(60));

const variables = {
  'MERCADOPAGO_ACCESS_TOKEN': process.env.MERCADOPAGO_ACCESS_TOKEN ? '✅ Configurado' : '❌ No configurado',
  'SMTP_HOST': process.env.SMTP_HOST || 'No configurado',
  'SMTP_USER': process.env.SMTP_USER || 'No configurado',
  'SMTP_PASS': process.env.SMTP_PASS ? '✅ Configurado' : '❌ No configurado',
  'EMAIL_NOTIFICACIONES': process.env.EMAIL_NOTIFICACIONES || 'No configurado',
  'WEBHOOK_URL': process.env.WEBHOOK_URL || 'No configurado',
  'PORT': process.env.PORT || '3000 (default)',
  'NODE_ENV': process.env.NODE_ENV || 'No configurado',
};

Object.entries(variables).forEach(([key, value]) => {
  // Ocultar valores sensibles
  if (key.includes('PASS') || key.includes('TOKEN')) {
    console.log(`${key}: ${value}`);
  } else {
    console.log(`${key}: ${value}`);
  }
});

console.log('─'.repeat(60));
console.log('\n💡 Si las variables están configuradas, el .env está funcionando correctamente');
console.log('   Aunque no lo encuentres, puede estar en una ubicación no estándar');

