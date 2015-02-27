(function() {
  	//Module
  	var sherlokApp = angular.module('sherlok-jobs', ['ngCookies']);

  	//Controllers
   sherlokApp.controller('jobController',['$scope','$location','$http','$cookieStore','$filter',function($scope, $location,$http,$cookieStore,$filter) {
    	var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;
    	selectedStatus = null;
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_jobs_list&cookie='+cookie)
    		.success(function(data,status,headers,config){
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
            selectedStatus = newStatus;
      };
    	$scope.filterJobStatus = function(job){
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

  	sherlokApp.controller('jobDetailController',['$scope','$routeParams','$cookieStore','$http','$stateParams',function($scope,$routeParams,$cookieStore,$http,$stateParams){  		
  		//Variables.
  		var credentials = $cookieStore.get('globals');
  		var cookie 	    = credentials.currentUser.cookie;
      var allservices    = $cookieStore.get('organization_services');
      var jobIdUrl    = $stateParams.jobId;
      $scope.edit     = true;

  		//Get job details
    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_job_details&cookie='+cookie+'&job='+jobIdUrl)
    		.success(function(data,status,headers,config){
       		if(data.response) {
       			$scope.details = data;
               $scope.map = data.customer.map;
               $scope.navigate = data.customer.navigate;
       			//All logic for select inputs
               $scope.options = data.customer.state_logic;
               $scope.options2 = data.logic_vehicle;
               found  = checkLogic($scope.options,data.customer.state);
               found2 = checkLogic($scope.options,data.customer.state2);
               found3 = checkVehicle($scope.options2,data.vehicle.id);
            
               $scope.information = {
                  first   : data.customer.first,
                  last    : data.customer.last,
                  phone1  : data.customer.phone1,
                  phone2  : data.customer.phone2,
                  date    : new Date(data.schedule.start_timestamp),
                  stime   : new Date(data.schedule.start_timestamp),
                  etime   : new Date(data.schedule.end_timestamp),
                  lemail  : new Date(data.customer.l_mail),
                  lphone  : new Date(data.customer.l_phone),
                  colors  : checkbox(allservices,data.services),
                  email   : data.customer.email,
                  address1: data.customer.address1,
                  city1   : data.customer.city,
                  state1  : $scope.options[found],
                  zip1    : parseInt(data.customer.zip),
                  address2: data.customer.address2,
                  city2   : data.customer.city2,
                  state2  : $scope.options[found2],
                  zip2    : parseInt(data.customer.zip2),
                  vehicle : $scope.options2[found3]
               };
       		}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});
      //Functions  
      checkVehicle = function(array,id) {
         index = 0;
         for(x = 0; x < array.length; x++) {
            if(array[x]['id'] === parseInt(id)) {
               index = x;
            }
         }
         return index;
      }  
      checkLogic = function(array,name) {
         position = 0;
         for(x = 0; x < array.length; x++) {
            if(array[x]['option'] === name) {
               position = x;
            }
         }
         return position;
      };
      checkbox = function(stack,needles) {
        var object = {};
        for(x = 0; x < stack.length; x++) { 
          object[stack[x]] = (needles.indexOf(stack[x]) >= 0 ? true : false);
        }
        return object;     
      }; 
    	//Back button function.
    	$scope.editButton = function() { 
  		  if($scope.edit == true) {
          $scope.edit = false;
        } else {
          $scope.edit = true;
        }
  		};
      $scope.mapDirections = function() {
        var deviceOS  = device.platform
        var platform  = 'apple';
        if(deviceOS   == 'Android') {
            platform  = 'google';
        }


        var ref = window.open('http://maps.'+platform+'.com'+$scope.navigate, '_system', 'location=yes'); 
        ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); }); 
        ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); }); 
        ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); }); 
        ref.addEventListener('exit', function(event) { alert(event.type); }); 
      };
      $scope.update = function(values) {
         //This is the latest code 2:55PM 02-27-2015..
         var updateUrl = 'start,'+values.date+'|st';
        console.log(values);
      }
  	}]);
})();

