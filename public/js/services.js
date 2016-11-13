var services = angular.module('Services', ['Data']);

services.directive('profilePic', function($compile) {
  return {
    replace: true,
    scope: {
      user: '='
    },
    restrict: 'E',
    link: function($scope, $element, $attrs) {
      var id = $attrs.user.id;
      var DOM = angular.element('<img class="profile-pic md-user-avatar" ng-src="//graph.facebook.com/' + $scope.user.id + '/picture?type=square&height=100&width=100">');
      var $e = $compile(DOM)($scope);
      $element.replaceWith($e);
    }
  };
});

// I need a way to store the state of the search controller so
// we can load it again when you go back to the search page.
services.factory('State', function() {
  var savedState;

  return {
    save: function(state) {
      savedState = state;
    },
    get: function() {
      return savedState;
    }
  };
});

services.factory('Tours', function(MockData) {
  // Returns distance between two locations in miles
  // Credit: http://www.geodatasource.com/developers/javascript
  var distance = function(location1, location2) {
    if (!location1 || !location2) {
      return Math.Infinity;
    }
    var lat1 = location1.lat;
    var lon1 = location1.lng;
    var lat2 = location2.lat;
    var lon2 = location2.lng;
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  };

  var mockTours = MockData;

  return {
    getById: function(id) {
      return _.findWhere(mockTours, {_id: Number(id)});
    },

    search: function(searchParams) {
      var results = _.filter(mockTours, function(tour) {
        var keywords = searchParams.keywords.toLowerCase().split(' ');
        var fullText = [tour.title, tour.description].join(' ').toLowerCase();

        // Looks to see if we can find a keyword that the full text of
        // the tour does not contain.
        var containsAllKeywords = _.find(keywords, function(keyword) {
          return keyword && (fullText.indexOf(keyword) === -1);
        }) === undefined;

        var categories = _.keys(_.omit(searchParams.categories, function(value) {
          return !value;
        }));
        var matchesCategories = 
          !_.difference(tour.categories, categories).length;

        var isInDateRange =
          tour.time >= searchParams.startDate && tour.time <= searchParams.endDate;

        var isCloseEnough = distance(searchParams.location, tour.locations[0]) < 20;

        return containsAllKeywords && matchesCategories && 
               isInDateRange && isCloseEnough;
      });
      return results;
    },

    //TODO: Only return tours I am a part of.
    getMyTours: function() {
      return mockTours;
    }
  };
});

services.factory('Auth', function($rootScope) {
  var authStatus;
  var promise = $.Deferred();
  return {
    watchAuthStatusChange: function() {
      var self = this;
      FB.Event.subscribe('auth.authResponseChange', function(res) {
        authStatus = res.status;
        if (res.status === 'connected') {
          self.getUserInfo();
        }
        promise.resolve();
      });
    },
    getUserInfo: function() {
      FB.api('/me', {fields: 'id,name'}, function(res) {
        $rootScope.$apply(function() {
          $rootScope.myself = res;
        });
      });
    },
    isAuthenticated: function() {
      return authStatus === 'connected';
    },
    waitForFbApi: function() {
      return promise;
    }
  };
});

