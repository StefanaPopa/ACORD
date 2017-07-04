# To Do list: CLIENT 

[Angular Styleguides](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) 

0. tag attributes order:
    1. id
    2. class
    3. other attributes (including html pre-defined)
    4. angular attrbutes (ng-click, ng-hide, ng-show, etc.)
    5. layout, layout-align ...
    6. flex

1. Single Responsibility:
    - description: one component per file
    - [x] done 
        
2. ~~Immediately invoked function expression (IIFE)~~
    - tried to do: visibility limitation 

3. Avoid anonymous functions

4. controllerAs view syntax
    1. delegate business logic to service
        1. use service instead of factory
    ```javascript
        // service
        angular
            .module('app')
            .service('logger', logger);
        
        function logger() {
            var someValue = '';
            var service = {
                save: save,
                someValue: someValue,
                validate: validate
            };
            return service;
        
            ////////////
        
            function save() {
                /* */
            };
        
            function validate() {
                /* */
            };
        }
    ```

5. bindable members up top
    - put controller definition up top

6. Directives:
    - use controllerAs
    - bindToController = true, to bind outer scope to controller
    ```javascript
        angular
            .module('app')
            .directive('myExample', myExample);
        
        function myExample(){
            var directive = {
                restrict: 'EA',
                templateUrl: '...',
                scope: {
                    max: '='
                },
                controller: ..,
                controllerAs: .., 
                bindToController: true
            }
            
            return directive;
        }
    ```
    
    ```html
        <div>max={{vm.max}}<input ng-model="vm.max"/></div>
    ```

7. Resolving premises
    - resolve start up logic for a controller in an "active" function

8. Route resolve promises
    - when a controller depends on a promise to be resolved before
    the controller is activated, resolve those dependencies
    in **$routeProvider**, before controller logic execution
    
    - if you need to cancel a route before the controller is activated 
    use **route resolver**
    
    - **why?**:
        - controller might require data before it loads
        - that data may come from a promise via a custom factory / $http
            - **route resolver**: 
                - allows the promise to resolve before the controller logic
                - might take action accordingly
        - after promise solving, the view would kick right in
        - via ui-view, a "busy" animation can be displayed
        - if you want to get to the view without any checkpoint: 
            - use controller activate technique (nr 7)

    ```javascript
        /* even better */
        
        // route-config.js
        angular
            .module('app')
            .config(config);
        
        function config($routeProvider) {
            $routeProvider
                .when('/avengers', {
                    templateUrl: 'avengers.html',
                    controller: 'AvengersController',
                    controllerAs: 'vm',
                    resolve: {
                        moviesPrepService: moviesPrepService
                    }
                });
        }
        
        function moviesPrepService(movieService) {
            return movieService.getMovies();
        }
        
        // avengers.js
        angular
            .module('app')
            .controller('AvengersController', AvengersController);
        
        AvengersController.$inject = ['moviesPrepService'];
        function AvengersController(moviesPrepService) {
              var vm = this;
              vm.movies = moviesPrepService.movies;
        }
    ```

9. Handling exceptions with premises
    ```JavaScript
        /* recommended */
        function getCustomer(id) {
            return $http.get('/api/customer/' + id)
                .then(getCustomerComplete)
                .catch(getCustomerFailed);
        
            function getCustomerComplete(data, status, headers, config) {
                return data.data;
            }
        
            function getCustomerFailed(e) {
                var newMessage = 'XHR Failed for getCustomer'
                if (e.data && e.data.description) {
                  newMessage = newMessage + '\n' + e.data.description;
                }
                e.data.description = newMessage;
                logger.error(newMessage);
                return $q.reject(e);
            }
        }
    ```
    
10. Manually inject dependencies:
    - esp. on directives and route resolve: move the controller / service 
    function outside of directive / route resolve scope  

11. Avoid duplicated injection using Gulp's ng-annotate / ngStrictDi
    - use /*@ngInject*/

