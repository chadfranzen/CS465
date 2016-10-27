app.factory('Tours', function() {
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
    console.log(dist);
    return dist;
  };

  var mockTours = [
    {
      _id: 0,
      title: 'MoMA Trip',
      description: 'Let\'s go to a museum!',
      locations: [
        {"lat":40.7614327,"lng":-73.97762160000002}
      ],
      categories: ['museums'],
      time: new Date(1479747600000)
    }, {
      _id: 1,
      title: 'Jogging in Central Park',
      description: 'Come get some exercise!',
      locations: [
        {"lat":40.7848582,"lng":-73.96965190000003}
      ],
      categories: ['fitness'],
      time: new Date(1479913200000)
    }, {
      _id: 2,
      title: 'Night Out at UCB',
      description: 'Food and comedy!',
      locations: [
        {"lat":40.74753,"lng":-73.99763999999999}
      ],
      categories: ['food', 'recreation', 'nightlife'],
      time: new Date(1480194000000)
    }, {
      _id: 3,
      title: 'Halloween Tour!',
      description: 'Let\'s get spooky.',
      locations: [
        {"lat":40.109387,"lng":-88.2272456}
      ],
      categories: ['recreation'],
      time: new Date(1477933200000)
    }
  ];

  return {
    getById: function(id) {
      return _.findWhere(mockTours, {_id: id});
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
    }
  };
});
