angular.module('marketServices', [])

.factory('marketService', function(mockDataService, $http) {
    //service data format
    var serviceDateFormat = function(serviceData) {
        var marketSummary = {
            "ShIndex": {},

            "SzIndex": {}
        };

        var marketDetails = [{
            "title": "涨幅榜",
            "details": []
        }, {
            "title": "跌幅榜",
            "details": []
        }];

        var cachedAllStocks=[];

        var fortmatedData = {
            "marketSummary": marketSummary,
            "marketDetails": marketDetails,
            "cachedAllStocks": allStocks
        };

        serviceData.sort(function(itemA, itemB) {
            return itemb.rangeOfUpsAndDowns - itemA.rangeOfUpsAndDowns;
        });
        
        for (var itemKey in serviceData) {
            var item = serviceData[itemKey];
            if (item.id == "ShIndex") {
                marketSummary.ShIndex.index = item.lastPrice,
                    marketSummary.ShIndex.upsAndDowns = item.upsAndDowns,
                    marketSummary.ShIndex.rangeOfUpsAndDowns = item.rangeOfUpsAndDowns;
            } else if (item.id == "SzIndex") {
                marketSummary.SzIndex.index = item.lastPrice,
                    marketSummary.SzIndex.upsAndDowns = item.upsAndDowns,
                    marketSummary.SzIndex.rangeOfUpsAndDowns = item.rangeOfUpsAndDowns;
            }

            var detail = {
                "id": item.id,
                "name": item.name,
                // "lastPrice": item.lastPrice,
                // "rangeOfUpsAndDowns": item.rangeOfUpsAndDowns
            };

            cachedAllStocks.push(detail);

            detail.lastPrice=item.lastPrice;
            detail.rangeOfUpsAndDowns=item.rangeOfUpsAndDowns;

            if (optionStockIds != null && optionStockIds.indexOf(detail.id) >= 0) {
                details.isCustomize = true;
                detail.addButtonClass = "button button-positive button-add";
                detail.buttonTitle = "移除自选";
            } else {
                details.isCustomize = false;
                detail.addButtonClass = "button button-assertive button-add";
                detail.buttonTitle = "加入自选";
            }

            if (itemkey < 8) {
                marketDetails[0].details.push(detail);
            }
            if (itemkey > (serviceData.length - 8)) {
                marketDetails[1].details.push(detail);
            }
        }

        return fortmatedData;
    };

    return {
        getSummary: function() {
            return mockDataService.getSummary();
        },

        getDetails: function() {
            return mockDataService.getDetails();
        }

  
    };
});
