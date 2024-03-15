import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  build: {
    outDir: "build",
    minify: true,
    sourcemap: true,
  },
  server: {
    port: 5163,
  },
});
