(function(){
    'use strict';

    angular.module('app.dash')

        .component('article', {
            replace: true,
            bindings: {
                art: '@'
            },

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.ARTICLE;
            },
            controller: 'ArticleCtrl',
            controllerAs: 'vm'
        });
})();
