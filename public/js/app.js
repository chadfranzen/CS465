var app = angular.module('App', ['ngMaterial', 'ngRoute', 'ngMap', 'truncate']);

app.config(function($mdThemingProvider, $routeProvider) {
  $mdThemingProvider.theme('light');
  $mdThemingProvider.enableBrowserColor();

  $routeProvider
    .when('/discover', {
      templateUrl: 'partials/discover.html',
      controller: 'DiscoverController'
    }).when('/search', {
      templateUrl: 'partials/search.html',
      controller: 'SearchController'
    }).when('/mytours', {
      templateUrl: 'partials/mytours.html',
      controller: 'MyToursController'
    }).when('/create', {
      templateUrl: 'partials/create.html',
      controller: 'CreateController'
    }).when('/tour/:id', {
      templateUrl: 'partials/tour.html',
      controller: 'TourController'
    }).when('/tour/:id/discuss/:planIdx', {
      templateUrl: 'partials/discuss.html',
      controller: 'DiscussController'
    }).otherwise({
      redirectTo: '/discover'
    });
});
