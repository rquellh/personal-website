// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://rquellh.github.io',
  base: '/personal-website',
  integrations: [react()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});