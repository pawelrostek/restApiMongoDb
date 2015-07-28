/**
 * 
 *  Controllers
 *      
 *  @author         Paweł Rostek
 *  @description    Controllers
 *  
 */

//HEADER CONTROLLER
myApp.controller("HeaderCtrl", ['$scope', '$location', 'UserAuthFactory',
    function ($scope, $location, UserAuthFactory) {

        $scope.isActive = function (route) {
            return route === $location.path();
        }

        $scope.logout = function () {
            UserAuthFactory.logout();
        }
    }
]);

myApp.controller('Home', function ($scope) {
    $scope.name = "Info";
});

//DATA FACTORY CONTROLLER
myApp.controller("DataFactoryList", function ($scope, $modal, dataFactory, Notification) {

    //Notification.primary | info | success | warning | error | clearAll
  $scope.dataList = [];

  $scope.getItems = function(type){
    dataFactory.get(type).then(function (data) {
      $scope.dataList = data.data;
    });
  }
  $scope.addItem = function(type){
    modalDial(type, null, 'add');
  }
  $scope.editItem = function(type, item){
    modalDial(type, item, 'edit');
  }
  $scope.delItem = function(type, item){
    modalDial(type, item, 'del');
  }

  $scope.getItems('eventTypes');


  var modalDial = function(type, item, action){
   
    $scope.formData = {isReadonly: (action == 'del')};
    console.log((action == 'del'));

    var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'partials/forms/' + type + '.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
            formData: function () {
                return $scope.formData;
            }
        }
    });

    modalInstance.result.then(function (data) {

      if(action == 'add' && confirm('Dodać nowy element?')){

        dataFactory.add(data, type);
        $scope.dataList.push(data);
        Notification.success({message: 'Add new item'});
      }

      /*
          TODO: update rest api request prepare
      */
      if(action == 'edit' && confirm('Zapisać zmiany?')){

        dataFactory.update(item['_id'], type);
        Notification.info({message: 'Edit item'});
      }

      if(action == 'del' && confirm('Usunąć wybrany element?')){

        dataFactory.delete(item['_id'], type);
        $scope.dataList.splice($scope.dataList.indexOf(item), 1); 
        Notification.error({message: 'Delete item'});
      }

    });

  }
});

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, formData) {

    $scope.formData = formData;
    $scope.save = function () {
        $modalInstance.close($scope.formData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
