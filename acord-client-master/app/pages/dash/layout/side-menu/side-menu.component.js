(function(){
    "use strict";

    angular.module("app.dash")

        .component("sideMenu", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.SIDE_MENU;
            },
            controller: "SideMenuCtrl",
            controllerAs: "vm"
        });

})();
