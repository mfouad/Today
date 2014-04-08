'use strict';

/* Controllers */


function asanaController($scope, auth_key, asana)
{
	//$cookies.apikey = auth_key;
	//$scope.apikey = auth_key;// $cookies.apikey;
	$scope.apikey = auth_key;
	
		
    $scope.Login = function()
    {
    	asana.apikey = $scope.apikey;
      	$scope.tasks = asana.getMyTasks();
       
    };
}


agApp.controller('asanaController', ['$scope', 'auth_key', 'asana', asanaController]);




