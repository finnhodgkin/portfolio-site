var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.port || config.defaultPort;

gulp.task('vet', () => {
  log('Analysing source with JSHint and JSCS');

  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('styles', ['clean-styles'], () => {
  log('Compiling sass to css');

  return gulp
    .src(config.sass)
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.temp))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('clean-styles', () => {
  var files = config.temp + '**/*.css';
  clean(files);
});

gulp.task('browserSync', function() {
  if(browserSync.active) {
    return;
  }

  browserSync.init({
    server: {
      baseDir: ''
    },
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    },
    browser: ['chrome', 'firefox', 'iexplore']
  });
});

gulp.task('inject', ['styles'], () => {
  gulp.src('index.html')
    .pipe($.inject(gulp.src(['./css/**/*.css', './js/**/*.js'], {read: false})))
    .pipe(gulp.dest(''));
});

gulp.task('watcher', ['browserSync', 'styles', 'inject'], () => {
  gulp.watch([config.sass], ['inject']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('./js/**/*.js', ['vet', 'inject']);
});

gulp.task('clean-images', () => {
  clean('dist/images');
});

gulp.task('images', ['clean-images'], () => {
  return gulp.src('./images/*')
    .pipe($.imagemin())
    .pipe($.imageResize({
      width: 2000,
      height: 2000,
      crop : false,
      upscale : false
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('buildimages', ['images'], () => {
  clean('dist/images/thumbs');
  gulp.src('./dist/images/*')
    .pipe($.imageResize({
      width: 1000,
      height: 1000,
      crop : false,
      upscale : false
    }))
    .pipe($.rename(function (f) { f.basename += '-thumb'; }))
    .pipe(gulp.dest('dist/images/thumbs'));
});

gulp.task('build', ['buildimages'], () => {
  return gulp.src('index.html')
    .pipe($.useref())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe(gulp.dest('./dist/'));
});


///////////////

function clean(path) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path);
}

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOw$.nProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
