(function(){
    'use strict';

    angular.module('app.public')

           .config(PublicStatesConfig);


        PublicStatesConfig.$inject = ['$stateProvider'];

        function PublicStatesConfig($stateProvider){

            $stateProvider

                .state("auth", {
                    url: "/auth",
                    component: "auth",
                    parent: 'public',
                    data: {pageTitle: "Auth"}
                });
        }
})();
