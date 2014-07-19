'use strict';

/* Controllers */


function agCalendar($scope, config, asana, $interval)
{
	$scope.OnLoad = function(id)
	{
		$scope.workspace = id;
		config.selected_workspace = $scope.workspace;
		config.Save();
		$scope.projects = 'Loading..';
		var result = asana.Load($scope.workspace);
		$scope.projects = result;	
	};
    
    $scope.DownloadAllTasks = function()
	{
		$scope.timer =  $interval($scope.OnTick, 10000);
	};

	$scope.OnTick = function()
	{
		asana.More();
		$scope.progress = asana.GetProgress();
		$scope.now = asana.nProcessedTasks;
		$scope.max = asana.nTasksCount;
	};

	$scope.OnDownloadComplete = function()
	{
		$interval.cancel($scope.timer);
	};
	
	console.log("tasks = ", asana.Tasks);
	$scope.projects = asana.Projects;

}

agApp.controller('agCalendar', ['$scope', 'config', 'asana', '$interval', agCalendar]);



