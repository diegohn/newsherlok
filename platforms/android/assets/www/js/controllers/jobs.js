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
  		var cookie 	 = credentials.currentUser.cookie;
      var jobIdUrl = $stateParams.jobId;
      $scope.edit = true;
      console.log(jobIdUrl);
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

            test = new Date(data.customer.l_mail);

            $scope.information = {
              first : data.customer.first,
              last : data.customer.last,
              phone1 : data.customer.phone1,
              phone2 : data.customer.phone2,
              date   : new Date(data.schedule.start_timestamp),
              stime  : new Date(data.schedule.start_timestamp),
              etime  : new Date(data.schedule.end_timestamp),
              lemaild : test,
              //lemailt : test.getTime(),
             
              //last phone call
              //last email
              //services
              email : data.customer.email,
              address1 : data.customer.address1,
              city1 : data.customer.city,
              state1 : data.customer.state,
              zip1 : parseInt(data.customer.zip),
              address2 : data.customer.address2,
              //vehicle
            };


    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});

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


        var ref = window.open('http://maps.'+platform+'.com'+$scope.customer.navigate, '_system', 'location=yes'); 
        ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); }); 
        ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); }); 
        ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); }); 
        ref.addEventListener('exit', function(event) { alert(event.type); }); 
      };
      $scope.update = function(values) {
        console.log(values);
      }
  	}]);
})();

