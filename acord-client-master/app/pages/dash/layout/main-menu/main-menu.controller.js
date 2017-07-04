(function () {
    "use strict";

    angular.module("app.dash")

        .controller("MainMenuCtrl", MainMenuController);

    MainMenuController.$inject = ["$scope", "$state", "MainMenuService", "UtilsService"];

    function MainMenuController($scope, $state, _mainMenu, _utils) {
        var vm = this;

        vm.$onInit = function () {
            
            _mainMenu.getMainMenu(vm);
    
            vm.state = $state.$current.name;
    
            vm.isStateActive = _utils.isStateActive;
        };

        /* watchers */

        $scope.$watch(function () {
            return $state.$current.name;
        }, function (newVal, oldVal) {
            vm.state = newVal;
        });
    }

})();
