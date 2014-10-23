'use strict';

tntControllers.controller('mapCtrl', ['$scope', '$http', 'tntEventEmitter', '$routeParams', 'tntMapService',
    function($scope, $http, EmitterService, $routeParams, MapService) {
        $scope.map = {
            center: {
                latitude: '',
                longitude: ''
            },
            zoom: 5,
            options: {
                scrollwheel: false
            },
            googleMap: {}, // this is filled when google map is initiated
            mapMarkers: [] // this is filled when the map service finish its work
        };

        //when googleMap has been initialized, init the service with it
        $scope.$watch('map', function(newValue, oldValue) {
        	var gmap = $scope.map.googleMap.getGMap();
            if (gmap){            	
            	MapService.initService(gmap);	
            }
        });       

        $scope.$on('mapServiceIsReady', function(event) {
            console.log('service ready has been called');
            // $scope.map.center = tntMapService.getMapCenter();
            // $scope.map.mapMarkers = tntMapService.getMapMarkers();
            // //init the google map object in the service.
            // tntMapService.setGMapObject = getMapObject();
        });

        // function getMapObject() {
        //     return $scope.map.googleMapObject.getGMap();
        // }

        // $scope.selectMarker = function(markerIndex) {
        // 	//marker.options.animation = google.maps.Animation.BOUNCE;
        // 	console.log(marker);
        //     DataUiBinder.selectMarker(marker);
        // };
    }
]);