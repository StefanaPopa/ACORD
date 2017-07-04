(function () {
    "use strict";

    angular.module("app.dash")

        .controller("HomeCtrl", HomeController);

    HomeController.$inject = ['HomeService'];

    function HomeController(_home) {

        var vm = this;

        vm.$onInit = function () {

            _home.init(vm);

        };


        /* scope variables */
        vm.rank_types = ['ratings', 'contributors'];
    }
})();
