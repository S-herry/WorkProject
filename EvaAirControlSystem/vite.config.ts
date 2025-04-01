import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["esm-dep > cjs-dep"],
  },
  base: "",
  plugins: [react()],
  publicDir: "static",
  build: {
    outDir: "build",
    manifest: true,
    // ssrManifest: true,  // 取得每個資源預載指令
    terserOptions: {
      compress: {
        drop_console: false, // 不移除 console.log
        drop_debugger: false, // 不移除 debugger
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.names[0].split(".").pop();
          if (ext) {
            // 判斷檔案名稱
            if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) {
              return `assets/images/[name].[ext]`;
            } else if (["css"].includes(ext)) {
              return `assets/css/[name].[ext]`;
            } else if (["woff", "woff2", "ttf", "otf"].includes(ext)) {
              return `assets/fonts/[name].[ext]`;
            } else if (["json"].includes(ext)) {
              return `assets/data/[name].[ext]`;
            }
            return `assets/other/[name].[ext]`;
          }
          return "assets/other/[name].[ext]";
        },
        chunkFileNames: `assets/js/[name].js`,
      },
    },
  },
  server: {
    open: false, // 可以是路由 string/boolean
    host: true,
  },
});
