'use strict';

/* Controllers */
var programGroupControllers = angular.module('programGroupControllers', []);

 /**
 * App ctrl
 */
programGroupControllers.controller('AppCtrl', ['$scope', '$filter',  '$routeParams', 'Manager', 'Translation', '$location',
  function ($scope, $filter, $routeParams, Manager, Translation, $location) {

    if ($routeParams.key) {
      Manager.init($routeParams.key);
    }
    $scope.manager = Manager.get();
    $scope.location = $location;
    $scope.msg = Translation.getMsg();
    $scope.ref = Translation.getRef();
    $scope.devise = '€';

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

 /**
 * Contractual Extras Ctrl used by service-contractualExtras.html
 */
programGroupControllers.controller('ContractualExtrasCtrl', ['$scope', 'filterFilter', 'Manager',
  function ($scope, filterFilter, Manager) {

    $scope.closeTemplate = function () {
      $scope.template = '';
    }

    $scope.copyToResort = function (line) {
      $scope.line = line;
      if (line.type == 'skiRental' || line.type == 'skiBootRental') {
        $scope.line.quantityResort = $scope.line.quantity * $scope.line.nbDay;
      }
      else {
        $scope.line.quantityResort = $scope.line.quantity;
      }
      $scope.line.priceResort = $scope.line.price;
      Manager.saveTransaction($scope.manager.transaction);
      $scope.calculTotal();
    }

    $scope.editLine = function (line) {
      $scope.servicesCopy = angular.copy($scope.manager.transaction.services);
      $scope.line = line;
      $scope.template = '/partials/form-contractualExtras.html';
    }

    $scope.cancelLine = function () {
      $scope.manager.transaction.services = $scope.servicesCopy;
      $scope.closeTemplate();
    }

    $scope.saveLine = function (line) {
      Manager.saveTransaction($scope.manager.transaction);
      $scope.calculTotal();
      $scope.closeTemplate();
    }

    $scope.calculTotal = function () {
      $scope.total = 0;
      $scope.totalResort = 0;
      angular.forEach(filterFilter($scope.manager.transaction.services, {payment:'paymentCustomer'},true), function(value, key) {
        // Total for skiRental, skiBootRental
        if (value.type == 'skiRental' || value.type == 'skiBootRental') {
          $scope.total += (value.nbDay * value.price * value.quantity); 
          if (value.quantityResort && value.priceResort ) {
            $scope.totalResort += (value.priceResort * value.quantityResort); 
          }
        }
        else {
          $scope.total += (value.price * value.quantity);
          if (value.quantityResort && value.priceResort) {
            $scope.totalResort += (value.priceResort * value.quantityResort);
          }
        }
      });
    }
    $scope.calculTotal();

  }]);

 /**
 * Service Ctrl used by service.html
 */
programGroupControllers.controller('ServiceCtrl', ['$scope', '$routeParams', 'filterFilter', 'Manager',
  function ($scope, $routeParams, filterFilter, Manager) {
    $scope.type = $routeParams.type;
    $scope.templateType = 'partials/table-' + $scope.type + '.html';
    $scope.templateField = 'partials/field-'  + $scope.type + '.html';

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
          break
        }
      }
      Manager.saveTransaction($scope.manager.transaction);
      $scope.calculTotal();
    }

    $scope.copyLine = function (line) {
      $scope.manager.transaction.services.push(angular.copy(line));
      Manager.saveTransaction($scope.manager.transaction);
      $scope.calculTotal();
    }

    $scope.editLine = function (line) {
      $scope.newLine = false;
      $scope.servicesCopy = angular.copy($scope.manager.transaction.services);
      $scope.line = line;
      if (line.date) {
        $scope.line.date = new Date(line.date);
      }
      if (line.dateTo) {
        $scope.line.dateTo = new Date(line.dateTo);
      }
      $scope.template = '/partials/form-service.html';
    }

    $scope.cancelLine = function () {
      if (!$scope.newLine) {
        $scope.manager.transaction.services = $scope.servicesCopy;
      }
      $scope.closeTemplate();
    }

    $scope.saveLine = function (line) {
      // nbDay for skiRental or skiBootRental
      if ($scope.type == 'skiRental' || $scope.type == 'skiBootRental') {
        line.nbDay = 1 +  (line.dateTo - line.date) / (24 * 3600 * 1000);
      }
      if ($scope.newLine) {
        $scope.manager.transaction.services.push(line);
      }
      Manager.saveTransaction($scope.manager.transaction);
      $scope.calculTotal();
      $scope.closeTemplate();
    }

    $scope.editComment = function (commentFrom) {
      $scope.commentFrom = commentFrom;
      console.log($scope.type);
      if ($scope.manager.transaction[$scope.type][commentFrom]) {
        $scope.comment = $scope.manager.transaction[$scope.type][commentFrom];
      }
      $scope.template = '/partials/form-comment.html';
    }

    $scope.saveComment = function (comment) {
      $scope.manager.transaction[$scope.type][$scope.commentFrom] = comment;
      Manager.saveTransaction($scope.manager.transaction);
      $scope.closeTemplate();
    }

    $scope.calculTotal = function () {
      $scope.total = 0;
      angular.forEach(filterFilter($scope.manager.transaction.services, {type:$scope.type},true), function(value, key) {
        // Total for skiRental, skiBootRental
        if ($scope.type == 'skiRental' || $scope.type == 'skiBootRental') {
          $scope.total += (value.nbDay * value.price * value.quantity);  
        }
        else {
          $scope.total += (value.price * value.quantity);
        }
      });
    }
    $scope.calculTotal();
  }
]);
