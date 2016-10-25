app.controller('DiscoverController', function($scope) {
  console.log('DiscoverController running');
});

app.controller('SearchController', function($scope, $timeout, NgMap) {
  console.log('SearchController running');

  // We have to manually resize the map to fit the flex container.
  NgMap.getMap({id: 'searchmap'}).then(function(map){
    var height = $('#map-container').height();
    $('#searchmap').height(height);
    google.maps.event.trigger(map,'resize');
  });
});

app.controller('MyToursController', function($scope) {
  console.log('MyToursController running');
});

app.controller('CreateController', function($scope) {
  console.log('CreateController running');
});
