import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Helper function to bypass proxy for browser page navigations (HTML requests)
// This ensures client-side routing works for URLs like /products/women, /products/men, /seller, /admin
const htmlBypass = (req) => {
  if (req.headers.accept && req.headers.accept.includes('text/html')) {
    return '/index.html';
  }
};

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
        bypass: htmlBypass,
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
        bypass: htmlBypass,
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
        bypass: htmlBypass,
      },
    },
  },
})