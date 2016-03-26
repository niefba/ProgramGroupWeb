'use strict';

/* Controllers */
var programGroupControllers = angular.module('programGroupControllers', []);

programGroupControllers.controller('AppCtrl', ['$scope', '$filter', 'Translation',
  function ($scope, $filter, Translation) {
    $scope.msg = Translation.getMsg();
    $scope.ref = Translation.getRef();
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
      $scope.transaction = angular.copy($scope.data);
      $scope.transaction.dateFrom = new Date($scope.transaction.dateFrom);
      $scope.transaction.dateTo = new Date($scope.transaction.dateTo);
      if (!$scope.transaction.leaders) {
        $scope.transaction.leaders = [{
          leaderName: '',
          leaderFunction: ''
        }];
      }
      $scope.template = '/partials/form-transaction.html';
    }

    $scope.addLeader = function () {
      $scope.transaction.leaders.push({
          leaderName: '',
          leaderFunction: ''
        });
    }

    $scope.removeLeader = function (index) {
      $scope.transaction.leaders.splice(index, 1);
    }

    $scope.saveTransaction = function (transaction) {
      $http({
        url: '/saveTransaction',
        method: "POST",
        data: {transaction: transaction},
      }).
      error(function(data, status, headers, config) {
        $scope.errorMessage = 'Translation error';
      }).
      success(function(data, status, headers, config) {
        //$scope.successMessage = 'Translation saved';
        $scope.data = $scope.transaction;
      });

      $scope.closeTemplate();
    }
  }]);

