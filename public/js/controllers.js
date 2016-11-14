var controllers = angular.module('Controllers', ['ngMaterial', 'ngRoute', 'ngMap', 'Services']);

controllers.controller('AuthController', function($scope, $location, Auth) {
  $scope.$on('$routeChangeStart', function(event, newUrl) {
    Auth.waitForFbApi().then(function() {
      if (newUrl.needsLogin && !Auth.isAuthenticated()) {
        $location.path('/login');
      }
    });
  });

  //Change

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

controllers.controller('SearchController', function($scope, $timeout, $location, $rootScope, NgMap, Tours, State) {
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

  var savedState = State.get();
  if (savedState) {
    for (var key in savedState) {
      $scope[key] = savedState[key];
    }
  }

  var search = _.debounce(function() {
    console.log('searching');
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
    console.log(center);
    $scope.searchParams.location = {
      lat: center.lat(),
      lng: center.lng()
    };
  };

  $scope.clickedMarker = function() {
    var tour = $scope.results[this.id];
    $location.path('tour/' + tour._id);
  };

  $rootScope.$on('$routeChangeStart', function() {
    State.save({
      searchParams: $scope.searchParams,
      locationName: $scope.locationName
    });
  });
});

controllers.controller('MyToursController', function($scope) {
  console.log('MyToursController running');
});

controllers.controller('CreateController', function($scope) {
  console.log('CreateController running');
});

controllers.controller('TourController', function($scope, $rootScope, $routeParams, $mdDialog, Tours) {
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
    window.history.back();
  };

  $scope.userHasJoined = function() {
    return _.contains($scope.tour.guests.confirmed, $rootScope.myself);
  };

  $scope.userHasPendingRequest = function() {
    return _.contains($scope.tour.guests.pending, $rootScope.myself);
  };

  $scope.leave = function() {
    var guests = $scope.tour.guests;
    var confirm = $mdDialog.confirm()
          .title('Really leave this tour?')
          .ok('Yes')
          .cancel('No');

    $mdDialog.show(confirm).then(function() {
      guests.confirmed = _.without(guests.confirmed, $rootScope.myself);
    });
  };

  $scope.sendJoinRequest = function() {
    $scope.tour.guests.pending.push($rootScope.myself);
  };

  $scope.getMapsUrl = function() {
    var locations = $scope.tour.locations;
    locations = locations.map(function(location) {
      return location.lat + ',' + location.lng;
    });

    return 'https://www.google.com/maps?saddr=My+Location'
      + '&daddr=' + locations.join('+to:');
  };
});

controllers.controller('ParticipantsController', function($scope, $mdDialog, tour) {
  $scope.tour = tour;
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  var guests = $scope.tour.guests;

  $scope.rejectUser = function(user) {
    guests.pending = _.without(guests.pending, user);
  };
  $scope.acceptUser = function(user) {
    guests.pending = _.without(guests.pending, user);
    guests.confirmed.push(user);
  };
  $scope.kickUser = function(user) {
    guests.confirmed = _.without(guests.confirmed, user);
  };
});

controllers.controller('DiscussController', function($scope, $rootScope, $routeParams, Tours) {
  console.log('DiscussController running');
  var tour = Tours.getById($routeParams.id);
  $scope.tourId = $routeParams.id;
  $scope.plan = tour.plans[$routeParams.planIdx];
  $scope.discussion = tour.plans[$routeParams.planIdx].discussion;

  $scope.submitPost = function() {
    var thread = {
      post: {
        author: $rootScope.myself,
        text: $scope.newPostText,
        time: Date.now()
      },
      replies: []
    };
    $scope.discussion.push(thread);
  };

  $scope.submitReply = function(thread, newReplyText) {
    var newReply = {
      author: $rootScope.myself,
      text: newReplyText,
      time: Date.now()
    };
    thread.replies.push(newReply);
  };

  $scope.goBack = function() { window.history.back(); };
});



controllers.controller('SelectController', function($scope) {
  $scope.categories = ['city', 'adventure', 'historic'];


});

controllers.controller('CreateController', function($scope, $rootScope, MockData) {
  
    $scope.tour = {
      title: '',
      location: '',
      categories: {}, 
      plan: [],
      
    };
    $scope.tour.creator = $rootScope.myself;
    


    $scope.setId = function (){
      
      $scope.tour._id = MockData.length;

    }
    



    $scope.onSubmit = function (){
      
      $scope.setId();
      MockData.push($scope.tour);
      console.log(MockData);

    }
    

    
});












