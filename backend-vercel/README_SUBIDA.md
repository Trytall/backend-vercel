# 🚀 Instrucciones para Subir el Proyecto a Vercel

## 📁 Archivos Incluidos:

- ✅ `api/vercel.js` - API principal
- ✅ `api/middleware/` - Middleware de seguridad
- ✅ `package.json` - Dependencias
- ✅ `vercel.json` - Configuración de Vercel
- ✅ `.env.production` - Variables de entorno (para producción)
- ✅ `VARIABLES_ENTORNO.txt` - Variables de entorno (formato texto)

---

## 🎯 Opciones para Subir:

### Opción A: Arrastrar y Soltar (Más Fácil)

1. Ve a [vercel.com](https://vercel.com)
2. **Add New Project**
3. **Arrastra esta carpeta completa** a Vercel
4. Vercel detectará automáticamente el proyecto
5. Haz clic en **"Deploy"**

### Opción B: Desde GitHub

1. Crea un repositorio en GitHub
2. Sube el contenido de esta carpeta
3. En Vercel: **Import Project** → Selecciona el repositorio
4. Haz clic en **"Deploy"**

### Opción C: Vercel CLI

```bash
cd backend-vercel
npx vercel login
npx vercel
npx vercel --prod
```

---

## ⚙️ Configurar Variables de Entorno:

### Opción 1: Subir desde archivo (si Vercel lo permite)

1. Ve a **Settings** → **Environment Variables**
2. Busca **"Import"** o **"Upload"**
3. Selecciona `.env.production`
4. Selecciona **Production** y **Preview**
5. Importa

### Opción 2: Copiar desde VARIABLES_ENTORNO.txt

1. Abre `VARIABLES_ENTORNO.txt`
2. Ve a **Settings** → **Environment Variables**
3. Copia cada línea y agrégala manualmente
4. O copia todo el contenido y pégalo (si Vercel lo permite)

### Opción 3: Usar Vercel CLI

```bash
cd backend-vercel
npx vercel env push .env.production production
npx vercel env push .env.production preview
```

---

## ✅ Después del Deploy:

1. **Haz redeploy** para aplicar las variables de entorno
2. **Verifica el health check:**
   - `https://tu-proyecto.vercel.app/api/health`
   - Debe mostrar `"mercadopago": true`
3. **Listo!** Tu API está funcionando

