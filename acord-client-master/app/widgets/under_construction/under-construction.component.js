(function () {
    "use strict";

    angular.module("app.widgets")

        .component("underConstruction", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.WIDGETS.UNDER_CONSTRUCTION;
            }
        });
})();
