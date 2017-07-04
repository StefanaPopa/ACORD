(function(){
    "use strict";

    angular.module("app.dash")

           .controller("DashLayoutCtrl", DashLayoutController);


       DashLayoutController.$inject = [];

       function DashLayoutController(){

           var vm = this;

           vm.$onInit = function () {
               //...
           };
       }
})();
