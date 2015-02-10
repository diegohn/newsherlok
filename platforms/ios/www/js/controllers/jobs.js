(function() {
  	//Module
  	var sherlokApp = angular.module('sherlok-jobs', ['ngCookies']);

  	//Controllers
   	sherlokApp.controller('jobController',['$scope','$location','$http','$cookieStore','$filter',function($scope, $location,$http,$cookieStore,$filter) {
    	var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;
    	selectedStatus = null;
    	// $scope.title = 'Jobs';
    
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_jobs_list&cookie='+cookie)
    		.success(function(data,status,headers,config){
    			//console.log(data);
    			if(data.response) {
    				$scope.jobs = data.jobs;
    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});
    	$scope.clearFilter = function() {
    		selectedStatus = null;
    	};
    	$scope.selectCategory = function (newStatus) {
    		//console.log('selectCategory');
    		//console.log(newStatus);
            selectedStatus = newStatus;
            //console.log(selectedStatus);
      };
    	$scope.filterJobStatus = function(job){
    		//console.log('diego');
    		//console.log(selectedStatus);

    		if(!selectedStatus){
    			return " ";
    		} else if(selectedStatus === 'potential') {
    			return job.status === 'potential';
    		} else if(selectedStatus === 'active') {
    			return job.status === 'scheduled' || job.status === 'in-progress' || job.status === 'completed';
    		} else if(selectedStatus === 'archive') {
    			return job.status === 'paid';
    		}
    	};
  	}]);

  	sherlokApp.controller('jobDetailController',['$scope','$routeParams','$cookieStore','$http',function($scope,$routeParams,$cookieStore,$http){
  		//Get the Job ID.
  		$scope.phoneId = $routeParams.jobId;
  		
  		//Variables.
  		var credentials = $cookieStore.get('globals');
  		var cookie 	 = credentials.currentUser.cookie;
  		var jobIdUrl = $routeParams.jobId;

  		//Get job details
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_job_details&cookie='+cookie+'&job='+jobIdUrl)
    		.success(function(data,status,headers,config){
    			console.log(data);
    			if(data.response) {
    				$scope.details = data;
    				$scope.customer = data.customer;
    				$scope.schedule = data.schedule;
    				$scope.services = data.services;
    				$scope.vehicle  = data.vehicle;
    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});

    	//Back button function.
    	$scope.backHistory = function() { 
    		window.history.back();
  		};
  	}]);
})();

