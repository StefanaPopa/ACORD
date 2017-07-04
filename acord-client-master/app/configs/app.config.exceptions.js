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
