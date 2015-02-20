define(['plugins/router', 'libs/binds/drawer'], function (router, drawer) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId: 'viewmodels/stock_japan/equityBuyTrade',
            fromParent: true
        }).map([
            {route: 'a1', moduleId: 'viewmodels/choose-theater', title: '募集売出 (IPO/PO)', nav: true},
            {route: 'a2', moduleId: 'viewmodels/choose-theater', title: '募集売出 (IPO/PO)', nav: true}
        ]).buildNavigationModel();


    return {
        router: childRouter,

        onClickMovieItem:function(){
            router.transition = 'slideIn';
            router.navigate('#choose-theater');
        },

        onClickShowMenu: function(){
            drawer.openMenu();
        }
    };
});

