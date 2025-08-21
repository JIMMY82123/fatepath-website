import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true // 允许外部访问
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion']
        }
      }
    },
    // 移动端优化
    target: 'es2015', // 兼容更多移动设备
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 保留console用于调试
        drop_debugger: true
      }
    }
  },
  // 移动端特定优化
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  // 开发服务器优化
  server: {
    hmr: {
      overlay: false // 移动端禁用错误覆盖层
    }
  }
})