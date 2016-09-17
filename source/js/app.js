(function () {
    'use strict';

    angular
        .module('dropApp', [
            'ui.router',
            'dropAppControllers',
            'dndLists',
            'ngMaterial'
        ])
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');


            $stateProvider
                .state('/', {
                    url: "/",
                    templateUrl: "app/partials/dev.html",
                    controller: 'dropController'
                })
                .state('/preview', {
                    url: "/preview",
                    templateUrl: "app/partials/preview.html",
                    controller: 'previewController'
                })

        });
})();