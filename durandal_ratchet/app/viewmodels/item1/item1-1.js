define(['router/item1', 'libs/binds/drawer'], function (router, drawer) {
    return {
        router: router,
        onClickMovieItem: function () {
            router.transition = 'slideIn';
            router.navigate('#item1/1-2');
        },

        onClickShowMenu: function () {
            drawer.openMenu();
        }
    };
});

