import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 3000,  //on localhost
    host: true,
   },
   watch: {
    usePolling: true,
    interval: 100,         // Set the polling interval
    ignored: ['node_modules/**', '.git/**']   // Ignore unnecessary directories
  }
})
