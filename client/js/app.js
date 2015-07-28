var myApp = angular.module('notifier', [
    'ngRoute',
    'ui.bootstrap',
    'ui.bootstrap.tabs.include',
    'blockUI',
    'ngAnimate',
    'ui-notification'
]);

myApp.config(function (blockUIConfig) {

    // Change the default overlay message
    blockUIConfig.message = 'Please wait...';


    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = true;
    
    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 10;

    // Disable clearing block whenever an exception has occurred
    blockUIConfig.resetOnException = true;

    // ... or completely remove the delay
//    blockUIConfig.delay = 0;
    // Provide a custom template to use
//    blockUIConfig.template = '<pre><code>{{ state | json }}</code></pre>';
    // Provide the custom template via a url
//    blockUIConfig.templateUrl = 'my-templates/block-ui-overlay.html';
    
    // Tell the blockUI service to ignore certain requests
//    blockUIConfig.requestFilter = function(config) {
//        // If the request starts with '/api/quote' ...
//        if(config.url.match(/^\/api\/quote($|\/).*/)) {
//            return false; // ... don't block it.
//        }
//    };

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

myApp.run(function ($rootScope, $window, $location, AuthenticationFactory) {
    // when the page refreshes, check if the user is already logged in
    AuthenticationFactory.check();

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
            $location.path('/home');
        }
    });
});
