import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.forrodacapita.de',
  integrations: [mdx(), sitemap(), react(), alpinejs(), auth()],
  plugins: [tailwindcss()],
  build: {
    // Copy admin files to dist
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]'
      }
    }
  },
  resolve: {
    alias: {
      // Just in case you're working with multiple builds
      'react-dom/client': 'react-dom',
    },
  },
});