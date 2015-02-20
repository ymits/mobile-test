define(['router/item1'], function (router) {
    return {
        router: router,
        onClickBackBtn:function(){
            router.transition = 'slideBack';
            router.navigate('#item1/1-1');
        }
    };
});
