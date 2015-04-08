var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    server = require('gulp-express'),
    uglify = require('gulp-uglify');

gulp.task('server', function(){
    server.run(['server/server.js']);
});

gulp.task('minify-app', function() {
    gulp.src(['app/app.js','app/constants/*.js','app/controllers/*.js','app/controllers/*.js','app/services/*.js'])
        .pipe(concat('app-concat.js'))
        .pipe(gulp.dest('app/dist'))
        .pipe(rename('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'))
});

gulp.task('minify-css', function() {
    gulp.src('app/content/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('app/dist'))
});

gulp.task('watch', function () {
    gulp.watch(['app/app.js','app/constants/*.js','app/controllers/*.js','app/controllers/*.js','app/services/*.js'], ['minify-app']);
    gulp.watch('app/content/app.css', ['minify-css']);
});

gulp.task('default', ['server', 'minify-app', 'minify-css', 'watch']);