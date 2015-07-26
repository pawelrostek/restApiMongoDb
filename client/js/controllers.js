
//HEADER CONTROLLER
myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
  function($scope, $location, UserAuthFactory) {
 
    $scope.isActive = function(route) {
      return route === $location.path();
    }

    $scope.logout = function () {
      UserAuthFactory.logout();
    }
  }
]);

//'ui.bootstrap'
myApp.controller("Home", ['$scope', function($scope, $modal) {
    $scope.name = "Info";


    // Ui Bootstrap modal
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            // controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.info('Modal dismissed at: ' + new Date());
        });
    };



  }
]);

//DATA FACTORY CONTROLLER
myApp.controller("DataFactoryList", ['$scope', 'dataFactory', function($scope, dataFactory) {
    
    $scope.dataList = [];
    $scope.dataType = null;

    $scope.getData = function(type){
      dataFactory.get(type).then(function(data) {
        $scope.dataList = data.data;
      });
    }

    $scope.addNew = function(type){
      console.log('Add new: ' + type);
      dataFactory.Add(type).then(function(data) {
        $scope.dataList = data.data;
      });
    }
    $scope.edit = function(type){
      console.log('Edit: ' + type); 
    }
    $scope.delete = function(type){
      console.log('Delete: ' + type);
    }

    $scope.getData('eventTypes');

  }
]);

//MODAL CONTROLLER
// myApp.controller('ModalCtrl', ['$modalInstance', function ($modalInstance) {
//             var vm = this;
 
//             vm.close = function () {
//               $modalInstance.close();
//             };
 
//         }]);
 
// });