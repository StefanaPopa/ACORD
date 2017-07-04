(function () {
    "use strict";

    angular.module("app.dash")

        .component("nextEventDialog", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.NEXT_EVENT_DIALOG;
            },
            controller: "NextEventDialogCtrl",
            controllerAs: "vm"
        });
})();
