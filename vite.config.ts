import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@supabase/")) return "vendor-supabase";
          if (id.includes("@reduxjs/toolkit") || id.includes("react-redux"))
            return "vendor-redux";
          if (id.includes("@tanstack/react-query")) return "vendor-query";
          if (id.includes("lucide-react")) return "vendor-ui";
          if (
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("/react/")
          )
            return "vendor-react";
        },
      },
    },
  },
});
