(function(){
    "use strict";

    angular.module("app", [
        // vendors
        "ngMaterial",
        "ngMdIcons",
        "angularMoment",
        "timer",
        "LocalStorageModule",
        "ui.router",
        "ui.tinymce",

        // app
        "app.globals",
        "app.widgets",
        "app.public",
        "app.dash"
    ]);
})();
