var app = angular.module('App', ['ngRoute', 'ngMap', 'ngMaterial', 'truncate', 'Services', 'Controllers']);

app.config(function($mdThemingProvider, $routeProvider) {
  $mdThemingProvider.theme('default');
  $mdThemingProvider.enableBrowserColor();

  $routeProvider
    .when('/discover', {
      templateUrl: 'partials/discover.html',
      controller: 'DiscoverController',
      needsLogin: true
    }).when('/search', {
      templateUrl: 'partials/search.html',
      controller: 'SearchController',
      needsLogin: true
    }).when('/mytours', {
      templateUrl: 'partials/mytours.html',
      controller: 'MyToursController',
      needsLogin: true
    }).when('/create', {
      templateUrl: 'partials/create.html',
      controller: 'CreateController',
      needsLogin: true
    }).when('/tour/:id', {
      templateUrl: 'partials/tour.html',
      controller: 'TourController',
      needsLogin: true
    }).when('/tour/:id/discuss/:planIdx', {
      templateUrl: 'partials/discuss.html',
      controller: 'DiscussController',
      needsLogin: true
    }).when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    }).otherwise({
      redirectTo: '/discover'
    });
});

app.run(function($rootScope, $window, Auth) {
  $rootScope.user = {};

  $window.fbAsyncInit = function() {
    FB.init({
      appId: '364342647234556',
      channelUrl: 'partials/channel.html',
      status: true,
      cookie: true,
      xfbml: true
    });

    Auth.watchAuthStatusChange();
  };

  (function(d){
    // load the Facebook javascript SDK
    var js,
    id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
  }(document));
});
