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
            let filtered = $scope.boxes.filter(e=>{
                    return e.length === 0;
        });
            // check if al off boxes are filled
            // enable preview button if no empty boxes
            return $scope.readyToPreview = filtered.length !== 0;
        }

        function setBoxes(count) {
            // set empty boxes for elements
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
                //check if elements already exists, set them from storage
                $scope.elements = items;
                $scope.boxes = boxes;
                return;
            }

            //otherwise processed request from server
            storage.getArticles()
                .then(data => {
                return $scope.elements = data;
        });
        }

    }


    function previewController($scope, storage, $state) {
        $scope.boxes = [];

        setPreviewedBoxes();

        function setPreviewedBoxes() {
            let boxes = storage.getPreviewedItems();
            //check if boxes(previewed items) exists in storage
            //if 'yes' set them to scope
            //if no redirect to start state
            boxes.length > 0 ? $scope.boxes = boxes : $state.go('/');
            $scope.boxes = storage.getPreviewedItems();
        }


    }
})();