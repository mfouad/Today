'use strict';

/* Controllers */


function asanaController($scope, config, asana)
{
	//$cookies.apikey = auth_key;
	//$scope.apikey = auth_key;// $cookies.apikey;
	$scope.apikey = config.auth_key;
	
		
    $scope.Login = function()
    {
    	asana.apikey = $scope.apikey;
		asana.LoginOAuth(asana.apikey);
		this.OnLogin();
      	//$scope.tasks = asana.getMyTasks();
       
    };
	
	$scope.OnLogin = function()
	{
		$scope.user = 'Loading..';
		var result = asana.getMe();
		$scope.user = result;
		
		if (config.selected_workspace != null)
		{
			$scope.workspace = config.selected_workspace;
			$scope.OnWorkspaceChanged();
		}
	};
	
	$scope.OnWorkspaceChanged = function(id)
	{
		$scope.workspace = id;
		config.selected_workspace = $scope.workspace;
		config.Save();
		$scope.projects = 'Loading..';
		var result = asana.Load($scope.workspace);
		$scope.projects = result;	
	};
	/*
	$scope.OnProjectChanged = function(id)
	{
		$scope.project = id;
		var result = asana.getTasks($scope.project);
		$scope.tasks = result;

		this.ShowStats();
	};
	*/
	$scope.ShowStats = function()
	{
		
		
	};
	
	$scope.Login();
}

agApp.controller('asanaController', ['$scope', 'config', 'asana', asanaController]);




