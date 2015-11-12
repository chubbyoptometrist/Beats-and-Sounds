angular.module('beatssounds.concerts', ['ui.bootstrap'])
  .controller('concertController', function ($scope, auth, time) {

    $scope.parseMonth = function(date) {
      return time.parseMonth(date);
    };
    $scope.parseDay = function(date) {
      return time.parseDay(date);
    };

    $scope.focusIn = function() {
      this.focus = 'selected';
    };

    $scope.focusOut = function() {
      this.focus = '';
    };

    $scope.findBilling = function(name, acts) {
      for (var i = 0; i < acts.length; i++) {
        if (acts[i].displayName === name) {
          return acts[i].billing;
        }
      }
    };

    $scope.isFavorite = function(event) {
      console.log(event)
      return event.myCount > 5 ? 'favorite' : '';
    }

    $scope.getConcerts = function() {
      this.isLoading = true;
      auth.getConcerts().then(function(resp) {
        console.log(resp);
        $scope.isLoading = false;
        $scope.data = resp;
        $scope.eventsCounter();
      })
    };

    $scope.getConcerts()
    /// PAGINATION ==========================================
    $scope.filteredEvents = [];
    $scope.currentPage = 1;
    $scope.numPerPage = 6;
    $scope.maxSize = 6;

    $scope.$watch("currentPage + numPerPage", function () {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage);
      var end = begin + $scope.numPerPage;

      $scope.filteredEvents = $scope.data.slice(begin, end);
    });
    $scope.eventsCounter = function () {
      var num = $scope.data.length / 6;
      if ($scope.currentPage <= num) {
        $scope.current = 6;
      } else {
        $scope.current = $scope.data.length-(6*num);
      }
    };
  });
