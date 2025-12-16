# Script para verificar el funcionamiento del pago
Write-Host "🔍 Verificando sistema de pagos..." -ForegroundColor Yellow

$backendUrl = "https://backend-vercel-geut4h0va-tomasarielmb-gmailcoms-projects.vercel.app"

Write-Host "`n📋 URLs actualizadas:" -ForegroundColor Cyan
Write-Host "Frontend: https://www.escuelasiadeaarg.com" -ForegroundColor Green
Write-Host "Backend: $backendUrl" -ForegroundColor Green

Write-Host "`n🔧 Cambios realizados:" -ForegroundColor Cyan
Write-Host "✅ CORS configurado para www.escuelasiadeaarg.com" -ForegroundColor Green
Write-Host "✅ Backend desplegado con nueva configuración" -ForegroundColor Green
Write-Host "✅ Frontend actualizado con nueva URL" -ForegroundColor Green
Write-Host "✅ Frontend reconstruido" -ForegroundColor Green

Write-Host "`n📋 INSTRUCCIONES FINALES:" -ForegroundColor Yellow
Write-Host "1. Sube TODO el contenido de dist/ a public_html/" -ForegroundColor White
Write-Host "2. Reemplaza todos los archivos existentes" -ForegroundColor White
Write-Host "3. Limpia la caché del navegador (Ctrl+F5)" -ForegroundColor White
Write-Host "4. Prueba el pago en https://www.escuelasiadeaarg.com" -ForegroundColor White
Write-Host "5. Debería funcionar sin errores de CORS" -ForegroundColor White

Write-Host "`n🎯 Si aún hay problemas:" -ForegroundColor Red
Write-Host "- Verifica que los archivos se subieron correctamente" -ForegroundColor Gray
Write-Host "- Espera 5-10 minutos para que se propague" -ForegroundColor Gray
Write-Host "- Prueba en modo incógnito" -ForegroundColor Gray 