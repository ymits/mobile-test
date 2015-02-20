define(['knockout', 'hammer', 'jquery', 'lodash'], function(ko, Hammer, $, _) {
    var ViewPager = function(params){
        this.router = params.router
    };

    ViewPager.prototype = {
        router: null
    };

    return {
        install : function(){
            ko.components.register('view-pager', {
                viewModel: {
                    createViewModel: function(params, componentInfo) {
                        var tabWidth = componentInfo.element.offsetWidth;
                        var windowWidth = window.innerWidth;
                        var tabMaxPos = Math.max(0, tabWidth-windowWidth);
                        var viewPager = new ViewPager(params);

                        var onSwipe = function(ev){

                            var pos = Math.min(ev.deltaX, tabMaxPos);
                            pos<0 && (pos = 0);

                            componentInfo.element.style.webkitTransform = 'translate3d(' + pos + 'px,0,0)';
                        };

                        var hammertime = new Hammer(componentInfo.element);
                        hammertime.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
                        hammertime.on('pan', _.throttle(onSwipe, 50));


                        return viewPager;
                    }
                }
            });
        }
    }
});
