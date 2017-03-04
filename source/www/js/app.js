// PDF App
var cacheId = "optionStockIds";
var db

angular.module('PDF', ['ionic', 'ngCordova',
    'services',
    'marketServices', 'marketControllers',
    'customizeControllers', 'customizeServices', 'noDataDirectives',
    'stockDetailControllers', 'stockDetailServices',
])

.run(function($ionicPlatform, $cordovaSQLite, sqliteService, cacheService, cusService) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.scrolling.jsScrolling(true);
    $ionicConfigProvider.backButton.previousTitleText(false);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.market', {
        url: '/market',
        views: {
            'tab-market': {
                templateUrl: 'templates/market/tab-market.html',
                controller: 'MarketCtrl'
            }
        }
    })

    .state('tab.customize', {
        url: '/customize',
        // cache: false,
        views: {
            'tab-customize': {
                templateUrl: 'templates/customize/tab-customize.html',
                controller: 'cusCtrl'
            }
        }
    })

    .state('stockDetail', {
        url: '/stockDetail',
        cache: false,
        params: { "stockId": null, "backUrl": null },
        templateUrl: 'templates/stockDetail/stockDetail.html',
        controller: 'StockDetailCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/market');





});
