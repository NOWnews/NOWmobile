const gulp = require('gulp');
const del = require('del');
const plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

// 編譯 css
gulp.task('css', function() {
    return gulp.src('./source/css/**.css')
        .pipe(plugins.plumber())
        .pipe(plugins.concatCss('all.min.css'))
        .pipe(plugins.cleanCss())
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('./public/dist/css'));
});

// 將 js 編譯成 minify
gulp.task('script', function() {
    return gulp.src('./source/js/**.js')
        .pipe(plugins.plumber())
        .pipe(plugins.concat('all.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('./public/dist/js'));
});

// 清掉 dist 裡面 css 跟 js 的資料夾
gulp.task('clean', function() {
    return del(['./public/dist/css/all.min.css', './public/dist/js/all.min.js']);
});

gulp.task('build:prod', ['css', 'script']);
