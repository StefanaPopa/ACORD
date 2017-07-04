/**
 * Created by stefanap on 17/06/2017.
 */

(function(){
    'use strict';

    angular.module("app")

        .run(AuthRun);


    AuthRun.$inject = [
        '$state',
        'PersistService',
        'KEYS'
    ];

    function AuthRun($state, _persist, KEYS){

        /* check TOKEN, require auth */
        // if(!_persist.getItem(KEYS.AUTH_TOKEN, 'sessionStorage')){
        //     $state.go('auth');
        // }
    }
})();
