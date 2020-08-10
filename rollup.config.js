import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import vuePlugin from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve';

export default {
  input: 'lib/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    }),
    resolve({
      extensions: ['.vue', '.js', '.jsx', '.json'],
      browser: true
    }),
    commonjs(),
    vuePlugin(),
    serve({ // 开启本地服务
      open: true,
      openPage: '/examples/index.html', // 打开的页面
      port: 3000,
      contentBase: ''
    })
    // uglify({}),
    
  ]
};