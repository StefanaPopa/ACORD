(function () {
    "use strict";

    angular.module("app")

        .service("UtilsService", UtilsService);

    UtilsService.$inject = ["$state"];

    function UtilsService($state) {

        var service = {
            isStateActive: isStateActive,
            getCurrentStateUrl: getCurrentStateUrl
        };

        return service;

        function isStateActive(state) {
            // TODO: optimize isActiveState calls - create event
            return $state.$current.name.indexOf(state) !== -1;
        }

        function getCurrentStateUrl() {

            var fullState = '#!';
            var states = $state.getCurrentPath();

            angular.forEach(states, function (subState) {

                var url = subState.state.url.pattern;

                // TODO: improve parameter detection & extraction with regex
                if (url.indexOf('{') > -1) {

                    var parameter = url.substring(2, url.length - 1);

                    // $injector is required in order to avoid circular dependency
                    var params = $injector.get('$stateParams');

                    fullState += '/' + params[parameter];
                } else {
                    fullState += subState.state.url;
                }
            });

            return fullState;
        }
    }
})();
