define(['plugins/router', 'libs/binds/drawer'], function (router, drawer) {

    return {
        navigate: function(url){
            drawer.closeMenu();
            router.transition = 'none';
            router.navigate(url);
        }
    };
});

