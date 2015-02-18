(function() {
	var sherlokApp = angular.module('sherlok-inventory', ['ngCookies']);
	//Controllers
	sherlokApp.controller( 'inventoryController',['$cookieStore','$scope',function($cookieStore,$scope){
		$scope.test = 'This is controller';
	}]);
})();