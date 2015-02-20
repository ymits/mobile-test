define(['durandal/system', 'durandal/composition', 'jquery'], function(system, composition, $) {
    var fadeOutDuration = 100;

    /**
     * @class EntranceModule
     * @constructor
     */
    var slideIn = function(context) {
        return system.defer(function(dfd) {
            function endTransition() {
                dfd.resolve();
            }

            function scrollIfNeeded() {
                if (!context.keepScrollPosition) {
                    $(document).scrollTop(0);
                }
            }

            if (!context.child) {
                $(context.activeView).fadeOut(fadeOutDuration, endTransition);
            } else {


                var $newView = $(context.child);

                $newView.css('display','block');
                scrollIfNeeded();

                if(!context.activeView){
                    endTransition();
                    return;
                }
                var $currentView = $(context.activeView);
                $newView.detach().insertBefore($currentView);

                var currentView = $currentView.find('> .content')[0];
                var newView = $newView.find('> .content')[0];

                newView.classList.add('sliding-in', 'left');
                newView.classList.add('sliding');
                currentView.classList.add('sliding');

                var slideEnd = function () {
                    newView.removeEventListener('webkitTransitionEnd', slideEnd);
                    newView.classList.remove('sliding', 'sliding-in');
                    $(context.activeView).css('display','none');
                    currentView.classList.remove('sliding', 'sliding-in', 'right');
                    endTransition();
                };

                currentView.offsetWidth; // force reflow
                currentView.classList.add('right');
                newView.classList.remove('left');
                newView.addEventListener('webkitTransitionEnd', slideEnd);
            }
        }).promise();
    };

    return slideIn;
});
