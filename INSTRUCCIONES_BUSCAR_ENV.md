# 🔍 Instrucciones para Encontrar el .env en tu Servidor

## Situación Actual

✅ **Buenas noticias**: Si el pago online con MercadoPago funciona, significa que:
- El archivo `.env` **SÍ existe** en tu servidor
- Está configurado correctamente
- El servidor Node.js lo está leyendo

## Métodos para Encontrarlo

### Método 1: Por SSH (Recomendado)

1. **Conéctate por SSH a tu servidor:**
   ```bash
   ssh usuario@tu-servidor.com
   ```

2. **Ve a la carpeta donde está tu proyecto Node.js:**
   ```bash
   cd /ruta/a/tu/proyecto
   # Ejemplos comunes:
   # cd /var/www/html
   # cd /home/usuario/proyecto
   # cd /opt/proyecto
   ```

3. **Busca el archivo .env:**
   ```bash
   # Opción 1: Listar archivos ocultos
   ls -la | grep env
   
   # Opción 2: Buscar recursivamente
   find . -name ".env" -type f
   
   # Opción 3: Buscar cualquier archivo con "env" en el nombre
   find . -name "*env*" -type f
   ```

4. **Si lo encuentras, muéstralo (sin mostrar contraseñas):**
   ```bash
   cat .env | grep -v "PASS\|TOKEN"  # Muestra todo excepto contraseñas
   ```

### Método 2: Verificar desde el Código

1. **Sube el archivo `verificar_configuracion_actual.js` a tu servidor**

2. **Ejecútalo:**
   ```bash
   node verificar_configuracion_actual.js
   ```

3. **Este script te dirá:**
   - Si encuentra el `.env`
   - Dónde está ubicado
   - Qué variables están configuradas (sin mostrar valores sensibles)

### Método 3: Verificar Proceso PM2

Si usas PM2 para correr el servidor:

```bash
# Ver procesos
pm2 list

# Ver información del proceso (muestra el working directory)
pm2 info nombre-del-proceso

# Ver variables de entorno del proceso
pm2 env nombre-del-proceso
```

El `.env` debe estar en el **working directory** que muestra PM2.

### Método 4: Panel de Control (cPanel, Plesk)

1. Accede a tu panel de control
2. Ve a **Administrador de Archivos**
3. **Activa "Mostrar archivos ocultos"** (muy importante, el `.env` está oculto)
4. Navega a la carpeta donde está tu proyecto Node.js
5. Busca el archivo `.env`

## Si NO Lo Encuentras

Si después de todos estos métodos no encuentras el `.env`, puede ser que:

1. **Esté en una ubicación no estándar** - El servidor puede estar configurado para leerlo desde otro lugar
2. **Las variables estén en el sistema** - Algunos servidores configuran variables de entorno a nivel de sistema
3. **Esté con otro nombre** - Podría llamarse `.env.production` o similar

## Solución: Crear/Actualizar el .env

Si no lo encuentras pero necesitas actualizarlo:

1. **Crea un nuevo `.env` en la raíz del proyecto Node.js** (misma carpeta que `package.json`)

2. **Usa el contenido de `env.produccion.txt` como base**

3. **Copia los valores actuales** que ya funcionan (puedes verlos en los logs del servidor o en PM2)

4. **Agrega las nuevas variables** que necesitas (como `WEBHOOK_URL`)

## Verificar que Funciona

Después de crear/actualizar el `.env`:

1. **Reinicia el servidor:**
   ```bash
   pm2 restart nombre-del-proceso
   # o
   # Reinicia el proceso Node.js
   ```

2. **Verifica que carga las variables:**
   ```bash
   node verificar_configuracion_actual.js
   ```

3. **Prueba el endpoint de health:**
   ```bash
   curl https://escuelasiade.com.ar/api/health
   ```

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca compartas el contenido completo del `.env` públicamente
- No subas el `.env` a repositorios Git
- Mantén el archivo con permisos restrictivos: `chmod 600 .env`

