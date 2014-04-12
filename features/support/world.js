"use strict";

var slice = Array.prototype.slice;
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
global.expect = chai.expect;
global.co = require('co');


function isGeneratorFunction(func) {
  return /^\s*function\s*\*/.test(func.toString());
}

function wrapGeneratorFunctionInCo(func) {
  if (isGeneratorFunction(func)) {
    return co(func);
  } else {
    return func;
  }
}

var oldStepDefinition = Cucumber.SupportCode.StepDefinition;
Cucumber.SupportCode.StepDefinition = function (name, code) {
  return oldStepDefinition.call(this, name, function () {
    var self = this;
    var args = slice.call(arguments, 0, -1);
    code = wrapGeneratorFunctionInCo(code);
    return protractor.promise.controlFlow().execute(function () {}).then(function () {
      var deferred = protractor.promise.defer();
      code.apply(self, args.concat([
        function (err, value) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.fulfill(value);
          }
        }
      ]));
      return deferred.promise;
    });
  });
};
