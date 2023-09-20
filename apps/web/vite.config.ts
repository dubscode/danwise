/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';

import { VitePluginRadar } from 'vite-plugin-radar';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const env = loadEnv('all', process.cwd());

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePluginRadar({
      enableDev: true,
      analytics: {
        id: 'G-CG30Z894WL',
        persistentValues: {
          appName: 'danwise',
          env: process.env.NODE_ENV,
          stageName: env.VITE_STAGE_NAME,
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.ts', '**/*.test.tsx'],
    setupFiles: ['./tests/setup.ts'],
    css: true,
  },
});
