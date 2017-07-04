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

(function(){
    "use strict";

    angular.module("app.globals", []);
})();

(function(){
    "use strict";

    angular.module("app.globals")

        .constant("HEADERS", {
            AUTH_TOKEN: "auth_token"
        });
})();

/**
 * Created by stefanap on 17/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.globals')

        .constant('KEYS', {
            AUTH_TOKEN: 'auth_token'
        });
})();

(function(){
    "use strict";
        
    angular.module("app.globals")

        .constant("URL_ALIASES", [
            ["", "/dash/home"],
            ["/", "/dash/home"],
            ["/dash", "/dash/home"]
        ]);
})();

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

/**
 * Created by stefanap on 11/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.globals')

        .constant('ARTICLE', {
            title: '',          // provided, min length (4)    | String
            userId: '',         // from authenticated user     | ID
            date: null,         // generated on submit         | Date
            category: '',       // from constant               | String
            content: '',        // from editor                 | Html
            tags: [],           // user insert (chips) *       | []
            attachments: [],    // from editor *               | []
            visibility: {
                authorization: false, //                       | boolean
                groups: []      // from constant               | []
            },
            quiz: [{            // *
                question: '',   //                             | String
                answers: [{
                    content: '', // text of the anser           | String
                    valueOfTruth: false     //                  | Boolean
                }]
            }]
        });
})();

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

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.globals')

           .service('BuilderService', BuilderService);


       BuilderService.$inject = [];

       function BuilderService(){

           var service = {
               answer: createAnswer,
               question: createQuestion
           };

           return service;

           /* ---------- IMPL ---------- */

           function createAnswer() {
               return {
                   textAnswer: "",
                   valueOfTruth: false
               };
           }

           function createQuestion() {
               return {
                   score: 0,
                   answers: [],
                   questionText: ""
               };
           }
       }
})();

/**
 * Created by stefanap on 06/06/2017.
 */

(function(){
    "use strict";

    angular.module("app")

           .service("HttpInterceptorService", HttpInterceptorService);


       HttpInterceptorService.$inject = [
           /* angular services */
           "$q",

           /* custom services */
           "LoaderService",
           "UtilsService",

           /* data */
           "HEADERS"
       ];

       function HttpInterceptorService($q, _loader, _utils, HEADERS){

           var service = {
               request: request,
               requestError: requestError,
               response: response,
               responseError: responseError
           };

           return service;

           /* ---------- IMPL ---------- */
           function request(request) {

               _loader.show();

               // add query timestamp to files, check if they are in $templateCache
               // add AUTH_TOKEN from localStorage

               return request;
           }

           function requestError(rejection) {

               rejection = buildHttpError(rejection);

               return $q.reject(rejection);
           }

           function response(response) {

               // set user data from the header

               _loader.hide();

               return response;
           }

           function responseError(response) {

               _loader.hide();

               response = buildHttpError(response);

               handleDefaultErrorNotification(response);

               return $q.reject(response);
           }

           function buildHttpError(response) {

               var error = {
                   type: "HTTP",
                   method: response.config.method,
                   url: response.config.url,
                   status: response.status,
                   statusText: response.statusText,
                   state: _utils.getCurrentStateUrl()
               };

               if (response.hasOwnProperty("data") && response.data)
                   if (response.data.hasOwnProperty("message"))
                       error.message = response.data.message;

               return error;
           }

           function handleDefaultErrorNotification(error) {
               if(error.message){
                   /* Shows an alert to user containing message received from server. */
                   alert("Something went wrong..." + error.message);
               }
           }
       }
})();

(function(){
    "use strict";

    angular.module("app.globals")

           .service("LoaderService", LoaderService);


       LoaderService.$inject = [];

       function LoaderService(){

           // TODO: implement modal with progress circular
           // TODO: implement requests queue
           var service = {
               show: show,
               hide: hide

           };

           return service;

           /* ---------- IMPL ---------- */

           function show() {

           }

           function hide() {

           }
       }
})();

