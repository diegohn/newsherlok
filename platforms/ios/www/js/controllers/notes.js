(function() {
	var sherlokApp = angular.module('sherlok-notes', ['ngCookies']);
	//Controllers
	sherlokApp.controller( 'notesController',['$cookieStore','$scope',function($cookieStore,$scope){
		$scope.test = 'This is controller';
	}]);
})();