(function () {
    'use strict';

    angular
        .module('dropAppControllers')
        .factory('storage', storage);

    storage.$inject = ['$http'];

    function storage($http) {

        var services = {
            items: [],
            previewedItems: [],
            getArticles: getArticles,
            setPreviewedItems: setPreviewedItems,
            getPreviewedItems: getPreviewedItems,
            setItems: setItems,
            getItems: getItems
        };

        return services;

        function setPreviewedItems(previewedItems = []) {
            services.previewedItems = previewedItems
        }

        function setItems(items = []) {
            services.items = items
        }

        function getPreviewedItems() {
            return services.previewedItems;
        }

        function getItems() {
            return services.items
        }

        function getArticles() {
            let url = '/articles';
            return $http.get(url)
                .then(function (response) {
                    setItems(response.data);
                    setPreviewedItems();
                    return response.data
                });
        }
    }

})();



