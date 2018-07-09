/*var gulp = require('gulp');

gulp.task("Hello", function() {
	console.log("Hello from Gulp");
});

var gulp = require('gulp');

gulp.task("default", ["Hello"], function() {
	console.log("Hello from Gulp! This is Defaults task.");
});*/

var gulp = require('gulp'),
		browserSync = require('browser-sync'),
		less = require('gulp-less'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber');

gulp.task('server', ['less'], function(){
	browserSync.init({
		server: { baseDir: './app/' }
	})
	gulp.watch('app/**/*.html').on('change', browserSync.reload);	
	gulp.watch('app/**/*.js').on('change', browserSync.reload);	
	gulp.watch('app/less/**/*.less', ['less']);	
})

gulp.task('less', function(){
	return gulp.src('./app/less/main.less')
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'less',
					sound: false,
					message: err.message
				}

			})

		}))
		.pipe(less())
		.pipe(gulp.dest('./app/css'))
		.pipe(browserSync.stream());
})

gulp.task('default', ['server']);