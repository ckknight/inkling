var gulp = require('gulp'),
  install = require('gulp-install'),
  conflict = require('gulp-conflict'),
  template = require('gulp-template'),
  rename = require('gulp-rename'),
  inquirer = require('inquirer'),
  debug = require("gulp-debug"),
  notify = require("gulp-notify"),
  spawn = require("child_process").exec,
  gutil = require('gulp-util'),
  path = require('path'),
  forever = require('forever-monitor'),
  refresh = require('gulp-livereload'),
  livereload = require('tiny-lr'),
  plumber = require('gulp-plumber'),
  server = livereload(),
  uglify = require('gulp-uglify'),
  MatchStream = require('match-stream');

gulp.task('scripts', function (cb) {
  return gulp.src('./client/*.js')
    .pipe(refresh(server))
    .pipe(gulp.dest('./client/js/build'));
});

gulp.task('html', function () {
  return gulp.src('./client/*.html')
    .pipe(refresh(server));
});

// gulp.task('styles', function(cb) {
//   return gulp.src('./client/sass/*.scss')
//     .pipe(plumber())  
//     .pipe(sass({ style: 'expanded', sourceComments: 'map', errLogToConsole: true}))
//     .pipe(autoprefixer('last 2 version', "> 1%", 'ie 8', 'ie 9'))
//     .pipe(gulp.dest('./client/css'))
//     .pipe(refresh(server))
//     .pipe(notify({message: 'completed sass compile.'}));
// });

gulp.task('clean', function (cb) {
  gulp.src('build', {
    read: false
  })
    .pipe(clean({
      force: true
    }));
});

gulp.task('lr-server', function (cb) {
  server.listen(35729, function (err) {
    if (err) return console.log(err);
  });

});

gulp.task('watch', function (cb) {
  gulp.watch(['./client/js/**/*.js'], ['scripts', 'html']);
  gulp.watch(['./client/templates/*.html', './client/templates/**/*.html'], ['html']);
  // gulp.watch('./client/sass/*.scss', ['styles']);
});

gulp.task('build', ['lr-server', 'scripts' /*, 'styles'*/ ]);


gulp.task('default', ['build', 'server', 'watch']);


gulp.task('server', function (done) {

  var child = new(forever.Monitor)('app.js', {
    max: 5,
    silent: false,
    command: 'node --harmony',
    options: []
  });

  child.on('exit', function () {
    console.log('We Tried, Captain. But she keeps failing.');
  });

  child.start();
});

gulp.task('test', function (done) {
  var once;
  var webdriver = spawn('webdriver-manager start');
  var matcher = new MatchStream({
    pattern: 'Started org.openqa.jetty.jetty.Server'
  }, function (buf, matched, extra) {
    if (!matched) {
      return this.push(buf);
    }
    console.log("Selenium Server Started!!");
    startTest();
    return this.push(null);
  });
  webdriver.stdout.pipe(matcher);

  function startTest() {
    if (!once) {
      once = true;
      var test = spawn('node --harmony ./node_modules/protractor/bin/protractor ./protractor.conf.js');
      test.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      test.stderr.on('data', function (data) {
        console.log('stdout: ' + data);
        done();
      });
      test.on('exit', function () {
        webdriver.kill();
        done();
      });
    }
  }


});