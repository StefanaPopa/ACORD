/**
 * Created by stefanap on 06/06/2017.
 */

(function(){
    "use strict";
        
    angular.module("app.globals")
       
           .service("RequestService", RequestService);
        
        
       RequestService.$inject = ["$http", "$q", "$state"];
       
       function RequestService($http, $q, $state){
       
           var service = {
               common: common
           };

           return service;
               
           /* ---------- IMPL ---------- */
           function common(url, method, data, params) {
               var request = {
                   method: method,
                   url: url,
                   data: data,
                   params: params,
                   cache: false
               };

               var promise = $q(function(resolve, reject) {

                   $http(request)
                       .then(function successCallback(response) {
                           resolve(response.data);
                       }, function errorCallback(response) {

                           // auth error: try to better identify the auth error
                           if(response.status === 401)
                               $state.go('auth');

                           reject(response);
                       });
               });

               return promise;
           }
       }
})();
