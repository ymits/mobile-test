define(['knockout', 'hammer', 'plugins/router', 'jquery', 'lodash'], function (ko, Hammer, router, $, _) {
    var Drawer = function (params) {
    };

    Drawer.prototype = {
        router: router,
        state: ko.observable(''),
        startPos: 0,
        pos: ko.observable(0),
        sideMenu: null,
        isLockSwipe: false,
        sideWidth: 0,
        sidePos: function () {
            return this.pos() * 10 / this.sideWidth - 10;
        },
        lockSwipe: function (isLockSwipe, deltaX) {
            this.isLockSwipe = isLockSwipe;
            this.startPos -= deltaX;
        },
        openMenu: function () {
            this.pos(this.sideWidth);
            this.startPos = this.sideWidth;
            this.state('opening');
        },
        closeMenu: function () {
            this.pos(0);
            this.startPos = 0;
            this.state('opening');
        },
        onSwipe: function (ev) {
            if (this.isLockSwipe || ev.isFinal) {
                return;
            }

            var distance = ev.deltaX + this.startPos;
            var pos = Math.min(distance, this.sideWidth);
            pos < 0 && (pos = 0);

            this.pos(pos);
        },
        onSwipeStart: function(ev) {
            this.state('opening');
        },
        onSwipeEnd: function (ev) {
            if (this.pos() > this.sideWidth / 2) {
                this.openMenu();
            } else {
                this.closeMenu();
            }
            drawer.lockSwipe(false, 0);
        },
        onAnimationEnd: function(ev) {
            if (this.pos() === this.sideWidth) {
                this.state('open');
            } else if (this.pos() === 0){
                this.state('');
            }
        },
        onMaskTap: function(){
            if (this.state() === 'open'){
                this.closeMenu();
            }
        }
    };

    var drawer = new Drawer();

    drawer.install = function () {
        ko.components.register('drawer', {
            viewModel: {
                createViewModel: function (params, componentInfo) {

                    var sideNavEl = componentInfo.element.querySelector('.side-nav');
                    var mainEl = componentInfo.element.querySelector('.main');
                    drawer.sideWidth = sideNavEl.offsetWidth;

                    var hammertime = new Hammer(componentInfo.element);
                    hammertime.on('panleft panright', _.throttle(_.bind(drawer.onSwipe, drawer), 50));
                    hammertime.on('panend', _.bind(drawer.onSwipeEnd, drawer));
                    hammertime.on('panstart', _.bind(drawer.onSwipeStart, drawer));

                    componentInfo.element.addEventListener('webkitTransitionEnd', _.bind(drawer.onAnimationEnd, drawer));

                    drawer.sideMenu = params.sideMenu;
                    return drawer;
                },

                onSwipe: function () {

                }
            },
            template:
                '<nav class="side-nav" data-bind="compose:sideMenu, attr : {style:\'-webkit-transform:translate3d(\' + sidePos() + \'px,0,0)\'}, css : state"></nav>\
                 <section class="main" data-bind="attr : {style:\'-webkit-transform:translate3d(\' + pos() + \'px,0,0)\'}, css : state">\
                    <div data-bind="router: { transition:\'entrance\', router:router }"></div>\
                    <div class="mask" data-bind="click:onMaskTap"></div>\
                 </section>'
        });
    };

    return drawer;
});
