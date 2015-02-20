requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout.debug',
        'jquery': '../bower_components/jquery/jquery',
        'kendoui': '../bower_components/kendo-ui/js/kendo.ui.core.min'

    },
    shim: {
        kendoui: {
            deps: ['jquery'],
            exports: 'kendo'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/binder', 'kendoui'],  function (system, app, viewLocator, binder, kendo) {
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

        kendo.ns = "kendo-";
        binder.binding = function (obj, view) {
            //var view2 = new kendo.View(view, {});
            //console.log(view2);
            //kendo.bind(view);
            new kendo.mobile.Application(view, {rootNeeded: false});
        };

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});
