# Script para verificar la estructura del hosting
Write-Host "🔍 Verificando estructura del hosting..." -ForegroundColor Yellow

# Verificar si el sitio responde
try {
    $response = Invoke-WebRequest -Uri "https://escuelasiade.com.ar" -Method HEAD -TimeoutSec 10
    Write-Host "✅ Sitio responde: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al conectar al sitio" -ForegroundColor Red
    Write-Host $_.Exception.Message
}

# Verificar si existe la carpeta dist
try {
    $distResponse = Invoke-WebRequest -Uri "https://escuelasiade.com.ar/dist/" -Method HEAD -TimeoutSec 10
    Write-Host "✅ Carpeta dist accesible" -ForegroundColor Green
} catch {
    Write-Host "❌ Carpeta dist no accesible" -ForegroundColor Red
}

Write-Host "`n📋 INSTRUCCIONES PARA SOLUCIONAR:" -ForegroundColor Cyan
Write-Host "1. Sube el archivo .htaccess-fix a la RAÍZ de public_html" -ForegroundColor White
Write-Host "2. Renómbralo a .htaccess" -ForegroundColor White
Write-Host "3. Verifica que la estructura sea:" -ForegroundColor White
Write-Host "   public_html/" -ForegroundColor Gray
Write-Host "   ├── .htaccess" -ForegroundColor Gray
Write-Host "   └── dist/" -ForegroundColor Gray
Write-Host "       ├── index.html" -ForegroundColor Gray
Write-Host "       └── ..." -ForegroundColor Gray
Write-Host "`n4. Limpia la caché del navegador (Ctrl+F5)" -ForegroundColor White
Write-Host "5. Prueba: https://escuelasiade.com.ar" -ForegroundColor White 