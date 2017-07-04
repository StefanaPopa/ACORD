(function(){
    "use strict";

    angular.module("app.dash")

        .component("profileActions", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.ACTION_MENU.PROFILE_ACTIONS;
            },
            controller: "ProfileActionsCtrl",
            controllerAs: "vm"
        });
})();
