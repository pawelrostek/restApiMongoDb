/**
 * 
 *  Main Appp
 *      
 *  @author         Paweł Rostek
 *  @description    Main App - loading extendent dependencies
 *  
 */

var myApp = angular.module('notifier', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.tabs.include',
    'blockUI',
    'ngAnimate',
    'ui-notification',
    'ui-splash'
]);

myApp.config(function (blockUIConfig) {

    // Change the default overlay message
    blockUIConfig.message = 'Please wait...';

    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = true;

    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 20;

    // Disable clearing block whenever an exception has occurred
    blockUIConfig.resetOnException = true;

});

myApp.config(function ($routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('TokenInterceptor');

    $routeProvider
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl',
                access: {
                    requiredLogin: false
                }
            }).when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'Home',
                access: {
                    requiredLogin: true
                }
            }).when('/data-factories', {
                templateUrl: 'partials/dataFactoryList.html',
                controller: 'DataFactoryList',
                access: {
                    requiredLogin: true
                }
            }).otherwise({
                redirectTo: '/login'
            });
});

myApp.run(function ($rootScope, $window, $location, AuthenticationFactory, $splash) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();

    // Magic Splash
    $rootScope.openSplash = function () {
        $splash.open({
            title: 'Hi there!',
            message: "This sure is a fine modal, isn't it?"
        });
    };

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
            $location.path("/login");
        } else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!AuthenticationFactory.user)
                AuthenticationFactory.user = $window.sessionStorage.user;
            if (!AuthenticationFactory.userRole)
                AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        }
    });

    $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        $rootScope.role = AuthenticationFactory.userRole;
        // if the user is already logged in, take him to the home page
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            $location.path('/data-factories');
        }
    });
});
