'use strict';

var programGroupApp = angular.module('programGroupApp', [
  'app.filters',
  'app.services',
  'app.directives',
  'ngRoute',
  'programGroupControllers'
]);

programGroupApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/dashboard.html',
        controller: 'AppCtrl'
      }).
      when('/token/:key', {
        templateUrl: 'partials/dashboard.html',
        controller: 'AppCtrl'
      }).
      when('/service/:type', {
        templateUrl: 'partials/service.html',
        controller: 'ServiceCtrl'
      }).
      when('/contractualExtras', {
        templateUrl: 'partials/service-contractualExtras.html',
        controller: 'ContractualExtrasCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
