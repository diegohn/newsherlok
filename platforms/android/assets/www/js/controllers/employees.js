(function() {
	//Module
  	var sherlokApp = angular.module('sherlok-employees', ['ngCookies','ui.router']);

  	//Controllers
  	sherlokApp.controller('employeeController',['$scope','$cookieStore','$http',function($scope,$cookieStore,$http) {
    	// $scope.title = 'Employees';
    	var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;
        $scope.showAll = true;
        $scope.parent_width = 'col-md-9';
    	//Get all the jobs
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_list_employees&cookie='+cookie)
    		.success(function(data,status,headers,config){
    			// console.log(data);
    			if(data.response) {
    				$scope.employees = data.employees;
    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});

    	//Filter by Role.
    	$scope.categoryFilterManagers = function (employee) {
            return employee.role === 'administrator' || employee.role === 'manager';
        };

        $scope.categoryFilterMembers = function (employee) {
            return employee.role === 'leader' || employee.role === 'member';
        };

        $scope.reduceParent = function() {
           $scope.parent_width = 'col-md-3';
           $scope.child_width = 'col-md-6';
        };
        
  	}]);

  	sherlokApp.controller('employeeDetailController',['$scope','$cookieStore','$http','$routeParams','$stateParams',function($scope,$cookieStore,$http,$routeParams,$stateParams) {
  		$scope.title = 'Employee Info';
  		var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;
    	// var empIdUrl = $routeParams.empId;
        var empIdUrl = $stateParams.empID;
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_employee_info&cookie='+cookie+'&employee='+empIdUrl)
    		.success(function(data,status,headers,config){
    			//console.log(data);
    			if(data.response) {
    				$scope.details = data.details;
    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});
            $scope.showParent = function() {
                $scope.$parent.parent_width = 'col-md-9';
                $scope.$parent.child_width = 'hidden-md';
            };
  	}]);
})();