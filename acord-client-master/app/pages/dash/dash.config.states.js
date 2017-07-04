(function(){
    "use strict";

    angular.module("app.dash")

           .config(DashStatesConfig);


       DashStatesConfig.$inject = ["$stateProvider"];

       function DashStatesConfig($stateProvider){

           $stateProvider

                .state("home", {
                    url: "/home",
                    component: "home",
                    parent: "dash",
                    data: {pageTitle: "Home"}
                })

                .state("profile", {
                    url: "/profile",
                    component: "underConstruction",
                    parent: "dash",
                    data: {pageTitle: "Profile"}
                })

                .state("learn", {
                    url: "/learn",
                    component: "learn",
                    parent: "dash",
                    data: {pageTitle: "Learn"}
                })

                .state("feedback", {
                    url: "/feedback",
                    component: "underConstruction",
                    parent: "dash",
                    data: {pageTitle: "Feedback"}
                })

                .state("events", {
                    url: "/events",
                    component: "underConstruction",
                    parent: "dash",
                    data: {pageTitle: "Events"}
                })

               .state("publish", {
                    url: "/publish",
                    component: "publish",
                    parent: "dash",
                    data: {pageTitle: "Publish"}
                })

               .state("article", {
                   url: "/articles/{articleId}",
                   component: "article",
                   parent: "dash",
                   data: {pageTitle: "Article"}
               });
       }
})();
