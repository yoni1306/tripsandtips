'use strict';

/* Services */

var tntServices = angular.module('tntServices', []);

tntServices.factory('CountryDataService', ['$resource',
    function($resource) {
        var activeCountryId = null;
        var countryResource = $resource('countries/:countryId.json', {}, {
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


tntServices.factory('tntMapService', ['$rootScope', '$q', '$timeout', 'CountryDataService',
    function($rootScope, $q, $timeout, CountryDataService) {
        var FIRST = '0';
        var geocoder = null;
        var country = null;
        var trips = null;
        var currentTrip = null;
        var dailyActions = null;
        var mapMarkers = [];
        var googleMap = null;
        var functions = {
            initService: function(gmapObj) {            	
                googleMap = gmapObj;
                CountryDataService.getCountryData().then(function(countryRes) {
                    console.log('in service ', countryRes);
                    country = countryRes;
                    trips = country.trips;
                    functions.initTrip(FIRST, FIRST);
                });
            },
            initTrip: function(tripId, dayPlanId) {
                currentTrip = trips[tripId];
                functions.initDay(dayPlanId);
            },
            initDay: function(dayPlanId) {
                dailyActions = currentTrip.dayPlans[dayPlanId].actions;
                console.log('dailyActions has been set ', dailyActions);
                functions.fixLocations();
            },
            setCountry: function(country) {
                this.country = country;
            },
            fixLocations: function() {
                var promises = [];
                var promise = null;
                //first of all, fix country location if needed.
                if (country.location.LatLng === undefined) {
                    promise = functions.getGeolocation(country.location.gps).then(
                        function(result) {
                            if (result) {
                                country.location.LatLng = result;
                                console.log('fixed country location ', result);
                            }
                        });
                    promises.push(promise);
                }
                //now fix all the rest of the locations.
                angular.forEach(dailyActions, function(value, key) {
                    //if it really requires a fix.
                    if (dailyActions[key].location.LatLng === undefined) {
                        promise = functions.getGeolocation(dailyActions[key].location.gps, key).then(
                            function(result) {
                                if (result) {
                                    dailyActions[result[0]].location.LatLng = result[1];
                                    console.log('fixed marker location ', result[1]);
                                }
                            });
                        promises.push(promise);
                    }
                });

                $q.all(promises).then(function() {
                    console.log('finished fixing all locations!', dailyActions);                    
                    googleMap.setCenter(country.location.LatLng);
                    functions.prepareMapMarkers();
                    $rootScope.$broadcast('mapServiceIsReady');
                });
            },
            getMapCenter: function() {
                //TODO: handle if center is null
                return country.location.LatLng;
            },
            makeMarker: function(id, location) {
                return new google.maps.Marker({
                    map: googleMap,
                    draggable: true,
                    position: location
                });
            },
            prepareMapMarkers: function() {
                console.log('preparing map markers');
                mapMarkers = [];
                angular.forEach(dailyActions, function(value, key) {
                    mapMarkers.push(functions.makeMarker(key, dailyActions[key].location.LatLng));
                });
                console.log('created ' + mapMarkers.length + ' markers!');
            },
            getMapMarkers: function() {
                return mapMarkers;
            },
            formatData: function(data) {
                return new google.maps.LatLng(data.lat(), data.lng());
            },
            getGeolocation: function(address, key) {
                var deferred = $q.defer();
                var locationAnswer = null;

                if (geocoder == null) {
                    geocoder = new google.maps.Geocoder();
                }

                $timeout(function() {
                    geocoder.geocode({
                        'address': address,
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            locationAnswer = functions.formatData(results[0].geometry.location);
                            if (key) {
                                deferred.resolve([key, locationAnswer]);
                            } else {
                                deferred.resolve(locationAnswer);
                            }
                        } else {
                            console.log('Geocode was not successful for the following reason: ' + status);
                            deferred.reject(null);
                        }
                    });
                }, 10);

                return deferred.promise;
            }
        };
        return functions;
    }
]);

tntServices.factory('DataUiBinder', ['$rootScope',
    function($rootScope) {
        var functions = {
            selectMarker: function(markerId) {
                $rootScope.$broadcast('markerSelected', markerId);
            }
        };
        return functions;
    }
]);