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
		asana.login(asana.apikey);
		this.OnLogin();
      	//$scope.tasks = asana.getMyTasks();
       
    };
	
	$scope.OnLogin = function()
	{
		$scope.user = 'Loading..';
		var result = asana.getMe();
		$scope.user = result;
	};
	
	$scope.OnWorkspaceChanged = function()
	{
		$scope.projects = 'Loading..';
		var result = asana.getProjects($scope.workspace);
		$scope.projects = result;	
	};
	
	$scope.OnProjectChanged = function()
	{
		$scope.projects = 'Loading..';
		var result = asana.getProjects($scope.project);
		$scope.projects = result;	
	};
}

agApp.controller('asanaController', ['$scope', 'auth_key', 'asana', asanaController]);




