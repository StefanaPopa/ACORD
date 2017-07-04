/**
 * Created by stefanap on 10/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.public')

        .component('auth', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.PUBLIC.AUTH;
            },
            controller: 'AuthCtrl',
            controllerAs: 'vm'
        });
})();