(function(){
    'use strict';

    angular.module('app.globals')

           .service('PersistService', PersistService);


        PersistService.$inject = ['localStorageService'];

        function PersistService(_localStorage){

            var service = {
                getItem: getItem,
                setItem: setItem,
                updateItem: updateItem
            };

            return service;

            /* ---------- IMPL ---------- */

            function getItem(key, storageType) {
                if(storageType) {
                    return _localStorage.get(key, storageType);
                }

                return _localStorage.get(key);
            }

            function setItem(key, item, storageType) {

                if(!storageType) {
                    _localStorage.set(key, item);
                }
                else {
                    _localStorage.set(key, item, storageType);
                }

            }

            function updateItem(key, newValue, storageType) {
                var currentValue = service.getItem(key, storageType);

                if (currentValue !== newValue) {
                    service.setItem(key, newValue, storageType);
                }
            }
       }
})();

/**
 * Created by stefanap on 06/06/2017.
 */

(function(){
    "use strict";
        
    angular.module("app.globals")
       
           .service("RequestService", RequestService);
        
        
       RequestService.$inject = ["$http", "$q", "$state"];
       
       function RequestService($http, $q, $state){
       
           var service = {
               common: common
           };

           return service;
               
           /* ---------- IMPL ---------- */
           function common(url, method, data, params) {
               var request = {
                   method: method,
                   url: url,
                   data: data,
                   params: params,
                   cache: false
               };

               var promise = $q(function(resolve, reject) {

                   $http(request)
                       .then(function successCallback(response) {
                           resolve(response.data);
                       }, function errorCallback(response) {

                           // auth error: try to better identify the auth error
                           if(response.status === 401)
                               $state.go('auth');

                           reject(response);
                       });
               });

               return promise;
           }
       }
})();

(function () {
    "use strict";

    angular.module("app")

        .service("UtilsService", UtilsService);

    UtilsService.$inject = ["$state"];

    function UtilsService($state) {

        var service = {
            isStateActive: isStateActive,
            getCurrentStateUrl: getCurrentStateUrl
        };

        return service;

        function isStateActive(state) {
            // TODO: optimize isActiveState calls - create event
            return $state.$current.name.indexOf(state) !== -1;
        }

        function getCurrentStateUrl() {

            var fullState = '#!';
            var states = $state.getCurrentPath();

            angular.forEach(states, function (subState) {

                var url = subState.state.url.pattern;

                // TODO: improve parameter detection & extraction with regex
                if (url.indexOf('{') > -1) {

                    var parameter = url.substring(2, url.length - 1);

                    // $injector is required in order to avoid circular dependency
                    var params = $injector.get('$stateParams');

                    fullState += '/' + params[parameter];
                } else {
                    fullState += subState.state.url;
                }
            });

            return fullState;
        }
    }
})();

/**
 * Created by stefanap on 17/06/2017.
 */

(function(){
    'use strict';

    angular.module("app")

        .run(AuthRun);


    AuthRun.$inject = [
        '$state',
        'PersistService',
        'KEYS'
    ];

    function AuthRun($state, _persist, KEYS){

        /* check TOKEN, require auth */
        // if(!_persist.getItem(KEYS.AUTH_TOKEN, 'sessionStorage')){
        //     $state.go('auth');
        // }
    }
})();

