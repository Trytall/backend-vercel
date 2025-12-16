# 📤 Cómo Subir backend-vercel a Vercel

## Opción 1: Arrastrar y Soltar (MÁS FÁCIL) ⭐

Si Vercel permite drag & drop:

1. En la página de Vercel donde estás ("New Project")
2. Busca si hay una zona que diga "Drag & Drop" o "Upload"
3. Si NO aparece, ve a la **Opción 2**

---

## Opción 2: Desde GitHub (RECOMENDADO)

### Paso 1: Subir a GitHub

1. Ve a tu carpeta `backend-vercel` en tu computadora
2. Abre Git Bash o Terminal allí
3. Ejecuta estos comandos:

```bash
cd backend-vercel
git init
git add .
git commit -m "Backend API para Vercel"
```

4. Ve a [github.com](https://github.com) y crea un repositorio nuevo:
   - Haz clic en "+" → "New repository"
   - Nombre: `backend-vercel` (o el que prefieras)
   - NO marques "Initialize with README"
   - Haz clic en "Create repository"

5. Copia la URL del repositorio (ej: `https://github.com/tu-usuario/backend-vercel.git`)

6. En tu terminal, ejecuta:
```bash
git remote add origin https://github.com/tu-usuario/backend-vercel.git
git branch -M main
git push -u origin main
```

### Paso 2: Importar en Vercel

1. En la página de Vercel donde estás
2. En "Import Git Repository", busca tu repositorio `backend-vercel`
3. Si no aparece, haz clic en "Install" para conectar GitHub
4. Selecciona el repositorio `backend-vercel`
5. Haz clic en "Import"

---

## Opción 3: Vercel CLI (Rápido)

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login y Deploy

```bash
cd backend-vercel
vercel login
vercel
```

Sigue las instrucciones en pantalla. Te pedirá:
- ¿Set up and deploy? → **Yes**
- ¿Which scope? → Selecciona tu cuenta
- ¿Link to existing project? → **No**
- ¿What's your project's name? → `backend-vercel`
- ¿In which directory is your code located? → **./** (presiona Enter)

¡Listo! Vercel desplegará automáticamente.

---

## ¿Cuál elegir?

- **Opción 2 (GitHub)**: Mejor si quieres mantener control de versiones
- **Opción 3 (CLI)**: Más rápido, directo desde tu computadora

**Recomendación:** Opción 3 (CLI) es la más rápida si tienes Node.js instalado.

