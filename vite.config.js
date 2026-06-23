import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers — smaller, faster output (no legacy polyfills)
    target: 'es2020',

    // Lower threshold so we catch regressions early (framer-motion chunk is expected)
    chunkSizeWarningLimit: 550,

    // Split CSS per chunk so route-specific styles are only fetched on demand
    cssCodeSplit: true,

    // Minify with esbuild (default, keeps it fast)
    minify: 'esbuild',

    rollupOptions: {
      output: {
        /**
         * Vendor chunk strategy:
         *  - react-vendor   : react + react-dom (small, always needed, long-lived cache)
         *  - router         : react-router (needed on every page but separate cache entry)
         *  - framer-motion  : largest dep, cached independently across deploys
         *
         * Page components are split automatically by React.lazy() in App.jsx —
         * no explicit listing needed here.
         */
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'framer-motion'
          if (
            id.includes('node_modules/react-router-dom') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run')
          ) return 'router'
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'react-vendor'
        },
      },
    },
  },
})
