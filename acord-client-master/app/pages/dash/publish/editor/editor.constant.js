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
