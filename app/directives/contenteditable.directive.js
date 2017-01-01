angular.module('app').
directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A',
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ""));
      };

      // Listen for change events to enable binding
      element.on('focus blur change', function() {
        scope.$evalAsync(read);
      });
      read(); // initialize

      var regex = /^(?:<br\/>)*$/;
      var defaultVal = "Not specified";

      // Write data to the model
      function read() {
        var html = element.html();
        console.log(html);
        html = html.split("<br>").join("").split("&nbsp;").join("");
        if (html.length > 0) {
          ngModel.$setViewValue(html);
        }
        else {
          ngModel.$setViewValue(defaultVal);
          ngModel.$render();
        }
      }
    }
  };
}]);
