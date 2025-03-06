import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: path.resolve(__dirname, 'src/index.tsx'), // Change this to your desired entry point
  //     },
  //   }
  // },
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'), // Example alias for cleaner imports
  //   },
  // },
})
