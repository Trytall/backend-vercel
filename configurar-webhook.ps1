# Script para configurar Webhook en MercadoPago vía API
# Application ID: 7278900707798742

$accessToken = "APP_USR-7278900707798742-110117-84d48eff52400bed16c532ee0d698c89-2085180642"
$appId = "7278900707798742"
$webhookUrl = "https://backend-vercel-silk.vercel.app/api/webhook"

Write-Host "🔧 Configurando Webhook en MercadoPago..." -ForegroundColor Cyan
Write-Host "Application ID: $appId" -ForegroundColor Yellow
Write-Host "Webhook URL: $webhookUrl" -ForegroundColor Yellow
Write-Host ""

# Headers para la petición
$headers = @{
    "Authorization" = "Bearer $accessToken"
    "Content-Type" = "application/json"
}

# Body de la petición
$body = @{
    url = $webhookUrl
    events = @("payment", "payment.created", "payment.updated")
} | ConvertTo-Json

Write-Host "📤 Enviando petición a MercadoPago API..." -ForegroundColor Cyan

try {
    $response = Invoke-RestMethod `
        -Uri "https://api.mercadopago.com/applications/$appId/webhooks" `
        -Method POST `
        -Headers $headers `
        -Body $body `
        -ErrorAction Stop

    Write-Host ""
    Write-Host "✅ Webhook configurado exitosamente!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Respuesta de MercadoPago:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "🎉 Próximos pasos:" -ForegroundColor Green
    Write-Host "1. Hacé un pago de prueba de $1 desde tu página"
    Write-Host "2. Revisá los logs de Vercel para ver si llega el webhook"
    Write-Host "3. Deberías recibir el email en informes@escuelaiade.com"
    
} catch {
    Write-Host ""
    Write-Host "❌ Error al configurar el webhook:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host ""
        Write-Host "Detalles del error:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "💡 Posibles causas:" -ForegroundColor Yellow
    Write-Host "- El webhook ya está configurado (probá verificar primero)"
    Write-Host "- El Access Token no tiene permisos suficientes"
    Write-Host "- La URL del webhook no es accesible públicamente"
    Write-Host ""
    Write-Host "Intentá acceder manualmente a:" -ForegroundColor Cyan
    Write-Host "https://www.mercadopago.com.ar/developers/panel/app/$appId/webhooks" -ForegroundColor Cyan
}
