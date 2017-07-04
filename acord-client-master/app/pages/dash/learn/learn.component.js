/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('learn', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LEARN;
            },
            controller: 'LearnCtrl',
            controllerAs: 'vm'
        });
})();
