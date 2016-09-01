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
    .pipe(plugins.replace('head-include.html', 'head-include.prod.html'))
    .pipe(gulp.dest('./views'));
});

// 編譯 css
gulp.task('scss', function() {
  return gulp.src('./source/css/*[".css"]')
    .pipe(plugins.plumber())
    .pipe(plugins.concatCss('all.min.css'))
    .pipe(cleanCSS())
    .pipe(plugins.sass({outputStyle: 'compressed'}).on('error', plugins.sass.logError))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('./public/dist/css'));
});


// 將 js 編譯成 minify
gulp.task('script', function() {
  return gulp.src('./source/js/**.js')
    .pipe(plugins.concat('all.min.js'))
    .pipe(plugins.plumber())
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./public/dist/js'));
});

// 清掉 dist 裡面 css 跟 js 的資料夾
gulp.task('clean', function() {
  return del(['./views/base.html', './public/dist/css/**.*', './public/dist/js/*.js']);
});

gulp.task('build:prod', ['template', 'scss', 'script']);
