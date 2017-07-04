(function () {
    'use strict';

    angular.module('app.dash')

        .service('ArticleService', ArticleService);


    ArticleService.$inject = [
        /* vendors */
        '$sce',
        '$state',
        '$stateParams',

        /* custom */
        'RequestService',

        /* data */
        'URLS'
    ];

    function ArticleService($sce, $state, $stateParams, _request, URLS) {

        var service = {
            init: init
        };

        return service;

        /* ---------- IMPL ---------- */

        function init(vm) {


            if($stateParams.articleId || $stateParams.lessonId){

                var url;

                if($stateParams.articleId){
                    url = URLS.ARTICLES + '/' + $stateParams.articleId;
                } else {
                    url = URLS.LESSONS + '/' + $stateParams.lessonId;
                }

                _request.common(url, 'GET')
                    .then(function (response) {
                        vm.article = response;
                        vm.article.content = $sce.trustAsHtml(vm.article.content);
                        vm.type = 'lg';
                        vm.isLesson = vm.article.hasOwnProperty("quiz");
                    });

            } else {
                vm.article = angular.fromJson(vm.art);
                vm.article.content = $sce.trustAsHtml(vm.article.content);
                vm.showFull = false;
                vm.type = 'sm';
                vm.isLesson = vm.article.hasOwnProperty("quiz");
            }
        }
    }
})();
