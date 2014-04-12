define(function () {
  describe('AppController', function () {
    var controller, scope;

    beforeEach(module('myApp'));
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('AppController', {
        $scope: scope
      });
    }));

    it('exists', function () {
      expect(controller).not.toBeUndefined();
    });
  });
});