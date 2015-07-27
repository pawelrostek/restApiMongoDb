
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
            $scope.actionType = 'add';
            modal($scope, $modal, dataFactory);
        }
        $scope.edit = function (type) {
            $scope.dataType = type;
            $scope.actionType = 'edit';
            console.log('Edit: ' + type);
        }
        $scope.del = function (type, id) {
            $scope.dataType = type;
            $scope.actionType = 'delete';
            dataFactory.delete(id, type);
//            $scope.dataList.push(data);
        }

        $scope.getData('eventTypes');
    }
]);

var modal = function ($scope, $modal, dataFactory) {
    $scope.formData = {isReadonly: false};
    var temp;
    if($scope.dataType == 'eventTypes')
        temp = 'partials/forms/eventTypes.html';
    if($scope.dataType == 'events')
        temp = 'partials/forms/events.html';
    if($scope.dataType == 'users')
        temp = 'partials/forms/users.html';

    var modalInstance = $modal.open({
        animation: true,
        templateUrl: temp,
        controller: 'ModalInstanceCtrl',
        resolve: {
            formData: function () {
                return $scope.formData;
            }
        }
    });

    modalInstance.result.then(function (data) {
        console.info("Save result");
        dataFactory.add(data, $scope.dataType);
        $scope.dataList.push(data);
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
