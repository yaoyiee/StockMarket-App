angular.module('services', [])

.factory('mockDataService', function() {
    //涨幅：rangeOfUpsAndDowns
    //张跌：upsAndDowns
    var mockData = [{
        "id": 1001,
        "name": "珠江钢琴",
        "lastPrice": 16.35,
        "rangeOfUpsAndDowns": "-8.15%",
        "upsAndDowns": "-1.45"
    }, {
        "id": 1002,
        "name": "王子新材",
        "lastPrice": 63.00,
        "rangeOfUpsAndDowns": "-10.00%",
        "upsAndDowns": "-7.00"
    }, {
        "id": 1003,
        "name": "创业板指",
        "lastPrice": 2183.05,
        "rangeOfUpsAndDowns": "+1.55%",
        "upsAndDowns": "+22.70"
    }, {
        "id": 1004,
        "name": "上证指数",
        "lastPrice": 3282.92,
        "rangeOfUpsAndDowns": "-0.7%",
        "upsAndDowns": "-20"
    }, {
        "id": 1005,
        "name": "N星源",
        "lastPrice": 16.35,
        "rangeOfUpsAndDowns": "-8.15%",
        "upsAndDowns": "-1.45"
    }, {
        "id": 1006,
        "name": "湘油泵",
        "lastPrice": 63.00,
        "rangeOfUpsAndDowns": "-10.00%",
        "upsAndDowns": "-7.00"
    }, {
        "id": 1007,
        "name": "天沃科技",
        "lastPrice": 2183.05,
        "rangeOfUpsAndDowns": "+1.05%",
        "upsAndDowns": "+22.70"
    }, {
        "id": 1008,
        "name": "凯中精密",
        "lastPrice": 1178.35,
        "rangeOfUpsAndDowns": "+1.18%",
        "upsAndDowns": "+5.92"
    }, {
        "id": 1009,
        "name": "中电广通",
        "lastPrice": 16.35,
        "rangeOfUpsAndDowns": "-11.15%",
        "upsAndDowns": "-1.45"
    }, {
        "id": 1010,
        "name": "福建金森",
        "lastPrice": 63.00,
        "rangeOfUpsAndDowns": "-10.00%",
        "upsAndDowns": "-7.00"
    }, {
        "id": 1011,
        "name": "万盛股份",
        "lastPrice": 2183.05,
        "rangeOfUpsAndDowns": "+1.05%",
        "upsAndDowns": "+22.70"
    }, {
        "id": 1012,
        "name": "广州发展",
        "lastPrice": 3282.92,
        "rangeOfUpsAndDowns": "+0.18%",
        "upsAndDowns": "+5.92"
    }, {
        "id": 1013,
        "name": "同达创业",
        "lastPrice": 16.35,
        "rangeOfUpsAndDowns": "-8.15%",
        "upsAndDowns": "-1.45"
    }, {
        "id": 1014,
        "name": "太平洋",
        "lastPrice": 63.00,
        "rangeOfUpsAndDowns": "-10.00%",
        "upsAndDowns": "-7.00"
    }, {
        "id": 1015,
        "name": "金利华电",
        "lastPrice": 2183.05,
        "rangeOfUpsAndDowns": "+1.05%",
        "upsAndDowns": "+22.70"
    }, {
        "id": 1016,
        "name": "安吉食品",
        "lastPrice": 3282.92,
        "rangeOfUpsAndDowns": "+0.18%",
        "upsAndDowns": "+5.92"
    }, {
        "id": 1017,
        "name": "南洋科技",
        "lastPrice": 2167.18,
        "rangeOfUpsAndDowns": "-0.69%",
        "upsAndDowns": "-14.37"
    }];


    var marketSummary = {
        "ShIndex": {
            "index": 3282.92,
            "upsAndDowns": "-20",
            "rangeOfUpsAndDowns": "-0.7%"
        },

        "SzIndex": {
            "index": 3282,
            "upsAndDowns": "+10",
            "rangeOfUpsAndDowns": "+0.4%"
        }
    };

    var marketDetails = [{
            "title": "涨幅榜",
            "details": [{
                "id": 1003,
                "name": "创业板指",
                "lastPrice": 2183.05,
                "rangeOfUpsAndDowns": "+1.55%",
            }, {
                "id": 1008,
                "name": "凯中精密",
                "lastPrice": 1178.35,
                "rangeOfUpsAndDowns": "+1.18%",
            }, {
                "id": 1015,
                "name": "金利华电",
                "lastPrice": 2183.05,
                "rangeOfUpsAndDowns": "+1.05%",
            }],
        },

        {
            "title": "跌幅榜",
            "details": [{
                "id": 1001,
                "name": "珠江钢琴",
                "lastPrice": 16.35,
                "rangeOfUpsAndDowns": "-8.15%",
            }, {
                "id": 1002,
                "name": "王子新材",
                "lastPrice": 63.00,
                "rangeOfUpsAndDowns": "-10.00%",
            }, {
                "id": 1009,
                "name": "中电广通",
                "lastPrice": 16.35,
                "rangeOfUpsAndDowns": "-11.15%",
            }],
        },
    ];




    return {
        getMockData: function() {
            return mockData;
        },
        getSummary: function() {
            return marketSummary;
        },

        getDetails: function() {
            return marketDetails;
        },

        getItem: function(stockId) {
            for (var i = 0; i < mockData.length; i++) {
                if (mockData[i].id === parseInt(stockId)) {
                    return mockData[i];
                }
            }
        },
    }
})

