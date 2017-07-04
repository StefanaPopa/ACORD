(function(){
    "use strict";

    angular.module("app.dash")

        .component("actionMenu", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.ACTION_MENU.LAYOUT;
            },
            controller: "ActionMenuCtrl",
            controllerAs: "vm"
        });
})();
