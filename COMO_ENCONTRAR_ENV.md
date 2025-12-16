# 🔍 Cómo Encontrar el Archivo .env en tu Servidor

## Ubicación del Archivo .env

El archivo `.env` debe estar en **la misma carpeta** donde están estos archivos:
- `package.json`
- `api/server.js`
- `api/vercel.js`

## Formas de Encontrarlo

### Opción 1: Por SSH/Terminal

Si tienes acceso SSH a tu servidor:

```bash
# 1. Conecta por SSH a tu servidor
ssh usuario@tu-servidor.com

# 2. Ve a la carpeta donde está tu proyecto
cd /ruta/a/tu/proyecto

# 3. Lista archivos ocultos (el .env está oculto porque empieza con punto)
ls -la

# O busca específicamente el archivo .env
find . -name ".env" -type f
```

### Opción 2: Por Panel de Control (cPanel, Plesk, etc.)

1. Accede a tu panel de control
2. Ve al **Administrador de Archivos**
3. Navega a la carpeta donde está tu proyecto Node.js
4. Activa la opción "Mostrar archivos ocultos" (usualmente en configuración)
5. Busca el archivo `.env`

### Opción 3: Verificar desde dónde se ejecuta el servidor

Si el servidor está corriendo con PM2 o similar:

```bash
# Ver procesos PM2
pm2 list

# Ver información del proceso (muestra el working directory)
pm2 info iade-api

# O ver variables de entorno del proceso
pm2 env iade-api
```

El `.env` debe estar en el **working directory** (directorio de trabajo) mostrado ahí.

## Estructura Típica

```
/proyecto/
├── .env                    ← AQUÍ debe estar
├── package.json
├── api/
│   ├── server.js
│   ├── vercel.js
│   └── middleware/
└── dist/                   ← Carpeta del sitio web
```

## Si NO Existe el Archivo .env

Si no encuentras el archivo `.env` en tu servidor, necesitas crearlo:

1. Crea un nuevo archivo llamado `.env` (con el punto al inicio)
2. Copia el contenido de `env.produccion.txt`
3. Completa las variables con tus valores reales:
   - `MERCADOPAGO_ACCESS_TOKEN` (lo más importante)
   - Las demás variables ya están configuradas

## Comandos Útiles

```bash
# Ver el contenido del .env (si existe)
cat .env

# Crear un nuevo .env desde el template
cp env.produccion.txt .env

# Editar el .env
nano .env
# o
vi .env
```

## Importante

- El archivo `.env` puede estar oculto (empieza con punto)
- Debe estar en la misma carpeta donde ejecutas `node api/server.js`
- No debe estar dentro de la carpeta `dist/` (esa es solo para el sitio web)
- Debe estar en la raíz del proyecto Node.js

