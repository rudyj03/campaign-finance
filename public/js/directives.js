'use strict';

/* Directives */

angular.module('campaignFinanceApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
