import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      contexts: "/src/contexts",
      hooks: "/src/hooks",
      layouts: "/src/layouts",
      utils: "/src/utils",
      assets: "/src/assets",
      pages: "/src/pages",
      services: "/src/services",
    },
  },
});
