import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: 'brotliCompress' })
  ],
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'vendor-react-router'
            if (id.includes('react')) return 'vendor-react'
            if (id.includes('@tanstack')) return 'vendor-query'
            if (id.includes('dayjs')) return 'vendor-dayjs'
            return 'vendor'
          }
        }
      }
    },
    minify: 'esbuild',
    assetsInlineLimit: 4096
  },
  esbuild: {
    legalComments: 'none'
  }
})
