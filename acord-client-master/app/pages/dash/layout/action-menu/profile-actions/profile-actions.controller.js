(function () {
    "use strict";

    angular.module("app.dash")

        .controller("ProfileActionsCtrl", ProfileActionsController);

    ProfileActionsController.$inject = ["ProfileActionsService"];

    function ProfileActionsController(_profileActions) {

        var vm = this;

        _profileActions.getActions(vm);

        vm.originatorEv = null;

        vm.openMenu = openMenu;

        /* scope functions*/

        function openMenu($mdOpenMenu, ev) {
            vm.originatorEv = ev;
            $mdOpenMenu(ev);
        }
    }

})();
