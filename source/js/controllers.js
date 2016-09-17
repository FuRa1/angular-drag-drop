(function () {
    'use strict';

    angular
        .module('dropAppControllers', [])
        .controller('dropController', dropController)
        .controller('previewController', previewController);

    dropController.$inject = ['$scope', 'storage'];
    previewController.$inject = ['$scope', 'storage', '$state'];

    function dropController($scope, storage) {

        $scope.elements = [];
        $scope.boxes = [];
        $scope.readyToPreview = true;
        $scope.previewChecker = previewChecker;
        $scope.saveItemsState = saveItemsState;

        var boxesAmount = 5;

        getData();
        previewChecker();

        function saveItemsState() {
            storage.setPreviewedItems($scope.boxes);
            storage.setItems($scope.elements);
        }

        function previewChecker() {
            let filtered = $scope.boxes.filter(e=>{
                return e.length === 0;
            });
            return $scope.readyToPreview = filtered.length !== 0;
        }

        function setBoxes(count) {
            let tempArray = [];
            for (let i = 0; i < count; i++) {
                tempArray[i] = [];
            }
            $scope.boxes = tempArray;
        }

        function getData() {
            let items = storage.getItems();
            let boxes = storage.getPreviewedItems();
            setBoxes(boxesAmount);

            if(items.length > 0 || boxes.length > 0){
                $scope.elements = items;
                $scope.boxes = boxes;
                return;
            }

            storage.getArticles()
                .then(data => {
                    return $scope.elements = data;
                });
        }

    }
    function previewController($scope, storage, $state) {
        $scope.boxes = [];

        setBoxes();

        function setBoxes() {
            let boxes = storage.getPreviewedItems();
            boxes.length > 0 ? $scope.boxes = boxes : $state.go('/');
            $scope.boxes = storage.getPreviewedItems();
        }


    }
})();