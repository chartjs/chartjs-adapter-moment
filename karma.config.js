const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const builds = require('./rollup.config');

module.exports = function(karma) {
	const args = karma.args || {};
	const regex = args.watch ? /\.js$/ : /\.min\.js$/;
	const build = builds.filter((v) => v.output.file.match(regex))[0];

	if (args.watch) {
		build.output.sourcemap = 'inline';
	}

	karma.set({
		browsers: ['firefox'],
		frameworks: ['jasmine'],
		reporters: ['spec', 'kjhtml'],
		logLevel: karma.LOG_WARN,

		files: [
			'node_modules/moment/moment.js',
			'node_modules/chart.js/dist/Chart.js',
			'test/index.js',
			'src/index.js'
		].concat(args.inputs),

		// Explicitly disable hardware acceleration to make image
		// diff more stable when ran on Travis and dev machine.
		// https://github.com/chartjs/Chart.js/pull/5629
		customLaunchers: {
			firefox: {
				base: 'Firefox',
				prefs: {
					'layers.acceleration.disabled': true
				}
			}
		},

		preprocessors: {
			'test/specs/**/*.js': ['rollup'],
			'test/index.js': ['rollup'],
			'src/index.js': ['sources']
		},

		rollupPreprocessor: {
			plugins: [
				resolve(),
				commonjs()
			],
			external: [
				'chart.js',
				'moment'
			],
			output: {
				format: 'umd',
				globals: {
					'chart.js': 'Chart',
					moment: 'moment'
				}
			}
		},

		customPreprocessors: {
			sources: {
				base: 'rollup',
				options: build
			}
		}
	});
};
