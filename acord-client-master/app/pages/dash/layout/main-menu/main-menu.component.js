(function(){
    "use strict";

    angular.module("app.dash")

        .component("mainMenu", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.MAIN_MENU;
            },
            controller: "MainMenuCtrl",
            controllerAs: "vm"
        });
})();