(function(){
    "use strict";

    angular.module("app")

        .run(RootRun);


    RootRun.$inject = ["$rootScope", "$state", "$stateParams"];

    function RootRun($rootScope, $state, $stateParams){
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
})();

(function () {
    "use strict";

    angular.module("app")

        .config(ErrorHandlingConfig)

        .factory("httpErrorInterceptorFactory", HttpErrorInterceptorFactory)

        .config(HttpErrorInterceptorConfig);


    ErrorHandlingConfig.$inject = ["$provide", "$logProvider", "$compileProvider", "$httpProvider"];

    function ErrorHandlingConfig($provide, $logProvider, $compileProvider, $httpProvider) {

        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache, private, no-store, max-age=0";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";

        $logProvider.debugEnabled(true);
        // Remove the scope annotation - improve performance
        $compileProvider.debugInfoEnabled(true);

        $provide.decorator("$exceptionHandler", ExceptionHandlingDecorator);
    }

    ExceptionHandlingDecorator.$inject = ["$delegate"];

    function ExceptionHandlingDecorator($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);

            var formatted = '';
            var properties = '';

            formatted += "Exception: \n" + exception.toString() + "\n\n";

            properties += (exception.message) ? "Message: \n" + exception.message + "\n\n" : '';
            properties += (exception.fileName) ? "File Name: \n" + exception.fileName + "\n\n" : '';
            properties += (exception.lineNumber) ? "Line Number: \n" + exception.lineNumber + "\n\n" : '';
            properties += (exception.stack) ? "Stack Trace: \n" + exception.stack + "\n\n" : '';

            if (properties) {
                formatted += properties;
            }

            alert(formatted);
        };
    }


    HttpErrorInterceptorFactory.$inject = ["$exceptionHandler", "$q"];

    function HttpErrorInterceptorFactory($exceptionHandler, $q) {
        return {
            responseError: function responseError(rejection) {
                // TODO: format message
                $exceptionHandler("An HTTP request error has occurred!" +
                    "\nMethod:      " + rejection.method +
                    "\nUrl:         " + rejection.url +
                    "\nStatus:      " + rejection.status +
                    "\nStatus text: " + rejection.statusText +
                    "\nState:       " + rejection.state);

                return $q.reject(rejection);
            }
        };
    }


    HttpErrorInterceptorConfig.$inject = ["$httpProvider"];

    function HttpErrorInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push("httpErrorInterceptorFactory");
    }

})();

(function () {
    "use strict";

    angular.module("app")

        .config(HttpInterceptorConfig);


    HttpInterceptorConfig.$inject = ["$httpProvider"];

    function HttpInterceptorConfig($httpProvider) {
        $httpProvider.interceptors.push("HttpInterceptorService");
    }
})();


(function () {
    'use strict';

    angular.module('app')

        .config(LocalStorageConfig);


    LocalStorageConfig.$inject = ['localStorageServiceProvider'];

    function LocalStorageConfig(localStorageServiceProvider) {

        localStorageServiceProvider

            .setPrefix('ACORD')

            .setStorageType('localStorage')

            .setDefaultToCookie(false)

            .setStorageCookie(45, '/', false)

            .setNotify(false, false);
    }

})();

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

(function(){
    "use strict";

    angular.module("app")

        .config(UrlAliasesConfig);


    UrlAliasesConfig.$inject = ["$urlRouterProvider", "URL_ALIASES"];

    function UrlAliasesConfig($urlRouterProvider, URL_ALIASES){

        angular.forEach(URL_ALIASES, function (alias) {
            $urlRouterProvider.when(alias[0], alias[1]);
        });

        // TODO: create 404 page
        $urlRouterProvider.otherwise("/");
    }
})();

(function(){
    "use strict";

    angular.module("app.widgets", []);
})();
(function () {
    "use strict";

    angular.module("app.widgets")

        .component("underConstruction", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.WIDGETS.UNDER_CONSTRUCTION;
            }
        });
})();

(function () {
    "use strict";

    angular.module("app.dash", []);
})();

(function () {
    "use strict";

    angular.module("app.public", []);
})();

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

(function () {
    "use strict";

    angular.module("app.dash")

        .constant("TINYMCE", {
            options: {
                selector: "textarea",
                plugins: "link image code autoresize",
                toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code",
                autoresize_bottom_margin: 30
            }
        });
})();

