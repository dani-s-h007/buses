import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Custom domain upayogikkumbol base '/' mathram aayirikkanam
  base: "/", 
  plugins: [react()],
  optimizeDeps: {
    exclude: ['fsevents'],
  },
})