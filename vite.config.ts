import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // 1. 设置基础路径，解决资源 404 问题
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      // 2. 别名配置
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    outDir: 'dist',
    // 3. 建议添加：清除过期文件、压缩配置
    assetsDir: 'assets', // 静态资源存放目录
    sourcemap: false,    // 生产环境关闭 sourcemap
    rollupOptions: {
      output: {
        // 分块打包，避免单个 JS 文件过大
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  }
})