# Instrucciones para la solución con proxy
Write-Host "🔧 SOLUCIÓN CON PROXY PARA EVITAR CORS" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow

Write-Host "`n📋 Cambios realizados:" -ForegroundColor Cyan
Write-Host "✅ Frontend usa URL relativa /api/create-preference" -ForegroundColor Green
Write-Host "✅ .htaccess con proxy al backend de Vercel" -ForegroundColor Green
Write-Host "✅ Evita problemas de CORS completamente" -ForegroundColor Green
Write-Host "✅ Frontend reconstruido correctamente" -ForegroundColor Green

Write-Host "`n📋 INSTRUCCIONES FINALES:" -ForegroundColor Yellow
Write-Host "1. Sube TODO el contenido de dist/ a public_html/" -ForegroundColor White
Write-Host "2. Sube el archivo .htaccess-proxy como .htaccess" -ForegroundColor White
Write-Host "3. Reemplaza TODOS los archivos existentes" -ForegroundColor White
Write-Host "4. Limpia la caché del navegador (Ctrl+F5)" -ForegroundColor White
Write-Host "5. Prueba el pago en https://escuelasiadeaarg.com" -ForegroundColor White

Write-Host "`n🎯 Cómo funciona:" -ForegroundColor Cyan
Write-Host "✅ El frontend hace peticiones a /api/create-preference" -ForegroundColor Green
Write-Host "✅ El .htaccess redirige /api/* al backend de Vercel" -ForegroundColor Green
Write-Host "✅ No hay problemas de CORS porque es la misma URL" -ForegroundColor Green
Write-Host "✅ El proxy maneja la comunicación transparentemente" -ForegroundColor Green

Write-Host "`n⚠️ Si hay problemas:" -ForegroundColor Red
Write-Host "- Verifica que el .htaccess esté en la raíz de public_html" -ForegroundColor Gray
Write-Host "- Asegúrate de que el hosting soporte mod_rewrite" -ForegroundColor Gray
Write-Host "- Espera 5-10 minutos para que se propague" -ForegroundColor Gray
Write-Host "- Revisa los logs del hosting si es necesario" -ForegroundColor Gray

Write-Host "`n🎉 ¡Esta solución debería funcionar perfectamente!" -ForegroundColor Green 