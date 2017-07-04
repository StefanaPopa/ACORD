(function () {
    "use strict";

    angular.module("app.dash")

        .service("RankingService", RankingService);

    RankingService.$inject = ["$http", "RESOURCES"];

    function RankingService($http, RESOURCES) {

        var service = {
            getTop: getTop,
            getTopRated: getTopRated,
            getTopContributors: getTopContributors
        };

        return service;

        /* implementations */

        function getTop(vm) {
            var type = "ratings";

            if (vm.rankType === "contributors")
            {
                return getTopContributors(vm);
            }

            return getTopRated(vm);
        }

        function getTopRated(vm) {
            $http.get(RESOURCES.RANKING)
                .then(function (response) {
                    vm.ranking = response.data.top_rated;
                });
        }

        function getTopContributors(vm) {
            $http.get(RESOURCES.RANKING)
                .then(function (response) {
                    vm.ranking = response.data.top_contributors;
                });
        }
    }

})();
