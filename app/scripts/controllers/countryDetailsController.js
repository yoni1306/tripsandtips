'use strict';

tntControllers.controller('countryDetailsCtrl', ['$scope', '$routeParams', 'tntCountryDataService', 'tntEventEmitter', 'tntMapService',
    function($scope, $routeParams, CountryDataService, EmitterService, MapService) {
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