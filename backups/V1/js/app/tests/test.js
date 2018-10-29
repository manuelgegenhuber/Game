requirejs.config({

    baseUrl: 'js/app/tests',

    /* gets from baseUrl (+ no / at the beginning!) */
    paths: {
        'node': '../../../node_modules',
        'lodash': '../../../node_modules/lodash',
        'models': '../models',
        'jasmine': 'jasmine',
        'jasmine-html': 'jasmine-html',
        'jasmine-boot': 'boot'
    },

    /**Loads NON-AMD as AMD Modules + declares it's dependencies (optional return value too)*/
    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});



/** MAIN */
requirejs(['lodash/lodash', 'models/BaseObject'],
    function(_, BaseObject) {

        console.log('lodash!!: ', _);
        console.log('baseObject!!: ', BaseObject);


    }
);