'use strict';

/* Directives */

angular.module('app.directives', []).

  /**
  * DatePicker
  * Usage:
  *    <div class="input-group">
  *        <input type="date" class="form-control" id="dateFrom" ng-model="transaction.dateFrom" placeholder="{{ msg.formatDate | translate:lang }}">
  *        <div data-date-picker data-model="transaction.dateFrom" data-lang="{{ lang }}" data-msg="msg"></div>
  *    </div> 
  */
  directive('datePicker', function() {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      scope: { 
        selectedDate:'=model',
        lang:'@lang',
        msg:'=msg',
      },
      templateUrl: '/partials/date-picker.html',

      // Date Picker controller
      controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {

        $scope.getDays = function(year, month) {
          var days = new Array(31);
          var checkDays = [31, 30 , 29];
          for (var index in checkDays) {
            // Checking if day is in the month
            var checkDate = new Date(year, month, checkDays[index]);
            if (checkDate.getMonth() != month) {
              days.pop()
            }
          }
          return days;
        }

        $scope.previousMonth = function($event) {
          $event.stopPropagation();
          if ($scope.month == 0) {
            $scope.month = 11;
            $scope.year = -- $scope.year;
          }
          else {
            $scope.month = --$scope.month;
          }
          $scope.days = $scope.getDays($scope.year, $scope.month);
        }

        $scope.nextMonth = function($event) {
          $event.stopPropagation();
          if ($scope.month == 11) {
            $scope.month = 0;
            $scope.year = ++ $scope.year;
          }
          else {
            $scope.month = ++ $scope.month;
          }
          $scope.days = $scope.getDays($scope.year, $scope.month);
        }

        $scope.previousYear = function($event) {
          $event.stopPropagation();
          $scope.year = --$scope.year;
          $scope.days = $scope.getDays($scope.year, $scope.month);
        }

        $scope.nextYear = function($event) {
          $event.stopPropagation();
          $scope.year = ++ $scope.year;
          $scope.days = $scope.getDays($scope.year, $scope.month);
        }

        $scope.today = function($event) {
          $event.stopPropagation();
          $scope.year = $scope.todayDate.getFullYear();
          $scope.month = $scope.todayDate.getMonth();
          $scope.days = $scope.getDays($scope.year, $scope.month);
        }

        $scope.isToday = function(day) {
          return (
            $scope.year == $scope.todayDate.getFullYear()
            && $scope.month == $scope.todayDate.getMonth()
            && day == $scope.todayDate.getDate()
          )
        }

        $scope.isCurrentDay = function(day) {
          return (
            $scope.selectedDate
            && $scope.year == $scope.currentDate.getFullYear()
            && $scope.month == $scope.currentDate.getMonth()
            && day == $scope.currentDate.getDate()
          )
        }

        $scope.setDate = function (day) {
          $scope.currentDate = new Date($scope.year, $scope.month, day);
          if ($scope.selectedDate && $scope.selectedDate.getFullYear() == $scope.year && $scope.selectedDate.getMonth() == $scope.month && $scope.selectedDate.getDate() == day) {
            $scope.selectedDate = "";
          }
          else {
            $scope.selectedDate = $scope.currentDate;
          }
        }

        if ($scope.selectedDate) {
          $scope.currentDate = $scope.selectedDate;
        }
        else {
          $scope.currentDate = new Date();
        }
        $scope.todayDate = new Date();
        $scope.year = $scope.currentDate.getFullYear();
        $scope.month = $scope.currentDate.getMonth();
        $scope.days = $scope.getDays($scope.year, $scope.month);        
      }], // Date Picker controller

      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {

      }
    };
  });