(function () {
    'use strict';

    angular.module('app.dash')

        .service('ArticleService', ArticleService);


    ArticleService.$inject = [
        /* vendors */
        '$sce',
        '$state',
        '$stateParams',

        /* custom */
        'RequestService',

        /* data */
        'URLS'
    ];

    function ArticleService($sce, $state, $stateParams, _request, URLS) {

        var service = {
            init: init
        };

        return service;

        /* ---------- IMPL ---------- */

        function init(vm) {


            if($stateParams.articleId || $stateParams.lessonId){

                var url;

                if($stateParams.articleId){
                    url = URLS.ARTICLES + '/' + $stateParams.articleId;
                } else {
                    url = URLS.LESSONS + '/' + $stateParams.lessonId;
                }

                _request.common(url, 'GET')
                    .then(function (response) {
                        vm.article = response;
                        vm.article.content = $sce.trustAsHtml(vm.article.content);
                        vm.type = 'lg';
                        vm.isLesson = vm.article.hasOwnProperty("quiz");
                    });

            } else {
                vm.article = angular.fromJson(vm.art);
                vm.article.content = $sce.trustAsHtml(vm.article.content);
                vm.showFull = false;
                vm.type = 'sm';
                vm.isLesson = vm.article.hasOwnProperty("quiz");
            }
        }
    }
})();

(function(){
    'use strict';

    angular.module('app.dash')

           .service('HomeService', HomeService);


       HomeService.$inject = ['RequestService', 'URLS'];

       function HomeService(_request, URLS){

           var service = {
               init: init
           };

           return service;

           /* ---------- IMPL ---------- */

           function init(vm) {

               _request.common(URLS.ARTICLES, 'GET')

                   .then(function (response) {
                       vm.articles = response;
                   });
           }
       }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .service("ActionMenuService", ActionMenuService);


    ActionMenuService.$inject = ["$http", "RESOURCES"];

    function ActionMenuService($http, RESOURCES) {

        var service = {
            getActionMenu: getActionMenu
        };

        return service;

        /* implementations */

        function getActionMenu(vm) {
            $http.get(RESOURCES.ACTION_MENU)
                .then(function (response) {
                    vm.action_menu = response.data.action_menu;
                });
        }
    }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .service("ProfileActionsService", ProfileActionsService);

    ProfileActionsService.$inject = ["$http", "RESOURCES"];

    function ProfileActionsService($http, RESOURCES) {

        var service = {
            getActions: getActions
        };

        return service;

        /* implementations */

        function getActions(vm) {
            $http.get(RESOURCES.ACTION_MENU_PROFILE)
                .then(function (response) {
                    vm.actions = response.data.actions;
                });
        }
    }


})();

(function () {
    "use strict";

    angular.module("app.dash")

        .service("MainMenuService", MainMenuService);

    MainMenuService.$inject = ["MAIN_MENU"];

    function MainMenuService(MAIN_MENU) {

        var service = {
            getMainMenu: getMainMenu
        };

        return service;

        /* implementations */

        function getMainMenu(vm) {
            vm.main_menu = MAIN_MENU;
        }
    }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .service("NextEventService", NextEventService);

    NextEventService.$inject = ["$mdDialog", "$http", "RESOURCES"];

    function NextEventService($mdDialog, $http, RESOURCES) {

        var service = {
            getNextEvent: getNextEvent,
            show: show
        };

        return service;

        /* implementations */

        function getNextEvent(vm) {
            vm.next_event = {
                "name": "Impromptu Debate",
                "location": "C.N. \"E. Racovita\", P2",
                "time": 1505000000000,
                "details": [
                    {
                        "title": "Motion",
                        "content": "AP ar crea un Debate app."
                    },
                    {
                        "title": "Participants",
                        "content": "Ionica, Popica"
                    }
                ]
            };
        }

        function show(ev) {

            $mdDialog.show({
                template: "<next-event-dialog></next-event-dialog>",
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            }).then(function (answer) {
                return "You said the information was " + answer + ".";
            }, function () {
                return "You cancelled the dialog.";
            });
        }
    }

})();

(function () {
    "use strict";

    angular.module("app.dash")

        .service("RankingService", RankingService);

    RankingService.$inject = ["$http", "RESOURCES"];

    function RankingService($http, RESOURCES) {

        var service = {
            getTop: getTop,
            getTopRated: getTopRated,
            getTopContributors: getTopContributors
        };

        return service;

        /* implementations */

        function getTop(vm) {
            var type = "ratings";

            if (vm.rankType === "contributors")
            {
                return getTopContributors(vm);
            }

            return getTopRated(vm);
        }

        function getTopRated(vm) {
            $http.get(RESOURCES.RANKING)
                .then(function (response) {
                    vm.ranking = response.data.top_rated;
                });
        }

        function getTopContributors(vm) {
            $http.get(RESOURCES.RANKING)
                .then(function (response) {
                    vm.ranking = response.data.top_contributors;
                });
        }
    }

})();

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

