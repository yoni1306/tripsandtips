'use strict';

tntServices.factory('tntEventEmitter', ['$rootScope',
    function($rootScope) {
        var functions = {
            selectMarker: function(markerId) {
                $rootScope.$broadcast('markerSelected', markerId);
            }
        };
        return functions;
    }
]);