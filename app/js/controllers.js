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
	
	$scope.OnWorkspaceChanged = function()
	{
		config.selected_workspace = $scope.workspace;
		config.Save();
		$scope.projects = 'Loading..';
		var result = asana.getProjects($scope.workspace);
		$scope.projects = result;	
	};
	
	$scope.OnProjectChanged = function()
	{
		$scope.projects = 'Loading..';
		var result = asana.getProjects($scope.project);
		$scope.projects = result;
		this.ShowStats();
	};
	
	$scope.ShowStats = function()
	{
		
		
	};
	
	$scope.Login();
}

agApp.controller('asanaController', ['$scope', 'config', 'asana', asanaController]);




