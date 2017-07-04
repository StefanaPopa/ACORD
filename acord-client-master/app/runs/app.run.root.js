(function(){
    "use strict";

    angular.module("app")

        .run(RootRun);


    RootRun.$inject = ["$rootScope", "$state", "$stateParams"];

    function RootRun($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
})();
