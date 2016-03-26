'use strict';

/* Controllers */
var programGroupControllers = angular.module('programGroupControllers', []);

programGroupControllers.controller('AppCtrl', ['$scope', '$filter',  '$routeParams', '$http', 'Transaction', 'Translation',
  function ($scope, $filter, $routeParams, $http, Transaction, Translation) {

    if ($routeParams.key) {
      Transaction.init($routeParams.key);
    }
    $scope.data = Transaction.getTransaction();
    $scope.msg = Translation.getMsg();
    $scope.ref = Translation.getRef();
    $scope.lang = 'fr';

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
        $scope.data = $scope.transaction;
      });

      $scope.closeTemplate();
    }
  }]);

programGroupControllers.controller('ServiceCtrl', ['$scope', '$routeParams', '$http',
  function ($scope, $routeParams, $http) {
    $scope.type = $routeParams.type
  }
]);
