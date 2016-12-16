var gulp = require('gulp');
var postcss = require('gulp-postcss');
var less = require('gulp-less');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var cssnext = require('cssnext');
var precss = require('precss');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});


gulp.task('css', function () {
  var processors = [
    autoprefixer,
    //cssnano
  ];
  return gulp.src('./source/assets/css/xmodal.less')
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./build/assets/css'));
});


gulp.task('js', function(){
  gulp.src([
    './source/assets/scripts/jquery.xmodal.js'
  ])
    .pipe(gulp.dest('./build/assets/scripts'))
    .pipe(concat('jquery.xmodal.min.js'))
    .pipe(uglify())
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./build/assets/scripts'))
})


gulp.task('html', function() {
  gulp.src('./source/*.html')
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('build'))
});

gulp.task('img', function() {
  gulp.src('./source/assets/img/*')
    .pipe(gulp.dest('build/assets/img/'))
});


//cmd: gulp watch
gulp.task('watch', ['browserSync'], function(){
  gulp.watch('./source/assets/css/*', ['css']);
  gulp.watch('./source/assets/scripts/*', ['js']);
  gulp.watch('./source/*.html', ['html']) 
});


// gulp.task('watch', function(){
//   livereload.listen();
//   gulp.watch('./source/assets/css/*', ['css']);
//   gulp.watch('./source/assets/scripts/*', ['js']);
//   gulp.watch('./source/*.html', ['html']);
// });


gulp.task('default', ['css', 'html', 'js', 'img']);