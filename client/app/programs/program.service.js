'use strict';

angular.module('simplePuApp')
  .service('ProgramService', function($http, $q){
    return {
      /*
      GET Request hits the endpoint /api/programs
      No arguments required.
      Expects response to be json object of all programs
      stored.

      Once response is recieved, promise is resolved and
      the service returns the resposne data to the controller
      */
      getPrograms : function(){
        console.log('here!');
        return $http.get('/api/programs')
          .then(function(response){
            if(typeof response.data === 'object'){
              return response.data;
            }
            else{
              return $q.reject(response.data);
            }
          },function(response){
            return $q.reject(response.data);
          });
      },
      /*
      POST request hits /api/programs
      A promise object is used to return the data
      to the controller once the promies object is resolved

      The response should be the saved object on the 
      server
      */
      saveProgram : function(programObj){
        var promise = $http({
          method : 'POST',
          url : '/api/programs',
          data : programObj,
          headers : {'Content-Type' : 'application/json'}
        }).then(function(response){
          programObj = response.data;
          return {
            programObj : function(){
              return programObj;
            }
          }
        });
        return promise;
      },
      /*
      Takes in the new lesson and sends that to
      the backend to update the program lesson array
      */
      saveLesson : function(lessonObj){
        var promise = $http({
          method : 'PUT',
          url : '/api/programs/' + lessonObj._id,
          data : lessonObj,
          headers : {'Content-Type' : 'application/json'}
        }).then(function(response){
          lessonObj = response.data;
          return{
            lessonObj : function(){
              return lessonObj;
            }
          }
        });
        return promise;
      },
      deleteProgram : function(programObj){
        return $http.delete('/api/programs/'+programObj._id)
          .then(function(response){
            return response;
          })
      }
    }
  })