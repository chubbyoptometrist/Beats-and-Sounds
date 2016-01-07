// HANDLES USER AUTHENTICATION ============================
angular.module('beatssounds.services', [])
  .factory('auth', function($http, $location, $timeout) {
    var locationData = JSON.parse(localStorage.getItem("location"));
    var playListInfo;
    var artistInfo;

    var removeDuplicates = function(shows) {
      var seen = {}
      for (var i = 0; i < shows.length; i++) {
        if (seen[shows[i].show.concert_name]) {
          shows.splice(i, 1);
        } else {
          seen[shows[i].show.concert_name] = true;
        }
      }
      return shows
    };

    var getPlaylists = function() {
      if (playListInfo === undefined) {
        return $http({
            method: 'GET',
            url: '/myconcerts',
            params: {
              location: locationData
            }
          })
          .then(function(resp) {
            if (resp.data === "go to login") {
              $location.path('/loginpage');
            } else {
              playListInfo = removeDuplicates(resp.data);
              return playListInfo
            }
          });
      } else {
        return Promise.resolve(playListInfo);
      }
    };
    var getFollowing = function() {
      if (artistInfo === undefined) {
        return $http({
            method: 'GET',
            url: '/myartists',
            params: {
              location: locationData
            }
          })
          .then(function(resp) {
            if (resp.data === "go to login") {
              $location.path('/loginpage');
            } else {
              artistInfo = removeDuplicates(resp.data);
              return artistInfo;
            }
          });
      } else {
        return Promise.resolve(artistInfo);
      }
    };
    var getSimilar = function(artistID) {
      return $http({
          method: 'GET',
          url: '/suggestedconcerts',
          params: {
            artistID: artistID
          }
        })
        .then(function(resp) {
          console.log(resp);
          if (resp.data === "go to login") {
            $location.path('/loginpage');
          } else {
            return resp.data;
          }
        });
    };
    return {
      getPlaylists: getPlaylists,
      getFollowing: getFollowing,
      getSimilar: getSimilar
    };
  })

// HANDLES TIME CALCULATION ==============================
.factory('time', function() {
  var convertMonth = function(num) {
    var names = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return names[num - 1];
  };
  var parseDate = function(date) {
    return date.split('-');
  }
  var parseMonth = function(date) {
    var month = this.parseDate(date)[1];
    return this.convertMonth(month);
  };
  var parseDay = function(date) {
    return this.parseDate(date)[2];
  };
  return {
    convertMonth: convertMonth,
    parseDate: parseDate,
    parseMonth: parseMonth,
    parseDay: parseDay
  };
})

// HANDLES USER GEOLOCATION ==============================
.factory('space', function() {
  var findLocation = function(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        localStorage.setItem("location", JSON.stringify([position.coords.latitude, position.coords.longitude]));
        callback();
      });
    } else {
      localStorage.setItem("location", "");
      callback();
    }
  };

  return {
    findLocation: findLocation
  }
});
