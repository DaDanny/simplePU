'use strict';

angular.module('simplePuApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        authenticate: true,
        resolve : {
          ProgramService : 'ProgramService',
          allPrograms : function(ProgramService){
            return ProgramService.getPrograms()
              .then(function(response){
                return response;
              })
          },
          Auth : 'Auth'
        }
      });
  });