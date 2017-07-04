(function () {
    "use strict";

    angular.module("app.dash")

        .controller("ActionMenuCtrl", ActionMenuController);


    ActionMenuController.$inject = ["UtilsService"];

    function ActionMenuController(_utils) {

        var vm = this;

        vm.$onInit = function () {

            vm.action_menu = [];

            vm.originatorEv = null;

            vm.openMenu = openMenu;

            vm.isStateActive = _utils.isStateActive;
        };

        /* scope functions*/

        function openMenu($mdOpenMenu, ev) {
            vm.originatorEv = ev;
            $mdOpenMenu(ev);
        }
    }
})();
