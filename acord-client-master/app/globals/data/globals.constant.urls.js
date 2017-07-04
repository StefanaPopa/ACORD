(function () {
    "use strict";

    var host = 'http://127.0.0.1:8080';

    angular.module("app.globals")

        .constant("URLS", {
            AUTH: host + '/oauth/token?grant_type=password',
            ARTICLE: host + '/articles/{articleId}',
            ARTICLES: host + '/articles',
            CATEGORIES: host + '/articleCategories',
            LESSONS: host + '/lessons'
        });
})();
