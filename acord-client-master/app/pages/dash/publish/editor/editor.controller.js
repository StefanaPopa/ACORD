(function () {
    'use strict';

    angular.module('app.dash')

        .controller('EditorCtrl', EditorController);

    EditorController.$inject = ['$scope', 'TINYMCE'];

    function EditorController($scope, TINYMCE) {
        var vm = this;

        /* scope variables */
        vm.tinymceOptions = TINYMCE.options;

        /* scope watches */
        vm.tinymceOptions.setup = function (editor) {
            editor.on('blur', function () {
                $scope.$emit('editorChange', vm.tinymceModel);
            });
        };
    }
})();