12. Exception Handling
    - **decorators**:
        - use a decorator at config time using $provide service,
            on the  $exceptionHandler service, 
            to perform custom actions
        ```javascript
            /* recommended */
            angular
                .module('blocks.exception')
                .config(exceptionConfig);
            
            exceptionConfig.$inject = ['$provide'];
            
            function exceptionConfig($provide) {
                $provide.decorator('$exceptionHandler', extendExceptionHandler);
            }
            
            extendExceptionHandler.$inject = ['$delegate', 'toastr'];
            
            function extendExceptionHandler($delegate, toastr) {
                return function(exception, cause) {
                    $delegate(exception, cause);
                    var errorData = {
                        exception: exception,
                        cause: cause
                    };
                    /**
                     * Could add the error to a service's collection,
                     * add errors to $rootScope, log errors to remote web server,
                     * or log locally. Or throw hard. It is entirely up to you.
                     * throw exception;
                     */
                    toastr.error(exception.msg, errorData);
                };
            }
        ```
    - **catchers**:
        - create a factory that exposes an interface to catch and handle exceptions
        ```javascript
            /* recommended */
            angular
                .module('blocks.exception')
                .factory('exception', exception);
            
            exception.$inject = ['logger'];
            
            function exception(logger) {
                var service = {
                    catcher: catcher
                };
                return service;
            
                function catcher(message) {
                    return function(reason) {
                        logger.error(message, reason);
                    };
                }
            }
        ```
    
    - route errors:
        - handle and log using $routeChangeError
        ```javascript
           /* recommended */
           var handlingRouteChangeError = false;
           
           function handleRoutingErrors() {
               /**
                * Route cancellation:
                * On routing error, go to the dash.
                * Provide an exit clause if it tries to do it twice.
                */
               $rootScope.$on('$routeChangeError',
                   function(event, current, previous, rejection) {
                       if (handlingRouteChangeError) { return; }
                       handlingRouteChangeError = true;
                       var destination = (current && (current.title ||
                           current.name || current.loadedTemplateUrl)) ||
                           'unknown target';
                       var msg = 'Error routing to ' + destination + '. ' +
                           (rejection.msg || '');
           
                       /**
                        * Optionally log using a custom service or $log.
                        * (Don't forget to inject custom service)
                        */
                       logger.warning(msg, [current]);
           
                       /**
                        * On routing error, go to another route/state.
                        */
                       $location.path('/');
           
                   }
               );
           }
        ```

13. Naming:
    - [name].[controller / service / directive / config].[more details / spec(for tests)].js

14. Application structure
    - Locate easily
    - Identify code easily
    - Flat structure
        - consider folder separation only after 7+ files
    - Try not to repeat yourself
    - Folders by features
    
    ? separate layouts to own folder

15. Startup Logic
    - **configuration**:
        - inject code into [module config](https://docs.angularjs.org/guide/module#module-loading-dependencies) 
            that must be configured before running the angular app: ex. providers and constants
            ```javascript
                angular
                    .module('app')
                    .config(configure);
                
                configure.$inject =
                    ['routerHelperProvider', 'exceptionHandlerProvider', 'toastr'];
                
                function configure (routerHelperProvider, exceptionHandlerProvider, toastr) {
                    exceptionHandlerProvider.configure(config.appErrorPrefix);
                    configureStateHelper();
                
                    toastr.options.timeOut = 4000;
                    toastr.options.positionClass = 'toast-bottom-right';
                
                    ////////////////
                
                    function configureStateHelper() {
                        routerHelperProvider.configure({
                            docTitle: 'NG-Modular: '
                        });
                    }
                }
            ```
            
    - **run blocks**:
        - code that needs to run when an application starts 
            shd be declared in a factory, exposed via a function, and injected in the run block 
            ```javascript
                angular
                    .module('app')
                    .run(runBlock);
                
                runBlock.$inject = ['authenticator', 'translator'];
                
                function runBlock(authenticator, translator) {
                    authenticator.initialize();
                    translator.initialize();
                }
            ```

16. $Wrapper services
    - YES `$document`,  NO `document`
    - YES `$window`,    NO `window`
    - YES `$timeout`,   NO `timeout`
    - YES `$interval`,  NO `interval`

17. Testing `check WebStorm default angular project`:
    - Write tests with stories
        - a set of tests for every story
        ```javascript
            it('should have Avengers controller', function() {
                // TODO
            });
            
            it('should find 1 Avenger when filtered by name', function() {
                // TODO
            });
            
            it('should have 10 Avengers', function() {
                // TODO (mock data?)
            });
            
            it('should return Avengers via XHR', function() {
                // TODO ($httpBackend?)
            });
            
            // and so on
        ```
    - Frameworks / Library:
        - unit testing:     Jasmine / mocha
        - assert library:   Chai / Mocha
        - Test runner:      Karma
        - stubbing/ spying: Sinon
        - headless browser: PhantomJS 
        - code analysis:    JSHint
    
    - Organizing:
        - each file having a ".spec" suffix - along the tested component
        - if the tests run across the code, create a separate 'tests' folder

18. Animations:
    - subtle
    - short
    - use animate.css

19. Comments  & Doc:
    - use jsDoc to semantically comment code

20. Constants:
    - Use constants for values that do not change and do not come from another service
    ```javascript
        // Constants used by the entire app
        angular
              .module('app.core')
            .constant('moment', moment);
      
        // Constants used only by the sales module
        angular
          .module('app.sales')
          .constant('events', {
              ORDER_CREATED: 'event_order_created',
              INVENTORY_DEPLETED: 'event_inventory_depleted'
          });
    ```
  
21. Routing:
    - follow [Angular UI Route tutorial](https://ui-router.github.io/ng1/)

22. Task Automation:
    - Use Gulp / Grunt for ex:
        - grabbing module files first

23. Tools:
    - JSHint
    - JSCS
