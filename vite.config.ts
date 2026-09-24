import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React and React DOM
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          // Markdown rendering (large dependencies)
          "markdown-vendor": [
            "react-markdown",
            "remark-math",
            "rehype-katex",
            "rehype-raw",
            "katex",
          ],
          // Icons
          "icons-vendor": ["react-icons"],
        },
      },
    },
    chunkSizeWarningLimit: 600, // Increase limit slightly since we're chunking
  },
});
