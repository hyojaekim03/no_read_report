import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Backend URL
        changeOrigin: true, // Ensures the host header matches the target
        secure: false, // If using HTTPS with self-signed certificates, set to false
      },
    },
  },
});

