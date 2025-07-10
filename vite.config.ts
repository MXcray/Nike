import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path';

/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr(),
    ],
    css:
      {
        modules: {
          generateScopedName: '[name]_[local]__[hash:base64:5]'
        }
      },
    resolve: {
      alias: {
        '@':
          path.resolve(__dirname, './src'),
      },
    },
		test: {
			environment: 'jsdom',
			globals: true,
			setupFiles: ['./src/app/tests/setup.ts'],
			exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
		},
    define: {
      // Делаем доступными переменные окружения в клиентском коде
      __API_URL__: JSON.stringify(env.VITE_API),
      'import.meta.env.VITE_API': JSON.stringify(env.VITE_API),
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // Sourcemap generation for production
      sourcemap: false,
      // Minification options
      minify: 'esbuild',
      // Структурирование выходных файлов
      rollupOptions:
        {
          output: {
            // Разделение кода по типам файлов
            assetFileNames: (assetInfo) => {
              // Проверяем, что assetInfo.name определено
              const fileName = assetInfo.name || '';
              const info = fileName.split('.');
              let extType = info[info.length - 1];

              if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(fileName)) {
                extType = 'img';
              } else if (/\.(woff2?|eot|ttf|otf)$/i.test(fileName)) {
                extType = 'fonts';
              } else if (/\.css$/i.test(fileName)) {
                extType = 'css';
              }

              return `assets/${extType}/[name]-[hash][extname]`;
            },
            // Разделение JS файлов
            chunkFileNames:
              'assets/js/[name]-[hash].js',
            // Основной файл приложения
            entryFileNames:
              'assets/js/[name]-[hash].js',
            // Разделение вендоров
            manualChunks:
              {
                'react-vendor':
                  ['react', 'react-dom', 'react-router-dom'],
                'ui-vendor':
                  ['swiper'],
                'utils-vendor':
                  ['axios']
              },
          },
        }
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
  }
}
)
