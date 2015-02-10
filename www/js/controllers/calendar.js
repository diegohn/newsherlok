(function() {
  //Module
  var sherlokApp = angular.module('sherlok-calendar', ['ngCookies','ngRoute']);

  //Controllers
   	sherlokApp.controller('calendarController',['$scope','$cookieStore','$http',function($scope,$cookieStore,$http){
    	// $scope.title = 'Calendar';
    	var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;
    	
    	//Get all the jobs
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_jobs_for_calendar&cookie='+cookie+'&month=2&year=2015')
    		.success(function(data,status,headers,config){
    			if(data.response) {
    				$scope.jobs = data.jobs;
    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});
  	}]);
})();



