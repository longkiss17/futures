import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

export default defineConfig(({ command, mode, ssrBuild }) => {
  // let domain = `${mode === "development" ? "dev." : mode === "production" ? "stage." : "stage."}asm.na.nexon.com`;
  // let protocol = "http" + (mode !== "development" ? "s" : "");

  let domain = `dev.futures.money`;
  let protocol = "http";
  let apiUrl = `${protocol}://${domain}`;

  console.log(apiUrl);

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: "../backend/public",
    },
    server: {
      host: domain,
      port: 8080,
      proxy: {
        "/api": {
          target: `${apiUrl}/api/`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/authenticate": {
          target: `${apiUrl}/authenticate`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/authenticate/, ""),
        },
        "/logout": {
          target: `${apiUrl}/logout`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/logout/, ""),
        },
        "/socket.io": {
          target: "http://localhost:80",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
