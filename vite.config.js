import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  base: "/keralabuses/",  // <--- THIS MUST MATCH YOUR REPO NAME
  plugins: [react()],
  optimizeDeps: {
    exclude: ['fsevents'],
  },
})
