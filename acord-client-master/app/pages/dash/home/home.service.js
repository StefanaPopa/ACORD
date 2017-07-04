(function(){
    'use strict';

    angular.module('app.dash')

           .service('HomeService', HomeService);


       HomeService.$inject = ['RequestService', 'URLS'];

       function HomeService(_request, URLS){

           var service = {
               init: init
           };

           return service;

           /* ---------- IMPL ---------- */

           function init(vm) {

               _request.common(URLS.ARTICLES, 'GET')

                   .then(function (response) {
                       vm.articles = response;
                   });
           }
       }
})();
