<?php
header('Content-Type: application/json; charset=utf-8');

// Solo permitir desde el mismo dominio
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$host = $_SERVER['HTTP_HOST'] ?? '';
if ($origin && parse_url($origin, PHP_URL_HOST) === $host) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit; }

// Desactivar errores visibles en producción
if (!defined('STDIN')) { ini_set('display_errors', '0'); }

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) { http_response_code(400); echo json_encode(['error'=>'JSON inválido']); exit; }

// ===== reCAPTCHA v3 verification =====
$recaptchaToken = (string)($data['recaptcha_token'] ?? '');
$recaptchaSecret = '6Lfvg6ErAAAAAAOsSD0rycvtCW2RtL5QD8WO3waB'; // Secret key directa
if ($recaptchaToken) {
  $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($recaptchaSecret) . '&response=' . urlencode($recaptchaToken);
  $verifyResp = @file_get_contents($verifyUrl);
  if ($verifyResp === false && function_exists('curl_init')) {
    $ch = curl_init($verifyUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $verifyResp = curl_exec($ch);
    curl_close($ch);
  }
  $verifyData = json_decode($verifyResp ?: '[]', true);
  if (!($verifyData['success'] ?? false) || floatval($verifyData['score'] ?? 0) < 0.5) {
    http_response_code(403);
    echo json_encode(['error' => 'recaptcha_failed', 'score' => floatval($verifyData['score'] ?? 0)]);
    exit;
  }
} else {
  // si no hay token, bloquear por seguridad
  http_response_code(400);
  echo json_encode(['error' => 'missing_recaptcha_token']);
  exit;
}
// =====================================

// ====== CONFIG ======
$ACCESS_TOKEN = 'APP_USR-7278900707798742-110117-84d48eff52400bed16c532ee0d698c89-2085180642';
$BASE_URL = 'https://escuelasiade.com.ar/iadeverde/argentina';
// ====================

// Validaciones básicas
function clean_string($v) { return trim(htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8')); }
$nombre   = clean_string($data['nombre']   ?? '');
$dni      = preg_replace('/[^0-9]/', '', (string)($data['dni'] ?? ''));
$email    = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
$telefono = clean_string($data['telefono'] ?? '');
$provincia= clean_string($data['provincia']?? '');
$localidad= clean_string($data['localidad']?? '');
$titulo   = clean_string($data['titulo']   ?? ($data['curso'] ?? 'Curso'));
$monto    = floatval($data['monto'] ?? 0);
if ($monto <= 0 || $monto > 2000000) { http_response_code(400); echo json_encode(['error'=>'Monto inválido']); exit; }
if (!$email) { http_response_code(400); echo json_encode(['error'=>'Email inválido']); exit; }

// Querystring con datos para las páginas de retorno (fallback de sessionStorage)
$qs = http_build_query([
  'nombre'   => $nombre,
  'dni'      => $dni,
  'email'    => $email,
  'telefono' => $telefono,
  'provincia'=> $provincia,
  'localidad'=> $localidad,
  'curso'    => $titulo,
]);

$payload = [
  'items' => [[
    'title' => $titulo,
    'quantity' => 1,
    'currency_id' => 'ARS',
    'unit_price' => $monto,
  ]],
  'payer' => [
    'name' => $nombre,
    'email' => $email,
    'identification' => ['type' => 'DNI', 'number' => $dni]
  ],
  'back_urls' => [
    'success' => $BASE_URL . '/pago-exitoso'  . ($qs ? ('?' . $qs) : ''),
    'failure' => $BASE_URL . '/pago-fallido'  . ($qs ? ('?' . $qs) : ''),
    'pending' => $BASE_URL . '/pago-pendiente'. ($qs ? ('?' . $qs) : ''),
  ],
  'auto_return' => 'approved'
];

$ch = curl_init('https://api.mercadopago.com/checkout/preferences');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'Content-Type: application/json',
  'Authorization: ' . 'Bearer ' . $ACCESS_TOKEN
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlerr = curl_error($ch);
curl_close($ch);

if ($response === false) {
  http_response_code(502);
  echo json_encode(['error' => 'gateway_unavailable', 'detail' => $curlerr]);
  exit;
}

http_response_code($httpcode ?: 200);
echo $response; 