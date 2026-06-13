import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        guide: 'guide.html',
        privacy: 'privacy.html',
        terms: 'terms.html',
        support: 'support.html'
      }
    }
  }
})
