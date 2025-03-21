import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, join } from 'path';
import mime from 'mime-types';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-mime-types',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            const ext = req.url.split('.').pop();
            if (ext) {
              const type = mime.lookup(ext);
              if (type) {
                res.setHeader('Content-Type', type);
              }
            }
          }
          next();
        });
      }
    }
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info']
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name.split('.').pop();
          const folder = ext && /png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext) 
            ? 'images'
            : ext === 'css' 
            ? 'styles'
            : 'assets';
          return `${folder}/[name]-[hash][extname]`;
        },
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
          ui: ['lucide-react', 'swiper'],
          utils: ['date-fns']
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  preview: {
    port: 4173,
    host: true
  },
});
