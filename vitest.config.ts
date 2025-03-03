import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react'
import { lingui } from "@lingui/vite-plugin";
import path from "path";
import { fileURLToPath } from "node:url";

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        lingui({
            cwd: path.dirname(fileURLToPath(import.meta.url))
        }),
        react({
            babel: {
                plugins: ["@lingui/babel-plugin-lingui-macro"],
            }
        })
    ],
    test: {
        globals: true,
        coverage: {

        },
        environment: "jsdom",
        setupFiles: "./vitest.setup.ts"
    }
})
