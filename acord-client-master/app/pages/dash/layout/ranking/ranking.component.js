(function () {
    "use strict";

    angular.module("app.dash")

        .component("ranking", {
            replace: true,
            bindings: {
                rankType: '@'
            },

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.RANKING;
            },
            controller: "RankingCtrl",
            controllerAs: "vm"
        });
})();
