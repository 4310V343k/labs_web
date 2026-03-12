import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api/* to the backend in development.
    // VITE_API_URL defaults to the internal Docker service name so this works
    // both inside compose (http://backend:5000) and outside it (http://localhost:5000).
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://backend:5000',
        changeOrigin: true,
      },
    },
  },
})
