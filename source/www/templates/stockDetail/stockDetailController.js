angular.module('stockDetailControllers', [])

.controller('StockDetailCtrl', function($scope, $stateParams, $state, $window, $ionicViewSwitcher, $ionicPopup, $ionicPopover,
    $timeout, $ionicListDelegate, stockDetailService, cacheService, sqliteService,cusService) {
    // var db = sqliteService.initDB();
    var backUrl = $stateParams.backUrl;
    var optionId = $stateParams.stockId;
    $scope.goBack = function() {
        clearInterval($scope.timer);
        $ionicViewSwitcher.nextDirection('back');
        // $window.location.href=backUrl;
        $state.go(backUrl);
    };

    $scope.$on("$ionicView.enter", function() {
        $scope.timer = setInterval(function() {
            //To get latest data.
        }, 5000);
    });

    $scope.stockDetail = stockDetailService.getStockDetail($stateParams.stockId);

    $scope.groupData = stockDetailService.getData();
    $scope.numData = stockDetailService.getNum();
    $scope.maFiveData = stockDetailService.getMaFive();

    document.getElementById("maxvalue").innerHTML = '-';
    document.getElementById("minvalue").innerHTML = '-';
    document.getElementById("openvalue").innerHTML = '-';

    $scope.noAdded = true;
    // var stockIds = [];
     var stockIds = cacheService.getItem(cacheId);
     console.log("optionId:",optionId);
     console.log("stockIds:",stockIds);

       $scope.noAdded = false;
        var index = stockIds.indexOf(parseInt(optionId));
        if (index == -1) {
        $scope.noAdded = true;
    }

    var infoPopup;
    var showPopup = function(info) {
        infoPopup = $ionicPopup.show({
            title: info
        });
    }
    var closePopup = function() {
        infoPopup.close();
    }

    $scope.addOption = function() {
        $scope.popover.hide();
        $scope.noAdded = false;


        if (optionId !== null && optionId !== undefined) {
            stockIds.push(parseInt(optionId));
            window.localStorage.setItem(cacheId, JSON.stringify(stockIds));
            console.log(cacheService.getItem(cacheId));
           

            var infoPopup = $ionicPopup.show({
                title: '添加成功'
            });
        } else {
            var infoPopup = $ionicPopup.show({
                title: '添加失败'
            });
        }

         $timeout(function() {
            //close the popup after 0.5 seconds 
            infoPopup.close();
            $ionicListDelegate.closeOptionButtons();
            // $scope.noAdded = false;
        }, 650);

        // if (optionId !== null && optionId !== undefined) {
        //     sqliteService.insertStockId(db, [optionId]).then(function(res) {
        //         console.log("added sock id succeeded", optionId);
        //         stockIds.push(parseInt(optionId));
        //         showPopup("已加入自选");
        //         $timeout(function() {
        //             closePopup();
        //         }, 500);
        //     }, function(err) {
        //         console.error(err);
        //         showPopup("加入自选失败");
        //         $timeout(function() {
        //             closePopup();
        //         }, 500);
        //     });
        // }
    }

    $scope.cancel = function() {
        $scope.popover.hide();
    }

    $scope.deleteOption = function() {
        $scope.popover.hide();
        // $scope.noAdded = true;
        stockIds.splice(index, 1);
        window.localStorage.setItem(cacheId, JSON.stringify(stockIds));

        var res = cusService.getDefaultData();
        if (optionId == res[0].id) {
            res[0].show = false;
        }
        if (optionId == res[1].id) {
            res[1].show = false;
        }

         var infoPopup = $ionicPopup.show({
            title: '删除成功'
        });
        $timeout(function() {
            //close the popup after 0.5 seconds 
            infoPopup.close();
            $ionicListDelegate.closeOptionButtons();
            $scope.noAdded = true;
        }, 650);

        // var index = stockIds.indexOf(optionId);
        // if (index >= 0) {
        //     sqliteService.deleteStockId(db, [optionId]).then(function(res) {
        //             console.log("delete stock id succeeded", optionId);
        //             optionStockIds.splice(index, 1);
        //             showPopup("已移除自选");
        //             $timeout(function() {
        //                 closePopup();
        //             }, 500);
        //         },
        //         function(err) {
        //             console.error(err);
        //             showPopup("移除自选失败");
        //             $timeout(function() {
        //                 closePopup();
        //             }, 500);
        //         });
        // }
    }
    $scope.openPopover = function($event) {
        console.log("openPopover");
        $scope.popover.show($event);
    };
    $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    });

    $ionicPopover.fromTemplateUrl('my-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });
})


