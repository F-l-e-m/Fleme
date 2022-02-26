import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import loadVersion from "vite-plugin-package-version";
import vue from "@vitejs/plugin-vue";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    loadVersion(),
    vue(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{vue,js}"',
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    hmr: { overlay: true },
  },
});
