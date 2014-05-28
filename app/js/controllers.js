'use strict';

/* Controllers */

function agLoaderCtrl($scope, config, asana, $interval)
{
	$scope.apikey = config.auth_key;
	
		
    $scope.Login = function()
    {
    	asana.apikey = $scope.apikey;
		asana.LoginOAuth(asana.apikey);

		var result = asana.Load();
		
        $scope.timer =  $interval($scope.OnTick, 10000);
        //result.then($scope.OnLoadingComplete);

    };
    
    $scope.OnTick = function()
    {
		asana.More();
        $scope.progress = asana.GetProgress();
        $scope.now = asana.nProcessedTasks;
        $scope.max = asana.nTasksCount;
    };
    
    $scope.OnLoadingComplete = function()
    {
        $interval.cancel($scope.timer);
    };
	
    $scope.Login();

}






function asanaController($scope, config, asana)
{
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
	
}

agApp.controller('asanaController', ['$scope', 'config', 'asana', asanaController]);
agApp.controller('agLoaderCtrl', ['$scope', 'config', 'asana', '$interval', agLoaderCtrl]);



