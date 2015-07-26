myApp.directive('printThis', function() {
  /** https://docs.angularjs.org/guide/directive **/

  var directiveDefinitionObject = {
    restrict: 'EA',
    template: '<input ng-model="data" placeholder="Type here"/> {{ data }}'
  }

  return directiveDefinitionObject;
});

// myApp.directive('showtab',
//     function () {
//         return {
//             link: function (scope, element, attrs) {
//                 element.click(function(e) {
//                     e.preventDefault();
//                     $(element).tab('show');
//                 });
//             }
//         };
//     });