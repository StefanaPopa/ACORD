(function () {
    "use strict";

    angular.module("app.dash")

        .controller("RankingCtrl", RankingController);

    RankingController.$inject = ["RankingService", "TABLE"];

    function RankingController(RankingService, TABLE) {
        var vm = this;

        /* init */
        RankingService.getTop(vm);

        /* scope variables */
        vm.rank_types = TABLE.types;

        vm.limitOptions = TABLE.limitOptions;

        vm.options = TABLE.options;

        vm.query = TABLE.query;
    }

})();
