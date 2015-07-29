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
myApp.controller("DataFactoryList", function ($scope, $modal, dataFactory, Notification, $timeout) {

    //Notification.primary | info | success | warning | error | clearAll
    $scope.dataList = [];
    $scope.tableList = [ {name: 'events', label: 'Zdarzenia'}, 
                         {name: 'eventTypes', label: 'Typy zdarzeń'}, 
                         {name: 'users', label: 'Użytkownicy'},
                         {name: 'userTypes', label: 'Typy użytkowników'}, 
                         {name: 'category', label: 'Kategorie'}];
        
    $scope.getItems = function (type) {

        $scope.tabAction = type;
        $scope.tabList = 'partials/lists/'+type+'.html';

        // Pobranie dodatkowych danych słownikowych (do poprawki)
        if (type == 'events') {
            dataFactory.get('eventTypes').then(function (data) {
                $scope.eventTypes = data.data;
            });
        }
        if (type == 'users') {
            dataFactory.get('userTypes').then(function (data) {
                $scope.userTypes = data.data;
            });
        }

        dataFactory.get(type).then(function (data) {
//            $timeout(function () {
                $scope.dataList = data.data;
//            }, 2000);
        });
    }
    $scope.addItem = function (type) {
        modalDial(type, null, 'add');
    }
    $scope.editItem = function (type, item) {
        modalDial(type, item, 'edit');
    }
    $scope.delItem = function (type, item) {
        modalDial(type, item, 'del');
    }

    //Default screen
    $scope.getItems('eventTypes');

    var modalDial = function (type, item, action) {

        if(item !== null && action != 'add'){
            item.isReadonly = (action == 'del');
            $scope.formData = item;
        }

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'partials/forms/' + type + '.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                formData: function () {
                    return $scope.formData;
                },
                eventTypes: function () {
                    return $scope.eventTypes;
                },
                userTypes: function () {
                    return $scope.userTypes;
                }
            }
        });

        modalInstance.result.then(function (data) {

            if (action == 'add') {
                dataFactory.add(data, type);
                $scope.dataList.push(data);
                Notification.success({message: 'Add new item'});
            }

            if (action == 'edit') {
                dataFactory.update(item['_id'], item, type);
                Notification.info({message: 'Edit item'});
            }

            if (action == 'del') {
                dataFactory.delete(item['_id'], type);
                $scope.dataList.splice($scope.dataList.indexOf(item), 1);
                Notification.error({message: 'Delete item'});
            }

        });

    }
});

myApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, formData, eventTypes, userTypes) {

    $scope.formData = formData;
    $scope.eventTypes = eventTypes;
    $scope.userTypes = userTypes;
    $scope.save = function () {
        $modalInstance.close($scope.formData);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
