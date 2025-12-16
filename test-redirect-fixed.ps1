# Script para probar el redireccionamiento
Write-Host "🔍 Probando redireccionamiento..." -ForegroundColor Yellow

$urls = @(
    "https://escuelasiade.com.ar",
    "https://escuelasiade.com.ar/",
    "https://escuelasiade.com.ar/dist/",
    "https://escuelasiade.com.ar/dist/index.html"
)

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method HEAD -TimeoutSec 10
        Write-Host "✅ $url - Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "❌ $url - Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n📋 SOLUCIÓN ALTERNATIVA:" -ForegroundColor Cyan
Write-Host "Si el .htaccess no funciona, prueba esto:" -ForegroundColor White
Write-Host "1. Ve al panel de control de Latinoamérica Hosting" -ForegroundColor Gray
Write-Host "2. Busca 'Document Root' o 'Directorio raíz'" -ForegroundColor Gray
Write-Host "3. Cambia de 'public_html' a 'public_html/dist'" -ForegroundColor Gray
Write-Host "4. Guarda los cambios" -ForegroundColor Gray
Write-Host "5. Espera 5-10 minutos y prueba de nuevo" -ForegroundColor Gray 