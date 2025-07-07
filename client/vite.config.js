import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor_react'
            }
            if (id.includes('some-big-lib')) {
              return 'vendor_biglib'
            }
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ]
})
