(function () {
    "use strict";

    angular.module("app.dash")

        .service("SideMenuService", SideMenuService);

    SideMenuService.$inject = [];

    function SideMenuService() {

        var service = {
            getSideMenu: getSideMenu,
            isChildState: isChildState,
            parentState: parentState,
            parentStateName: parentStateName
        };

        return service;

        /* implementations */

        function getSideMenu(state) {
            // TODO: load event from API, async

            if (state.indexOf("profile") != -1) {
                return [
                    {
                        name: "User",
                        state: ".profile.user"
                    },
                    {
                        name: "Results",
                        state: ".profile.results"
                    },
                    {
                        name: "Progress",
                        state: ".profile.progress"
                    }
                ];
            }

            if (state.indexOf("learn") != -1) {
                return [
                    {
                        name: "Knowledge",
                        state: ".learn.knowledge"
                    },
                    {
                        name: "WS",
                        state: ".learn.ws"
                    },
                    {
                        name: "Others",
                        state: ".learn.others"
                    }
                ];
            }

            if (state.indexOf("events") != -1) {
                return [
                    {
                        name: "Calendar",
                        state: ".events.calendar"
                    },
                    {
                        name: "My Events",
                        state: ".events.my-events"
                    }
                ];
            }

            if (state.indexOf("feedback") != -1) {
                return [
                    {
                        name: "Trainer",
                        state: ".feedback.trainer"
                    },
                    {
                        name: "Debater",
                        state: ".feedback.debater"
                    }
                ];
            }

            return [
                {
                    name: "HOME",
                    state: ".home"
                },
                {
                    name: "LEARN",
                    state: ".learn"
                },
                {
                    name: "EVENTS",
                    state: ".events"
                },
                {
                    name: "FEEDBACK",
                    state: ".feedback"
                },
                {
                    name: "PUBLISH",
                    state: ".publish"
                },
                {
                    name: "PROFILE",
                    state: ".profile"
                }
            ];
        }

        function isChildState(state) {
            return state.split(".").length > 2;
        }

        function parentState(state) {
            return state.substring(0, state.lastIndexOf("."));
        }

        function parentStateName(state) {
            var parent_states = parentState(state).split(".");

            return parent_states[parent_states.length - 1].toUpperCase();
        }
    }


})();
