requirejs.config({

    baseUrl: 'js/app',

    /* gets from baseUrl (+ no / at the beginning!) */
    paths: {
        node: '../../node_modules',
        lodash: '../../node_modules/lodash',
        models: 'models',
    }
});

requirejs(['app']);