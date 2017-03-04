angular.module('customizeServices', [])

.factory('cusService', function(mockDataService) {
    var mockData = mockDataService.getMockData();

    var fillerOutBondData = function(data) {
        var allContentData = [];
        for (var key in data) {
            var singleBondData = data[key];

            if (singleBondData.upsAndDowns >= 0) {
                var isUpTrend = true;
            } else {
                var isUpTrend = false;
            }
            var contentData = {
                id: singleBondData.id,
                name: singleBondData.name,
                lastPrice: singleBondData.lastPrice,
                rangeOfUpsAndDowns: singleBondData.rangeOfUpsAndDowns,
                upsAndDowns: singleBondData.upsAndDowns,
                isUpTrend: isUpTrend
            };
            allContentData.push(contentData);
        }
        return allContentData;
    };

    var defaultData = [{
        "id": 1004,
        "name": "上证指数",
        "lastPrice": 3282.92,
        "rangeOfUpsAndDowns": "-0.7%",
        "upsAndDowns": "-20"
    }, {
        "id": 1003,
        "name": "创业板指",
        "lastPrice": 2183.05,
        "rangeOfUpsAndDowns": "+1.55%",
        "upsAndDowns": "22.70"
    }];
    var getAllOptionItems = function(arrId) {
        var optionItems = [];
        for (var index in arrId) {
            for (var i in mockData) {
                if (mockData[i].id == arrId[index]) {
                    optionItems.push(mockData[i]);
                }
            }
        }
        return optionItems;
    };


    var byAsc = function(name) {
        return function(o, p) {
            var obj1, obj2;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                obj1 = o[name];
                obj2 = p[name];
                if (obj1 === obj2) {
                    return 0;
                }
                if (!isNaN(Number(obj1)) && !isNaN(Number(obj2))) {
                console.log("obj1:",obj1);
                    obj1 = Number(obj1);
                    obj2 = Number(obj2);
                }
                if (typeof obj1 == 'string' && obj1.indexOf('%') !== -1) {
                    obj1 = obj1.slice(0, -1);
                    obj1 = Number(obj1);
                }
                if (typeof obj2 == 'string' && obj2.indexOf('%') !== -1) {
                    obj2 = obj2.slice(0, -1);
                    obj2 = Number(obj2);
                }
                if (typeof obj1 === typeof obj2) {
                    return obj1 < obj2 ? -1 : 1;
                }
                return typeof obj1 < typeof obj2 ? -1 : 1;
            } else {
                throw ("error");
            }
        }
    };

    var byDes = function(name) {
        return function(o, p) {
            var obj1, obj2;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                obj1 = o[name];
                obj2 = p[name];
                if (obj1 === obj2) {
                    return 0;
                }
                if (!isNaN(Number(obj1)) && !isNaN(Number(obj2))) {
                    obj1 = Number(obj1);
                    obj2 = Number(obj2);
                }
                if (typeof obj1 == 'string' && obj1.indexOf('%') !== -1) {
                    obj1 = obj1.slice(0, -1);
                    obj1 = Number(obj1);
                }
                if (typeof obj2 == 'string' && obj2.indexOf('%') !== -1) {
                    obj2 = obj2.slice(0, -1);
                    obj2 = Number(obj2);
                }
                if (typeof obj1 === typeof obj2) {
                    return obj1 > obj2 ? -1 : 1;
                }
                return typeof obj1 > typeof obj2 ? -1 : 1;
            } else {
                throw ("error");
            }
        }
    }

    return {
        getContentData: function(data) {
            return fillerOutBondData(data);

        },
        getDefaultData: function() {
            return fillerOutBondData(defaultData);

        },
        getOptionData: function(arrId) {
            return fillerOutBondData(getAllOptionItems(arrId));
        },
        getAscSortData: function(arrId, name) {
            return fillerOutBondData(getAllOptionItems(arrId).sort(byAsc(name)));
        },
        getDesSortData: function(arrId, name) {
            return fillerOutBondData(getAllOptionItems(arrId).sort(byDes(name)));
        }

    }
});
