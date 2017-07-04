(function(){
    "use strict";

    angular.module("app.public")

        .component("public", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.PUBLIC.LAYOUT;
            },
            controller: "PublicCtrl",
            controllerAs: "vm"
        });
})();
