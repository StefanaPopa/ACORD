(function () {
    "use strict";

    angular.module("app.dash")

        .controller("SideMenuCtrl", SideMenuController);


    SideMenuController.$inject = ["$scope", "$state", "SideMenuService", "UtilsService"];

    function SideMenuController($scope, $state, _sideMenu, _utils) {

        var vm = this;

        vm.$onInit = function () {
            vm.state = $state.$current.name;

            vm.side_menu = _sideMenu.getSideMenu(vm.state);

            vm.isStateActive = _utils.isStateActive;

            vm.parentState = _sideMenu.parentState;

            vm.parentStateName = _sideMenu.parentStateName;

            vm.isChildState = _sideMenu.isChildState;
        };

        /* watchers */

        $scope.$watch(function () {
            return $state.$current.name;
        }, function (newVal, oldVal) {
            vm.state = newVal;
            vm.side_menu = _sideMenu.getSideMenu(vm.state);
        });
    }


})();
