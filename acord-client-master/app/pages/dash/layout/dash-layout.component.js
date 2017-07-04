(function(){
    "use strict";

    angular.module("app.dash")

        .component("dashLayout", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.LAYOUT;
            },
            controller: "DashLayoutCtrl",
            controllerAs: "vm"
        });
})();
