#!/bin/bash
# Script para buscar el archivo .env en el servidor
# Ejecuta este script en tu servidor por SSH

echo "🔍 Buscando archivo .env en el servidor..."
echo ""

# Buscar en la carpeta actual y subcarpetas
echo "1. Buscando en la carpeta actual y subcarpetas:"
find . -name ".env" -type f 2>/dev/null

echo ""
echo "2. Buscando archivos que contengan 'env' en el nombre:"
find . -name "*env*" -type f 2>/dev/null | head -20

echo ""
echo "3. Verificando si hay variables de entorno configuradas en el sistema:"
env | grep -E "(MERCADOPAGO|SMTP|EMAIL|WEBHOOK)" | head -10

echo ""
echo "4. Buscando en ubicaciones comunes:"
for dir in ~ /var/www /home /opt /usr/local; do
    if [ -d "$dir" ]; then
        echo "   Buscando en $dir..."
        find "$dir" -name ".env" -type f 2>/dev/null | head -5
    fi
done

echo ""
echo "✅ Búsqueda completada"

