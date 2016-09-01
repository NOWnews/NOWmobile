const gulp = require('gulp');
const del = require('del');
const path = require('path');
const cssPath = path.join('./public/dist/css');
const jsPath = path.join('./public/dist/js');
console.log(cssPath);
const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

// 編譯 css
gulp.task('css', function() {
  return gulp.src([
    `${cssPath}/font-awesome.min.css`,
    `${cssPath}/slick.min.css`,
    `${cssPath}/slick-theme.min.css`,
    `${cssPath}/mui.min.css`,
    `${cssPath}/main.css`,
  ]).pipe(plugins.plumber())
    .pipe(plugins.concatCss('all.min.css'))
    .pipe(plugins.cleanCss())
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest(cssPath));
});

// 將 js 編譯成 minify
gulp.task('script', function() {
  return gulp.src([
    `${jsPath}/jquery-2.2.4.min.js`,
    `${jsPath}/slick.min.js`,
    `${jsPath}/mui.min.js`,
    `${jsPath}/main.js`,
  ]).pipe(plugins.plumber())
    .pipe(plugins.concat('all.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(jsPath));
});

// 清掉 dist 裡面 css 跟 js 的資料夾
gulp.task('clean', function() {
  return del(['./public/dist/css/all.min.css', './public/dist/js/all.min.js']);
});

gulp.task('build:prod', ['css', 'script']);
