/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .config(LearnStatesConfig);


       LearnStatesConfig.$inject = ['$stateProvider'];

       function LearnStatesConfig($stateProvider){

           $stateProvider

               .state('lesson', {
                   url: '/lesson/{lessonId}',
                   component: 'article',
                   parent: 'dash',
                   data: {pageTitle: 'Lesson'}
               })

               .state('quiz', {
                   url: '/lesson/{lessonId}/quiz',
                   component: 'quiz',
                   parent: 'dash',
                   data: {pageTitle: 'Quiz'}
               });
       }
})();
