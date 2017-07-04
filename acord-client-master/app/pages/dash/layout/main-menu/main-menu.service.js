(function () {
    "use strict";

    angular.module("app.dash")

        .service("MainMenuService", MainMenuService);

    MainMenuService.$inject = ["MAIN_MENU"];

    function MainMenuService(MAIN_MENU) {

        var service = {
            getMainMenu: getMainMenu
        };

        return service;

        /* implementations */

        function getMainMenu(vm) {
            vm.main_menu = MAIN_MENU;
        }
    }
})();
