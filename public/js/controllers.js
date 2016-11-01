var controllers = angular.module('Controllers', ['ngMaterial', 'ngRoute', 'ngMap', 'Services']);

controllers.controller('AuthController', function($scope, $location, Auth) {
  $scope.$on('$routeChangeStart', function(event, newUrl) {
    Auth.waitForFbApi().then(function() {
      if (newUrl.needsLogin && !Auth.isAuthenticated()) {
        $location.path('/login');
      }
    });
  });

  $scope.isLoggingIn = function() {
    return $location.path() === '/login';
  };
});

controllers.controller('LoginController', function($rootScope, $location) {
  $rootScope.$watch('myself', function(myself) {
    if (myself) {
      $location.path('discover');
    }
  });
});

controllers.controller('DiscoverController', function($scope) {
  console.log('DiscoverController running');
});

controllers.controller('SearchController', function($scope, $timeout, $location, NgMap, Tours) {
  console.log('SearchController running');

  var currTime = new Date(Date.now());
  var nextMonth = new Date(Date.now());
  nextMonth.setMonth(currTime.getMonth() + 1);
  $scope.searchParams = {
    keywords: '',
    categories: {
      museums: true,
      architecture: true,
      nature: true,
      food: true,
      recreation: true,
      fitness: true,
      historical: true,
      nightlife: true
    },
    startDate: currTime,
    endDate: nextMonth
  };

  var search = _.debounce(function() {
    $scope.results = Tours.search($scope.searchParams);
  }, 50);

  $scope.$watch('searchParams', search, true);

  var map;
  // We have to manually resize the map to fit the flex container.
  NgMap.getMap({id: 'searchmap'}).then(function(ngmap){
    map = ngmap;
    var height = $('#results').height();
    $('#searchmap').height(height);
    google.maps.event.trigger(ngmap,'resize');
  });

  $scope.placeChanged = function() {
    var location = this.getPlace().geometry.location;
    $scope.searchParams.location = location;
    map.setCenter(location);
  };

  $scope.centerChanged = function() {
    var center = this.getCenter();
    $scope.searchParams.location = {
      lat: center.lat(),
      lng: center.lng()
    };
  };

  $scope.clickedMarker = function() {
    var tour = $scope.results[this.id];
    $location.path('tour/' + tour._id);
  };
});

controllers.controller('MyToursController', function($scope) {
  console.log('MyToursController running');
});

controllers.controller('CreateController', function($scope) {
  console.log('CreateController running');
});

controllers.controller('TourController', function($scope, $routeParams, $mdDialog, Tours) {
  $scope.getWaypoints = function(locations) {
    return locations.slice(1, locations.length-1).map(function(location) {
      return {location: location, stopover: true};
    });
  };
  console.log('TourController running');
  $scope.tour = Tours.getById($routeParams.id);
  $scope.openDialog = function($event) {
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: 'partials/participants.html',
      controller: 'ParticipantsController',
      locals: {tour: $scope.tour}
    });
  };
  $scope.goBack = function() {
    //TODO: lol whoops this doesn't work right at all!
    window.history.back();
  };
});

controllers.controller('ParticipantsController', function($scope, $mdDialog, tour) {
  $scope.tour = tour;
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };
});

controllers.controller('DiscussController', function($scope, $routeParams, Tours) {
  console.log('DiscussController running');
  var tour = Tours.getById($routeParams.id);
  $scope.tourId = $routeParams.id;
  $scope.plan = tour.plans[$routeParams.planIdx];
  $scope.discussion = tour.plans[$routeParams.planIdx].discussion;
});
