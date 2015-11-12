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
        $scope.isLoading = false;
        $scope.data = resp;
        $scope.paginate();
        // $scope.pageCounter();
      })
    };

    $scope.getConcerts()

    /// PAGINATION ==========================================
    $scope.itemsPerPage = 4
    $scope.currentPage = 1;

    $scope.pageCount = function () {
      return Math.ceil($scope.data.length / $scope.itemsPerPage);
    };

    $scope.paginate = function () {
      $scope.totalItems = $scope.data.length;
      $scope.$watch('currentPage + itemsPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
        var end = begin + $scope.itemsPerPage;
        $scope.filteredEvents = $scope.data.slice(begin, end);
      
        var counter = $scope.data.length / $scope.itemsPerPage;
        if ($scope.currentPage <= counter) {
          $scope.showing = $scope.itemsPerPage;
        } else {
          $scope.showing = $scope.data.length;
        }
      });
    };
  });
