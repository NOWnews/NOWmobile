const gulp = require('gulp');
const del = require('del');
const path = require('path');
const cleanCSS = require('gulp-clean-css');
const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

gulp.task('template', function(){
  gulp.src('./views/base.template.html')
    .pipe(plugins.rename('base.html'))
    .pipe(gulp.dest('./views'));
});

gulp.task('scss', function() {
  return gulp.src('./source/css/*[".css"]')
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('script', function() {
  return gulp.src(['./source/js/*.js', './source/js/mui.min.js', './source/js/slick.min.js'])
    .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('dev:build', ['template', 'scss', 'script']);
