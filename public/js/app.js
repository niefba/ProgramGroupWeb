'use strict';

var programGroupApp = angular.module('programGroupApp', [
  'ngRoute',
  'programGroupControllers'
]);

programGroupApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/token/:key', {
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);