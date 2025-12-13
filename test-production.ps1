# Script PowerShell para probar el backend en producción
Write-Host "🧪 Probando backend en producción..." -ForegroundColor Green

$API_URL = "https://backend-vercel.vercel.app"

# Función para hacer requests HTTP
function Test-API {
    param($Url, $Method = "GET", $Body = $null)
    
    try {
        $headers = @{
            "Content-Type" = "application/json"
        }
        
        if ($Body) {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers -Body ($Body | ConvertTo-Json -Depth 10)
        } else {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $headers
        }
        
        return $response
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# 1. Probar Health Check
Write-Host "📊 Probando Health Check..." -ForegroundColor Yellow
$health = Test-API "$API_URL/api/health"
if ($health) {
    Write-Host "✅ Health Check exitoso:" -ForegroundColor Green
    $health | ConvertTo-Json -Depth 10 | Write-Host -ForegroundColor Cyan
} else {
    Write-Host "❌ Health Check falló" -ForegroundColor Red
}

# 2. Probar Create Preference
Write-Host "💳 Probando Create Preference..." -ForegroundColor Yellow
$testData = @{
    nombre = "Test User"
    email = "test@example.com"
    telefono = "1234567890"
    provincia = "Buenos Aires"
    localidad = "CABA"
    modalidad = "online"
    cursos = @("Curso Test")
    totalAmount = 150000
}

$preference = Test-API "$API_URL/api/create-preference" "POST" $testData
if ($preference) {
    Write-Host "✅ Create Preference exitoso:" -ForegroundColor Green
    $preference | ConvertTo-Json -Depth 10 | Write-Host -ForegroundColor Cyan
} else {
    Write-Host "❌ Create Preference falló" -ForegroundColor Red
}

Write-Host "🎉 Pruebas completadas!" -ForegroundColor Green 