var app = angular.module('App', ['ngMaterial', 'ngRoute', 'ngMap']);

app.config(function($mdThemingProvider, $routeProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal');

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
    }).otherwise({
      redirectTo: '/discover'
    });
});
