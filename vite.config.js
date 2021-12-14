import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '@/imgs': path.resolve(__dirname, './src/assets/imgs'),
      // '@/pages': path.resolve(__dirname, './src/pages'),
      // '@/components': path.resolve(__dirname, './src/components'),
      // '@/utils': path.resolve(__dirname, './src/utils'),
      // '@/hooks': path.resolve(__dirname, './src/hooks'),
      // '@/routes': path.resolve(__dirname, './src/routes'),
      // '@/layout': path.resolve(__dirname, './src/layout'),
    },
  },
});
