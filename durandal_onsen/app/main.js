requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout.debug',
        'jquery': '../bower_components/jquery/jquery',
        'onsenui': '../bower_components/onsenui/build/js/onsenui',
        'angular': '../bower_components/angular/angular'
    },
    shim: {
        onsenui: {
            deps: ['angular'],
            exports: 'ons'
        }
    }

});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/binder', 'onsenui'],  function (system, app, viewLocator, binder) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "durandal_onsen_test";

    app.configurePlugins({
        //observable: true,
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        ons.bootstrap();
        binder.binding = function (obj, view) {
            ons.compile(view);
        };

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });

});
