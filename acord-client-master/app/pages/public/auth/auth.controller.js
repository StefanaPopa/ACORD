/**
 * Created by stefanap on 10/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.public')

           .controller('AuthCtrl', AuthController);


        AuthController.$inject = ['$httpParamSerializer', 'RequestService', 'URLS'];

        function AuthController($httpParamSerializer, _request, URLS){

            var vm = this;

            vm.$onInit = function () {
                // ...
            };

            vm.auth = function () {

                var url = URLS.AUTH + '?' + $httpParamSerializer({
                    username: vm.username,
                    password: vm.password
                });

                _request.common(URLS.ARTICLES, 'GET');
            };
        }
})();
