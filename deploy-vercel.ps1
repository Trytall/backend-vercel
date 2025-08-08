# Script PowerShell para automatizar el despliegue en Vercel
Write-Host "🚀 Iniciando despliegue automático en Vercel..." -ForegroundColor Green

# Verificar que Vercel CLI esté instalado
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI no encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g vercel
}

# Login a Vercel (si no está logueado)
Write-Host "🔐 Verificando login de Vercel..." -ForegroundColor Yellow
try {
    vercel whoami
    Write-Host "✅ Ya estás logueado en Vercel" -ForegroundColor Green
} catch {
    Write-Host "🔑 Iniciando login de Vercel..." -ForegroundColor Yellow
    vercel login
}

# Desplegar en Vercel
Write-Host "📦 Desplegando en Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ ¡Despliegue completado!" -ForegroundColor Green
Write-Host "🌐 Tu backend está disponible en: https://backend-vercel.vercel.app" -ForegroundColor Cyan
Write-Host "📊 Health check: https://backend-vercel.vercel.app/api/health" -ForegroundColor Cyan 