import path from 'path';
import autoprefixer from 'autoprefixer';
import eslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import { defineConfig, normalizePath } from 'vite';
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import react from '@vitejs/plugin-react-swc';
// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));
import UnoCss from 'unocss/vite';
//引入组件化svg
import svgr from 'vite-plugin-svgr';
// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx';

// https://vitejs.dev/config/
export default defineConfig({
  // 手动指定项目根目录位置
  // root: path.join(__dirname, 'src')
  base: isProduction ? CDN_URL : '/',
  plugins: [
    svgr(),
    react({
      // 加入 babel 插件
      // 以下插件包都需要提前安装
      // 当然，通过这个配置你也可以添加其它的 Babel 插件
      plugins: [
        // 适配 styled-component
        [
          'babel-plugin-styled-components',
          {
            displayName: true,
            fileName: false
          }
        ]
      ]
    }),
    eslint(),
    UnoCss(),
    viteStylelint({
      // 对某些文件排除检查
      exclude: ['node_modules']
    })
  ],
  resolve: {
    // 路径别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },
  // css 相关的配置
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]__[hash:base64:5]'
    },
    //预处理配置
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
});
