/**
 * Created by stefanap on 11/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('publish', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.PUBLISH.LAYOUT;
            },
            controller: 'PublishCtrl',
            controllerAs: 'vm'
        });
})();
