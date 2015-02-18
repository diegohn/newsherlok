(function() {
  //Module
   var sherlokApp = angular.module('sherlokApp', ['ngRoute','ui.router','ngCookies','sherlok-employees','sherlok-calendar','sherlok-jobs', 'sherlok-vehicles','sherlok-login','sherlok-inventory','sherlok-notes']);

   sherlokApp
      .config(function($stateProvider, $urlRouterProvider) {
         // $urlRouterProvider.otherwise('/login');
         $urlRouterProvider.otherwise('/');

         $stateProvider
            .state('home', {
               url: '/',
               template: '<div>This is a test home</div>',
               // templateUrl: 'templates/home-template.html',
               data: {
                  requireLogin: true
               }
            })
            .state('login', {
               url: '/login',
               // templateUrl : '/templates/login.html',
               template: '<div>This is a test login</div>',
               controller  : 'loginController',
               data: {
                  requireLogin: false
               }
            })
            .state('home.calendar', {
               url: '/calendar',
                templateUrl: '/templates/calendar.html',
                controller  : 'calendarController',
               data: {
                  requireLogin: true
               }
            })
            .state('home.employees', {
               url: '/employees',
               templateUrl : 'templates/employees.html',
               controller  : 'employeeController', 
               data: {
                  requireLogin: true
               }
            })
            .state('home.employees.detail', {
               url: '/employees/:empID',
               templateUrl : 'templates/employee-detail.html',
               controller: 'employeeDetailController', 
               data: {
                  requireLogin: true
               }
            })
            .state('home.clients', {
               url: '/clients',
               templateUrl : 'templates/clients.html',

               data: {
                  requireLogin: true
               }
            })
            .state('home.jobs', {
               url: '/jobs',
               templateUrl : 'templates/jobs.html',
               controller  : 'jobController',
               data: {
                  requireLogin: true
               }
            })
            .state('home.jobs.detail',{
               url: '/jobs/:jobId',
               templateUrl : 'templates/job-detail.html',
               controller: 'jobDetailController', 
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
            .state('home.vehicles.detail',{
               url: '/vehicles/:vehId',
               templateUrl: 'templates/vehicle-detail.html',
               controller: 'vehicleControllerDetail',
               data : {
                  requireLogin: true
               }
            })
            .state('home.add-vehicle',{
               url: '/add-vehicle',
               templateUrl: 'templates/add-vehicle.html',
               controller: 'vehicleAddController',
               data : {
                  requireLogin: true
               }
            })
            .state('home.inventory', {
               url: '/inventory',
               templateUrl : 'templates/inventory.html',
               controller  : 'inventoryController',
               data: {
                  requireLogin: true
               }
            })
            .state('home.notes', {
               url: '/notes',
               templateUrl : 'templates/notes.html',
               controller  : 'notesController',
               data: {
                  requireLogin: true
               }
            })
            .state('home.general',{
               url: '/general/:jobId',
               templateUrl: 'templates/job-detail.html',
               controller : 'jobDetailController',
               data: {
                  requireLogin: true
               }
            });
         });
      sherlokApp
         .run(function ($rootScope, $state, $cookieStore, $location) {
            $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
            var requireLogin = toState.data.requireLogin;
            if (requireLogin){
               $rootScope.globals = $cookieStore.get('globals') || {};
               if (!$rootScope.globals.currentUser) {
                  event.preventDefault();
                  $state.transitionTo("login");
               } 
            }
         });
      });

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
