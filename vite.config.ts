import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const pathResolve = (pathStr) => {
  return path.resolve(__dirname, pathStr)
}
// https://vitejs.dev/config/
export default defineConfig({
base:"./",
  server: {

    proxy: {
      // 选项写法
      '/adminServer':"http://localhost:4000/"
    },

  },
  // server:{
  //   proxy: {
  //     '/api': { // 匹配请求路径，localhost:3000/snow
  //       target: 'http://localhost:4000', // 代理的目标地址
  //       changeOrigin: true, // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
  //       // secure: true, // 是否https接口
  //       // ws: true, // 是否代理websockets
  //       // rewrite target目标地址 + '/abc'，如果接口是这样的，那么不用重写
  //       rewrite: (path) => path.replace(/^\/api/, '') // 路径重写，本项目不需要重写
  //     }
  //   }
  // },

  plugins: [vue(),

    createSvgIconsPlugin({
      // 指定需要缓存的svg图标文件夹，即需要识别的svg都应该放在这个文件夹下
      // iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
      // 或
      iconDirs: [pathResolve('./src/icons/svg')],
      // 指定symbolId格式（这里的配置与6.2步骤中的引入svg组件的name配置项写法有关）
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/variable.scss";
                         @import "@/assets/scss/mixin.scss"; `
      }
    }
  },

  resolve: {
  // 设置路径别名
  alias: {
    '@': pathResolve('./src'),
  }
}


})

