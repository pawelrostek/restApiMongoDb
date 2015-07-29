var gulp = require('gulp'),
  connect = require('gulp-connect');

var paths = {
  app: './',
  src: ['./*.html', './partials/*.html', './partials/lists/*.html', './partials/forms/*.html', './template/*', './css/*.css', './js/*.js']
};

gulp.task('connect', function() {
  connect.server({
    root: paths.app,
    livereload: true,
    port: 4001
  });
});

gulp.task('html', function() {
  gulp.src(paths.src)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch([paths.src], ['html']);
});

gulp.task('default', ['connect', 'watch']);
