import { defineConfig, presetUno, presetAttributify } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(), // UnoCSS 的默认预设
    presetAttributify() // 属性化预设，允许你在 HTML 标签上直接使用属性来应用样式
  ]
});
