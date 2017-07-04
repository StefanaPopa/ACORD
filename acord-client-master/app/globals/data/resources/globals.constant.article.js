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
