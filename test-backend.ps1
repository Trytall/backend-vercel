# Script para probar el backend actualizado
Write-Host "🔍 Probando backend actualizado..." -ForegroundColor Yellow

$backendUrl = "https://backend-vercel-9magx87n6-tomasarielmb-gmailcoms-projects.vercel.app"

# Probar health check
Write-Host "`n🏥 Probando health check..." -ForegroundColor Cyan
try {
    $health = Invoke-WebRequest -Uri "$backendUrl/api/health" -Method GET -TimeoutSec 10
    Write-Host "✅ Health check: $($health.StatusCode)" -ForegroundColor Green
    Write-Host "Contenido: $($health.Content)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Error en health check: $($_.Exception.Message)" -ForegroundColor Red
}

# Probar CORS con diferentes orígenes
Write-Host "`n🌐 Probando CORS..." -ForegroundColor Cyan
$origins = @(
    "https://escuelasiadeaarg.com",
    "https://www.escuelasiadeaarg.com",
    "https://escuelasiade.com.ar",
    "https://www.escuelasiade.com.ar"
)

foreach ($origin in $origins) {
    try {
        $headers = @{
            "Origin" = $origin
            "Access-Control-Request-Method" = "POST"
            "Access-Control-Request-Headers" = "Content-Type"
        }
        
        $cors = Invoke-WebRequest -Uri "$backendUrl/api/health" -Method OPTIONS -Headers $headers -TimeoutSec 10
        Write-Host "✅ CORS para $origin: $($cors.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "❌ CORS para $origin: Error" -ForegroundColor Red
    }
}

Write-Host "`n📋 INSTRUCCIONES:" -ForegroundColor Yellow
Write-Host "1. Sube los archivos actualizados de dist/ a tu hosting" -ForegroundColor White
Write-Host "2. Prueba el pago en https://www.escuelasiadeaarg.com" -ForegroundColor White
Write-Host "3. Debería funcionar sin errores de CORS" -ForegroundColor White 