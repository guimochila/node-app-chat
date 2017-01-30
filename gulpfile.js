/* eslint-env es6 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

// Task: Copy html to public
gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(plumber((err) => {
      gutil.log('Html task error: ', err);
      this.emit('end');
    }))
    .pipe(gulp.dest('public/'));
});

// Task: Copy image files to public/img
gulp.task('images', () => {
  return gulp.src('src/img/**/*.png')
    .pipe(plumber((err) => {
      gutil.log('Images task error: ', err);
      this.emit('end');
    }))
    .pipe(gulp.dest('public/img/'));
});

// Task: Minify CSS and create SourceMaps
gulp.task('styles', () => {
  return gulp.src('src/css/*.css')
    .pipe(plumber((err) => {
      gutil.log('Images task error: ', err);
      this.emit('end');
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public/css/'));
});

// Task: Javascript
gulp.task('scripts', () => {
  return browserify({
    entries: ['./src/js/chat.js'],
    debug: true,
  })
    .bundle()
    .on('error', (e) => {
      gutil.log('Script task error: ', e);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
});

// Task: Watch HTML/CSS/Javascript files
gulp.task('watch', ['default'], () => {
  gulp.watch('src/css/*.css', ['styles']);
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['scripts']);
});

// Task: Default task which include all tasks
gulp.task('default', ['html', 'images', 'styles', 'scripts']);
