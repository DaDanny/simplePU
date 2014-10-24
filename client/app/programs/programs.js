'use strict';

angular.module('simplePuApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('programs', {
        url: '/programs',
        templateUrl: 'app/programs/programs.html',
        controller: 'ProgramsCtrl'
      });
  });