(function () {
    'use strict';

    angular.module('app.dash')

        .service('PublishService', PublishService);

    PublishService.$inject = [
        '$state',
        'RequestService',
        'URLS'
    ];

    function PublishService($state, _request, URLS) {

        var service = {
            publishArticle: publishArticle
        };

        return service;

        /* ---------- IMPL ---------- */

        function publishArticle(vm) {

            vm.article.tags = [];

            angular.forEach(vm.selectedTags, function (tag) {
                vm.article.tags.push({name: tag});
            });

            vm.article.creationDate = new Date();

            var url = vm.article.type === 'Lesson' ? URLS.LESSONS : URLS.ARTICLES;

            _request.common(url, 'POST', vm.article)

                .then(function (response) {
                    $state.go('home');
                });
        }
    }
})();

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

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .config(LearnStatesConfig);


       LearnStatesConfig.$inject = ['$stateProvider'];

       function LearnStatesConfig($stateProvider){

           $stateProvider

               .state('lesson', {
                   url: '/lesson/{lessonId}',
                   component: 'article',
                   parent: 'dash',
                   data: {pageTitle: 'Lesson'}
               })

               .state('quiz', {
                   url: '/lesson/{lessonId}/quiz',
                   component: 'quiz',
                   parent: 'dash',
                   data: {pageTitle: 'Quiz'}
               });
       }
})();

(function(){
    "use strict";

    angular.module("app")

            .config(PageStatesConfig);


        PageStatesConfig.$inject = ["$stateProvider"];

        function PageStatesConfig($stateProvider){

            $stateProvider

                .state("public", {
                    url: "/public",
                    component: "public",
                    data: {pageTitle: "Public"}
                })

                .state("dash", {
                    url: "/dash",
                    component: "dashLayout",
                    data: {pageTitle: "Dashboard"}
                });
        }
})();

(function(){
    'use strict';

    angular.module('app.public')

           .config(PublicStatesConfig);


        PublicStatesConfig.$inject = ['$stateProvider'];

        function PublicStatesConfig($stateProvider){

            $stateProvider

                .state("auth", {
                    url: "/auth",
                    component: "auth",
                    parent: 'public',
                    data: {pageTitle: "Auth"}
                });
        }
})();

(function () {
    'use strict';

    angular.module('app.dash')

        .filter('rankingFilter', RankingFilter);

    RankingFilter.$inject = [];

    function RankingFilter() {
        return function (input, search) {
            var output = [];

            angular.forEach(input, function (data) {
                if (data.name.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                    output.push(data);
                }
            });

            return output;
        };
    }
})();

