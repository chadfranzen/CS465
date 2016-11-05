var app = angular.module('App', ['ngRoute', 'ngMap', 'ngMaterial', 'truncate', 'Services', 'Controllers']);

app.config(function($mdThemingProvider, $routeProvider) {
  var customPurple = $mdThemingProvider.extendPalette('deep-purple', {
    '500': '#765285', // default primary
    '600': '#351C4D', // button hover
    '300': '#765285', // md-hue-1
    '800': '#351C4D',  // md-hue-2
    'A100': '#351C4D' // md-hue-3
  });
  $mdThemingProvider.definePalette('custom-purple', customPurple);

  var customOrange = $mdThemingProvider.extendPalette('deep-orange', {
    'A200': '#FEB47B', // default accent
    'A100': '#F5AB99', // md-hue-1
    'A400': '#FF7E5F', // md-hue-2
    'A700': '#FF7E5F' // md-hue-3
  });
  $mdThemingProvider.definePalette('custom-orange', customOrange);

  var customBlue = $mdThemingProvider.extendPalette('cyan', {
    '500': '#8BCBC8', // default primary
    '600': '#DAE9E4', // button hover
    '300': '#DAE9E4', // md-hue-1
    '800': '#8BCBC8',  // md-hue-2
    'A100': '#3C2E3D' // md-hue-3
  });
  $mdThemingProvider.definePalette('custom-blue', customBlue);

  var customPink = $mdThemingProvider.extendPalette('deep-orange', {
    'A200': '#ECC7C0', // default accent
    'A100': '#ECC7C0', // md-hue-1
    'A400': '#ECC7C0', // md-hue-2
    'A700': '#FDAE84' // md-hue-3
  });
  $mdThemingProvider.definePalette('custom-pink', customPink);

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('pink');
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
