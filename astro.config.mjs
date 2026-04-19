// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ryanquellhorst.com',
  integrations: [react()],
  output: 'static',
  build: {
    assets: 'assets'
  }
});