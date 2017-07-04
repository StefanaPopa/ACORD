(function () {
    'use strict';

    angular.module('app.dash')

        .filter('rankingFilter', RankingFilter);

    RankingFilter.$inject = [];

    function RankingFilter() {
        return function (input, search) {
            var output = [];

            angular.forEach(input, function (data) {
                if (data.name.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                    output.push(data);
                }
            });

            return output;
        };
    }
})();
