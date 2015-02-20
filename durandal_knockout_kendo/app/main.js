requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout.debug',
        'jquery': '../bower_components/jquery/jquery',
        'kendo': '../bower_components/kendo-ui/js/kendo.ui.core.min',
        'knockout-kendo': '../bower_components/knockout-kendo/build/knockout-kendo'

    },
    shim: {
        kendo: {
            deps: ['jquery'],
            exports: 'kendo'
        },
        'knockout-kendo': {
            deps: ['kendo', 'knockout']
        }
    }

});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'knockout-kendo'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "test";

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});
