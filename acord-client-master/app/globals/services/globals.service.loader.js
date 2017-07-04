(function(){
    "use strict";

    angular.module("app.globals")

           .service("LoaderService", LoaderService);


       LoaderService.$inject = [];

       function LoaderService(){

           // TODO: implement modal with progress circular
           // TODO: implement requests queue
           var service = {
               show: show,
               hide: hide

           };

           return service;

           /* ---------- IMPL ---------- */

           function show() {

           }

           function hide() {

           }
       }
})();
