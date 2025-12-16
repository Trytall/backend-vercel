<?php
header('Content-Type: application/json; charset=utf-8');

// Habilitar preflight si se necesitara CORS en el futuro
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['error'=>'Method not allowed']); exit; }

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!$data) { http_response_code(400); echo json_encode(['error'=>'JSON inválido']); exit; }

// ====== CONFIG ======
$ACCESS_TOKEN = trim('APP_USR-7278900707798742-110117-84d48eff52400bed16c532ee0d698c89-2085180642'); // <-- PRODUCCIÓN
// ====================

$payload = [
  'items' => [[
    'title' => $data['titulo'] ?? 'Curso',
    'quantity' => 1,
    'currency_id' => 'ARS',
    'unit_price' => floatval($data['monto'] ?? 0),
  ]],
  'payer' => [
    'name' => $data['nombre'] ?? '',
    'email' => $data['email'] ?? '',
    'identification' => ['type' => 'DNI', 'number' => $data['dni'] ?? '']
  ],
  'back_urls' => [
    'success' => 'https://escuelasiadeaarg.com/pago-exitoso',
    'failure' => 'https://escuelasiadeaarg.com/pago-fallido',
    'pending'  => 'https://escuelasiadeaarg.com/pago-pendiente'
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

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlerr = curl_error($ch);
curl_close($ch);

if ($response === false) {
  http_response_code(500);
  echo json_encode(['error' => 'cURL error: ' . $curlerr]);
  exit;
}

http_response_code($httpcode);
echo $response; 