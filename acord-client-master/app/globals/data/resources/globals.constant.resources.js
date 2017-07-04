(function () {
    "use strict";
    
    var API_DEF = "app/resources/api-definitions/";
    var CONFIGS = "app/resources/configs/";

    angular.module("app.globals")

        .constant("RESOURCES", {
            ACTION_MENU_PROFILE:    CONFIGS + "action_menu_profile.json",
            MESSAGES:               API_DEF + "messages.json",
            NOTIFICATIONS:          API_DEF + "notifications.json",
            NEXT_EVENT:             API_DEF + "next_event.json",
            RANKING:                API_DEF + "ranking.json"
        });
})();
