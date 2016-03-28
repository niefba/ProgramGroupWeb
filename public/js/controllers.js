'use strict';

/* Controllers */
var programGroupControllers = angular.module('programGroupControllers', []);

programGroupControllers.controller('AppCtrl', ['$scope', '$filter',  '$routeParams', 'Manager', 'Translation', '$location',
  function ($scope, $filter, $routeParams, Manager, Translation, $location) {

    if ($routeParams.key) {
      Manager.init($routeParams.key);
    }
    $scope.manager = Manager.get();
    $scope.location = $location;
    $scope.msg = Translation.getMsg();
    $scope.ref = Translation.getRef();
    $scope.lang = 'fr';

    $scope.closeTemplate = function () {
      $scope.template = '';
    }
    
    $scope.editTransaction = function () {
      $scope.transaction = angular.copy($scope.manager.transaction);
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
      Manager.saveTransaction(transaction);
      $scope.closeTemplate();
    }
  }]);

programGroupControllers.controller('ServiceCtrl', ['$scope', '$routeParams', 'filterFilter', 'Manager',
  function ($scope, $routeParams, filterFilter, Manager) {
    $scope.type = $routeParams.type;

    $scope.closeTemplate = function () {
      $scope.template = '';
    }

    $scope.addLine = function () {
      $scope.newLine = true;
      $scope.line = {type: $scope.type};
      $scope.template = '/partials/form-service.html';
    }

    $scope.deleteLine = function (line) {
      line.delete = true;
      for (var index in $scope.manager.transaction.services) {
        if ($scope.manager.transaction.services[index].delete) {
          $scope.manager.transaction.services.splice(index, 1);
          return
        }
      }
      Manager.saveTransaction($scope.manager.transaction);
    }

    $scope.copyLine = function (line) {
      $scope.manager.transaction.services.push(angular.copy(line));
      Manager.saveTransaction($scope.manager.transaction);
    }

    $scope.editLine = function (line) {
      $scope.newLine = false;
      $scope.servicesCopy = angular.copy($scope.manager.transaction.services);
      $scope.line = line;
      $scope.line.date = new Date(line.date);
      $scope.template = '/partials/form-service.html';
    }

    $scope.cancelLine = function () {
      if (!$scope.newLine) {
        $scope.manager.transaction.services = $scope.servicesCopy;
      }
      $scope.closeTemplate();
    }

    $scope.saveLine = function (line) {
      if ($scope.newLine) {
        $scope.manager.transaction.services.push(line);
      }
      Manager.saveTransaction($scope.manager.transaction);
      $scope.closeTemplate();
    }

    $scope.editComment = function (commentFrom) {
      $scope.commentFrom = commentFrom;
      $scope.comment = $scope.manager.transaction[$scope.type][commentFrom];
      $scope.template = '/partials/form-comment.html';
    }

    $scope.saveComment = function (comment) {
      $scope.manager.transaction[$scope.type][$scope.commentFrom] = comment;
      Manager.saveTransaction($scope.manager.transaction);
      $scope.closeTemplate();
    }
  }
]);
