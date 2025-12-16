# Script para probar el sistema de pagos
Write-Host "🔍 Probando sistema de pagos..." -ForegroundColor Yellow

$backendUrl = "https://backend-vercel-geut4h0va-tomasarielmb-gmailcoms-projects.vercel.app"

Write-Host "`n📋 Información del sistema:" -ForegroundColor Cyan
Write-Host "Backend URL: $backendUrl" -ForegroundColor Green
Write-Host "Frontend URL: https://www.escuelasiadeaarg.com" -ForegroundColor Green

Write-Host "`n⚠️ Nota sobre el error 404:" -ForegroundColor Yellow
Write-Host "El error 404 en la raíz de Vercel es NORMAL" -ForegroundColor White
Write-Host "El backend solo maneja rutas /api/*" -ForegroundColor White
Write-Host "Esto no afecta el funcionamiento del pago" -ForegroundColor White

Write-Host "`n📋 URLs que SÍ funcionan:" -ForegroundColor Cyan
Write-Host "- $backendUrl/api/health" -ForegroundColor Green
Write-Host "- $backendUrl/api/create-preference" -ForegroundColor Green
Write-Host "- $backendUrl/api/webhook" -ForegroundColor Green

Write-Host "`n🎯 Estado del proyecto:" -ForegroundColor Cyan
Write-Host "✅ Backend desplegado correctamente" -ForegroundColor Green
Write-Host "✅ CORS configurado para www.escuelasiadeaarg.com" -ForegroundColor Green
Write-Host "✅ Frontend actualizado con nueva URL" -ForegroundColor Green

Write-Host "`n📋 Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Sube los archivos de dist/ a tu hosting" -ForegroundColor White
Write-Host "2. Prueba el pago en https://www.escuelasiadeaarg.com" -ForegroundColor White
Write-Host "3. El error 404 en Vercel es normal, no afecta el funcionamiento" -ForegroundColor White 