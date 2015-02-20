
define(['knockout', 'hammer'], function(ko, Hammer) {
    return {
        install : function(){
            ko.bindingHandlers.gesture = {
                init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var eventsToHandle = valueAccessor() || {};
                    var hammertime = new Hammer(element, {});
                    ko.utils.objectForEach(eventsToHandle, function(eventName) {
                        if (typeof eventName == "string") {
                            var handlerFunction = eventsToHandle[eventName];
                            if (!handlerFunction){
                                return;
                            }
                            hammertime.on(eventName, function(event){
                                handlerFunction.call(viewModel, event);
                            });
                        }
                    });
                }
            };
        }
    };
});
