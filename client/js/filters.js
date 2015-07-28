/**
 * 
 *  Filters
 *      
 *  @author         Paweł Rostek
 *  @description    Filters
 *  
 */

myApp.filter('checkmark', function() {
  
  var filterFunction = function(input) {
    return input ? '\u2713' : '\u2718';
  };

  return filterFunction;
});
