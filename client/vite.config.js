import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // increase from 500kB to 1000kB
  },
  plugins: [
    react(),
    tailwindcss()
  ]
})
