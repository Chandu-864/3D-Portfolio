import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/3D-Portfolio/',
  plugins: [react()],
  assetsInclude: ['**/*.glb']
})
