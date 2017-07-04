(function () {
    'use strict';

    angular.module('app.dash')

        .controller('PublishCtrl', PublishController);


    PublishController.$inject = [
        '$scope',
        'PublishService',
        'RequestService',
        'URLS'
    ];

    function PublishController($scope, _publish, _request, URLS) {

        var vm = this;

        vm.$onInit = function () {

            vm.quiz = [];
            vm.visibility = ['public', 'private'];
            vm.tags = ['social', 'economy', 'policy'];
            vm.searchText = null;
            vm.selectedTags = [];
            vm.autocompleteRequireMatch = false;
            vm.articleTypes = ['Article', 'Lesson'];
            vm.article = {
                author: 1,
                creationDate: new Date(),
                content: "",
                title: "",
                privacy: "",
                tags: [],
                type: "Lesson"
            };

            _request.common(URLS.CATEGORIES, 'GET')
                .then(function (response) {
                    vm.articleCategories = response;
                });
        };


        /* ---------- PROPERTIES ---------- */

        vm.publishArticle = function () {
            _publish.publishArticle(vm);
        };

        vm.transformChip = function (chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return chip;
        };

        vm.querySearch = function(query) {
            var results = query ? vm.tags.filter(createFilterFor(query)) : [];
            return results;

            /* ---------- IMPL ---------- */

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(tags) {
                    return (tags.indexOf(lowercaseQuery) === 0);
                };

            }
        };

        /* listeners */
        $scope.$on('editorChange', function (event, args) {
            vm.article.content = args;
        });
    }
})();
