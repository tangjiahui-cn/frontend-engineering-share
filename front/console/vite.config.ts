import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/console",
  plugins: [react()],
  server: {
    proxy: {
      "/": {
        target: "http://www.demo.com",
        changeOrigin: true,
      }
    },
  },
});
