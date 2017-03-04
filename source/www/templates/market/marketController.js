angular.module('marketControllers', [])

.controller('MarketCtrl', function($scope, $state, $ionicViewSwitcher,
    $ionicPopup, $timeout, $interval, $ionicListDelegate, $ionicModal,
    marketService, sqliteService,cacheService,mockDataService) {
        var cacheBlockId = "optionStockIds";
    var optionStockIds = cacheService.getItem(cacheBlockId);
    var dataFormat = function(serviceData) {
        var fortmatedDatas = [];
        angular.forEach(serviceData, function(data, index, array) {
            var fortmatedData = {};
            fortmatedData.title = data.title;
            fortmatedData.show = false;
            fortmatedData.details = data.details;
            angular.forEach(fortmatedData.details, function(data, index, array) {
                data.isCustomize = false;
                data.addButtonClass = "button button-assertive button-add";
                data.buttonTitle = "加入自选";
                if (optionStockIds != null && optionStockIds.indexOf(data.id) >= 0) {
                    data.isCustomize = true;
                    data.addButtonClass = "button button-positive button-add";
                    data.buttonTitle = "移除自选";
                }
            });
            fortmatedDatas.push(fortmatedData);
        });
        return fortmatedDatas;
    }

    //refesh data
    var refreshData = function() {
        $scope.marketSummary = marketService.getSummary();
        var newData = dataFormat(marketService.getDetails());
        if ($scope.marketDetails) {
            angular.forEach($scope.marketDetails, function(data, index, array) {
                data.details = newData[index].details;
            });
        } else {
            $scope.marketDetails = newData;
        }
    };

    $scope.$on("$ionicView.enter", function() {
        optionStockIds = cacheService.getItem(cacheBlockId);
        console.log("optionStockIds:",optionStockIds);
        refreshData();
        // $scope.timer = $interval(function() {
        //     refreshData();
        // }, 5000);
    });

    $scope.$on("$ionicView.leave", function() {
        $interval.cancel($scope.timer);
    });

    // //go to stock detail
    $scope.goDetail = function(stockId) {
        $ionicViewSwitcher.nextDirection('forward');
        $state.go('stockDetail', { 'stockId': stockId, 'backUrl': 'tab.market' });
    };


    $scope.isUpTrend = function(checkSource) {
        if (checkSource && checkSource != null) {
            if (checkSource.indexOf("+") >= 0) {
                return "2";
            } else if (checkSource.indexOf("-") >= 0) {
                return "1";
            } else return "0";
        } else return "0";
    };

    $scope.toggleGroup = function(group) {
        group.show = !group.show;
    };

    $scope.isGroupShown = function(group) {
        return group.show;
    };

    var infoPopup;
    var showPopup = function(info) {
        infoPopup = $ionicPopup.show({
            title: info
        });
    }
    var closePopup = function() {
        $ionicListDelegate.closeOptionButtons();
        infoPopup.close();
    }

 $scope.addToCustomize = function(stock) {
        if (stock.isCustomize) {
            var index = optionStockIds.indexOf(parseInt(stock.id));
            if (index >= 0) {
                var infoPopup = $ionicPopup.show({
                    title: '已移除自选'
                });
                $timeout(function() {
                    $ionicListDelegate.closeOptionButtons();
                    infoPopup.close();
                    optionStockIds.splice(index, 1);
                    window.localStorage.setItem(cacheBlockId, JSON.stringify(optionStockIds));
                    $timeout(function() {
                        stock.isCustomize = false;
                        stock.addButtonClass = "button button-assertive button-add";
                        stock.buttonTitle = "加入自选";
                    }, 300);
                }, 500);
            }

        } else {
            //add into cache
            cacheService.setItem(cacheBlockId, stock.id);
            //refresh optionStockIds
            optionStockIds.push(stock.id);
            var infoPopup = $ionicPopup.show({
                title: '已加入自选'
            });
            $timeout(function() {
                //close the popup after 0.5 seconds 
                $ionicListDelegate.closeOptionButtons();
                infoPopup.close();
                //change style of add button 
                $timeout(function() {
                    stock.isCustomize = true;
                    stock.addButtonClass = "button button-positive button-add";
                    stock.buttonTitle = "移除自选";
                }, 300);

            }, 500);
        }
    };

    

    $ionicModal.fromTemplateUrl('search-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.searchModal = modal;
    });


   $scope.serchResults = [{
        "id": "1001",
        "name": "珠江钢琴",
    }, {
        "id": "1002",
        "name": "王子新材",
    }, {
        "id": "1003",
        "name": "创业板指",
    }, {
        "id": "1004",
        "name": "上证指数",
    }, {
        "id": "1005",
        "name": "N星源",
    }, {
        "id": "1006",
        "name": "湘油泵",
    }, {
        "id": "1007",
        "name": "天沃科技",
    }, {
        "id": "1008",
        "name": "凯中精密",
    }, {
        "id": "1009",
        "name": "中电广通",
    }, {
        "id": "1010",
        "name": "福建金森",
    }, {
        "id": "1011",
        "name": "万盛股份",
    }, {
        "id": "1012",
        "name": "广州发展",
    }, {
        "id": "1013",
        "name": "同达创业",
    }, {
        "id": "1014",
        "name": "太平洋",
    }, {
        "id": "1015",
        "name": "金利华电",
    }, {
        "id": "1016",
        "name": "安吉食品",
    }, {
        "id": "1017",
        "name": "南洋科技",
    }];


    $scope.searchStr = {};
    $scope.sensitiveSearch = function(stock) {
    
        if ($scope.searchStr.str) {
            return stock.id.indexOf($scope.searchStr.str) >= 0 ||
                stock.name.indexOf($scope.searchStr.str.toLowerCase()) >= 0;
        }
        return false;
    };
    //clear search string when hide modal
    $scope.$on('modal.hidden', function() {
        $scope.searchStr.str = "";
    });

});
