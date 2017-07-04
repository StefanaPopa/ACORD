(function () {
    "use strict";

    angular.module("app")

        .config(HttpInterceptorConfig);


    HttpInterceptorConfig.$inject = ["$httpProvider"];

    function HttpInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push("HttpInterceptorService");
    }
})();

