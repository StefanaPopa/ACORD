(function () {
    "use strict";

    angular.module("app.dash")

        .service("ProfileActionsService", ProfileActionsService);

    ProfileActionsService.$inject = ["$http", "RESOURCES"];

    function ProfileActionsService($http, RESOURCES) {

        var service = {
            getActions: getActions
        };

        return service;

        /* implementations */

        function getActions(vm) {
            $http.get(RESOURCES.ACTION_MENU_PROFILE)
                .then(function (response) {
                    vm.actions = response.data.actions;
                });
        }
    }


})();
