'use strict';

(function () {
    'use strict';

    angular.module('dropApp', ['ui.router', 'dropAppControllers', 'dndLists', 'ngMaterial']).config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
            url: "/",
            templateUrl: "app/partials/dev.html",
            controller: 'dropController'
        }).state('/preview', {
            url: "/preview",
            templateUrl: "app/partials/preview.html",
            controller: 'previewController'
        });
    });
})();
(function () {
    'use strict';

    angular.module('dropAppControllers', []).controller('dropController', dropController).controller('previewController', previewController);

    dropController.$inject = ['$scope', 'storage'];
    previewController.$inject = ['$scope', 'storage', '$state'];

    function dropController($scope, storage) {

        $scope.elements = [];
        $scope.boxes = [];
        $scope.readyToPreview = true; //true means ng-disabled: true
        $scope.previewChecker = previewChecker;
        $scope.saveItemsState = saveItemsState;

        var boxesAmount = 5;

        //set amount of predefined boxes

        getData();

        previewChecker();

        function saveItemsState() {

            //save items in storage when preview button pressed.

            storage.setPreviewedItems($scope.boxes);
            storage.setItems($scope.elements);
        }

        function previewChecker() {
            var filtered = $scope.boxes.filter(function (e) {
                return e.length === 0;
            });
            // check if al off boxes are filled
            // enable preview button if no empty boxes
            return $scope.readyToPreview = filtered.length !== 0;
        }

        function setBoxes(count) {
            // set empty boxes for elements
            var tempArray = [];
            for (var i = 0; i < count; i++) {
                tempArray[i] = [];
            }
            $scope.boxes = tempArray;
        }

        function getData() {
            var items = storage.getItems();
            var boxes = storage.getPreviewedItems();
            setBoxes(boxesAmount);

            if (items.length > 0 || boxes.length > 0) {
                //check if elements already exists, set them from storage
                $scope.elements = items;
                $scope.boxes = boxes;
                return;
            }

            //otherwise processed request from server
            storage.getArticles().then(function (data) {
                return $scope.elements = data;
            });
        }
    }

    function previewController($scope, storage, $state) {
        $scope.boxes = [];

        setPreviewedBoxes();

        function setPreviewedBoxes() {
            var boxes = storage.getPreviewedItems();
            //check if boxes(previewed items) exists in storage
            //if 'yes' set them to scope
            //if no redirect to start state
            boxes.length > 0 ? $scope.boxes = boxes : $state.go('/');
            $scope.boxes = storage.getPreviewedItems();
        }
    }
})();
(function () {})();
(function () {
    'use strict';

    angular.module('dropAppControllers').factory('storage', storage);

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

        function setPreviewedItems() {
            var previewedItems = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            services.previewedItems = previewedItems;
        }

        function setItems() {
            var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

            services.items = items;
        }

        function getPreviewedItems() {
            return services.previewedItems;
        }

        function getItems() {
            return services.items;
        }

        function getArticles() {
            var url = '/articles';
            return $http.get(url).then(function (response) {
                setItems(response.data);
                setPreviewedItems();
                return response.data;
            });
        }
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzLmpzIiwicGFnZS5qcyIsInNlcnZpY2VzLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiZHJvcENvbnRyb2xsZXIiLCJwcmV2aWV3Q29udHJvbGxlciIsIiRpbmplY3QiLCIkc2NvcGUiLCJzdG9yYWdlIiwiZWxlbWVudHMiLCJib3hlcyIsInJlYWR5VG9QcmV2aWV3IiwicHJldmlld0NoZWNrZXIiLCJzYXZlSXRlbXNTdGF0ZSIsImJveGVzQW1vdW50IiwiZ2V0RGF0YSIsInNldFByZXZpZXdlZEl0ZW1zIiwic2V0SXRlbXMiLCJmaWx0ZXJlZCIsImZpbHRlciIsImUiLCJsZW5ndGgiLCJzZXRCb3hlcyIsImNvdW50IiwidGVtcEFycmF5IiwiaSIsIml0ZW1zIiwiZ2V0SXRlbXMiLCJnZXRQcmV2aWV3ZWRJdGVtcyIsImdldEFydGljbGVzIiwidGhlbiIsImRhdGEiLCIkc3RhdGUiLCJzZXRQcmV2aWV3ZWRCb3hlcyIsImdvIiwiZmFjdG9yeSIsIiRodHRwIiwic2VydmljZXMiLCJwcmV2aWV3ZWRJdGVtcyIsImdldCIsInJlc3BvbnNlIl0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUEsWUFBQTtBQUNBOztBQUVBQSxZQUNBQyxNQURBLENBQ0EsU0FEQSxFQUNBLENBQ0EsV0FEQSxFQUVBLG9CQUZBLEVBR0EsVUFIQSxFQUlBLFlBSkEsQ0FEQSxFQU9BQyxNQVBBLENBT0EsVUFBQUMsY0FBQSxFQUFBQyxrQkFBQSxFQUFBOztBQUVBQSwyQkFBQUMsU0FBQSxDQUFBLEdBQUE7O0FBR0FGLHVCQUNBRyxLQURBLENBQ0EsR0FEQSxFQUNBO0FBQ0FDLGlCQUFBLEdBREE7QUFFQUMseUJBQUEsdUJBRkE7QUFHQUMsd0JBQUE7QUFIQSxT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QURBLENBQ0Esb0JBREEsRUFFQXdDLE9BRkEsQ0FFQSxTQUZBLEVBRUEzQixPQUZBOztBQUlBQSxZQUFBRixPQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUE7O0FBRUEsYUFBQUUsT0FBQSxDQUFBNEIsS0FBQSxFQUFBOztBQUVBLFlBQUFDLFdBQUE7QUFDQVgsbUJBQUEsRUFEQTtBQUVBWSw0QkFBQSxFQUZBO0FBR0FULHlCQUFBQSxXQUhBO0FBSUFiLCtCQUFBQSxpQkFKQTtBQUtBWSwrQkFBQUEsaUJBTEE7QUFNQVgsc0JBQUFBLFFBTkE7QUFPQVUsc0JBQUFBO0FBUEEsU0FBQTs7QUFVQSxlQUFBVSxRQUFBOztBQUVBLGlCQUFBckIsaUJBQUEsR0FBQTtBQUFBLGdCQUFBc0IsY0FBQSx5REFBQSxFQUFBOztBQUNBRCxxQkFBQUMsY0FBQSxHQUFBQSxjQUFBO0FBQ0E7O0FBRUEsaUJBQUFyQixRQUFBLEdBQUE7QUFBQSxnQkFBQVMsS0FBQSx5REFBQSxFQUFBOztBQUNBVyxxQkFBQVgsS0FBQSxHQUFBQSxLQUFBO0FBQ0E7O0FBRUEsaUJBQUFFLGlCQUFBLEdBQUE7QUFDQSxtQkFBQVMsU0FBQUMsY0FBQTtBQUNBOztBQUVBLGlCQUFBWCxRQUFBLEdBQUE7QUFDQSxtQkFBQVUsU0FBQVgsS0FBQTtBQUNBOztBQUVBLGlCQUFBRyxXQUFBLEdBQUE7QUFDQSxnQkFBQTVCLE1BQUEsV0FBQTtBQUNBLG1CQUFBbUMsTUFBQUcsR0FBQSxDQUFBdEMsR0FBQSxFQUNBNkIsSUFEQSxDQUNBLFVBQUFVLFFBQUEsRUFBQTtBQUNBdkIseUJBQUF1QixTQUFBVCxJQUFBO0FBQ0FmO0FBQ0EsdUJBQUF3QixTQUFBVCxJQUFBO0FBQ0EsYUFMQSxDQUFBO0FBTUE7QUFDQTtBQUVBLENBbERBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHJvcEFwcCcsIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICAgICAgICdkcm9wQXBwQ29udHJvbGxlcnMnLFxyXG4gICAgICAgICAgICAnZG5kTGlzdHMnLFxyXG4gICAgICAgICAgICAnbmdNYXRlcmlhbCdcclxuICAgICAgICBdKVxyXG4gICAgICAgIC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcblxyXG4gICAgICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCcvJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhcnRpYWxzL2Rldi5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2Ryb3BDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnL3ByZXZpZXcnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9wcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhcnRpYWxzL3ByZXZpZXcuaHRtbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwcmV2aWV3Q29udHJvbGxlcidcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2Ryb3BBcHBDb250cm9sbGVycycsIFtdKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdkcm9wQ29udHJvbGxlcicsIGRyb3BDb250cm9sbGVyKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdwcmV2aWV3Q29udHJvbGxlcicsIHByZXZpZXdDb250cm9sbGVyKTtcclxuXHJcbiAgICBkcm9wQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnc3RvcmFnZSddO1xyXG4gICAgcHJldmlld0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ3N0b3JhZ2UnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gZHJvcENvbnRyb2xsZXIoJHNjb3BlLCBzdG9yYWdlKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5lbGVtZW50cyA9IFtdO1xyXG4gICAgICAgICRzY29wZS5ib3hlcyA9IFtdO1xyXG4gICAgICAgICRzY29wZS5yZWFkeVRvUHJldmlldyA9IHRydWU7IC8vdHJ1ZSBtZWFucyBuZy1kaXNhYmxlZDogdHJ1ZVxyXG4gICAgICAgICRzY29wZS5wcmV2aWV3Q2hlY2tlciA9IHByZXZpZXdDaGVja2VyO1xyXG4gICAgICAgICRzY29wZS5zYXZlSXRlbXNTdGF0ZSA9IHNhdmVJdGVtc1N0YXRlO1xyXG5cclxuICAgICAgICB2YXIgYm94ZXNBbW91bnQgPSA1O1xyXG5cclxuICAgICAgICAvL3NldCBhbW91bnQgb2YgcHJlZGVmaW5lZCBib3hlc1xyXG5cclxuICAgICAgICBnZXREYXRhKCk7XHJcblxyXG4gICAgICAgIHByZXZpZXdDaGVja2VyKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVJdGVtc1N0YXRlKCkge1xyXG5cclxuICAgICAgICAgICAgLy9zYXZlIGl0ZW1zIGluIHN0b3JhZ2Ugd2hlbiBwcmV2aWV3IGJ1dHRvbiBwcmVzc2VkLlxyXG5cclxuICAgICAgICAgICAgc3RvcmFnZS5zZXRQcmV2aWV3ZWRJdGVtcygkc2NvcGUuYm94ZXMpO1xyXG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW1zKCRzY29wZS5lbGVtZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwcmV2aWV3Q2hlY2tlcigpIHtcclxuICAgICAgICAgICAgbGV0IGZpbHRlcmVkID0gJHNjb3BlLmJveGVzLmZpbHRlcihlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBhbCBvZmYgYm94ZXMgYXJlIGZpbGxlZFxyXG4gICAgICAgICAgICAvLyBlbmFibGUgcHJldmlldyBidXR0b24gaWYgbm8gZW1wdHkgYm94ZXNcclxuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5yZWFkeVRvUHJldmlldyA9IGZpbHRlcmVkLmxlbmd0aCAhPT0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldEJveGVzKGNvdW50KSB7XHJcbiAgICAgICAgICAgIC8vIHNldCBlbXB0eSBib3hlcyBmb3IgZWxlbWVudHNcclxuICAgICAgICAgICAgbGV0IHRlbXBBcnJheSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRlbXBBcnJheVtpXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS5ib3hlcyA9IHRlbXBBcnJheTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldERhdGEoKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtcyA9IHN0b3JhZ2UuZ2V0SXRlbXMoKTtcclxuICAgICAgICAgICAgbGV0IGJveGVzID0gc3RvcmFnZS5nZXRQcmV2aWV3ZWRJdGVtcygpO1xyXG4gICAgICAgICAgICBzZXRCb3hlcyhib3hlc0Ftb3VudCk7XHJcblxyXG4gICAgICAgICAgICBpZihpdGVtcy5sZW5ndGggPiAwIHx8IGJveGVzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgLy9jaGVjayBpZiBlbGVtZW50cyBhbHJlYWR5IGV4aXN0cywgc2V0IHRoZW0gZnJvbSBzdG9yYWdlXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZWxlbWVudHMgPSBpdGVtcztcclxuICAgICAgICAgICAgICAgICRzY29wZS5ib3hlcyA9IGJveGVzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL290aGVyd2lzZSBwcm9jZXNzZWQgcmVxdWVzdCBmcm9tIHNlcnZlclxyXG4gICAgICAgICAgICBzdG9yYWdlLmdldEFydGljbGVzKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS5lbGVtZW50cyA9IGRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcHJldmlld0NvbnRyb2xsZXIoJHNjb3BlLCBzdG9yYWdlLCAkc3RhdGUpIHtcclxuICAgICAgICAkc2NvcGUuYm94ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgc2V0UHJldmlld2VkQm94ZXMoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UHJldmlld2VkQm94ZXMoKSB7XHJcbiAgICAgICAgICAgIGxldCBib3hlcyA9IHN0b3JhZ2UuZ2V0UHJldmlld2VkSXRlbXMoKTtcclxuICAgICAgICAgICAgLy9jaGVjayBpZiBib3hlcyhwcmV2aWV3ZWQgaXRlbXMpIGV4aXN0cyBpbiBzdG9yYWdlXHJcbiAgICAgICAgICAgIC8vaWYgJ3llcycgc2V0IHRoZW0gdG8gc2NvcGVcclxuICAgICAgICAgICAgLy9pZiBubyByZWRpcmVjdCB0byBzdGFydCBzdGF0ZVxyXG4gICAgICAgICAgICBib3hlcy5sZW5ndGggPiAwID8gJHNjb3BlLmJveGVzID0gYm94ZXMgOiAkc3RhdGUuZ28oJy8nKTtcclxuICAgICAgICAgICAgJHNjb3BlLmJveGVzID0gc3RvcmFnZS5nZXRQcmV2aWV3ZWRJdGVtcygpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2Ryb3BBcHBDb250cm9sbGVycycpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3N0b3JhZ2UnLCBzdG9yYWdlKTtcclxuXHJcbiAgICBzdG9yYWdlLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcmFnZSgkaHR0cCkge1xyXG5cclxuICAgICAgICB2YXIgc2VydmljZXMgPSB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgcHJldmlld2VkSXRlbXM6IFtdLFxyXG4gICAgICAgICAgICBnZXRBcnRpY2xlczogZ2V0QXJ0aWNsZXMsXHJcbiAgICAgICAgICAgIHNldFByZXZpZXdlZEl0ZW1zOiBzZXRQcmV2aWV3ZWRJdGVtcyxcclxuICAgICAgICAgICAgZ2V0UHJldmlld2VkSXRlbXM6IGdldFByZXZpZXdlZEl0ZW1zLFxyXG4gICAgICAgICAgICBzZXRJdGVtczogc2V0SXRlbXMsXHJcbiAgICAgICAgICAgIGdldEl0ZW1zOiBnZXRJdGVtc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJldHVybiBzZXJ2aWNlcztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UHJldmlld2VkSXRlbXMocHJldmlld2VkSXRlbXMgPSBbXSkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlcy5wcmV2aWV3ZWRJdGVtcyA9IHByZXZpZXdlZEl0ZW1zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzZXRJdGVtcyhpdGVtcyA9IFtdKSB7XHJcbiAgICAgICAgICAgIHNlcnZpY2VzLml0ZW1zID0gaXRlbXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFByZXZpZXdlZEl0ZW1zKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VydmljZXMucHJldmlld2VkSXRlbXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRJdGVtcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VzLml0ZW1zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRBcnRpY2xlcygpIHtcclxuICAgICAgICAgICAgbGV0IHVybCA9ICcvYXJ0aWNsZXMnO1xyXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEl0ZW1zKHJlc3BvbnNlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFByZXZpZXdlZEl0ZW1zKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
