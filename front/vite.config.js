import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs"
import path from  "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
      devServerMiddleware()],
      
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

function devServerMiddleware(){
  return {
    name:"vite-plugin-get-files",  // 插件名，标准配置
    configureServer(server){  // 方法
      server.middlewares.use( // 引入中间间
          (req, res, next)=>{
            const url = req.originalUrl  // 获取请求的源路径
            if((url.startsWith("/svg/") || url.startsWith("/png/") || url.startsWith("/icon/") || url.startsWith("/canvasDraw/") || url.startsWith("/path2D/"))  && url.endsWith("/")){  // 路径判断 特殊处理svg和png路径的
                const pwd = decodeURI(path.join(__dirname, 'public', url));  // 路径
                try {
                    const files = fs.readdirSync(pwd, {  //  同步读取文件夹
                        withFileTypes: true,
                    });
                    const list = [];
                    for (const item of files) {
                        if (item.isDirectory()) {  // 判断是否为文件夹
                            list.push({ name: item.name, type: 'directory' });
                        } else {  // 非文件夹  则返回文件名  为了懒加载实现
                            list.push({ name: item.name });
                        }
                    }
                    res.end(JSON.stringify(list));
                }catch (e){
                    console.error(e)
                    next()
                }

            }else {
                next()  // 跳到下一步
            }
          }
      )
    }
  }
}
