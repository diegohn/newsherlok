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
               categories = extractCategories(data.processed);
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
            var cat = input[x]['type'].toLowerCase();
            if(categories.indexOf(cat) == -1) {
               categories.push(input[x]['type'].toLowerCase());
            }
         }
         return categories;
      }
  	}]);
   sherlokApp.controller('vehicleControllerDetail',['$scope','$stateParams','$http','$cookieStore','$state',function($scope,$stateParams,$http,$cookieStore,$state){
      $scope.edit = true;
      var vehId = $stateParams.vehId;
      var credentials = $cookieStore.get('globals');
      var cookie = credentials.currentUser.cookie;
      $http.post('http://sherlok.theideapeople.net/?json=tip.get_vehicle_info&cookie='+cookie+'&vehicle='+vehId)
         .success(function(data,status,headers,config){
            if(data.response){
               console.log(data);
               $scope.options = data.details.state_logic;
               $scope.assgDriver = data.details.user_logic;
               found = checkLogic($scope.options,data.details.state);
               found2 = checkLogic($scope.assgDriver,data.details.driver);
               $scope.information = {
                  avatar   : data.details.avatar,
                  name     : data.details.name,
                  type     : data.details.type,
                  driver   : $scope.assgDriver[found2],
                  notes    : data.details.notes,
                  plate    : data.details.plate,
                  state    : $scope.options[found],
                  mileage  : parseFloat(data.details.mileage),
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
      //Functions
      $scope.editButton = function() {
         if($scope.edit == true) {
            $scope.edit = false;
         } else {
            $scope.edit = true;
         }
      };
      $scope.update = function(values) {

        updateUrl = encodeURI('id,'+vehId+'|title,'+values.name+'|description,'+values.notes+'|type,'+values.type+'|driver,'+values.driver.option+'|plate,'+values.plate+'|state,'+values.state.option+'|mileage,'+values.mileage+'|oil,'+values.oil_last+'|air,'+values.air_last+'|nextoil,'+values.oil_next+'|nextair,'+values.air_next);
    
         $http.post('http://sherlok.theideapeople.net/?json=tip.update_vehicle_info&cookie='+cookie+'&vehicle='+updateUrl)
          .success(function(data,status,headers,config){
            if(data.response) {
              navigator.notification.alert(
                data.message,  
                function(){
                   $state.transitionTo($state.current, $stateParams, {
                      reload: true,
                      inherit: false,
                      notify: true
                  });
                },             
                'Vehicle',            
                'OK'                 
             );
           } else {
              navigator.notification.alert(
                data.message,  
                function(){
                   $state.transitionTo($state.current, $stateParams, {
                      reload: true,
                      inherit: false,
                      notify: true
                  });
                },             
                'Vehicle',            
                'OK'                 
              );
           }
          })
          .error(function(data,status,headers,config){
            console.log(data);
          });

      };
      checkLogic = function(array,name) {
         position = 0;
         for(x = 0; x < array.length; x++) {
            if(array[x]['option'] === name) {
               position = x;
            }
         }
         return position;
      };
   }]);
   sherlokApp.controller('vehicleAddController',['$scope','$http','$cookieStore','$state',function($scope,$http,$cookieStore,$state){
      var imagePath;
      var imageAttach;
      var credentials = $cookieStore.get('globals');
      var cookie = credentials.currentUser.cookie;

      $scope.allStates = [{ option: 'AL', label: 'alabama' },{ option: 'AK', label: 'alaska' },{ option: 'AZ', label: 'arizona' },{ option: 'AR', label: 'arkansas' },{ option: 'CA', label: 'california' },{ option: 'CO', label: 'colorado' },{ option: 'CT', label: 'connecticut' },{ option: 'DE', label: 'delaware' },{ option: 'DC', label: 'district of colombia' },{ option: 'FL', label: 'florida' },{ option: 'GA', label: 'georgia' },{ option: 'HI', label: 'hawaii' },{ option: 'ID', label: 'idaho' },{ option: 'IL', label: 'illinois' },{ option: 'IN', label: 'indiana' },{ option: 'IA', label: 'iowa' },{ option: 'KS', label: 'kansas' },{ option: 'KY', label: 'kentucky' },{ option: 'LA', label: 'louisiana' },{ option: 'ME', label: 'maine' },{ option: 'MD', label: 'maryland' },{ option: 'MA', label: 'massachusetts' },{ option: 'MI', label: 'michigan' },{ option: 'MN', label: 'minnesota' },{ option: 'MS', label: 'mississippi' },{ option: 'MO', label: 'missouri' },{ option: 'MT', label: 'montana' },{ option: 'NE', label: 'nebraska' },{ option: 'NV', label: 'nevada' },{ option: 'NH', label: 'new hampshire' },{ option: 'NJ', label: 'new jersey' },{ option: 'NM', label: 'new mexico' },{ option: 'NY', label: 'new york' },{ option: 'NC', label: 'north carolina' },{ option: 'ND', label: 'north dakota' },{ option: 'OH', label: 'ohio' },{ option: 'OK', label: 'oklahoma' },{ option: 'OR', label: 'oregon' },{ option: 'PA', label: 'pennsylvania' },{ option: 'PR', label: 'puerto rico' },{ option: 'RI', label: 'rhode island' },{ option: 'SC', label: 'south carolina' },{ option: 'SD', label: 'south dakota' },{ option: 'TN', label: 'tennessee' },{ option: 'TX', label: 'texas' },{ option: 'UT', label: 'utah' },{ option: 'VT', label: 'vermont' },{ option: 'VA', label: 'virginia' },{ option: 'WA', label: 'washington' },{ option: 'WV', label: 'west virginia' },{ option: 'WI', label: 'wisconsin' },{ option: 'WY', label: 'wyoming' } ]
      //Model
      $scope.information = {
         states : $scope.allStates
      }; 

      //Functions
      $scope.saveData = function(values) {
         if(imageAttach){
             var vehicleUrl = encodeURI('plate,'+values.plate+'|state,'+values.states.option+'|mileage,'+values.mileage+'|type,'+values.category+'|oil,'+values.oil_last+'|air,'+values.air_last+'|description,'+values.notes+'|title,'+values.category+values.plate+'|nextoil,'+values.oil_next+'|nextair,'+values.air_next+'|img,'+imageAttach);
            $http.post('http://sherlok.theideapeople.net/?json=tip.set_vehicle&cookie='+cookie+'&vehicle='+vehicleUrl)
             .success(function(data,status,headers,config){
                 if(data.response) {
                     navigator.notification.alert(
                        'Vehicle  added to organization.',  
                        function(){
                           $state.transitionTo("home.vehicles");
                        },             
                        'Vehicle',            
                        'OK'                 
                     );
                 }
             })
             .error(function(data,status,headers,config){
                 console.log(data);
             });
         } else {
            navigator.notification.alert(
               'Please add an image of the vehicle.',  
               null,             
               'Vehicle',            
               'OK'                 
            );
         } 
      };

      $scope.takeImage = function() {
         navigator.camera.getPicture(onSuccess, onFail, { 
            quality: 60,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType : Camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true,
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 450,
            targetHeight: 450 
         });
      };
      onSuccess = function(imageData) {
         //Prepare File
         var imageFile = imageData;
         extractedFilename = imageFile.substr(imageFile.lastIndexOf('/')+1);
         correctedFilename = extractedFilename.split('?', 1)[0];
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
         var obj = JSON.parse(r3.response);
      
         imagePath = obj.url;
         imageAttach = obj.id;    
         //$scope.image = imagePath;
         navigator.notification.alert(
            'Image uploaded!',      
            showImage,   
            'Vehicle Image',       
            'Done'                
         );
      }
      //Helper function on fail for uploadPhoto.
      failing = function(error2) {
         console.log(error2);
         navigator.notification.alert(
            'Failed to upload Image!',  
            null,             
            'Vehicle Image',            
            'Try Again'                 
         );
      }
      showImage = function() {
         var myEl = angular.element( document.querySelector( '#image' ));
         myEl.empty();
         myEl.append('<img src="'+imagePath+'" width="20px"/>');
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



