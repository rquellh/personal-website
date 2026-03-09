import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    css: false,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    alias: {
      '\\.(png|webp|ico|jpg|jpeg|gif|svg)$': resolve(
        __dirname,
        'src/test/__mocks__/fileMock.ts'
      ),
    },
  },
});
