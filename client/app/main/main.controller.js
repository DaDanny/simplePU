'use strict';

angular.module('simplePuApp')
  .controller('MainCtrl', function ($scope, ProgramService, allPrograms, Auth,$location) {
    
    // isAdmin is passed in via the resolve method of ui-router
    Auth.getCurrentUser()
      .$promise.then(function(response){
        $scope.role=response.role;
      })

    // Displays input for new program
    $scope.newProgramEditor = false;

    // Passed in Via Resolve of ui-router. 
    $scope.allPrograms = allPrograms;

    // Start with no selected program
    $scope.currentProgram = '';

    /*
    Takes in program object
    Basic validation, just making sure the user entered
    something.

    Calls programservice to actually save the program
    Once it saves, it hides the programeditor
    and updates the allPrograms scope variable
    */
    $scope.addProgram = function(program){
      $scope.submitted = true;
      if(program == undefined || program.name == '' ){
        $scope.badName = true;
      }
      else{
        ProgramService.saveProgram(program)
          .then(function(response){
            var newProgram = response.programObj();
            $scope.newProgramEditor = false;
            $scope.allPrograms.push(newProgram);
            $scope.newProgram = '';
          });
      }
    }

    // Hides input for adding a program and resets input checks
    $scope.cancelAdd = function(){
      $scope.badName = false;
      $scope.newProgramEditor = false;
      $scope.submitted = false;
    }


    /*
    Service makes a DELETE request to backend
    And removes the program from the program list
    */
    $scope.deleteProgram = function(program){
      ProgramService.deleteProgram(program)
        .then(function(response){
          $scope.allPrograms.splice($scope.allPrograms.indexOf(program),1);
          console.log('delete response: ', response);
          $scope.currentProgram = '';

        })
    }

    $scope.changeCurrent = function(program){
      $scope.newLesson = '';
      $scope.currentProgram = program;
    }

    /*
    Adds a new lesson but does not save it
    Simply sets up our editor
    */
    $scope.addLesson = function(){
      var lesson = {};
      $scope.newLesson = lesson;
      $scope.currentProgram.lessons.push(lesson);
    }

    /*
    User wishes to no longer add a new lesson
    so close our editor and reset the newLesson.
    We remove the temp lesson from the lessonArray
    */
    $scope.cancelLesson = function(){
      $scope.newLesson = '';
      $scope.currentProgram.lessons.pop();
    }

    $scope.saveLesson = function(lesson){
      ProgramService.saveLesson(lesson,$scope.currentProgram._id)  
      $scope.newLesson = '';
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.saveLessonOrder = function(){
      ProgramService.saveLessonOrder($scope.currentProgram.lessons,$scope.currentProgram._id)
    }

    
  });
