(function(){
    "use strict";

    angular.module("app")

        .config(UrlAliasesConfig);


    UrlAliasesConfig.$inject = ["$urlRouterProvider", "URL_ALIASES"];

    function UrlAliasesConfig($urlRouterProvider, URL_ALIASES){

        angular.forEach(URL_ALIASES, function (alias) {
            $urlRouterProvider.when(alias[0], alias[1]);
        });

        // TODO: create 404 page
        $urlRouterProvider.otherwise("/");
    }
})();
