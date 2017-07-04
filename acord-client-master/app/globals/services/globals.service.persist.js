(function(){
    'use strict';

    angular.module('app.globals')

           .service('PersistService', PersistService);


        PersistService.$inject = ['localStorageService'];

        function PersistService(_localStorage){

            var service = {
                getItem: getItem,
                setItem: setItem,
                updateItem: updateItem
            };

            return service;

            /* ---------- IMPL ---------- */

            function getItem(key, storageType) {
                if(storageType) {
                    return _localStorage.get(key, storageType);
                }

                return _localStorage.get(key);
            }

            function setItem(key, item, storageType) {

                if(!storageType) {
                    _localStorage.set(key, item);
                }
                else {
                    _localStorage.set(key, item, storageType);
                }

            }

            function updateItem(key, newValue, storageType) {
                var currentValue = service.getItem(key, storageType);

                if (currentValue !== newValue) {
                    service.setItem(key, newValue, storageType);
                }
            }
       }
})();
