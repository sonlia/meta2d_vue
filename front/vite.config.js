import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs"
import path from  "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()    ],
      
      server: {
        proxy: {
          '/api': {
            target: 'http://127.0.0.1:3000', // 后端服务地址
            changeOrigin: true,
            // rewrite: (path) => path.replace(/^\/api/, '')  // 重写路径，去掉/api前缀
          }
        }
      },
    resolve: {
    //     alias: {
    //         '@': path.resolve(__dirname, './src/'),
    //         '@meta2d': path.resolve(__dirname, '../meta2d.js/packages')
    //         // '@meta3d': path.resolve(__dirname, '../meta3d.js'),
    //     },
    },
})

 
