/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .controller('QuizEditorCtrl', QuizEditorController);


       QuizEditorController.$inject = ['BuilderService'];

       function QuizEditorController(_builder){

           var vm = this;

           vm.$onInit = function () {
               if(!vm.quiz)
                   vm.quiz = [];
           };

           vm.addAnswer = function (question) {
               question.answers.push(_builder.answer());
           };

           vm.deleteAnswer = function (articleNr, questionNr) {
               vm.quiz[questionNr].answers.splice(articleNr, 1);
           };


           vm.addQuestion = function () {
               vm.quiz.push(_builder.question());
           };

           vm.deleteQuestion = function (questionNr) {
               vm.quiz.splice(questionNr, 1);
           };
       }
})();
