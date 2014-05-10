'use strict';

/* Controllers */

var campaignFinanceApp = angular.module('campaignFinanceApp', ['ngGrid', 'ui.router', 'ngAnimate']);

campaignFinanceApp.controller('IndexCtrl', function($scope, $http, $location) {
	
	$scope.states = [{
		"name": "Alabama",
		"abbreviation": "AL"
	}, {
		"name": "Alaska",
		"abbreviation": "AK"
	}, {
		"name": "American Samoa",
		"abbreviation": "AS"
	}, {
		"name": "Arizona",
		"abbreviation": "AZ"
	}, {
		"name": "Arkansas",
		"abbreviation": "AR"
	}, {
		"name": "California",
		"abbreviation": "CA"
	}, {
		"name": "Colorado",
		"abbreviation": "CO"
	}, {
		"name": "Connecticut",
		"abbreviation": "CT"
	}, {
		"name": "Delaware",
		"abbreviation": "DE"
	}, {
		"name": "District Of Columbia",
		"abbreviation": "DC"
	}, {
		"name": "Florida",
		"abbreviation": "FL"
	}, {
		"name": "Georgia",
		"abbreviation": "GA"
	}, {
		"name": "Guam",
		"abbreviation": "GU"
	}, {
		"name": "Hawaii",
		"abbreviation": "HI"
	}, {
		"name": "Idaho",
		"abbreviation": "ID"
	}, {
		"name": "Illinois",
		"abbreviation": "IL"
	}, {
		"name": "Indiana",
		"abbreviation": "IN"
	}, {
		"name": "Iowa",
		"abbreviation": "IA"
	}, {
		"name": "Kansas",
		"abbreviation": "KS"
	}, {
		"name": "Kentucky",
		"abbreviation": "KY"
	}, {
		"name": "Louisiana",
		"abbreviation": "LA"
	}, {
		"name": "Maine",
		"abbreviation": "ME"
	}, {
		"name": "Maryland",
		"abbreviation": "MD"
	}, {
		"name": "Massachusetts",
		"abbreviation": "MA"
	}, {
		"name": "Michigan",
		"abbreviation": "MI"
	}, {
		"name": "Minnesota",
		"abbreviation": "MN"
	}, {
		"name": "Mississippi",
		"abbreviation": "MS"
	}, {
		"name": "Missouri",
		"abbreviation": "MO"
	}, {
		"name": "Montana",
		"abbreviation": "MT"
	}, {
		"name": "Nebraska",
		"abbreviation": "NE"
	}, {
		"name": "Nevada",
		"abbreviation": "NV"
	}, {
		"name": "New Hampshire",
		"abbreviation": "NH"
	}, {
		"name": "New Jersey",
		"abbreviation": "NJ"
	}, {
		"name": "New Mexico",
		"abbreviation": "NM"
	}, {
		"name": "New York",
		"abbreviation": "NY"
	}, {
		"name": "North Carolina",
		"abbreviation": "NC"
	}, {
		"name": "North Dakota",
		"abbreviation": "ND"
	}, {
		"name": "Northern Mariana Islands",
		"abbreviation": "MP"
	}, {
		"name": "Ohio",
		"abbreviation": "OH"
	}, {
		"name": "Oklahoma",
		"abbreviation": "OK"
	}, {
		"name": "Oregon",
		"abbreviation": "OR"
	}, {
		"name": "Pennsylvania",
		"abbreviation": "PA"
	}, {
		"name": "Rhode Island",
		"abbreviation": "RI"
	}, {
		"name": "South Carolina",
		"abbreviation": "SC"
	}, {
		"name": "South Dakota",
		"abbreviation": "SD"
	}, {
		"name": "Tennessee",
		"abbreviation": "TN"
	}, {
		"name": "Texas",
		"abbreviation": "TX"
	}, {
		"name": "Utah",
		"abbreviation": "UT"
	}, {
		"name": "Vermont",
		"abbreviation": "VT"
	}, {
		"name": "Virgin Islands",
		"abbreviation": "VI"
	}, {
		"name": "Virginia",
		"abbreviation": "VA"
	}, {
		"name": "Washington",
		"abbreviation": "WA"
	}, {
		"name": "West Virginia",
		"abbreviation": "WV"
	}, {
		"name": "Wisconsin",
		"abbreviation": "WI"
	}, {
		"name": "Wyoming",
		"abbreviation": "WY"
	}];
			     
      $scope.gridOptions = { data: 'data', 
	
					columnDefs: [
							{field: 'candidate.name', displayName: 'Name',
							 cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a ui-sref="details({id: row.entity.candidate.id})">{{row.getProperty(col.field)}}</a></div>'},
							{field: 'candidate.party', displayName: 'Party'}						
							],
						
					multiSelect:false
				
				   };
	
	$scope.stateChanged = function() {
		$http({
			method: 'GET',
			url: 'api/candidates/' + $scope.selectedState.abbreviation
		}).
		success(function(data, status, headers, config) {
			$scope.data = data.results;
			$scope.count = data.num_results;
			
		}).
		error(function(data, status, headers, config) {
			$scope.name = 'Error!';
		});
	};

});

campaignFinanceApp.controller('StateCandidatesCtrl', function($scope, $http, $stateParams) {
	
	$http({
		method: 'GET',
		url: 'api/candidates/details/' + $stateParams.id
	}).
	success(function(data, status, headers, config) {
		$scope.details = data.results;
	});
});

campaignFinanceApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/index');
  
  $stateProvider
      .state('index', {
        url: "/index",
        templateUrl: "/partials/grid.jade",
	  controller: 'IndexCtrl'
      })
	.state('details', {
	      url: "/candidates/details/:id",
	      templateUrl: "/partials/partial1.jade",
	      controller: 'StateCandidatesCtrl'
	    })
});
