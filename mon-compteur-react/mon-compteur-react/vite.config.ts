import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige tous les appels commençant par /api vers le serveur 
      '/api': {
        target: 'http://localhost:3001', // Cible le port du backend 
        changeOrigin: true,
        secure: false,
      }
    }
  }
})