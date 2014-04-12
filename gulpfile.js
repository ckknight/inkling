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
  path = require('path');

gulp.task('test', function (done) {
  var webdriver = spawn('webdriver-manager start');
  var matcher = new MatchStream({
    pattern: 'Started org.openqa.jetty.jetty.Server'
  }, function (buf, matched, extra) {
    if (!matched) {
      return this.push(buf);
    }
    this.push(buf);
    console.log("Selenium Server Started!!");
    startTest();
  });
  webdriver.stdout.pipe(matcher);

  function startTest() {
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

});