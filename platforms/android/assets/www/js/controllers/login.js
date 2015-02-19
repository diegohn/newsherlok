(function() {
  	//Module
  	var sherlokApp = angular.module('sherlok-login', ['ngCookies','ui.router']);

  	//Controllers
   	sherlokApp.controller('loginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService', '$cookieStore','$state',
    function ($scope, $rootScope, $location, AuthenticationService, $cookieStore) {
        // reset login status
        AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                	//here we pass the cookie
                	var my_cookie = response.thecookie;
                    AuthenticationService.SetCredentials($scope.username, $scope.password, my_cookie);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
  	}]);

   	sherlokApp.factory('AuthenticationService',
    ['Base64', '$http', '$cookieStore', '$rootScope', '$timeout',
    function (Base64, $http, $cookieStore, $rootScope, $timeout) {
        var service = {};

        service.Login = function (username, password, callback) {
            $http.post('http://sherlok.theideapeople.net/?json=core.get_nonce&controller=user&method=generate_auth_cookie')
            .success(function(data,status,headers,config) {
                var nonce = data.nonce;
                console.log(data);
                console.log(nonce);
                $http.post("http://sherlok.theideapeople.net/?json=user.generate_auth_cookie&nonce="+nonce+"&username="+username+"&password="+password)
                .success(function(data,status,headers,config) {
                    if(data.status == 'error') {
                        console.log(data);
                        var response = {};
                        response.message = data.error;
                        callback(response);
                    } else {
                        console.log(data);
                        var response = {};
                        response.success = true;
                        response.thecookie = data.cookie;
                        console.log(response);
                        callback(response);
                    }
                })
                .error(function(data,status,headers,config) {
                  console.log(data);
                  callback('Try again later.');  
                });
            })
            .error(function(data,status,headers,config){
                console.log(data);
                callback('Try again later.');
            });
 
        };
        service.SetCredentials = function (username, password, cookie) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    cookie  : cookie
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
        };
        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        };
        return service;
    }])
  
sherlokApp.factory('Base64', function () {
    /* jshint ignore:start */
  
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
  
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
  
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
  
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
  
            return output;
        },
  
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
  
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
  
                output = output + String.fromCharCode(chr1);
  
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
  
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
  
            } while (i < input.length);
  
            return output;
        }
    };
  
    /* jshint ignore:end */
});



})();



