import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dashboard',
  plugins: [react()],
  build: {
    outDir: '../../dist/admin'
  },
  server: {
    port: 3000
  }
})
