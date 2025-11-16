import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import lqip from "vite-plugin-lqip"
import { imagetools } from "vite-imagetools"

// https://vite.dev/config/
export default defineConfig({
  plugins: [lqip(), imagetools(), react(), tailwindcss()],
})
