
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

myApp.controller('Home', function ($scope, $timeout, blockUI, Notification) {

console.log('Loading home');
    $scope.name = "Info";
    //Notification.primary | info | success | warning | error | clearAll

    var myBlockUI = blockUI.instances.get('myBlockUI');
    myBlockUI.start();
    $timeout(function () {
//        Notification.info({message: 'Loaded data', title: 'Loading', delay: 3000});
        myBlockUI.stop();
    }, 2000);
});

//DATA FACTORY CONTROLLER
myApp.controller("DataFactoryList", ['$scope', '$modal', 'dataFactory', function ($scope, $modal, dataFactory) {

        $scope.dataList = [];
        $scope.dataType = null;

        $scope.getData = function (type) {
            $scope.dataType = type;
            dataFactory.get(type).then(function (data) {
                $scope.dataList = data.data;
            });
        }

        $scope.addNew = function (type) {
            $scope.dataType = type;
            $scope.action = 'add';
            modal($scope, $modal, null, dataFactory);
        }
        $scope.edit = function (type, item) {
            $scope.dataType = type;
            $scope.action = 'edit';
            $scope.item = item;
            modal($scope, $modal, item, dataFactory);
        }
        $scope.del = function (type, item) {
            dataFactory.delete(item['_id'], type);
            $scope.dataList.splice($scope.dataList.indexOf(item), 1); 
        }

        $scope.getData('eventTypes');
    }
]);

var modal = function ($scope, $modal, item, dataFactory) {

    $scope.formData = {isReadonly: false};
    
    var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'partials/forms/' + $scope.dataType + '.html',
        controller: 'ModalInstanceCtrl',
        resolve: {
            formData: function () {
                return $scope.formData;
            }
        }
    });

    modalInstance.result.then(function (data) {
        if($scope.action == 'add') {
            dataFactory.add(data, $scope.dataType);
            $scope.dataList.push(data);
        }
        if($scope.action == 'edit'){
            console.log("Edycja");
//            ??POPULATE FORM
//            $scope.formData = $scope.item;
        }
    }, function () {
        console.warn("cancel");
    });
}

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, formData) {

    $scope.formData = formData;
    $scope.save = function () {
        $modalInstance.close($scope.formData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
