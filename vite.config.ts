import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          ant: ['ant-design-vue', '@ant-design/icons-vue'],
          chart: ['echarts'],
          vue: ['vue'],
        },
      },
    },
  },
})
