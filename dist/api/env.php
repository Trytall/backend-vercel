<?php
// Simple loader to fetch configuration without UTF-8/BOM issues
// Precedence: real env/$_ENV/$_SERVER → .env.php (array) → .env (KEY=VALUE)

static $IADE_ENV_CACHE = null;

function iade_env_load(): array {
  global $IADE_ENV_CACHE;
  if (is_array($IADE_ENV_CACHE)) return $IADE_ENV_CACHE;

  $config = [];

  // 1) Preload current environment
  foreach (['_SERVER','_ENV'] as $src) {
    if (isset($GLOBALS[$src]) && is_array($GLOBALS[$src])) {
      foreach ($GLOBALS[$src] as $k => $v) { if (is_string($k) && is_string($v)) $config[$k] = $v; }
    }
  }

  // 2) .env.php => returns array ['KEY'=>'VALUE'] (avoid BOM problems)
  $envPhp = __DIR__ . '/.env.php';
  if (is_file($envPhp)) {
    $arr = @include $envPhp; // must return array
    if (is_array($arr)) {
      foreach ($arr as $k => $v) { if (is_string($k)) $config[$k] = (string)$v; }
    }
  } else {
    // 3) .env plain text
    $envTxt = __DIR__ . '/.env';
    if (is_file($envTxt)) {
      $raw = file_get_contents($envTxt);
      if ($raw !== false) {
        // strip UTF-8 BOM if present
        if (strncmp($raw, "\xEF\xBB\xBF", 3) === 0) { $raw = substr($raw, 3); }
        foreach (preg_split('/\r?\n/', $raw) as $line) {
          $line = trim($line);
          if ($line === '' || $line[0] === '#') continue;
          if (!strpos($line, '=')) continue;
          list($k, $v) = array_map('trim', explode('=', $line, 2));
          $v = trim($v, "\"' ");
          if ($k !== '') $config[$k] = $v;
        }
      }
    }
  }

  return $IADE_ENV_CACHE = $config;
}

function env_val(string $key, $default = null) {
  $cfg = iade_env_load();
  // getenv last since it may add non-ASCII on some Windows setups
  if (array_key_exists($key, $cfg)) return $cfg[$key];
  $get = getenv($key);
  return $get !== false ? $get : $default;
}