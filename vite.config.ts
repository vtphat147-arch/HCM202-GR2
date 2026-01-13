import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo lên 1000kB
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react'],
          gemini: ['@google/genai'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0', // Lắng nghe trên mọi địa chỉ IP (bắt buộc đối với Docker/Cloud)
    port: 8080,      // Cổng mặc định cho Cloud Run
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
  }
})