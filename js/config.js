requirejs.config({

    baseUrl: 'js/app',

    /* gets from baseUrl (+ no / at the beginning!) */
    paths: {
        'node': '../../node_modules',
        'lodash': '../../node_modules/lodash/lodash',
        'jquery': '../../node_modules/jquery/dist/jquery',
        'models': 'models',
        'painter': 'view/painter'
    }

    //try deps?
});

requirejs(['app']);