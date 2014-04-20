'use strict';

// Declare app level module which depends on filters, and services

angular.module('campaignFinanceApp', [
  'campaignFinanceApp.controllers',
  'campaignFinanceApp.filters',
  'campaignFinanceApp.services',
  'campaignFinanceApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
   when('/', {
   	templateUrl: 'partials/index',
     	controller: IndexCtrl
    }).
    when('/candidates/:state', {
      templateUrl: 'partials/partial1',
      controller: StateCandidatesCtrl
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
