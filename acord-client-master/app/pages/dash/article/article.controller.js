(function () {
    'use strict';

    angular.module('app.dash')

        .controller('ArticleCtrl', ArticleController);


    ArticleController.$inject = [
        '$sce',
        '$state',
        '$mdDialog',
        'ArticleService'
    ];

    function ArticleController($sce, $state, $mdDialog, _article) {

        var vm = this;

        /* ---------- Life Cycle ---------- */

        vm.$onInit = function () {
            _article.init(vm);
        };

        /* ---------- CTRL ---------- */

        vm.openArticle = function () {
            if(vm.isLesson){
                $state.go("lesson", {'lessonId': vm.article.id});
            } else {
                $state.go("article", {'articleId': vm.article.id});
            }
        };

        vm.openQuiz = function (ev) {

            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: ev,
                template: "<quiz></quiz>",
                clickOutsideToClose: true,
                locals: {
                    articleId: vm.article.id
                }
            });
        };
    }
})();
