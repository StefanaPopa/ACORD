(function () {
    "use strict";

    angular.module("app.widgets")

        .constant("MAIN_MENU", [
            {
                "name": "HOME",
                "state": "home",
                "icon": {
                    "type": "home",
                    "size": 14,
                    "fill": "white"
                }
            },
            {
                "name": "PROFILE",
                "state": "profile",
                "icon": {
                    "type": "account_box",
                    "size": 14,
                    "fill": "white"
                }
            },
            {
                "name": "LEARN",
                "state": "learn",
                "icon": {
                    "type": "school",
                    "size": 14,
                    "fill": "white"
                }
            },
            {
                "name": "EVENTS",
                "state": "events",
                "icon": {
                    "type": "date_range",
                    "size": 14,
                    "fill": "white"
                }
            },
            {
                "name": "FEEDBACK",
                "state": "feedback",
                "icon": {
                    "type": "feedback",
                    "size": 14,
                    "fill": "white"
                }
            },
            {
                "name": "PUBLISH",
                "state": "publish",
                "icon": {
                    "type": "create",
                    "size": 14,
                    "fill": "white"
                }
            }
        ]);
})();
