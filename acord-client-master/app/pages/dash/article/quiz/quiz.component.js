/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('quiz', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.QUIZ;
            },
            controller: 'QuizCtrl',
            controllerAs: 'vm'
        });
})();
