(function(){
    "use strict";

    angular.module("app.dash")

        .component("nextEvent", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.NEXT_EVENT;
            },
            controller: "NextEventCtrl",
            controllerAs: "vm"
        });
})();
