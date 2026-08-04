import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Large archives dropped in the project folder crash the file
      // watcher while they're still being copied (EBUSY on Windows).
      ignored: ["**/*.zip", "**/*.rar", "**/*.7z"],
    },
  },
});
