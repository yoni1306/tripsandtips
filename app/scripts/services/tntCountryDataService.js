'use strict';

tntServices.factory('tntCountryDataService', ['$resource',
    function($resource) {
        var activeCountryId = null;
        var countryResource = $resource('jsonData/:countryId.json', {}, {
            query: {
                method: 'GET',
                params: {
                    countryId: 'countries'
                },
                isArray: true
            }
        });
        var functions = {
            getCountryData: function(countryId) {
                if (countryId === undefined) {
                    countryId = activeCountryId;
                } else {
                    activeCountryId = countryId;
                }

                return countryResource.get({
                    countryId: countryId
                }).$promise;
            },
            getAllCountries: function() {
                return countryResource.query();
            }
        };
        return functions;
    }
]);