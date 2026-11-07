import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3500,
    strictPort: true,
    // Add this block to allow Ngrok hosts
    allowedHosts: [
      'beulah-unexpunged-equitably.ngrok-free.dev', // Your current Ngrok URL
      '.ngrok-free.dev'                             // Wildcard to allow future Ngrok URLs
    ]
  }
});
