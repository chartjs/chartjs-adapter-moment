const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * ${pkg.homepage}
  * (c) ${new Date().getFullYear()} chartjs-adapter-moment Contributors
  * Released under the ${pkg.license} license
  */`;

const input = 'src/index.js';
const external = [
  'chart.js',
  'moment'
];
const globals = {
  'chart.js': 'Chart',
  moment: 'moment'
};

module.exports = [
  {
    input,
    plugins: [
      resolve(),
    ],
    output: {
      name: pkg.name,
      file: pkg.main,
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    plugins: [
      resolve(),
      terser({
        output: {
          preamble: banner
        }
      })
    ],
    output: {
      name: pkg.name,
      file: pkg.main.replace('.js', '.min.js'),
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  {
    input,
    plugins: [
      resolve(),
    ],
    output: {
      name: pkg.name,
      file: pkg.module,
      banner,
      format: 'esm',
      indent: false,
    },
    external
  },
];
