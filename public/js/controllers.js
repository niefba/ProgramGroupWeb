'use strict';

/* Controllers */
var programGroupControllers = angular.module('programGroupControllers', []);

programGroupControllers.controller('AppCtrl', ['$scope',
  function ($scope) {
    
  }]);

programGroupControllers.controller('DashboardCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
    if ($routeParams.key) {
      $http({
        url: '/data',
        method: "GET",
        params: {token: $routeParams.key},
      }).
      error(function(data, status, headers, config) {
        $scope.data = data;
      }).
      success(function(data, status, headers, config) {
        $scope.data = data;
      });

    }
  }]);

