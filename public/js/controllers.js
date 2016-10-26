app.controller('DiscoverController', function($scope) {
  console.log('DiscoverController running');
});

app.controller('SearchController', function($scope, $timeout, NgMap) {
  console.log('SearchController running');
  var map;

  $scope.results = [
    {
      title: 'First',
      description: 'This is a description'
    }, {
      title: 'Second',
      description: 'This is a description'
    }, {
      title: 'Third',
      description: 'This is a description'
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
});

app.controller('MyToursController', function($scope) {
  console.log('MyToursController running');
});

app.controller('CreateController', function($scope) {
  console.log('CreateController running');
});
