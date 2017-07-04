/**
 * Created by stefanap on 06/06/2017.
 */

(function(){
    "use strict";

    angular.module("app")

           .service("HttpInterceptorService", HttpInterceptorService);


       HttpInterceptorService.$inject = [
           /* angular services */
           "$q",

           /* custom services */
           "LoaderService",
           "UtilsService",

           /* data */
           "HEADERS"
       ];

       function HttpInterceptorService($q, _loader, _utils, HEADERS){

           var service = {
               request: request,
               requestError: requestError,
               response: response,
               responseError: responseError
           };

           return service;

           /* ---------- IMPL ---------- */
           function request(request) {

               _loader.show();

               // add query timestamp to files, check if they are in $templateCache
               // add AUTH_TOKEN from localStorage

               return request;
           }

           function requestError(rejection) {

               rejection = buildHttpError(rejection);

               return $q.reject(rejection);
           }

           function response(response) {

               // set user data from the header

               _loader.hide();

               return response;
           }

           function responseError(response) {

               _loader.hide();

               response = buildHttpError(response);

               handleDefaultErrorNotification(response);

               return $q.reject(response);
           }

           function buildHttpError(response) {

               var error = {
                   type: "HTTP",
                   method: response.config.method,
                   url: response.config.url,
                   status: response.status,
                   statusText: response.statusText,
                   state: _utils.getCurrentStateUrl()
               };

               if (response.hasOwnProperty("data") && response.data)
                   if (response.data.hasOwnProperty("message"))
                       error.message = response.data.message;

               return error;
           }

           function handleDefaultErrorNotification(error) {
               if(error.message){
                   /* Shows an alert to user containing message received from server. */
                   alert("Something went wrong..." + error.message);
               }
           }
       }
})();
