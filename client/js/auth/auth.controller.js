/**
 * 
 *  Auth Active Directory Controller
 *      
 *  @author         Paweł Rostek
 *  @description    Controller of authentications
 *  
 */

myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    $scope.user = {
      username: 'test.ebo',
      password: 'Password12'
    };
 
    $scope.login = function() {
 
      var username = $scope.user.username,
        password = $scope.user.password;
 
      if (username !== undefined && password !== undefined) {
        UserAuthFactory.login(username, password).success(function(data) {
       
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.user = data.user.sAMAccountName;
          AuthenticationFactory.userRole = data.user.sn;
 
          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.sAMAccountName; // to fetch the user details on refresh
          $window.sessionStorage.userRole = data.user.sn; // to fetch the user details on refresh
 
          $location.path("/home");
 
        }).error(function(status) {
          alert('Oops something went wrong!');
        });
      } else {
//        alert('Invalid credentials');
      }
 
    };
 
  }
]);