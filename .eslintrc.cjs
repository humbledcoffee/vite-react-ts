module.exports = {
  root: true,
  // root属性是一个布尔值，用来指示ESLint是否应该将当前配置文件视为项目的根配置文件。
  // 当root设置为true时，ESLint将停止在当前配置文件的父目录中寻找其他的配置文件，
  // 这意味着它不会合并当前目录上层的任何其他ESLint配置文件。
  env: { browser: true, es2020: true },
  // 指定上述的 env 配置后便会启用浏览器和 Node.js 环境，这两个环境中的一些全局变量(如 window、global 等)会同时启用。
  globals: {
    // 不可重写
    $: false,
    jQuery: false
  },
  // 有些全局变量是业务代码引入的第三方库所声明，这里就需要在globals配置中声明全局变量了。每个全局变量的配置值有 3 种情况:
  // "writable"或者 true，表示变量可重写；
  // "readonly"或者false，表示变量不可重写；
  // "off"，表示禁用该全局变量。
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 针对React组件的一般性规则和最佳实践
    'plugin:react/recommended',
    // 专注于React Hooks的规则
    'plugin:react-hooks/recommended',
    // 接入 prettier 的规则
    'prettier',
    'plugin:prettier/recommended'
  ],
  // extends 相当于继承另外一份 ESLint 配置，可以配置为一个字符串，也可以配置成一个字符串数组。主要分如下 3 种情况:
  // 从 ESLint 本身继承；
  // 从类似 eslint-config-xxx 的 npm 包继承；
  // 从 ESLint 插件继承。
  ignorePatterns: [
    '!.commitlintrc.js',
    '!.prettierrc.js',
    '!.stylelintrc.js',
    'dist',
    '.eslintrc.cjs'
  ],
  //eslint忽略检查的路径或者文件
  parser: '@typescript-eslint/parser',
  // ESLint 底层默认使用 Espree来进行 AST 解析，
  // 这个解析器目前已经基于 Acron 来实现，虽然说 Acron 目前能够解析绝大多数的
  // ECMAScript 规范的语法，但还是不支持 TypeScript ，因此需要引入其他的解析器完成 TS 的解析。
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  // parserOptions - 解析器选项
  // ecmaVersion: 这个配置和 Acron 的 ecmaVersion 是兼容的，可以配置 ES + 数字(如 ES6)或者ES + 年份(如 ES2015)，也可以直接配置为latest，启用最新的 ES 语法。
  // sourceType: 默认为script，如果使用 ES Module 则应设置为module
  // ecmaFeatures: 为一个对象，表示想使用的额外语言特性，如开启 jsx。
  plugins: ['react', 'react-refresh', '@typescript-eslint', 'prettier'],
  // 上面提到过 ESLint 的 parser 基于Acorn实现，不能直接解析 TypeScript，需要我们指定 parser 选项为@typescript-eslint / parser才能兼容 TS 的解析。
  // 同理，ESLint 本身也没有内置 TypeScript 的代码规则，这个时候 ESLint 的插件系统就派上用场了。
  // 我们需要通过添加 ESLint 插件来增加一些特定的规则，比如添加 @typescript-eslint / eslint - plugin 来拓展一些关于 TS 代码的规则
  rules: {
    // 这是与React Fast Refresh相关的一个规则。
    // React Fast Refresh是一个React应用的快速刷新（热替换）功能，
    // 它允许开发者在修改代码后立即看到变更，而无需完全刷新页面
    'react-refresh/only-export-components': [
      'error',
      { allowConstantExport: true }
    ],
    'react/react-in-jsx-scope': 'off',
    // 是用来控制是否需要在使用JSX时显式地在文件中导入React。
    'prettier/prettier': 'error',
    // 当代码格式不符合Prettier的配置时，ESLint会报错，强制开发者修正代码格式。
    quotes: ['error', 'single'],
    // 如果代码中使用了非单引号(')包裹字符串，ESLint会报错。
    semi: ['error', 'always']
    // 这个规则配置是关于分号(;)的使用。"error"表示违反规则时报错，"always"表示每个语句的末尾都必须有分号
  },
  // 在 rules 对象中，key 一般为规则名，value 为具体的配置内容，在上述的例子中我们设置为一个数组，数组第一项为规则的 ID，第二项为规则的配置。
  // 这里重点说一说规则的 ID，它的语法对所有规则都适用，你可以设置以下的值:
  // off 或 0: 表示关闭规则。
  // warn 或 1: 表示开启规则，不过违背规则后只抛出 warning，而不会导致程序退出。
  // error 或 2: 表示开启规则，不过违背规则后抛出 error，程序会退出。
  settings: {
    react: {
      version: 'detect' // 自动检测项目中的React版本
    }
  }
};
