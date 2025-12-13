#!/bin/bash

# Script de Despliegue para LatinoAmericaHosting
echo "🚀 Iniciando despliegue..."

# 1. Construir el frontend
echo "📦 Construyendo frontend..."
npm run build

# 2. Preparar archivos para subir
echo "📁 Preparando archivos..."
cp -r dist/* public_html/

# 3. Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
cp .env.production public_html/.env

# 4. Instalar dependencias del servidor
echo "📦 Instalando dependencias del servidor..."
npm install --production

# 5. Configurar PM2
echo "🔧 Configurando PM2..."
pm2 start api/server.js --name "iade-api"
pm2 save

# 6. Configurar Nginx (si es necesario)
echo "🌐 Configurando Nginx..."
# El archivo de configuración de Nginx debe ser configurado manualmente

echo "✅ Despliegue completado!"
echo "🌐 Frontend: https://tu-dominio.com"
echo "🔧 API: https://tu-dominio.com/api"
echo "📊 Monitoreo: pm2 status" 