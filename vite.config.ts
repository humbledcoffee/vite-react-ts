import path from 'path';
//vite配置函数引入
import { defineConfig, normalizePath } from 'vite';
//eslint代码检查
import eslint from 'vite-plugin-eslint';
//样式浏览器兼容性前缀添加
import autoprefixer from 'autoprefixer';
//vite终端接入样式检查插件
import viteStylelint from 'vite-plugin-stylelint';
// 如果类型报错，需要安装 @types/node: pnpm i @types/node -D
import react from '@vitejs/plugin-react-swc';
//引入图片压缩功能
import viteImagemin from 'vite-plugin-imagemin';
// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));
//css原子化
import UnoCss from 'unocss/vite';
//引入组件化svg
import svgr from 'vite-plugin-svgr';
// svg文件集合雪碧图
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
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
    }),
    createSvgIconsPlugin({
      iconDirs: [path.join(__dirname, 'src/assets/icons')]
    }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
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
  },
  build: {
    // 配置vite静态资源转换成base64的阈值为8kb 默认是4kb
    assetsInlineLimit: 8 * 1024
  }
});
