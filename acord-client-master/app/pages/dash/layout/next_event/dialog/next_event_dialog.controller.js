(function () {
    "use strict";

    angular.module("app.dash")

        .controller("NextEventDialogCtrl", NextEventDialogController);


    NextEventDialogController.$inject = ["$mdDialog", "NextEventService"];

    function NextEventDialogController($mdDialog, _nextEvent) {
        var vm = this;

        vm.$onInit = function () {
            _nextEvent.getNextEvent(vm);
        };


        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

})();
