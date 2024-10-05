import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 50000
  },
  server: {
    port: parseInt(process.env.VITE_PORT)
  }
});
