// TODO - ARRUMAR O GULP SERVE

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      useref = require('gulp-useref'),
      uglify = require('gulp-uglify'),
      gulpIf = require('gulp-if'),
      cssNano = require('gulp-cssnano'),
      imagemin = require('gulp-imagemin'),
      cache = require('gulp-cache'),
      del = require('del'),
      runSequence = require('run-sequence'),
      serve = require('gulp-serve'),
      distFolder = './dist';

gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(concat('main.min.css'))
    .pipe(cssNano())
    .pipe(gulp.dest(distFolder + '/styles'))
});

gulp.task('useref', function() {
  return gulp.src('src/index.html')
  .pipe(useref())
  // .pipe(gulpIf('*.js', uglify()))
  .pipe(gulp.dest(distFolder))
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*.+(png|jpg|jpeg|gif|svg|ico)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(distFolder + '/images'))
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest(distFolder + '/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync(
    [distFolder],
    {force: true}
  );
});

gulp.task('serve', serve({
  root: [distFolder],
  port: 8080
}));

gulp.task('vendor', function() {
  gulp.src([
    'src/vendor/**/*.*',
    '!**/*test*/**',
    '!**/*test*',
    '!**/index*',
    '!**/Grunt*',
    '!**/*karma*',
    '!**/*protractor*'
  ]).pipe(gulp.dest(distFolder + '/vendor'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.{html,js,scss}', function() {
    runSequence(['useref', 'sass']);
  });
});

gulp.task('dist', function (callback) {
  runSequence(
      'clean:dist',
      ['sass', 'useref', 'vendor', 'images', 'fonts'],
      callback
    )
});

gulp.task('default', function (callback) {
  runSequence(
      ['dist', 'serve', 'watch'],
      callback
    )
});
