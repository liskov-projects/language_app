import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.mp3"],
  server: {
    host: "0.0.0.0", // Allow connections from outside container
    port: 5173, // Match exposed port
    strictPort: true, // Avoid random ports
    watch: {
      usePolling: true // Fix file watching issues in Docker
    }
  }
});
