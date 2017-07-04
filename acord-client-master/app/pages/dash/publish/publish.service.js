(function () {
    'use strict';

    angular.module('app.dash')

        .service('PublishService', PublishService);

    PublishService.$inject = [
        '$state',
        'RequestService',
        'URLS'
    ];

    function PublishService($state, _request, URLS) {

        var service = {
            publishArticle: publishArticle
        };

        return service;

        /* ---------- IMPL ---------- */

        function publishArticle(vm) {

            vm.article.tags = [];

            angular.forEach(vm.selectedTags, function (tag) {
                vm.article.tags.push({name: tag});
            });

            vm.article.creationDate = new Date();

            var url = vm.article.type === 'Lesson' ? URLS.LESSONS : URLS.ARTICLES;

            _request.common(url, 'POST', vm.article)

                .then(function (response) {
                    $state.go('home');
                });
        }
    }
})();
