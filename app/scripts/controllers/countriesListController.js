'use strict';

tntControllers.controller('countriesListCtrl', ['$scope', 'tntCountryDataService',
    function($scope, CountryDataService) {
        $scope.countries = CountryDataService.getAllCountries();
    }
]);



