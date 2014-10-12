'use strict';

/* Controllers */

var tntControllers = angular.module('tntControllers', []);

tntControllers.controller('countriesListCtrl', ['$scope', 'CountryDataService',
    function($scope, CountryDataService) {
        $scope.countries = CountryDataService.getAllCountries();
    }
]);

tntControllers.controller('countryDetailsCtrl', ['$scope', '$routeParams', 'CountryDataService', 'DataUiBinder', 'tntMapService',
    function($scope, $routeParams, CountryDataService, DataUiBinder, tntMapService) {
        $scope.actions = null;
        $scope.currentDay = null;
        $scope.trip = null;
        $scope.lastSelectedMarkerId = null;

        CountryDataService.getCountryData($routeParams.countryId).then(function(country) {
            $scope.country = country;
            $scope.trip = $scope.country.trips[0];
            $scope.currentDay = $scope.trip.dayPlans[0];
            $scope.actions = $scope.currentDay.actions;
        });

        // $scope.$on('markerSelected', function(event, markerId) {
        //     // assign the loaded track as the 'current'
        //     if ($scope.lastSelectedMarkerId) {
        //         $scope.actions[$scope.lastSelectedMarkerId].class = 'text-normal';
        //     }
        //     $scope.lastSelectedMarkerId = markerId;
        //     $scope.actions[markerId].class = 'text-bold';
        // });

        // $scope.$on('tripSelected', function(event, tripId){

        // });
    }
]);

tntControllers.controller('mapCtrl', ['$scope', '$http', 'DataUiBinder', '$routeParams', 'tntMapService',
    function($scope, $http, DataUiBinder, $routeParams, tntMapService) {
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
            	tntMapService.initService(gmap);	
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