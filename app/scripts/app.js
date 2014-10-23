// 'use strict';

// /**
//  * @ngdoc overview
//  * @name tripsandtipsApp
//  * @description
//  * # tripsandtipsApp
//  *
//  * Main module of the application.
//  */
// angular
//   .module('tripsandtipsApp', [
//     'ngAnimate',
//     'ngCookies',
//     'ngResource',
//     'ngRoute',
//     'ngSanitize',
//     'ngTouch'
//   ])
//   .config(function ($routeProvider) {
//     $routeProvider
//       .when('/', {
//         templateUrl: 'views/main.html',
//         controller: 'MainCtrl'
//       })
//       .when('/about', {
//         templateUrl: 'views/about.html',
//         controller: 'AboutCtrl'
//       })
//       .otherwise({
//         redirectTo: '/'
//       });
//   });

'use strict';

/**
 * @ngdoc overview
 * @name tripsandtipsApp
 * @description
 * # tripsandtipsApp
 *
 * Main module of the application.
 */
// Declare app level module which depends on views, and components
var tripsandtipsApp = angular.module('tripsandtipsApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'google-maps'.ns(),
  'tntControllers',
  'tntFilters',
  'tntDirectives',
  'tntServices'
]);

tripsandtipsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'views/countries-list.html',
        controller: 'countriesListCtrl'
      }).
      when('/country/:countryId', {
        templateUrl: 'views/country-details.html',
        controller: 'countryDetailsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

