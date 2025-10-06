// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({ // Pass configuration object to the plugin
      // This is where your theme customizations go for Tailwind CSS v4
      theme: {
        extend: {
          colors: {
            // Map your CSS variables to Tailwind color names
            'brand-blue': 'var(--color-brand-blue)',
            'brand-red': 'var(--color-brand-red)',
            'brand-yellow': 'var(--color-brand-yellow)',
            'brand-gray': 'var(--color-brand-gray)',
          },
          fontFamily: {
            // Map your CSS variable to Tailwind's 'sans' font stack
            sans: ['var(--default-font-family)', 'sans-serif'],
          },
        },
      },
      // You can also explicitly define content here, though the plugin is smart
      // content: [
      //   "./index.html",
      //   "./src/**/*.{js,ts,jsx,tsx}",
      // ],
    }),
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
          // Admin panel chunks
          if (id.includes('/admin/')) {
            if (id.includes('/dashboard/')) return 'admin-dashboard'
            if (id.includes('/posts/')) return 'admin-posts'
            if (id.includes('/users/')) return 'admin-users'
            if (id.includes('/seo/')) return 'admin-seo'
            return 'admin'
          }
          // Context and utilities
          if (id.includes('/context/')) return 'admin-context'
          if (id.includes('/utils/')) return 'admin-utils'
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