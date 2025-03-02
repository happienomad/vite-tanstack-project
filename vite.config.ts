import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { lingui } from '@lingui/vite-plugin';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/components": path.resolve(__dirname, "src/components"),
      "~/global": path.resolve(__dirname, "src/global"),
      "~/features": path.resolve(__dirname, "src/features"),
      "~/api": path.resolve(__dirname, "src/api"),
    }
  },
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      generatedRouteTree: "./src/router/routeTree.gen.ts",
      routesDirectory: "./src/router/routes",
      target: 'react',
    }),
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      }
    }),
    lingui(),
  ],
})
