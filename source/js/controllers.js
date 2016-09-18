(function () {
    'use strict';

    angular
        .module('dropAppControllers', [])
        .controller('dropController', dropController)
        .controller('previewController', previewController);

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
            let filtered = vm.boxes.filter(e=>{
                    return e.length === 0;
        });
            // check if al off boxes are filled
            // enable preview button if no empty boxes
            return vm.readyToPreview = filtered.length !== 0;
        }

        function setBoxes(count) {
            // set empty boxes for elements
            let tempArray = [];
            for (let i = 0; i < count; i++) {
                tempArray[i] = [];
            }
            vm.boxes = tempArray;
        }

        function getData() {
            let items = storage.getItems();
            let boxes = storage.getPreviewedItems();
            setBoxes(boxesAmount);

            if(items.length > 0 || boxes.length > 0){
                //check if elements already exists, set them from storage
                vm.elements = items;
                vm.boxes = boxes;
                return;
            }

            //otherwise processed request from server
            storage.getArticles()
                .then(data => {
                return vm.elements = data;
        });
        }

    }


    function previewController(storage, $state) {
        var vm = this;
        vm.boxes = [];

        setPreviewedBoxes();

        function setPreviewedBoxes() {
            let boxes = storage.getPreviewedItems();
            //check if boxes(previewed items) exists in storage
            //if 'yes' set them to scope
            //if no redirect to start state
            boxes.length > 0 ? vm.boxes = boxes : $state.go('/');
            vm.boxes = storage.getPreviewedItems();
        }


    }
})();