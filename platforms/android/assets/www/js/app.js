(function() {
  //Module
   var sherlokApp = angular.module('sherlokApp', ['ngRoute','ui.router','ngCookies','sherlok-employees','sherlok-calendar','sherlok-jobs', 'sherlok-vehicles','sherlok-login']);

   sherlokApp
      .config(function($stateProvider, $urlRouterProvider) {
         $urlRouterProvider.otherwise('/login');
         $stateProvider
            .state('home', {
               url: '/',
               //templateUrl: 'templates/calendar.html',
               templateUrl: 'templates/home-template.html',
               //controller  : 'calendarController',
               data: {
                  requireLogin: true
               }
            })
            .state('login', {
               url: '/login',
               templateUrl : 'templates/login.html',
               controller  : 'loginController',
               data: {
                  requireLogin: false
               }
            })
            .state('home.calendar', {
               url: '/calendar',
                templateUrl: 'templates/calendar.html',
                controller  : 'calendarController',
               // views: {
               //    'columnOne@home': { 
               //       controller: function(){
               //          this.logic = false;
               //       }
               //    },
               //    'columnTwo@home': { 
               //       templateUrl: 'templates/calendar.html',
               //       controller  : 'calendarController',
               //    }
               // },
               data: {
                  requireLogin: true
               }
            })
            .state('home.employees', {
               url: '/employees',
               templateUrl : 'templates/employees.html',
               controller  : 'employeeController', 
               // views: {
               //    'columnOne@home': { 
               //       controller: function(){
               //          this.logic = false;
               //       }
               //    },
               //    'columnTwo@home': { 
               //       templateUrl : 'templates/employees.html',
               //       controller  : 'employeeController' 
               //    }
               // },
               data: {
                  requireLogin: true
               }
            })
            .state('home.employees.detail', {
               url: '/detail/:empID',
               templateUrl : 'templates/employee-detail.html',
               controller: 'employeeDetailController', 
               data: {
                  requireLogin: true
               }
            })
            .state('home.clients', {
               url: '/clients',
               templateUrl : 'templates/clients.html',
              // views: {
              //     'columnOne@home': { 
              //        controller: function(){
              //           this.logic = false;
              //        }
              //     },
              //     'columnTwo@home': { 
              //        templateUrl : 'templates/clients.html'
              //     }
              //  },

               data: {
                  requireLogin: true
               }
            })
            .state('home.jobs', {
               url: '/jobs',
               templateUrl : 'templates/jobs.html',
               controller  : 'jobController',
               // views: {
               //    'columnOne@home': {
               //       template : '<ul><li><a href="">Potential</a></li><li><a href="">Active</a></li><li><a href="">Archived</a></li></ul>', 
               //       controller  : 'jobController'
               //    },
               //    'columnTwo@home': { 
               //       templateUrl : 'templates/jobs.html',
               //       controller  : 'jobController'
               //    }
               // },
               data: {
                  requireLogin: true
               }
            })
            .state('home.vehicles', {
               url: '/vehicles',
               templateUrl : 'templates/vehicles.html',
               controller  : 'vehicleController',
               data: {
                  requireLogin: true
               }
            })
            .state('home.inventory', {
               url: '/inventory',
               templateUrl : 'templates/inventory.html',
               //controller  : 'inventoryController',
               data: {
                  requireLogin: true
               }
            })
            .state('home.notes', {
               url: '/notes',
               templateUrl : 'templates/notes.html',
               //controller  : 'noteController',
               data: {
                  requireLogin: true
               }
            });
         });
      sherlokApp
      //    .run(function ($rootScope, $state, $cookieStore, $location) {
      //       $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      //       var requireLogin = toState.data.requireLogin;
      //       if (requireLogin){
      //          $rootScope.globals = $cookieStore.get('globals') || {};
      //          if (!$rootScope.globals.currentUser) {
      //             event.preventDefault();
      //             $state.transitionTo("login");
      //          } 
      //       }
      //    });
      // });

  //Controllers
  sherlokApp.controller('mainController', function($scope, $state,$location){
      $scope.activeJob = false;
      $scope.activateJobSub = function(value) {
         $scope.activeJob = value;
      };
  });

  //Directives
  // sherlokApp.directive('mainMenu',function(){
  //   return {
  //     restrict : 'E',
  //     templateUrl : 'templates/menu.html'
  //   }
  // });

})();
