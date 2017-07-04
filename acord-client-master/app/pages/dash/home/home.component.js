/**
 * Created by stefanap on 05/06/2017.
 */

(function(){
    "use strict";

    angular.module("app.dash")

        .component("home", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.HOME.LAYOUT;
            },
            controller: "HomeCtrl",
            controllerAs: "vm"
        });
})();
