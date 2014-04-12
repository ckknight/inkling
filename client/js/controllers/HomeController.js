define(function () {
	function HomeController($scope) {
		$scope.name = "You are home!";
	}

	return ['$scope', HomeController];
});