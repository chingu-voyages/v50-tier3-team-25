import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
      
// https://vitejs.dev/config/
export default defineConfig(({}) => {
  return {
    base: '/your-repo-name/',
    plugins: [react()],
    server: {
      port: 8080,
      hot: true
    },
  }
})
