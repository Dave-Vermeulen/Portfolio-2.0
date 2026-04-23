import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 3000, open: true },
  build: {
    outDir: 'build',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  assetsInclude: ['**/*.pdf'],
});
