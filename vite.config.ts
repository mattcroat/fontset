import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, ''),
    },
  },
})
