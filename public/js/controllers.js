var controllers = angular.module('Controllers', ['ngMaterial', 'ngRoute', 'ngMap', 'Services']);

controllers.controller('AuthController', function($scope, $location, $rootScope, Auth) {
  $scope.isLoggingIn = function() {
    return $location.path() === '/login';
  };

  $scope.isSelecting = function() {
    return $location.path() === '/select';
  };

  var getCurrentNavItem = function() {
    var path = $location.path();
    if (path.indexOf('mytours') >= 0) {
      return 'mytours';
    }
    if (path.indexOf('discover') >= 0) {
      return 'discover';
    }
    if (path.indexOf('create') >= 0) {
      return 'create';
    }
    return 'search';
  };

  $scope.currentNavItem = getCurrentNavItem();
  $rootScope.$on('$routeChangeSuccess', function() {
    var path = $location.path();
    if (path.indexOf('mytours') >= 0 ||
        path.indexOf('discover') >= 0 ||
        path.indexOf('create') >= 0 ||
        path.indexOf('search') >= 0) {
          $scope.currentNavItem = getCurrentNavItem();
    } 
  });
});

controllers.controller('LoginController', function($scope, $rootScope, $location, $window) {
  $scope.fb_login = function() {
    FB.login( function() {}, { scope: 'email,public_profile' } );
  };
  $rootScope.$watch('myself', function(myself) {
    if (myself) {
      $location.path('select');
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

  // Krishna's code 

  if (typeof $rootScope.categories !== "undefined")
  {
    $scope.searchParams.categories = $rootScope.categories;
  }

  var savedState = State.get();
  if (savedState) {
    for (var key in savedState) {
      $scope[key] = savedState[key];
    }
  }

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

  $rootScope.$on('$routeChangeStart', function() {
    State.save({
      searchParams: $scope.searchParams,
      locationName: $scope.locationName
    });
  });
});

controllers.controller('MyToursController', function($scope, Tours) {
  $scope.tours = Tours.getMyTours();
  $scope.isToday = function(date) {
    var today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
});

controllers.controller('CreateController', function($scope) {
  console.log('CreateController running');
});

controllers.controller('TourController', function($scope, $rootScope, $routeParams, $mdDialog, Tours, $location) {
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
    if (!$rootScope.myself) {
      return false;
    }
    return !!_.find($scope.tour.guests.confirmed, function(guest) {
      return guest.id == $rootScope.myself.id;
    });
  };

  $scope.userHasPendingRequest = function() {
    if (!$rootScope.myself) {
      return false;
    }
    return !!_.find($scope.tour.guests.pending, function(guest) {
      return guest.id == $rootScope.myself.id;
    });
  };

  $scope.userIsCreator = function() {
    return $rootScope.myself && ($scope.tour.creator.id == $rootScope.myself.id);
  };

  $scope.leave = function() {
    var guests = $scope.tour.guests;
    var canPickNewLeader = $scope.userIsCreator() && $scope.tour.guests.confirmed.length > 1;
    var needToCancel = $scope.userIsCreator() && !canPickNewLeader;
    var title = needToCancel ? 'Cancel this tour?' : 'Really leave this tour?';

    var confirm = $mdDialog.confirm()
          .title(title)
          .ok('Yes')
          .cancel('No');

    if (canPickNewLeader) {
      confirm.textContent('A new leader will be chosen for this tour.');
    }

    $mdDialog.show(confirm).then(function() {
      guests.confirmed = _.reject(guests.confirmed, function(guest) {
        return guest.id == $rootScope.myself.id;
      });
      if (needToCancel) {
        Tours.remove($scope.tour._id);
        $location.path('discover');
      } else if (canPickNewLeader) {
        $scope.tour.creator = guests.confirmed[0];
      }
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

controllers.controller('ParticipantsController', function($rootScope, $scope, $mdDialog, tour) {
  $scope.tour = tour;
  $scope.closeDialog = function() {
    $mdDialog.hide();
  };

  $scope.userIsCreator = function() {
    return $rootScope.myself && ($scope.tour.creator.id == $rootScope.myself.id);
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



controllers.controller('CreateController', function($scope, $rootScope, MockData) {
  
    $scope.tour = {
      title: '',
      categories: [], 
      plans: [],
      locations : [],
      guests: {pending:[], confirmed:[]}
      
    };
    obj = [];


    $scope.tour.creator = $rootScope.myself;
    $scope.category_select = {};  
    $scope.tour._id = MockData.length;
    $scope.location = '';
    $scope.last_loc = [];
    $scope.plan_titles = [];
    $scope.tour.guests.confirmed.push($rootScope.myself);


    $scope.placeChanged = function() {
        var locations = this.getPlace().geometry.location;
        
        var temp = {};
        temp["lat"] = locations.lat();
        temp["lng"] = locations.lng();  
        if (temp["lat"] !== undefined && temp["lng"] !== undefined)
        {
          obj.push(temp);
        }   
      };

    $scope.locAdd = function ()
    {
        $scope.last_loc.push($scope.location);
        $scope.location = '';
    }

    $scope.onSubmit = function (){

      for (j =0; j< $scope.plan_titles.length; j++)
      {
        var p = {}
        p["text"] = $scope.plan_titles[j];
        p["time"] = null;
        p["discussion"] = [];

        $scope.tour.plans.push(p);

      }
      



      $scope.tour.locations = obj;
      for ( var i in $scope.category_select)
      {
          if ($scope.category_select[i])
          {
              $scope.tour.categories.push(i);
          }
      }


      MockData.push($scope.tour);
      console.log(JSON.stringify(MockData[MockData.length -1]));
      console.log($scope.plans);



    };
    

    
});



controllers.controller('SelectController', function($scope, $rootScope) 
{

  $scope.show = {
    architecture: false, 
    nature: false, 
    nightlife: false, 
    recreation: false, 
    fitness: false, 
    food: false, 
    historical: false, 
    museums: false
  };

  $scope.onNext = function()
  {
    $rootScope.categories = $scope.show;
    console.log($rootScope.categories);
  };


});






