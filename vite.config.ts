import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { resolve } from "path"

export default defineConfig(({ mode }) => {
  if (mode === "server") {
    // Contribute-API server.
    return {
      build: {
        // Output directory for the build
        outDir: "dist",

        // Generate sourcemaps for better debugging
        sourcemap: true,

        // Ensure we're not using browser-specific APIs
        ssr: true,

        // Ensure Node.js compatible code
        target: "node18",

        // Don't minify server code for better debugging
        minify: false,

        // Roll-up specific options
        rollupOptions: {
          // External packages that shouldn't be bundled
          external: [
            "express"
            // Add other packages that should be treated as external
            // For example:
            // 'mongoose',
            // 'cors',
            // etc.
          ],

          // Configure the entry point
          input: resolve(__dirname, "src/backend/server.ts"),

          output: {
            // Output as a single file
            format: "es",
            entryFileNames: "server.js",
            chunkFileNames: "[name].js",

            // Preserve the module structure
            preserveModules: false
          }
        }
      },

      // Resolve specific aliases if needed
      resolve: {
        alias: {
          "@": resolve(__dirname, "./src")
        }
      }
    }
  }
  if (mode === "frontend") {
    // In this mode we are producing a library to be consumed by the front-end
    // for sharing our models, Entity definitions, and helper functions.
    return {
      plugins: [
        dts({
          tsconfigPath: "tsconfig-frontend.json"
        })
      ],
      build: {
        copyPublicDir: false,
        sourcemap: true,
        minify: true,
        lib: {
          entry: {
            index: "src/models/index.ts"
          },
          formats: ["es"]
        }
      }
    }
  }
  return {
    test: {
      include: ["./tests/*ests.ts"]
    }
  }
})
