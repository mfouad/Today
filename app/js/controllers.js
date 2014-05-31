'use strict';

/* Controllers */


// Loads the initial app 
// Logs in to asana - and load the bare minimum tasks required for initial loading.
function agLoader($scope, config, asana, $location)
{
	$scope.apikey = config.auth_key;
	
		
    $scope.Login = function()
    {
    	asana.apikey = $scope.apikey;
		asana.LoginOAuth(asana.apikey);

		asana.Load().then($scope.OnLoadingComplete);
    };
    
    $scope.OnLoadingComplete = function()
    {
        $location.path('overview');
    };	
	
	$scope.Login();
}

// Backgrown worker for the app 
// currently it is only responsible for downloading Tasks from asana gradually during to the API rate-limiting
function agDownloader($scope, config, asana, $interval)
{
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

	//$scope.DownloadAllTasks();
};



function agOverview($scope, config, asana)
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

agApp.controller('agOverview', ['$scope', 'config', 'asana', agOverview]);
agApp.controller('agLoader', ['$scope', 'config', 'asana', '$location', agLoader]);
agApp.controller('agDownloader', ['$scope', 'config', 'asana', '$interval', agDownloader]);



