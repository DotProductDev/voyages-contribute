import { defineConfig } from "vite"
import { startLocalApi } from "./src/localApi"
import { startServer } from "./src/backend/server"

export default defineConfig(({ mode }) => {
  if (mode === "local-api") {
    startLocalApi()
  }
  if (mode === "server") {
    startServer()
  }
  return {
    test: {
      include: ["./tests/*ests.ts"]
    }
  }
})
