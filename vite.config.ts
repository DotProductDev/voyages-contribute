import { defineConfig } from "vite"
import { startApi } from "./src/localApi"


export default defineConfig(({ mode }) => {
  if (mode === "api") {
    startApi()
  }
  return {
    test: {
      include: ["./tests/*ests.ts"]
    }
  }
})

