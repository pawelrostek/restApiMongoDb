

myApp.factory('dataFactory', function($http) {

  var urlBase = 'http://localhost:4000/api/v1/';

  var _dataFactory = {};

  _dataFactory.add = function(item, model) {
      console.info('Add new item: ' + model);
    return $http.post(urlBase + model + '/', item);
  };

  _dataFactory.get = function(model) {
    return $http.get(urlBase + model + '/');
  }; 

  _dataFactory.update = function(item, model) {
    return $http.put(urlBase + model + '/', item);
  };

  _dataFactory.delete = function(id, model) {
    return $http.delete(urlBase + model + '/:event_id/' + id);
  };
 
  return _dataFactory;
});

