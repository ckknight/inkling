define(function () {
	function HomeController($scope) {
		$scope.name = "You are homes!";
	}

	return ['$scope', HomeController];
});