var gulp = require('gulp'),

	// dependencies
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	del = require('del'),
	minifier = require('gulp-minifier'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),

	// paths
	paths = {
		scripts: './src/scripts/**/*.js',
		styles: './src/styles/**/*.sass'
	};

gulp.task('default', ['scripts', 'styles', 'watch']);

gulp.task('clean-styles', function () {
	return del(['./dist/*.min.css']);
});

gulp.task('clean-scripts', function () {
	return del(['./dist/*.min.js']);
});

gulp.task('scripts', ['clean-scripts'], function () {
	gulp
		.src(paths.scripts)
		.pipe(concat('htmlLint.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(notify('Compiled scripts: [<%= file.relative %>]'))
		.pipe(minifier({
			minify: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			minifyJS: true,
			minifyCSS: false
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(notify('Minified scripts: [<%= file.relative %>]'));
});

gulp.task('styles', ['clean-styles'], function () {
	gulp
		.src(paths.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(notify('Compiled styles: [<%= file.relative %>]'))
		.pipe(minifier({
			minify: true,
			collapseWhitespace: true,
			conservativeCollapse: true,
			minifyJS: false,
			minifyCSS: true
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('./dist'))
		.pipe(notify('Minified styles: [<%= file.relative %>]'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});
