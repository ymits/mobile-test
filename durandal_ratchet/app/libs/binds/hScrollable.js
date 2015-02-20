define(['knockout', 'hammer', 'lodash', 'jquery', 'libs/binds/drawer'], function (ko, Hammer, _, $, drawer) {
    var ScrollTab = function (params) {
        this.router = params.router;
        this.pos(0);
        this.tabMinPos(0);
    };

    ScrollTab.prototype = {
        router: null,
        startPos: 0,
        pos: ko.observable(0),
        tabMinPos: ko.observable(0),

        onSwipe: function (ev) {
            if (ev.isFinal) {
                return;
            }
            this.moveTarget(ev.deltaX + this.startPos, ev.deltaX);
        },
        onSwipeEnd: function (ev) {
            this.startPos = this.pos();
        },
        onClickLeftNavBtn: function(){
            this.moveTarget(this.pos() - 100, 0);
        },
        onClickRightNavBtn: function(){
            this.moveTarget(this.pos() + 100, 0);
        },
        moveTarget: function(pos, deltaX){
            pos = Math.max(pos, this.tabMinPos());
            pos > 0 && (pos = 0);

            //this.scrollTarget.style.webkitTransform = 'translate3d(' + pos + 'px,0,0)';

            if (drawer.isLockSwipe && pos === 0) {
                drawer.lockSwipe(false, deltaX);
            } else if (!drawer.isLockSwipe && pos !== 0) {
                drawer.lockSwipe(true);
            }

            this.pos(pos);
        },
        hasSpaceLeft:function(){
            return this.pos() === this.tabMinPos();
        },
        hasSpaceRight: function(){
            return this.pos() === 0;
        }
    };

    var store = {};

    return {
        install: function () {
            ko.components.register('scroll-tab', {
                viewModel: {
                    createViewModel: function (params, componentInfo) {
                        var scrollTab = store[params.groupKey];
                        if(!scrollTab){
                            scrollTab = new ScrollTab(params);
                            store[params.groupKey] = scrollTab;
                        }

                        var hammertime = new Hammer(componentInfo.element);
                        hammertime.on('panleft panright', _.throttle(_.bind(scrollTab.onSwipe, scrollTab), 50));
                        hammertime.on('panend', _.bind(scrollTab.onSwipeEnd, scrollTab));

                        var checkVisible = setInterval(function(){
                            if(!$(componentInfo.element).length || !$(componentInfo.element).is(':visible')){
                                return;
                            }
                            clearInterval(checkVisible);

                            var tabWidth = componentInfo.element.querySelector('.nav-tab').scrollWidth;
                            var windowWidth = componentInfo.element.querySelector('.scroll-area').clientWidth;
                            scrollTab.tabMinPos(windowWidth - tabWidth);
                        },50);

                        return scrollTab;
                    }
                },
                template: '\
                    <a class="icon icon-left-nav pull-left" href="javascript:void(0)" data-bind="click:onClickLeftNavBtn, css: {hide:hasSpaceLeft()}"></a>\
                    <a class="icon icon-right-nav pull-right" href="javascript:void(0)" data-bind="click:onClickRightNavBtn, css: {hide:hasSpaceRight()}"></a>\
                    <div class="scroll-area">\
                        <ul class="nav-tab list-inline" data-bind="foreach: router().navigationModel, attr : {style:\'-webkit-transform:translate3d(\' + pos() + \'px,0,0)\'}">\
                            <li>\
                                <a data-bind="css: { active: isActive }, attr: { href: hash }, text: title"></a>\
                            </li>\
                        </ul>\
                    </div>'
            });
        }
    }
});
