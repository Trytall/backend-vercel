# Script para desplegar backend-vercel a Vercel
Write-Host "`n🚀 Desplegando backend-vercel a Vercel...`n" -ForegroundColor Green

# Verificar si Vercel CLI está instalado
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 Vercel CLI no encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error instalando Vercel CLI. Por favor instálalo manualmente:" -ForegroundColor Red
        Write-Host "   npm install -g vercel" -ForegroundColor White
        exit 1
    }
}

# Cambiar a la carpeta backend-vercel
Set-Location -Path "backend-vercel"

Write-Host "`n📂 Ubicado en: backend-vercel" -ForegroundColor Cyan
Write-Host "`n🔐 Iniciando login de Vercel..." -ForegroundColor Yellow
Write-Host "   (Te pedirá que inicies sesión en el navegador)`n" -ForegroundColor Gray

# Login
vercel login

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n🚀 Iniciando deploy..." -ForegroundColor Yellow
    vercel
    
    Write-Host "`n✅ ¡Deploy completado!`n" -ForegroundColor Green
    Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "   1. Copia la URL que te dio Vercel" -ForegroundColor White
    Write-Host "   2. Configura las variables de entorno en Vercel Dashboard" -ForegroundColor White
    Write-Host "   3. Comparte la URL conmigo para actualizar el código`n" -ForegroundColor White
} else {
    Write-Host "`n❌ Error durante el deploy" -ForegroundColor Red
}

# Volver al directorio original
Set-Location -Path ".."

