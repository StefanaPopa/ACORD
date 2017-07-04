/**
 * Created by stefanap on 11/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('editor', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.EDITOR;
            },
            controller: 'EditorCtrl',
            controllerAs: 'vm'
        });
})();
