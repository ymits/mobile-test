define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,
        isShowMenu: false,

        search: function() {
            app.showMessage("Not Implemented", "Error");
        },

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/home'},
                { route: 'choose-theater', moduleId: 'viewmodels/choose-theater'},
                { route: 'item1*detail', moduleId: 'viewmodels/item1/index'},
                { route: 'item2*detail', moduleId: 'viewmodels/item2/index'},
                { route: 'item3*detail', moduleId: 'viewmodels/item3/index'}
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});
