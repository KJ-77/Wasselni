import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Polyfill for Node.js global object required by amazon-cognito-identity-js
    // The library checks for 'global' which doesn't exist in browser environments
    // We map it to 'globalThis' which is the standard cross-platform global object
    global: 'globalThis',
  },
})
