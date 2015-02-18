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
        $scope.$parent.parent_width = 'col-md-3';
        $scope.$parent.child_width = 'col-md-6';
        $scope.edit = true;
  		var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;
        var empIdUrl = $stateParams.empID;

    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_employee_info&cookie='+cookie+'&employee='+empIdUrl)
    		.success(function(data,status,headers,config){
    			if(data.response) {
                    $scope.details = data.details;
                    //Extract stored start time.
                    start_time = data.details.start; 
                    start_result = start_time.split(':');
                    //Extract stored end time.
                    end_time = data.details.end;
                    end_result = end_time.split(':');
                    //Create Options
                    $scope.options = data.details.logic_vehicle;
                    $scope.payType = data.details.logic_type;
                    //Find option selected in DB
                    found = checkVehicle($scope.options,data.details.vehicle);//magic happens here
                    found2 = checkType($scope.payType,data.details.pay_type);
                    //Create the object that works with the form, ng-model.
                    $scope.values = {
                        start :  new Date(1970, 0, 1, start_result[0], start_result[1], 0),
                        end : new Date(1970, 0, 1, end_result[0], end_result[1], 0),
                        first : data.details.first,
                        last : data.details.last,
                        mphone : data.details.main_phone,
                        aphone : data.details.alt_phone,
                        email : data.details.email,
                        selected :  $scope.options[found],
                        role : data.details.role,
                        rate : parseFloat(data.details.rate),
                        type : $scope.payType[found2]
                    }
                }
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});

            //Functions
            $scope.showParent = function() {
                $scope.$parent.parent_width = 'col-md-9';
                $scope.$parent.child_width = 'hidden-md';
            };
            $scope.update = function(values) {
              console.log(values);
            };
            $scope.editButton = function() {
                if($scope.edit == true) {
                    $scope.edit = false;
                } else {
                    $scope.edit = true;
                }
            }
            checkType = function(array,name) {
                test = 0;
                for(x = 0; x < array.length; x++) {
                    if(array[x]['name'] === name) {
                            test = x;
                    }
                }
                return test;
            }
            checkVehicle = function(array,id) {
                test = 0;
                for(x = 0; x < array.length; x++) {
                    if(array[x]['id'] === parseInt(id)) {
                            test = x;
                    }
                }
                return test;
            }  
  	}]);
})();