var browserify = require('browserify'),
    gulp = require('gulp');
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    connect = require('gulp-connect'),
    sourceFile = './index.js',
    destFolder = './dist/',
    destFile = 'bundle.js';

/* browserify */
gulp.task('watch', function() {

  var bundler = browserify({
    entries: sourceFile,
    cache: {}, packageCache: {}, fullPaths: true, debug: true
  });

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', function () {})
      .pipe(source(destFile))
      .pipe(gulp.dest(destFolder));
  };

  bundler = watchify(bundler);
  bundler.on('update', bundle);

  return bundle();
});

gulp.task('serve', function() {
  connect.server({
    root: './',
    livereload: true
  });
})

gulp.task('default', gulp.series('watch', 'serve'))
