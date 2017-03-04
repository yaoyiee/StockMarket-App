angular.module('customizeControllers', [])
    .controller("cusCtrl", function($scope, $state, $ionicViewSwitcher, $interval, cusService, cacheService, sqliteService, mockDataService) {
        //get customize stock ids from localstorage
        var stockIds = cacheService.getItem(cacheId);

        //refesh data before enter into view
        var optionStockIds = [];
        $scope.desOfLastPrice = false;
        $scope.desOfRange = false;
        $scope.desOfUpsAndDowns = false;
        $scope.$on("$ionicView.beforeEnter", function() {

             stockIds = cacheService.getItem(cacheId);
             var content= cusService.getOptionData(stockIds);
             if(content.length == 0){
                 $scope.noData = true;
             }else{
                 $scope.noData = false;
                $scope.optionContent  = content;
             }

            $scope.showIconOfLastPrice = false;
            $scope.showIconOfRange = false;
            $scope.showIconOfUpsAndDowns = false;

            $scope.desOfLastPrice = false;
            $scope.desOfRange = false;
            $scope.desOfUpsAndDowns = false;

        });
        //go to stock detail
        $scope.goDetail = function(stockId) {
            $ionicViewSwitcher.nextDirection('forward');
            $state.go('stockDetail', { 'stockId': stockId, 'backUrl': 'tab.customize' });
        };

        $scope.sortFromPrice = function() {
            $scope.showIconOfRange = false;
            $scope.showIconOfUpsAndDowns = false;
            $scope.showIconOfLastPrice = true;
            $scope.desOfLastPrice = !$scope.desOfLastPrice;

            if ($scope.desOfLastPrice) {
                $scope.optionContent = cusService.getDesSortData(stockIds, "lastPrice");
                console.log("des sort");
            } else {
                $scope.optionContent = cusService.getAscSortData(stockIds, "lastPrice");
                console.log("asc sort");
            }
        };
        $scope.sortFromRange = function() {
            $scope.showIconOfLastPrice = false;
            $scope.showIconOfUpsAndDowns = false;
            $scope.showIconOfRange = true;
            $scope.desOfRange = !$scope.desOfRange;
            if ($scope.desOfRange) {
                $scope.optionContent = cusService.getDesSortData(stockIds, "rangeOfUpsAndDowns");
            } else {
                $scope.optionContent = cusService.getAscSortData(stockIds, "rangeOfUpsAndDowns");
            }
        }
        $scope.sortFromUpsAndDowns = function() {
            $scope.showIconOfLastPrice = false;
            $scope.showIconOfRange = false;
            $scope.showIconOfUpsAndDowns = true;
            $scope.desOfUpsAndDowns = !$scope.desOfUpsAndDowns;
            if ($scope.desOfUpsAndDowns) {
                $scope.optionContent = cusService.getDesSortData(stockIds, "upsAndDowns");
            } else {
                $scope.optionContent = cusService.getAscSortData(stockIds, "upsAndDowns");
            }
        }

    });
