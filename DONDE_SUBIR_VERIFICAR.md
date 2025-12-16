# 📍 Dónde Subir `verificar_configuracion_actual.js`

## Ubicación Correcta

Sube el archivo `verificar_configuracion_actual.js` a la **misma carpeta** donde están estos archivos en tu servidor:

```
tu-proyecto-en-servidor/
├── package.json              ← Debe estar aquí
├── api/
│   ├── server.js
│   ├── vercel.js
│   └── middleware/
├── verificar_configuracion_actual.js  ← SUBE EL ARCHIVO AQUÍ
└── (posiblemente .env aquí también)
```

## Ejemplo de Estructura

Si en tu servidor tienes algo como:
```
/var/www/html/
├── package.json
├── api/
│   └── server.js
```

Entonces sube el archivo aquí:
```
/var/www/html/
├── package.json
├── api/
│   └── server.js
└── verificar_configuracion_actual.js  ← AQUÍ
```

## Cómo Encontrar la Carpeta Correcta

### Opción 1: Si usas PM2
```bash
pm2 info nombre-del-proceso
```
El "script path" o "exec cwd" te dirá dónde está corriendo el servidor.

### Opción 2: Buscar package.json
```bash
find / -name "package.json" 2>/dev/null | grep -i iade
# o
find ~ -name "package.json" 2>/dev/null
```

### Opción 3: Verificar desde el proceso Node.js
```bash
ps aux | grep node
```
Esto muestra la ruta completa del proceso Node.js.

## Después de Subirlo

1. **Conéctate por SSH a tu servidor**

2. **Ve a esa carpeta:**
   ```bash
   cd /ruta/a/tu/proyecto
   ```

3. **Ejecuta el script:**
   ```bash
   node verificar_configuracion_actual.js
   ```

4. **El script te mostrará:**
   - Si encuentra el `.env`
   - Dónde está ubicado
   - Qué variables están configuradas

## Nota Importante

El archivo debe estar en la **misma carpeta raíz** del proyecto Node.js, no dentro de `api/` ni dentro de `dist/`.

