/**
 * Created by Frank on 2016/7/23.
 */
'use strict'
//gulp-concat 合并 js css
//gulp-uglify 压缩 js
//gulp-cssnano 压缩 css
//gulp-htmlmin 压缩html
//gult-sass 编译css
//browser-sync 同步刷新


var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var less = require('gulp-less');
var browserSync = require('browser-sync');

//js压缩
gulp.task('uglifyJs', function () {
  gulp.src('./src/js/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});
//css压缩
gulp.task('nanoCss', function () {
  gulp.src('./src/css/style.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
})
//html压缩
gulp.task('htmlmin', ['uglifyJs', 'myless'], function () {
  gulp.src('./src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
})
//js合并
gulp.task('concatJs', function () {
  gulp.src(['./src/js/demo1.js', './src/js/demo2.js'])
    .pipe(concat('demo.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
})
//css合并

//less 编译
gulp.task('myless', function () {
  gulp.src('./src/css/style.less')
    .pipe(less())
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
})


//实时更新
gulp.task('update', function () {
  browserSync.init({
    server: './dist',//服务器打开的目录
    files: ['./dist/**/*.*'],//需要监视的文件
    port: 2000//自定义的端口号
  })
  //文件发生变化时 执行任务htmlmin
  gulp.watch('./src/**/*.*', ['htmlmin']);
})