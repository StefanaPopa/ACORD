/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.globals')

           .service('BuilderService', BuilderService);


       BuilderService.$inject = [];

       function BuilderService(){

           var service = {
               answer: createAnswer,
               question: createQuestion
           };

           return service;

           /* ---------- IMPL ---------- */

           function createAnswer() {
               return {
                   textAnswer: "",
                   valueOfTruth: false
               };
           }

           function createQuestion() {
               return {
                   score: 0,
                   answers: [],
                   questionText: ""
               };
           }
       }
})();
