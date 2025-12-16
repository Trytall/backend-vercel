# Script para preparar archivos para Vercel
Write-Host "`n📦 Preparando archivos para Vercel...`n" -ForegroundColor Green

# Crear carpeta temporal para Vercel
$vercelFolder = "vercel-backend-temp"
if (Test-Path $vercelFolder) {
    Remove-Item -Path $vercelFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $vercelFolder | Out-Null
New-Item -ItemType Directory -Path "$vercelFolder/api" | Out-Null
New-Item -ItemType Directory -Path "$vercelFolder/api/middleware" | Out-Null

Write-Host "✅ Carpetas creadas" -ForegroundColor Green

# Copiar archivos necesarios
Copy-Item -Path "api/vercel.js" -Destination "$vercelFolder/api/vercel.js"
Copy-Item -Path "api/middleware/security-logger.js" -Destination "$vercelFolder/api/middleware/security-logger.js"
Copy-Item -Path "api/middleware/validation.js" -Destination "$vercelFolder/api/middleware/validation.js"
Copy-Item -Path "vercel.json" -Destination "$vercelFolder/vercel.json"

Write-Host "✅ Archivos copiados" -ForegroundColor Green

# Crear package.json mínimo para Vercel
$packageJson = @{
    name = "backend-vercel"
    version = "1.0.0"
    type = "module"
    dependencies = @{
        express = "^5.1.0"
        cors = "^2.8.5"
        dotenv = "^17.2.1"
        mercadopago = "^2.8.0"
        axios = "^1.11.0"
        nodemailer = "^7.0.11"
        "express-rate-limit" = "^8.0.1"
        helmet = "^8.1.0"
    }
} | ConvertTo-Json -Depth 10

$packageJson | Out-File -FilePath "$vercelFolder/package.json" -Encoding UTF8

Write-Host "✅ package.json creado" -ForegroundColor Green

Write-Host "`n📋 Archivos listos en: $vercelFolder`n" -ForegroundColor Cyan
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Ve a vercel.com" -ForegroundColor White
Write-Host "2. Crea un nuevo proyecto" -ForegroundColor White
Write-Host "3. Sube la carpeta '$vercelFolder' o conecta con GitHub" -ForegroundColor White
Write-Host "4. Configura las variables de entorno" -ForegroundColor White
Write-Host "5. Copia la URL de Vercel y actualízala en el código`n" -ForegroundColor White

