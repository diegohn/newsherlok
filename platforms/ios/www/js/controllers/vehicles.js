(function() {
  	//Module
  	var sherlokApp = angular.module('sherlok-vehicles', ['ngCookies','ui.router']);

  	//Controllers
	sherlokApp.controller('vehicleController', ['$http','$cookieStore','$scope',function($http,$cookieStore,$scope) {
    	var credentials = $cookieStore.get('globals');
    	var cookie = credentials.currentUser.cookie;

    	$http.post('http://sherlok.theideapeople.net/?json=tip.get_vehicles&cookie='+cookie)
    		.success(function(data,status,headers,config){
    			if(data.response) {
    				$scope.vehicles = data.processed; 
               categories = extractCategories(data.processed);//I extracted all the categories from the vehicles.
               $scope.allCategories = categories;
    			}
    		})
    		.error(function(data,status,headers,config){
    			console.log(data);
    		});


      //Functions
      extractCategories = function(input) {
         categories = new Array();
         for(x = 0; x < input.length; x++) {
            if(categories.indexOf(input[x]['type'].toLowerCase()) == -1) {
               categories.push(input[x]['type']);
            } 
         }
         return categories;
      }
  	}]);
   sherlokApp.controller('vehicleControllerDetail',['$scope','$stateParams','$http','$cookieStore',function($scope,$stateParams,$http,$cookieStore){
      $scope.edit = true;
      var vehId = $stateParams.vehId;
      var credentials = $cookieStore.get('globals');
      var cookie = credentials.currentUser.cookie;
      $http.post('http://sherlok.theideapeople.net/?json=tip.get_vehicle_info&cookie='+cookie+'&vehicle='+vehId)
         .success(function(data,status,headers,config){
            if(data.response){
               $scope.options = data.details.state_logic;
               found = checkState($scope.options,data.details.state);//magic happens here
               $scope.information = {
                  avatar : data.details.avatar,
                  name : data.details.name,
                  notes : data.details.notes,
                  plate : data.details.plate,
                  state : $scope.options[found],
                  mileage : parseFloat(data.details.mileage),
                  air_last : parseFloat(data.details.service.air_last),
                  air_next : parseFloat(data.details.service.air_next),
                  oil_last : parseFloat(data.details.service.oil_last),
                  oil_next : parseFloat(data.details.service.oil_next)
               };
            }
         })
         .error(function(data,status,headers,config){
            console.log(data);
         });
      $scope.editButton = function() {
          if($scope.edit == true) {
              $scope.edit = false;
          } else {
              $scope.edit = true;
          }
      };
      $scope.update = function(values) {
              console.log(values);
      };
      checkState = function(array,name) {
          position = 0;
          for(x = 0; x < array.length; x++) {
              if(array[x]['option'] === name) {
                      position = x;
              }
          }
          console.log(position);
          return position;
      };
   }]);
  sherlokApp.controller('vehicleAddController',['$scope',function($scope){

    $scope.takeImage = function() {
      navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 40,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
        allowEdit : false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 250,
        targetHeight: 250 
      });
    };

    onSuccess = function(imageData) {
      //Prepare File
      var imageFile = imageData;
      extractedFilename = imageFile.substr(imageFile.lastIndexOf('/')+1);
      correctedFilename = extractedFilename.split('?', 1)[0];

      //console.log(correctedFilename);
      //Create File Transfer Object
      var ft = new FileTransfer(); 
      //Options                    
      var options = new FileUploadOptions();
      options.fileKey  = "vImage1";                      
      options.fileName = extractedFilename;
      options.mimeType = "image/jpeg";
      //Params
      var params = new Object();
      params.value1 = "test";
      params.value2 = "param";                       
      options.params = params;
      options.headers = { Connection: "close" };
      options.chunkedMode = true;
      ft.upload(imageData, encodeURI("http://sherlok.theideapeople.net/sherlok.php"), winning, failing, options, true);
    }
    //Fail helper
    onFail = function(message) {
      console.log('Failed because: ' + message);
    }
    //Helper function on success for uploadPhoto.
    winning = function(r3) {
    console.log(r3);
      console.log("Code = " + r3.responseCode);
      console.log("Response = " + r3.response);
      console.log("Sent = " + r3.bytesSent);
  }
    //Helper function on fail for uploadPhoto.
    failing = function(error2) {
      console.log(error2);
      // console.log("An error2 has occurred: Code = " + error2.code);
      // console.log("upload error2 source " + error2.source);
      // console.log("upload error2 target " + error2.target);
    }
  }]);

   //Custom Filters
   sherlokApp.filter('filterCategory',function(){
      return function(vehicle,category){
        var arrayToReturn = [];        
        for (var i=0; i<vehicle.length; i++){
            if (vehicle[i].type.toLowerCase() == category.toLowerCase()) {
                arrayToReturn.push(vehicle[i]);
            }
         }
         return arrayToReturn;
      };//End of return
   });

})();



