import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, ''),
    },
  },
  plugins: [reactRefresh()],
  build: {
    target: 'esnext',
    minify: false,
  },
})
