requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout/dist/knockout.debug',
        'jquery': '../bower_components/jquery/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'ratchet': '../bower_components/ratchet/dist/js/ratchet',
        'hammer':'../bower_components/hammer.js/hammer',
        'lodash': '../bower_components/lodash/lodash',
        'transitions/slideIn': 'libs/transitions/slideIn',
        'transitions/slideBack': 'libs/transitions/slideBack'
    },
    shim: {
        hammer: {
            exports: 'Hammer'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'durandal/composition', 'plugins/router'],  function (system, app, viewLocator, composition, router) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = "test";

    app.configurePlugins({
        observable: true,
        router:true,
        dialog: true,
        widget: true
    });

    app.configurePlugins({
        gesture:true,
        drawer:true,
        hScrollable:true
    }, 'libs/binds');

    var defaultStrategy = composition.defaultStrategy;
    composition.defaultStrategy = function (context) {
        if (context.router && context.router.transition){
            var transition = null;
            if (context.router.transition !== 'none'){
                transition = context.router.transition;
            }
            context.transition = transition;
        }
        return defaultStrategy(context);
    };

    var attached = router.attached;
    var attachedWrapper = function() {
        this.router && (this.router.transition = null);
        attached();
    };
    router.attached = attachedWrapper;

    var createChildRouter = router.createChildRouter;
    router.createChildRouter = function() {
        var childRouter = createChildRouter.call(this);
        childRouter.attached = attachedWrapper;
        return childRouter;
    }

    app.start().then(function() {
        // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        // Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        // Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell');
    });
});