(function () {
    'use strict';

    angular.module('app.dash')

        .controller('ArticleCtrl', ArticleController);


    ArticleController.$inject = [
        '$sce',
        '$state',
        '$mdDialog',
        'ArticleService'
    ];

    function ArticleController($sce, $state, $mdDialog, _article) {

        var vm = this;

        /* ---------- Life Cycle ---------- */

        vm.$onInit = function () {
            _article.init(vm);
        };

        /* ---------- CTRL ---------- */

        vm.openArticle = function () {
            if(vm.isLesson){
                $state.go("lesson", {'lessonId': vm.article.id});
            } else {
                $state.go("article", {'articleId': vm.article.id});
            }
        };

        vm.openQuiz = function (ev) {

            $mdDialog.show({
                parent: angular.element(document.body),
                targetEvent: ev,
                template: "<quiz></quiz>",
                clickOutsideToClose: true,
                locals: {
                    articleId: vm.article.id
                }
            });
        };
    }
})();

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .controller('QuizCtrl', QuizController);


       QuizController.$inject = [
           '$stateParams',
           'RequestService',
           'URLS'
       ];

       function QuizController($stateParams, _request, URLS){

           var vm = this;

           vm.$onInit = function () {

               var url = URLS.LESSONS + '/' + $stateParams.lessonId;

               _request.common(url, 'GET')

                   .then(function (response) {
                       vm.article = response;
                   });
           };
       }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("HomeCtrl", HomeController);

    HomeController.$inject = ['HomeService'];

    function HomeController(_home) {

        var vm = this;

        vm.$onInit = function () {

            _home.init(vm);

        };


        /* scope variables */
        vm.rank_types = ['ratings', 'contributors'];
    }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("ActionMenuCtrl", ActionMenuController);


    ActionMenuController.$inject = ["UtilsService"];

    function ActionMenuController(_utils) {

        var vm = this;

        vm.$onInit = function () {

            vm.action_menu = [];

            vm.originatorEv = null;

            vm.openMenu = openMenu;

            vm.isStateActive = _utils.isStateActive;
        };

        /* scope functions*/

        function openMenu($mdOpenMenu, ev) {
            vm.originatorEv = ev;
            $mdOpenMenu(ev);
        }
    }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("ProfileActionsCtrl", ProfileActionsController);

    ProfileActionsController.$inject = ["ProfileActionsService"];

    function ProfileActionsController(_profileActions) {

        var vm = this;

        _profileActions.getActions(vm);

        vm.originatorEv = null;

        vm.openMenu = openMenu;

        /* scope functions*/

        function openMenu($mdOpenMenu, ev) {
            vm.originatorEv = ev;
            $mdOpenMenu(ev);
        }
    }

})();

(function(){
    "use strict";

    angular.module("app.dash")

           .controller("DashLayoutCtrl", DashLayoutController);


       DashLayoutController.$inject = [];

       function DashLayoutController(){

           var vm = this;

           vm.$onInit = function () {
               //...
           };
       }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("MainMenuCtrl", MainMenuController);

    MainMenuController.$inject = ["$scope", "$state", "MainMenuService", "UtilsService"];

    function MainMenuController($scope, $state, _mainMenu, _utils) {
        var vm = this;

        vm.$onInit = function () {
            
            _mainMenu.getMainMenu(vm);
    
            vm.state = $state.$current.name;
    
            vm.isStateActive = _utils.isStateActive;
        };

        /* watchers */

        $scope.$watch(function () {
            return $state.$current.name;
        }, function (newVal, oldVal) {
            vm.state = newVal;
        });
    }

})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("NextEventDialogCtrl", NextEventDialogController);


    NextEventDialogController.$inject = ["$mdDialog", "NextEventService"];

    function NextEventDialogController($mdDialog, _nextEvent) {
        var vm = this;

        vm.$onInit = function () {
            _nextEvent.getNextEvent(vm);
        };


        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("NextEventCtrl", NextEventController);

    NextEventController.$inject = ["NextEventService"];

    function NextEventController(_nextEvent) {
        var vm = this;

        vm.$onInit = function () {
            _nextEvent.getNextEvent(vm);
            vm.name = "Next Event";
        };

        vm.show = _nextEvent.show;
    }
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("RankingCtrl", RankingController);

    RankingController.$inject = ["RankingService", "TABLE"];

    function RankingController(RankingService, TABLE) {
        var vm = this;

        /* init */
        RankingService.getTop(vm);

        /* scope variables */
        vm.rank_types = TABLE.types;

        vm.limitOptions = TABLE.limitOptions;

        vm.options = TABLE.options;

        vm.query = TABLE.query;
    }

})();

(function () {
    "use strict";

    angular.module("app.dash")

        .controller("SideMenuCtrl", SideMenuController);


    SideMenuController.$inject = ["$scope", "$state", "SideMenuService", "UtilsService"];

    function SideMenuController($scope, $state, _sideMenu, _utils) {

        var vm = this;

        vm.$onInit = function () {
            vm.state = $state.$current.name;

            vm.side_menu = _sideMenu.getSideMenu(vm.state);

            vm.isStateActive = _utils.isStateActive;

            vm.parentState = _sideMenu.parentState;

            vm.parentStateName = _sideMenu.parentStateName;

            vm.isChildState = _sideMenu.isChildState;
        };

        /* watchers */

        $scope.$watch(function () {
            return $state.$current.name;
        }, function (newVal, oldVal) {
            vm.state = newVal;
            vm.side_menu = _sideMenu.getSideMenu(vm.state);
        });
    }


})();

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .controller('LearnCtrl', LearnController);


       LearnController.$inject = ['RequestService', 'URLS'];

       function LearnController(_request, URLS){

           var vm = this;

           vm.$onInit = function () {

               _request.common(URLS.LESSONS, 'GET')

                   .then(function (response) {
                       vm.articles = response;
                   });
           }
       }
})();

