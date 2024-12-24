import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/exchange/" : "/",
  server: {
    proxy: {
      '/v2/': {
        target: 'https://api.coincap.io/',
        changeOrigin: true,
      },
    }
  }
})
