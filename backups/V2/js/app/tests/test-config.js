requirejs.config({

    baseUrl: 'js/app/tests',

    /* gets from baseUrl (+ no / at the beginning!) */
    paths: {
        'node': '../../../node_modules',
        'lodash': '../../../node_modules/lodash',
        'models': '../models',
        'jasmine': '../../../node_modules/jasmine-core/lib/jasmine-core/jasmine',
        'jasmine-html': '../../../node_modules/jasmine-core/lib/jasmine-core/jasmine-html',
        'jasmine-boot': '../../../node_modules/jasmine-core/lib/jasmine-core/boot'
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



/** MAIN  (require tests here)*/
require([
    'baseObject-test'
]);