.factory('cacheService', function() {
    var innerSetItems = function(key, value) {
        if (window.localStorage.getItem(key) == undefined) {
            window.localStorage.setItem(key, "[" + JSON.stringify(value) + "]");
        } else {
            var dummy = JSON.parse(window.localStorage.getItem(key));
            dummy.push(value);
            window.localStorage.setItem(key, JSON.stringify(dummy));
            console.log(window.localStorage.getItem(key));
        }
    };
    var innerGetItems = function(key) {
        var cacheValue = JSON.parse(window.localStorage.getItem(key));
        if (cacheValue == undefined) {
            return [];
        } else {
            return cacheValue;
        }
    };
    var innerSetItem = function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    };
    var innerGetItem = function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    };

    return {
        setItems: function(id, res, callback) {
            var len = res.length;
            var idsInLocalStorage = innerGetItems(id);
            for (var i = 0; i < len; i++) {
                var resItem = res[i];
                var itemId = callback(resItem);
                var key = id + "_" + itemId;
                if (idsInLocalStorage.indexOf(key) == -1) {
                    innerSetItems(id, key);
                }
                innerSetItem(key, resItem);
            }
        },
        getItems: function(id) {
            var dummy = innerGetItems(id);
            var len = dummy.length;
            var items = [];
            for (var index = 0; index < len; index++) {
                items.push(innerGetItem(dummy[index]));
            }
            return items;
        },
        setItem: function(key, value) {
            var idsInLocalStorage = innerGetItems(key);
            if (idsInLocalStorage.indexOf(value) == -1) {
                innerSetItems(key, value);
            }
        },
        getItem: function(key) {
            return innerGetItems(key);
        }
    }
})

.factory('sqliteService', function($cordovaSQLite, $q) {

    var promiseTransaction = function(db, query, binding) {
        var q = $q.defer();
        db.transaction(function(tx) {
            tx.executeSql(query, binding, function(tx, result) {
                    q.resolve(result);
                },
                function(transaction, error) {
                    q.reject(error);
                });
        });
        return q.promise;
    }

    return {
        initDB: function() {
            var db;
            if (window.cordova) {
                // db = $cordovaSQLite.openDB({ name: "pdf.db" }); //device
                db=window.sqlitePlugin.openDatabase({name: 'pdf.db', location: 'default'});
                console.log("initilize DB for [device]");
            } else {
                db = window.openDatabase("pdf.db", '1', 'my', 1024 * 1024 * 100); // browser
                console.log("initilize DB for [browser]");
            }
            return db;
        },

        getAllStockIds:function(db) {
            var query = "SELECT DISTINCT stock_id FROM option_stock_id ";
            return promiseTransaction(db, query, []);
        },

        insertStockId: function(db, binding) {
            var query = "INSERT INTO option_stock_id (stock_id) VALUES (?)";
            return promiseTransaction(db, query, binding);
        },

        deleteStockId: function(db, binding) {
            var query = "DELETE FROM option_stock_id WHERE stock_id = ? ";
            return promiseTransaction(db, query, binding);
        },
    }
});
