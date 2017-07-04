(function(){
    "use strict";
        
    angular.module("app.globals")

        .constant("URL_ALIASES", [
            ["", "/dash/home"],
            ["/", "/dash/home"],
            ["/dash", "/dash/home"]
        ]);
})();
