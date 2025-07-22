import path from "path" // 1. Add this import
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 2. Add the resolve object below
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})