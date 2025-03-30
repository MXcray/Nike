import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  css: {
    modules: {
      generateScopedName: '[name]_[local]__[hash:base64:5]'
    }
  },
  build: {
    // Output directory structure configuration
    outDir: 'dist',
    emptyOutDir: true,
    // Configure chunk and asset file names
    rollupOptions: {
      output: {
        // Main chunks (JS files)
        entryFileNames: 'assets/js/[name]-[hash].js',
        // Chunk files
        chunkFileNames: 'assets/js/chunks/[name]-[hash].js',
        // Asset files (CSS, images, etc.)
        assetFileNames: (assetInfo) => {
          // Проверяем, что assetInfo.name существует
          if (!assetInfo.name) {
            return 'assets/[name]-[hash][extname]';
          }

          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]

          // Group assets by file type
          if (/\.(css)$/i.test(extType)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(extType)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          // Default for other assets
          return 'assets/[name]-[hash][extname]'
        },
        // Manually define chunks to split vendor code
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // Group common large libraries separately
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            // Other node_modules in a separate vendor chunk
            return 'vendor'
          }
        }
      }
    },
    // Sourcemap generation for production
    sourcemap: false,
    // Minification options
    minify: 'esbuild',
  },


  // Только для DEV, при загрузке на хост, нужно настроить прокси на хосте!
  // server: {
  //   proxy: {
  //     '/img': {
  //       target: 'http://localhost:3000', // URL  json-server
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
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