(function () {
    'use strict';

    angular.module('app.dash')

        .controller('EditorCtrl', EditorController);

    EditorController.$inject = ['$scope', 'TINYMCE'];

    function EditorController($scope, TINYMCE) {
        var vm = this;

        /* scope variables */
        vm.tinymceOptions = TINYMCE.options;

        /* scope watches */
        vm.tinymceOptions.setup = function (editor) {
            editor.on('blur', function () {
                $scope.$emit('editorChange', vm.tinymceModel);
            });
        };
    }
})();

(function () {
    'use strict';

    angular.module('app.dash')

        .controller('PublishCtrl', PublishController);


    PublishController.$inject = [
        '$scope',
        'PublishService',
        'RequestService',
        'URLS'
    ];

    function PublishController($scope, _publish, _request, URLS) {

        var vm = this;

        vm.$onInit = function () {

            vm.quiz = [];
            vm.visibility = ['public', 'private'];
            vm.tags = ['social', 'economy', 'policy'];
            vm.searchText = null;
            vm.selectedTags = [];
            vm.autocompleteRequireMatch = false;
            vm.articleTypes = ['Article', 'Lesson'];
            vm.article = {
                author: 1,
                creationDate: new Date(),
                content: "",
                title: "",
                privacy: "",
                tags: [],
                type: "Lesson"
            };

            _request.common(URLS.CATEGORIES, 'GET')
                .then(function (response) {
                    vm.articleCategories = response;
                });
        };


        /* ---------- PROPERTIES ---------- */

        vm.publishArticle = function () {
            _publish.publishArticle(vm);
        };

        vm.transformChip = function (chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return chip;
        };

        vm.querySearch = function(query) {
            var results = query ? vm.tags.filter(createFilterFor(query)) : [];
            return results;

            /* ---------- IMPL ---------- */

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(tags) {
                    return (tags.indexOf(lowercaseQuery) === 0);
                };

            }
        };

        /* listeners */
        $scope.$on('editorChange', function (event, args) {
            vm.article.content = args;
        });
    }
})();

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

           .controller('QuizEditorCtrl', QuizEditorController);


       QuizEditorController.$inject = ['BuilderService'];

       function QuizEditorController(_builder){

           var vm = this;

           vm.$onInit = function () {
               if(!vm.quiz)
                   vm.quiz = [];
           };

           vm.addAnswer = function (question) {
               question.answers.push(_builder.answer());
           };

           vm.deleteAnswer = function (articleNr, questionNr) {
               vm.quiz[questionNr].answers.splice(articleNr, 1);
           };


           vm.addQuestion = function () {
               vm.quiz.push(_builder.question());
           };

           vm.deleteQuestion = function (questionNr) {
               vm.quiz.splice(questionNr, 1);
           };
       }
})();

/**
 * Created by stefanap on 10/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.public')

           .controller('AuthCtrl', AuthController);


        AuthController.$inject = ['$httpParamSerializer', 'RequestService', 'URLS'];

        function AuthController($httpParamSerializer, _request, URLS){

            var vm = this;

            vm.$onInit = function () {
                // ...
            };

            vm.auth = function () {

                var url = URLS.AUTH + '?' + $httpParamSerializer({
                    username: vm.username,
                    password: vm.password
                });

                _request.common(URLS.ARTICLES, 'GET');
            };
        }
})();

(function () {
    "use strict";

    angular.module("app.public")

        .controller("PublicCtrl", PublicController);


    PublicController.$inject = [];

    function PublicController() {

        var vm = this;
    }
})();

(function(){
    'use strict';

    angular.module('app.dash')

        .component('article', {
            replace: true,
            bindings: {
                art: '@'
            },

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.ARTICLE;
            },
            controller: 'ArticleCtrl',
            controllerAs: 'vm'
        });
})();

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('quiz', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.QUIZ;
            },
            controller: 'QuizCtrl',
            controllerAs: 'vm'
        });
})();

/**
 * Created by stefanap on 05/06/2017.
 */

