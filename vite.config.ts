import path from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    allowedHosts: ['.netlify.app'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@firebase/db': path.resolve(__dirname, './src/firebase/db'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
