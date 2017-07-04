(function () {
    "use strict";

    angular.module("app.dash")

        .service("NextEventService", NextEventService);

    NextEventService.$inject = ["$mdDialog", "$http", "RESOURCES"];

    function NextEventService($mdDialog, $http, RESOURCES) {

        var service = {
            getNextEvent: getNextEvent,
            show: show
        };

        return service;

        /* implementations */

        function getNextEvent(vm) {
            vm.next_event = {
                "name": "Impromptu Debate",
                "location": "C.N. \"E. Racovita\", P2",
                "time": 1505000000000,
                "details": [
                    {
                        "title": "Motion",
                        "content": "AP ar crea un Debate app."
                    },
                    {
                        "title": "Participants",
                        "content": "Ionica, Popica"
                    }
                ]
            };
        }

        function show(ev) {

            $mdDialog.show({
                template: "<next-event-dialog></next-event-dialog>",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                return "You said the information was " + answer + ".";
            }, function () {
                return "You cancelled the dialog.";
            });
        }
    }

})();
