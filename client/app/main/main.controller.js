'use strict';

angular.module('simplePuApp')
  .controller('MainCtrl', function ($scope, ProgramService, allPrograms) {
    
    // Scope variable for adding a new Program
    $scope.newProgramEditor = false;
    $scope.allPrograms = allPrograms;
    $scope.currentProgram = '';
    $scope.addProgram = function(program){
      console.log('program: ', program);
      $scope.submitted = true;
      ProgramService.saveProgram(program)
        .then(function(response){
          var newProgram = response.programObj();
          $scope.newProgramEditor = false;
          $scope.allPrograms.push(newProgram);
        });
    }

    $scope.deleteProgram = function(program){
      ProgramService.deleteProgram(program)
        .then(function(response){
          $scope.allPrograms.splice($scope.allPrograms.indexOf(program),1);
          console.log('delete response: ', response);
        })
    }

    $scope.changeCurrent = function(program){
      $scope.newLesson = '';
      $scope.currentProgram = program;
    }

    $scope.addLesson = function(){
      var lesson = {};
      $scope.newLesson = lesson;
      $scope.currentProgram.lessons.push(lesson);
    }

    $scope.cancelLesson = function(){
      $scope.newLesson = '';
      $scope.currentProgram.lessons.pop();
    }

    $scope.saveLesson = function(lesson){
      console.log('lesson:', lesson);
      $scope.newLesson = '';

    }

  });
