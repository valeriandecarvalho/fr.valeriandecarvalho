import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import gitInfo from './vite_plugins/gitInfo.js'

export default defineConfig({
  plugins: [react(), tailwindcss(), gitInfo()],
})