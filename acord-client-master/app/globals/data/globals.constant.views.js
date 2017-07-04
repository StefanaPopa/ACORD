(function () {
    "use strict";

    angular.module("app.globals")

        .constant("VIEWS", {

            ABSTRACT: "app/pages/abstract.html",

            PUBLIC: {
                LAYOUT: "app/pages/public/public.html",
                AUTH: "app/pages/public/auth/auth.html"
            },

            DASH: {
                LAYOUT: {
                    LAYOUT: "app/pages/dash/layout/dash-layout.html",
                    ACTION_MENU: {
                        LAYOUT: "app/pages/dash/layout/action-menu/action-menu.html",
                        PROFILE_ACTIONS: "app/pages/dash/layout/action-menu/profile-actions/profile-actions.html"
                    },
                    MAIN_MENU: "app/pages/dash/layout/main-menu/main-menu.html",
                    NEXT_EVENT: "app/pages/dash/layout/next_event/next_event.html",
                    NEXT_EVENT_DIALOG: "app/pages/dash/layout/next_event/dialog/next_event_dialog.html",
                    RANKING: "app/pages/dash/layout/ranking/ranking.html",
                    SIDE_MENU: "app/pages/dash/layout/side-menu/side_menu.html"
                },

                ARTICLE: "app/pages/dash/article/article.html",

                HOME: {
                    LAYOUT: "app/pages/dash/home/home.html"
                },

                LEARN: 'app/pages/dash/learn/learn.html',

                PUBLISH: {
                    LAYOUT: "app/pages/dash/publish/publish.html",
                    QUIZ_EDITOR: "app/pages/dash/publish/quiz-editor/quiz-editor.html"
                },

                QUIZ: "app/pages/dash/article/quiz/quiz.html",

                EDITOR: "app/pages/dash/publish/editor/editor.html"
            },

            WIDGETS: {
                UNDER_CONSTRUCTION: "app/widgets/under_construction/under-construction.html"
            }
        });
})();
