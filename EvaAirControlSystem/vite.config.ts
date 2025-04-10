import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["esm-dep > cjs-dep"],
  },
  base: "",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      includeAssets: [
        "/static/images/favicon.ico",
        "/static/images/apple-touch-icon.png",
        "/static/offline.html",
      ],
      manifest: {
        name: "Evergreen-Controls",
        short_name: "Evergreen",
        description: "長榮航空控制系統",
        icons: [
          {
            src: "/static/images/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/static/images/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/static/images/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/static/images/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        theme_color: "#171717",
        background_color: "#f0e7db",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait-primary",
        screenshots: [
          {
            src: "/static/images/splash-screen.jpg",
            sizes: "1024x682",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "/static/images/splash-screen.jpg",
            type: "image/png",
            sizes: "1024x682",
            form_factor: "narrow",
          },
        ],
      },
      workbox: {
        navigateFallback: "offline.html",
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 年
              },
            },
          },
        ],
      },
    }),
  ],
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
