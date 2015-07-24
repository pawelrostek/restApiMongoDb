myApp.controller("HeaderCtrl", ['$scope', '$location',
  function($scope, $location) {
    $scope.isActive = function(route) {
      return route === $location.path();
    }
  }
]);

myApp.controller("HomeCtrl", ['$scope', function($scope) {
    $scope.name = "Home Controller/Autenticate";
  }
]);

myApp.controller("UsersCtrl", ['$scope', 'todosFactory',
  function($scope, todosFactory) {
    $scope.name = "Users Controller";
    $scope.users = [];

    todosFactory.getTodos().then(function(data) {
      $scope.users = data.data;
    });

  }
]);
