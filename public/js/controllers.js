app.controller('DiscoverController', function($scope) {
  console.log('DiscoverController running');
});

app.controller('SearchController', function($scope, $timeout, NgMap) {
  console.log('SearchController running');
  var map;

  $scope.results = [
    {
      title: 'MoMA Trip',
      description: 'Let\'s go to a museum!',
      locations: [
        {"lat":40.7614327,"lng":-73.97762160000002}
      ]
    }, {
      title: 'Jogging in Central Park',
      description: 'Come get some exercise!',
      locations: [
        {"lat":40.7848582,"lng":-73.96965190000003}
      ]
    }, {
      title: 'Night Out at UCB',
      description: 'Food and comedy!',
      locations: [
        {"lat":40.74753,"lng":-73.99763999999999}
      ]
    }, {
      title: 'Halloween Tour!',
      description: 'Let\'s get spooky.',
      locations: [
        {"lat":40.109387,"lng":-88.2272456}
      ]
    }
  ];

  // We have to manually resize the map to fit the flex container.
  NgMap.getMap({id: 'searchmap'}).then(function(ngmap){
    map = ngmap;
    var height = $('#results').height();
    $('#searchmap').height(height);
    google.maps.event.trigger(ngmap,'resize');
  });

  $scope.placeChanged = function() {
    map.setCenter(this.getPlace().geometry.location);
  };

  $scope.clickedMarker = function() {
    var tour = $scope.results[this.id];
    console.log(tour);
  };
});

app.controller('MyToursController', function($scope) {
  console.log('MyToursController running');
});

app.controller('CreateController', function($scope) {
  console.log('CreateController running');
});