.directive('kCharts', function() {
    return {
        restrict: 'AE',
        scope: {
            source: '=',
            number: '=',
            five: '=',
        },
        template: '<div>这是一个k线图</div>',
        controller: function($scope) {},
        link: function(scope, element, attr) {
            var chart = element.find('div')[0];
            var $viewPanel = document.getElementById("viewpanel");
            var $headerbar = document.getElementsByTagName("ion-header-bar");
            var panelWidth = $viewPanel.clientWidth - 6;
            var panelHeight = $viewPanel.clientHeight - 65 - $headerbar[0].clientHeight;
            chart.style.width = panelWidth.toString() + 'px';
            chart.style.height = panelHeight.toString() + 'px';
            var myChart = echarts.init(chart);
            var timer;

            var option = {
                backgroundColor: '#000',
                tooltip: {
                    trigger: 'axis',
                    showContent: false,
                    confine: 'true',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        // lineStyle: {
                        //     color: '#376df4',
                        //     width: 2,
                        //     opacity: 1
                        // },
                        crossStyle: {
                            color: '#fff',
                            type: 'dotted',
                            opacity: 1,
                            textStyle: {
                                color: '#fff',
                                fontSize: 14,
                            },
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: scope.source,
                    axisLine: { lineStyle: { color: '#8392A5' } }
                },
                yAxis: {
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    axisLabel: {
                        // inside: true,
                        formatter: '{value}'
                    },
                    axisTick: { show: false, },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: '#3a3535'
                        }
                    }
                },
                dataZoom: [{
                    type: 'slider',
                    show: false,
                    start: 80,
                    end: 100
                }, {
                    type: 'inside',
                    throttle: 0,
                    orient: 'horizontal',
                    xAxisIndex: 0,
                    start: 80,
                    end: 100
                }],
                animation: false,
                series: [{
                    type: 'candlestick',
                    name: '日K',
                    data: scope.number,
                    itemStyle: {
                        normal: {
                            color: '#000',
                            color0: '#0cc0d2',
                            borderColor: '#f5140e',
                            borderColor0: '#0cc0d2',
                            borderWidth: '1'
                        }
                    }
                }, {
                    name: 'MA5',
                    type: 'line',
                    data: scope.five,
                    smooth: true,
                    lineStyle: {
                        normal: { opacity: 0.5 }
                    }
                }]
            }; // 使用刚指定的配置项和数据显示图表。

            myChart.setOption(option);

            myChart.on("click", function(param) {
                // var seriesIndex=param.seriesIndex;
                // var dataIndex=param.dataIndex;
                // var test=scope.five;
                // console.log("scope.five:"+test[dataIndex]);
                // console.log("name:"+param.name);
                // console.log("value:"+param.value);
                // var date=param.name;
                clearTimeout(timer);
                var tempValue = param.value.toString();
                if (tempValue.indexOf(',') > -1) {
                    var tempArray = tempValue.split(',');
                    document.getElementById("maxvalue").innerHTML = tempArray[3];
                    document.getElementById("minvalue").innerHTML = tempArray[2];
                    document.getElementById("openvalue").innerHTML = tempArray[0];
                } else {
                    document.getElementById("maxvalue").innerHTML = '-';
                    document.getElementById("minvalue").innerHTML = '-';
                    document.getElementById("openvalue").innerHTML = '-';
                }

                timer = setTimeout(function() {
                    document.getElementById("maxvalue").innerHTML = '-';
                    document.getElementById("minvalue").innerHTML = '-';
                    document.getElementById("openvalue").innerHTML = '-';
                }, 10000);
            });


        }
    };
});
