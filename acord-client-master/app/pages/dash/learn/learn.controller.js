/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .controller('LearnCtrl', LearnController);


       LearnController.$inject = ['RequestService', 'URLS'];

       function LearnController(_request, URLS){

           var vm = this;

           vm.$onInit = function () {

               _request.common(URLS.LESSONS, 'GET')

                   .then(function (response) {
                       vm.articles = response;
                   });
           }
       }
})();
