// Less configuration
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');

gulp.task('less', function(cb) {
  gulp
    .src('./public/css/*.less')
    .pipe(less())
    .pipe(minify())
    .pipe(
      gulp.dest(function(f) {
        return f.base;
      })
    );
  cb();
});

gulp.task(
  'default',
  gulp.series('less', function(cb) {
    gulp.watch('./public/css/*.less', gulp.series('less'));
    cb();
  })
);