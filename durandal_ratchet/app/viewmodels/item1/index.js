define(['plugins/router'], function (router) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId: 'viewmodels/item1',
            fromParent: true
        }).map([
            {route: '1-1', moduleId: 'item1-1', title: 'item1-1', nav: true},
            {route: '1-2', moduleId: 'item1-2', title: 'item1-2', nav: true}
        ]).buildNavigationModel();

    define('router/item1', childRouter);
    return {
        router: childRouter
    };
});

