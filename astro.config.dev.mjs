import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config - Configuración para desarrollo
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
  ],
  output: 'static',
  site: 'http://localhost:4330',
  base: '/',
  build: {
    assets: '_astro'
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },
  server: {
    port: 4330,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
