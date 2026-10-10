import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Deploying to Vercel (or any host serving from the domain root): leave as '/'.
  // Deploying to GitHub Pages under a repo subpath instead: set this to
  // '/<repo-name>/' — src/main.tsx reads it back via import.meta.env.BASE_URL
  // so the router's basename stays in sync automatically.
  base: '/',
})