(function(){
    "use strict";

    angular.module("app.dash")

        .component("home", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.HOME.LAYOUT;
            },
            controller: "HomeCtrl",
            controllerAs: "vm"
        });
})();

(function(){
    "use strict";

    angular.module("app.dash")

        .component("actionMenu", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.ACTION_MENU.LAYOUT;
            },
            controller: "ActionMenuCtrl",
            controllerAs: "vm"
        });
})();

(function(){
    "use strict";

    angular.module("app.dash")

        .component("profileActions", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.ACTION_MENU.PROFILE_ACTIONS;
            },
            controller: "ProfileActionsCtrl",
            controllerAs: "vm"
        });
})();

(function(){
    "use strict";

    angular.module("app.dash")

        .component("dashLayout", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.LAYOUT;
            },
            controller: "DashLayoutCtrl",
            controllerAs: "vm"
        });
})();

(function(){
    "use strict";

    angular.module("app.dash")

        .component("mainMenu", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.MAIN_MENU;
            },
            controller: "MainMenuCtrl",
            controllerAs: "vm"
        });
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .component("nextEventDialog", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.NEXT_EVENT_DIALOG;
            },
            controller: "NextEventDialogCtrl",
            controllerAs: "vm"
        });
})();

(function(){
    "use strict";

    angular.module("app.dash")

        .component("nextEvent", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.NEXT_EVENT;
            },
            controller: "NextEventCtrl",
            controllerAs: "vm"
        });
})();

(function () {
    "use strict";

    angular.module("app.dash")

        .component("ranking", {
            replace: true,
            bindings: {
                rankType: '@'
            },

            templateUrl: function (VIEWS){
                return VIEWS.DASH.LAYOUT.RANKING;
            },
            controller: "RankingCtrl",
            controllerAs: "vm"
        });
})();

(function(){
    "use strict";

    angular.module("app.dash")

        .component("sideMenu", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LAYOUT.SIDE_MENU;
            },
            controller: "SideMenuCtrl",
            controllerAs: "vm"
        });

})();

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('learn', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.LEARN;
            },
            controller: 'LearnCtrl',
            controllerAs: 'vm'
        });
})();

/**
 * Created by stefanap on 11/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('editor', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS){
                return VIEWS.DASH.EDITOR;
            },
            controller: 'EditorCtrl',
            controllerAs: 'vm'
        });
})();

/**
 * Created by stefanap on 11/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('publish', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.PUBLISH.LAYOUT;
            },
            controller: 'PublishCtrl',
            controllerAs: 'vm'
        });
})();

/**
 * Created by stefanap on 02/07/2017.
 */

(function(){
    'use strict';

    angular.module('app.dash')

        .component('quizEditor', {
            replace: true,
            bindings: {
                quiz: '='
            },

            templateUrl: function (VIEWS) {
                return VIEWS.DASH.PUBLISH.QUIZ_EDITOR;
            },
            controller: 'QuizEditorCtrl',
            controllerAs: 'vm'
        });
})();

/**
 * Created by stefanap on 10/06/2017.
 */

(function(){
    'use strict';

    angular.module('app.public')

        .component('auth', {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.PUBLIC.AUTH;
            },
            controller: 'AuthCtrl',
            controllerAs: 'vm'
        });
})();

(function(){
    "use strict";

    angular.module("app.public")

        .component("public", {
            replace: true,
            bindings: {},

            templateUrl: function (VIEWS) {
                return VIEWS.PUBLIC.LAYOUT;
            },
            controller: "PublicCtrl",
            controllerAs: "vm"
        });
})();
