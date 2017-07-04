(function () {
    "use strict";

    angular.module("app.dash")

        .controller("NextEventCtrl", NextEventController);

    NextEventController.$inject = ["NextEventService"];

    function NextEventController(_nextEvent) {
        var vm = this;

        vm.$onInit = function () {
            _nextEvent.getNextEvent(vm);
            vm.name = "Next Event";
        };

        vm.show = _nextEvent.show;
    }
})();
