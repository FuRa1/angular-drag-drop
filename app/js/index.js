'use strict';

(function () {
    'use strict';

    angular.module('dropApp', ['ui.router', 'dropAppControllers', 'dndLists', 'ngMaterial']).config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
            url: "/",
            templateUrl: "app/partials/dev.html",
            controller: 'dropController',
            controllerAs: 'drop'
        }).state('/preview', {
            url: "/preview",
            templateUrl: "app/partials/preview.html",
            controller: 'previewController',
            controllerAs: 'preview'
        });
    });
})();
(function () {
    'use strict';

    angular.module('dropAppControllers', []).controller('dropController', dropController).controller('previewController', previewController);

    dropController.$inject = ['storage'];
    previewController.$inject = ['storage', '$state'];

    function dropController(storage) {
        var vm = this;
        vm.elements = [];
        vm.boxes = [];
        vm.readyToPreview = true; //true means ng-disabled: true
        vm.previewChecker = previewChecker;
        vm.saveItemsState = saveItemsState;

        var boxesAmount = 5;

        //set amount of predefined boxes

        getData();

        previewChecker();

        function saveItemsState() {

            //save items in storage when preview button pressed.

            storage.setPreviewedItems(vm.boxes);
            storage.setItems(vm.elements);
        }

        function previewChecker() {
            var filtered = vm.boxes.filter(function (e) {
                return e.length === 0;
            });
            // check if al off boxes are filled
            // enable preview button if no empty boxes
            return vm.readyToPreview = filtered.length !== 0;
        }

        function setBoxes(count) {
            // set empty boxes for elements
            var tempArray = [];
            for (var i = 0; i < count; i++) {
                tempArray[i] = [];
            }
            vm.boxes = tempArray;
        }

        function getData() {
            var items = storage.getItems();
            var boxes = storage.getPreviewedItems();
            setBoxes(boxesAmount);

            if (items.length > 0 || boxes.length > 0) {
                //check if elements already exists, set them from storage
                vm.elements = items;
                vm.boxes = boxes;
                return;
            }

            //otherwise processed request from server
            storage.getArticles().then(function (data) {
                return vm.elements = data;
            });
        }
    }

    function previewController(storage, $state) {
        var vm = this;
        vm.boxes = [];

        setPreviewedBoxes();

        function setPreviewedBoxes() {
            var boxes = storage.getPreviewedItems();
            //check if boxes(previewed items) exists in storage
            //if 'yes' set them to scope
            //if no redirect to start state
            boxes.length > 0 ? vm.boxes = boxes : $state.go('/');
            vm.boxes = storage.getPreviewedItems();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbnRyb2xsZXJzLmpzIiwicGFnZS5qcyIsInNlcnZpY2VzLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIm90aGVyd2lzZSIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiY29udHJvbGxlckFzIiwiZHJvcENvbnRyb2xsZXIiLCJwcmV2aWV3Q29udHJvbGxlciIsIiRpbmplY3QiLCJzdG9yYWdlIiwidm0iLCJlbGVtZW50cyIsImJveGVzIiwicmVhZHlUb1ByZXZpZXciLCJwcmV2aWV3Q2hlY2tlciIsInNhdmVJdGVtc1N0YXRlIiwiYm94ZXNBbW91bnQiLCJnZXREYXRhIiwic2V0UHJldmlld2VkSXRlbXMiLCJzZXRJdGVtcyIsImZpbHRlcmVkIiwiZmlsdGVyIiwiZSIsImxlbmd0aCIsInNldEJveGVzIiwiY291bnQiLCJ0ZW1wQXJyYXkiLCJpIiwiaXRlbXMiLCJnZXRJdGVtcyIsImdldFByZXZpZXdlZEl0ZW1zIiwiZ2V0QXJ0aWNsZXMiLCJ0aGVuIiwiZGF0YSIsIiRzdGF0ZSIsInNldFByZXZpZXdlZEJveGVzIiwiZ28iLCJmYWN0b3J5IiwiJGh0dHAiLCJzZXJ2aWNlcyIsInByZXZpZXdlZEl0ZW1zIiwiZ2V0IiwicmVzcG9uc2UiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQSxZQUFBO0FBQ0E7O0FBRUFBLFlBQ0FDLE1BREEsQ0FDQSxTQURBLEVBQ0EsQ0FDQSxXQURBLEVBRUEsb0JBRkEsRUFHQSxVQUhBLEVBSUEsWUFKQSxDQURBLEVBT0FDLE1BUEEsQ0FPQSxVQUFBQyxjQUFBLEVBQUFDLGtCQUFBLEVBQUE7O0FBRUFBLDJCQUFBQyxTQUFBLENBQUEsR0FBQTs7QUFHQUYsdUJBQ0FHLEtBREEsQ0FDQSxHQURBLEVBQ0E7QUFDQUMsaUJBQUEsR0FEQTtBQUVBQyx5QkFBQSx1QkFGQTtBQUdBQyx3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QUVBLENBRkE7QUNBQSxDQUFBLFlBQUE7QUFDQTs7QUFFQW5DLFlBQ0FDLE1BREEsQ0FDQSxvQkFEQSxFQUVBeUMsT0FGQSxDQUVBLFNBRkEsRUFFQTVCLE9BRkE7O0FBSUFBLFlBQUFELE9BQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQTs7QUFFQSxhQUFBQyxPQUFBLENBQUE2QixLQUFBLEVBQUE7O0FBRUEsWUFBQUMsV0FBQTtBQUNBWCxtQkFBQSxFQURBO0FBRUFZLDRCQUFBLEVBRkE7QUFHQVQseUJBQUFBLFdBSEE7QUFJQWIsK0JBQUFBLGlCQUpBO0FBS0FZLCtCQUFBQSxpQkFMQTtBQU1BWCxzQkFBQUEsUUFOQTtBQU9BVSxzQkFBQUE7QUFQQSxTQUFBOztBQVVBLGVBQUFVLFFBQUE7O0FBRUEsaUJBQUFyQixpQkFBQSxHQUFBO0FBQUEsZ0JBQUFzQixjQUFBLHlEQUFBLEVBQUE7O0FBQ0FELHFCQUFBQyxjQUFBLEdBQUFBLGNBQUE7QUFDQTs7QUFFQSxpQkFBQXJCLFFBQUEsR0FBQTtBQUFBLGdCQUFBUyxLQUFBLHlEQUFBLEVBQUE7O0FBQ0FXLHFCQUFBWCxLQUFBLEdBQUFBLEtBQUE7QUFDQTs7QUFFQSxpQkFBQUUsaUJBQUEsR0FBQTtBQUNBLG1CQUFBUyxTQUFBQyxjQUFBO0FBQ0E7O0FBRUEsaUJBQUFYLFFBQUEsR0FBQTtBQUNBLG1CQUFBVSxTQUFBWCxLQUFBO0FBQ0E7O0FBRUEsaUJBQUFHLFdBQUEsR0FBQTtBQUNBLGdCQUFBN0IsTUFBQSxXQUFBO0FBQ0EsbUJBQUFvQyxNQUFBRyxHQUFBLENBQUF2QyxHQUFBLEVBQ0E4QixJQURBLENBQ0EsVUFBQVUsUUFBQSxFQUFBO0FBQ0F2Qix5QkFBQXVCLFNBQUFULElBQUE7QUFDQWY7QUFDQSx1QkFBQXdCLFNBQUFULElBQUE7QUFDQSxhQUxBLENBQUE7QUFNQTtBQUNBO0FBRUEsQ0FsREEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkcm9wQXBwJywgW1xyXG4gICAgICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAgICAgJ2Ryb3BBcHBDb250cm9sbGVycycsXHJcbiAgICAgICAgICAgICdkbmRMaXN0cycsXHJcbiAgICAgICAgICAgICduZ01hdGVyaWFsJ1xyXG4gICAgICAgIF0pXHJcbiAgICAgICAgLmNvbmZpZyhmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xyXG5cclxuICAgICAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJy8nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9cIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFydGlhbHMvZGV2Lmh0bWxcIixcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZHJvcENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2Ryb3AnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCcvcHJldmlldycsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL3ByZXZpZXdcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFydGlhbHMvcHJldmlldy5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3ByZXZpZXdDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdwcmV2aWV3J1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnZHJvcEFwcENvbnRyb2xsZXJzJywgW10pXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ2Ryb3BDb250cm9sbGVyJywgZHJvcENvbnRyb2xsZXIpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ3ByZXZpZXdDb250cm9sbGVyJywgcHJldmlld0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIGRyb3BDb250cm9sbGVyLiRpbmplY3QgPSBbJ3N0b3JhZ2UnXTtcclxuICAgIHByZXZpZXdDb250cm9sbGVyLiRpbmplY3QgPSBbJ3N0b3JhZ2UnLCAnJHN0YXRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gZHJvcENvbnRyb2xsZXIoc3RvcmFnZSkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0uZWxlbWVudHMgPSBbXTtcclxuICAgICAgICB2bS5ib3hlcyA9IFtdO1xyXG4gICAgICAgIHZtLnJlYWR5VG9QcmV2aWV3ID0gdHJ1ZTsgLy90cnVlIG1lYW5zIG5nLWRpc2FibGVkOiB0cnVlXHJcbiAgICAgICAgdm0ucHJldmlld0NoZWNrZXIgPSBwcmV2aWV3Q2hlY2tlcjtcclxuICAgICAgICB2bS5zYXZlSXRlbXNTdGF0ZSA9IHNhdmVJdGVtc1N0YXRlO1xyXG5cclxuICAgICAgICB2YXIgYm94ZXNBbW91bnQgPSA1O1xyXG5cclxuICAgICAgICAvL3NldCBhbW91bnQgb2YgcHJlZGVmaW5lZCBib3hlc1xyXG5cclxuICAgICAgICBnZXREYXRhKCk7XHJcblxyXG4gICAgICAgIHByZXZpZXdDaGVja2VyKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNhdmVJdGVtc1N0YXRlKCkge1xyXG5cclxuICAgICAgICAgICAgLy9zYXZlIGl0ZW1zIGluIHN0b3JhZ2Ugd2hlbiBwcmV2aWV3IGJ1dHRvbiBwcmVzc2VkLlxyXG5cclxuICAgICAgICAgICAgc3RvcmFnZS5zZXRQcmV2aWV3ZWRJdGVtcyh2bS5ib3hlcyk7XHJcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbXModm0uZWxlbWVudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHJldmlld0NoZWNrZXIoKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWx0ZXJlZCA9IHZtLmJveGVzLmZpbHRlcihlPT57XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGUubGVuZ3RoID09PSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiBhbCBvZmYgYm94ZXMgYXJlIGZpbGxlZFxyXG4gICAgICAgICAgICAvLyBlbmFibGUgcHJldmlldyBidXR0b24gaWYgbm8gZW1wdHkgYm94ZXNcclxuICAgICAgICAgICAgcmV0dXJuIHZtLnJlYWR5VG9QcmV2aWV3ID0gZmlsdGVyZWQubGVuZ3RoICE9PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0Qm94ZXMoY291bnQpIHtcclxuICAgICAgICAgICAgLy8gc2V0IGVtcHR5IGJveGVzIGZvciBlbGVtZW50c1xyXG4gICAgICAgICAgICBsZXQgdGVtcEFycmF5ID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGVtcEFycmF5W2ldID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdm0uYm94ZXMgPSB0ZW1wQXJyYXk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXREYXRhKCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBzdG9yYWdlLmdldEl0ZW1zKCk7XHJcbiAgICAgICAgICAgIGxldCBib3hlcyA9IHN0b3JhZ2UuZ2V0UHJldmlld2VkSXRlbXMoKTtcclxuICAgICAgICAgICAgc2V0Qm94ZXMoYm94ZXNBbW91bnQpO1xyXG5cclxuICAgICAgICAgICAgaWYoaXRlbXMubGVuZ3RoID4gMCB8fCBib3hlcy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgIC8vY2hlY2sgaWYgZWxlbWVudHMgYWxyZWFkeSBleGlzdHMsIHNldCB0aGVtIGZyb20gc3RvcmFnZVxyXG4gICAgICAgICAgICAgICAgdm0uZWxlbWVudHMgPSBpdGVtcztcclxuICAgICAgICAgICAgICAgIHZtLmJveGVzID0gYm94ZXM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vb3RoZXJ3aXNlIHByb2Nlc3NlZCByZXF1ZXN0IGZyb20gc2VydmVyXHJcbiAgICAgICAgICAgIHN0b3JhZ2UuZ2V0QXJ0aWNsZXMoKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdm0uZWxlbWVudHMgPSBkYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXZpZXdDb250cm9sbGVyKHN0b3JhZ2UsICRzdGF0ZSkge1xyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcbiAgICAgICAgdm0uYm94ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgc2V0UHJldmlld2VkQm94ZXMoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0UHJldmlld2VkQm94ZXMoKSB7XHJcbiAgICAgICAgICAgIGxldCBib3hlcyA9IHN0b3JhZ2UuZ2V0UHJldmlld2VkSXRlbXMoKTtcclxuICAgICAgICAgICAgLy9jaGVjayBpZiBib3hlcyhwcmV2aWV3ZWQgaXRlbXMpIGV4aXN0cyBpbiBzdG9yYWdlXHJcbiAgICAgICAgICAgIC8vaWYgJ3llcycgc2V0IHRoZW0gdG8gc2NvcGVcclxuICAgICAgICAgICAgLy9pZiBubyByZWRpcmVjdCB0byBzdGFydCBzdGF0ZVxyXG4gICAgICAgICAgICBib3hlcy5sZW5ndGggPiAwID8gdm0uYm94ZXMgPSBib3hlcyA6ICRzdGF0ZS5nbygnLycpO1xyXG4gICAgICAgICAgICB2bS5ib3hlcyA9IHN0b3JhZ2UuZ2V0UHJldmlld2VkSXRlbXMoKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdkcm9wQXBwQ29udHJvbGxlcnMnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdzdG9yYWdlJywgc3RvcmFnZSk7XHJcblxyXG4gICAgc3RvcmFnZS4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3JhZ2UoJGh0dHApIHtcclxuXHJcbiAgICAgICAgdmFyIHNlcnZpY2VzID0ge1xyXG4gICAgICAgICAgICBpdGVtczogW10sXHJcbiAgICAgICAgICAgIHByZXZpZXdlZEl0ZW1zOiBbXSxcclxuICAgICAgICAgICAgZ2V0QXJ0aWNsZXM6IGdldEFydGljbGVzLFxyXG4gICAgICAgICAgICBzZXRQcmV2aWV3ZWRJdGVtczogc2V0UHJldmlld2VkSXRlbXMsXHJcbiAgICAgICAgICAgIGdldFByZXZpZXdlZEl0ZW1zOiBnZXRQcmV2aWV3ZWRJdGVtcyxcclxuICAgICAgICAgICAgc2V0SXRlbXM6IHNldEl0ZW1zLFxyXG4gICAgICAgICAgICBnZXRJdGVtczogZ2V0SXRlbXNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXR1cm4gc2VydmljZXM7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNldFByZXZpZXdlZEl0ZW1zKHByZXZpZXdlZEl0ZW1zID0gW10pIHtcclxuICAgICAgICAgICAgc2VydmljZXMucHJldmlld2VkSXRlbXMgPSBwcmV2aWV3ZWRJdGVtc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc2V0SXRlbXMoaXRlbXMgPSBbXSkge1xyXG4gICAgICAgICAgICBzZXJ2aWNlcy5pdGVtcyA9IGl0ZW1zXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRQcmV2aWV3ZWRJdGVtcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlcnZpY2VzLnByZXZpZXdlZEl0ZW1zO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0SXRlbXMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXJ2aWNlcy5pdGVtc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QXJ0aWNsZXMoKSB7XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSAnL2FydGljbGVzJztcclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCh1cmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJdGVtcyhyZXNwb25zZS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRQcmV2aWV3ZWRJdGVtcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
