var myApp = angular.module('notifies', ['ngRoute']);

myApp.config(function($routeProvider, $httpProvider) {
 
//  $httpProvider.interceptors.push('TokenInterceptor');
 
  $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl',
      access: {
        requiredLogin: false
      }
    }).when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      access: {
        requiredLogin: false
      }
    }).otherwise({
    }).when('/users', {
      templateUrl: 'partials/users.html',
      controller: 'UsersCtrl',
      access: {
        requiredLogin: false
      }
    }).otherwise({
      redirectTo: '/login'
    });
});
 
myApp.run(function($rootScope, $window, $location) {
  // when the page refreshes, check if the user is already logged in
//  AuthenticationFactory.check();
// 
//  $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
//    if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
//      $location.path("/login");
//    } else {
//      // check if user object exists else fetch it. This is incase of a page refresh
//      if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
//      if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
//    }
//  });
// 
//  $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
//    $rootScope.showMenu = AuthenticationFactory.isLogged;
//    $rootScope.role = AuthenticationFactory.userRole;
//    // if the user is already logged in, take him to the home page
//    if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
//      $location.path('/');
//    }
//  });
});