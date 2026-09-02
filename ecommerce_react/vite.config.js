import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 5173,
    proxy: {
      // Proxy all /api, /auth, /seller, /sellers, /admin, /home calls to Spring Boot
      // This eliminates CORS issues during development
      '/api': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
      '/seller': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
      '/sellers': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
      '/home': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
      '/products': {
        target: 'http://localhost:5454',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})