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
    .pipe($.jshint.reporter('fail'));
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
  browserSync.init({
    server: {
      baseDir: ''
    },
  });
});

gulp.task('watcher', ['browserSync', 'styles'], () => {
  gulp.watch([config.sass], ['styles']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('*.js', browserSync.reload);
});

///////////////
function changeEvent(event) {
  var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
  log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync () {
  if(browserSync.active) {
    return;
  }

  log('Starting browser-sync on port ' + port);

  gulp.watch([config.less], ['styles'])
    .on('change', (event) => { changeEvent(event); });

  var options = {
    proxy: 'localhost:' + port,
    files: [
      config.client + '**/*.*',
      '!' + config.less,
      config.temp + '**/*.css'
    ],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0
  };

  browserSync(options);
}

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
