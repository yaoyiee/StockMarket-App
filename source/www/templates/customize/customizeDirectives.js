angular.module('noDataDirectives', [])

.directive("noDataPage", function() {
    return {
      restrict: 'AE',
      templateUrl:'templates/customize/customizeNoData.html',
      replace:true
    };
});