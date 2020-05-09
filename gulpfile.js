'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var { exec } = require('child_process');
var karma = require('karma');
var path = require('path');

var argv = require('yargs')
	.option('output', { alias: 'o', default: 'dist' })
	.argv;

function run(bin, args, done) {
	var exe = '"' + process.execPath + '"';
	var src = require.resolve(bin);
	var ps = exec([exe, src].concat(args || []).join(' '));

	ps.stdout.pipe(process.stdout);
	ps.stderr.pipe(process.stderr);
	ps.on('close', () => done());
}

gulp.task('build', function(done) {
	run('rollup/dist/bin/rollup', ['-c', argv.watch ? '--watch' : ''], done);
});

gulp.task('test-unit', function(done) {
	new karma.Server({
		configFile: path.join(__dirname, 'karma.config.js'),
		singleRun: !argv.watch,
		args: {
			coverage: !!argv.coverage,
			inputs: (argv.inputs || 'test/specs/**/*.js').split(';'),
			watch: argv.watch
		}
	},
	function(error) {
		// https://github.com/karma-runner/gulp-karma/issues/18
		error = error ? new Error('Karma returned with the error code: ' + error) : undefined;
		done(error);
	}).start();
});

gulp.task('lint', function() {
	var files = [
		'src/**/*.js',
		'test/**/*.js',
		'*.js'
	];

	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('check', gulp.parallel('lint', 'test-unit'));

gulp.task('default', gulp.parallel('build'));
