const path = require('path')
const rollupTypescript = require('rollup-plugin-typescript2')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { eslint } = require('rollup-plugin-eslint')
const { terser } = require('rollup-plugin-terser')

const pkg = {
  name: 'browser-helper-js'
}

const paths = {
  // input: '../src/index.ts',
  input: path.join(__dirname, '../src/index.ts'),
  output: path.join(__dirname, '../lib')
  // output: '../lib'
}
// rollup 配置项
const rollupConfig = {
  input: paths.input,
  output: [
    // 输出 commonjs 规范的代码
    {
      file: path.join(paths.output, 'index.js'),
      format: 'cjs',
      name: pkg.name,
      sourcemap: true,
    },
    // 输出 es 规范的代码
    {
      file: path.join(paths.output, 'index.esm.js'),
      format: 'esm',
      name: pkg.name,
      sourcemap: true,
    }
  ],
  plugins: [
    // 验证导入的文件
    eslint({
      throwOnError: true, // lint 结果有错误将会抛出异常
      throwOnWarning: true,
      include: ['../src/**/*.ts'],
      exclude: ['../node_modules/**', '../lib/**', '*.js', '../dist/**']
    }),

    // 使得 rollup 支持 commonjs 规范，识别 commonjs 规范的依赖
    commonjs(),

    // 配合 commonjs 解析第三方模块
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: '../node_modules/**',
      tsconfig: '../tsconfig.json',
      include: '../src',
      // babel 默认不支持 ts 需要手动添加
      extensions: ['.ts']
    }),
    terser()

  ]
}

module.exports = rollupConfig
