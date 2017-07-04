(function(){
    "use strict";

    angular.module("app")

            .config(PageStatesConfig);


        PageStatesConfig.$inject = ["$stateProvider"];

        function PageStatesConfig($stateProvider){

            $stateProvider

                .state("public", {
                    url: "/public",
                    component: "public",
                    data: {pageTitle: "Public"}
                })

                .state("dash", {
                    url: "/dash",
                    component: "dashLayout",
                    data: {pageTitle: "Dashboard"}
                });
        }
})();
