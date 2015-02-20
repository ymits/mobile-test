define(['plugins/router'], function (router) {
    return {
        onClickBackBtn:function(){
            router.transition = 'slideBack';
            router.navigate('#');
        }
    };
});
