(function() {
  	//Module
  	var sherlokApp = angular.module('sherlok-vehicles', []);

  	//Controllers
   	sherlokApp.controller('vehicleController', function($scope) {
    	$scope.message = 'This is the vehicles page.';
  	});
})();



