(function () {
    "use strict";

    angular.module("app.dash")

        .constant("TABLE", {
            types: ["ratings", "contributors"],
            limitOptions: [5],
            options: {
                rowSelection: false,
                multiSelect: false,
                autoSelect: false,
                decapitate: false,
                largeEditDialog: false,
                boundaryLinks: false,
                limitSelect: false,
                pageSelect: false
            },
            query: {
                filter: {
                    name: ''
                },
                order: "score",
                limit: 5,
                page: 1
            }
        });

})();
