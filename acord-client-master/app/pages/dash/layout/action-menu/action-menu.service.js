(function () {
    "use strict";

    angular.module("app.dash")

        .service("ActionMenuService", ActionMenuService);


    ActionMenuService.$inject = ["$http", "RESOURCES"];

    function ActionMenuService($http, RESOURCES) {

        var service = {
            getActionMenu: getActionMenu
        };

        return service;

        /* implementations */

        function getActionMenu(vm) {
            $http.get(RESOURCES.ACTION_MENU)
                .then(function (response) {
                    vm.action_menu = response.data.action_menu;
                });
        }
    }
})();
