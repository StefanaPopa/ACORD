/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('quizEditor', {
            replace: true,
            bindings: {
                quiz: '='
            },

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.PUBLISH.QUIZ_EDITOR;
            },
            controller: 'QuizEditorCtrl',
            controllerAs: 'vm'
        });
})();
