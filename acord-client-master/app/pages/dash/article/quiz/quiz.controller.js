/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .controller('QuizCtrl', QuizController);


       QuizController.$inject = [
           '$stateParams',
           'RequestService',
           'URLS'
       ];

       function QuizController($stateParams, _request, URLS){

           var vm = this;

           vm.$onInit = function () {

               var url = URLS.LESSONS + '/' + $stateParams.lessonId;

               _request.common(url, 'GET')

                   .then(function (response) {
                       vm.article = response;
                   });
           };
       }
})();
