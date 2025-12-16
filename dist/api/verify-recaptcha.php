<?php
header('Content-Type: application/json; charset=utf-8');

// Cargar helper de env si existe
$envHelper = __DIR__ . '/env.php';
if (is_file($envHelper)) { require_once $envHelper; }

$token = $_POST['token'] ?? $_GET['token'] ?? '';
if (!$token) { http_response_code(400); echo json_encode(['ok'=>false,'error'=>'missing_token']); exit; }

$secret = function_exists('env_val') ? trim(env_val('RECAPTCHA_SECRET', '6Lfvg6ErAAAAAAOsSD0rycvtCW2RtL5QD8WO3waB')) : '6Lfvg6ErAAAAAAOsSD0rycvtCW2RtL5QD8WO3waB';
$remote = $_SERVER['REMOTE_ADDR'] ?? '';

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify?secret='.
  urlencode($secret).'&response='.
  urlencode($token).'&remoteip='.
  urlencode($remote);

$resp = @file_get_contents($verifyUrl);
if ($resp === false) {
  // Fallback a cURL si allow_url_fopen está deshabilitado
  if (function_exists('curl_init')) {
    $ch = curl_init($verifyUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $resp = curl_exec($ch);
    curl_close($ch);
  }
}
$data = json_decode($resp ?: '[]', true) ?: [];

$success = !empty($data['success']);
$score = floatval($data['score'] ?? 0);
$threshold = 0.5;

if ($success && $score >= $threshold) {
  echo json_encode(['ok'=>true,'score'=>$score,'action'=>$data['action'] ?? null]);
} else {
  http_response_code(403);
  echo json_encode(['ok'=>false,'score'=>$score,'error'=>'verification_failed','raw'=>$data]);
}