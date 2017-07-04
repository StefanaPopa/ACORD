(function () {
    'use strict';

    angular.module('app')

        .config(LocalStorageConfig);


    LocalStorageConfig.$inject = ['localStorageServiceProvider'];

    function LocalStorageConfig(localStorageServiceProvider) {

        localStorageServiceProvider

            .setPrefix('ACORD')

            .setStorageType('localStorage')

            .setDefaultToCookie(false)

            .setStorageCookie(45, '/', false)

            .setNotify(false, false);
    }

})();
