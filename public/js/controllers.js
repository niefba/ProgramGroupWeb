'use strict';

/* Controllers */
var programGroupControllers = angular.module('programGroupControllers', []);

programGroupControllers.controller('AppCtrl', ['$scope', '$filter', 'Translation',
  function ($scope, $filter, Translation) {
    $scope.label = Translation.getLabel();
    $scope.lang = 'fr';
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

    $scope.closeTemplate = function () {
      $scope.template = '';
    }
    
    $scope.editTransaction = function () {
      console.log('editTransaction');
      $scope.template = '/partials/form-transaction.html';
    }
  }]);

