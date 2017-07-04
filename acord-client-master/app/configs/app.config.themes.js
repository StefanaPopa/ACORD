(function () {
    "use strict";

    angular.module("app")

        .config(function ($mdThemingProvider) {

            $mdThemingProvider.theme("default")

                .primaryPalette("indigo", {
                    "default": "400",
                    "hue-1": "200",
                    "hue-2": "700",
                    "hue-3": "A100"
                })
                .accentPalette("amber", {
                    "default": "400",
                    "hue-1": "200",
                    "hue-2": "700",
                    "hue-3": "A100"
                })
                .warnPalette("deep-orange", {
                    "default": "400",
                    "hue-1": "200",
                    "hue-2": "700",
                    "hue-3": "A100"
                });
        });
})();
