'use strict';


function AsanaService(Base64, $http, $resource, $q)
{
	var asana = {};

    asana.PendingProjects = [];
    asana.PendingTasks = [];
    asana.Tasks = [];
    asana.Workspaces = [];
    asana.CurrentUser = {};
	asana.TodayTasks = [];
    asana.nTasksCount = 100;
    asana.nProcessedTasks = 0;
    
    asana.SetCurrentUser = function(val)
    {
        asana.CurrentUser = val.data;
        asana.Workspaces = val.data.workspaces;
    };
    
	asana.AddTodayTasks = function(val)
	{
		asana.TodayTasks = asana.TodayTasks.concat(val.data);
	};
	
    asana.AddProjects = function(val)
    {
        asana.PendingProjects = asana.PendingProjects.concat(val.data);
    };
    
    asana.AddTasks = function(val)
    {
		asana.PendingTasks = asana.PendingTasks.concat(val.data);
		asana.nTasksCount = asana.PendingTasks.length;
        
    };
    
    asana.AddTaskDetail = function(val)
    {
        asana.Tasks.push(val.data);
		asana.nProcessedTasks++;
    };
    
    // an error handler for resource promise failure 
    asana.OnError = function(httpResponse)
    {
        console.error(httpResponse.data.errors[0]);
    };
    
	// Login using a static API key - dangerous
	asana.LoginBasic = function(apikey)
	{
		// modify the Authorization header to send the username & password
		$http.defaults.headers.common.Authorization = 'Basic ' + 
			Base64.encode(apikey + ":");

	};
	
	// Login using a dynamic API access token provided via OAuth
	asana.LoginOAuth = function(apikey)
	{
		// modify the Authorization header to send the username & password
		$http.defaults.headers.common.Authorization = 'Bearer ' +	apikey;

	};


    asana.getCurrentUser = function()
	{
        var res = $resource('https://app.asana.com/api/1.0/users/me');
		return res.get().$promise.then(asana.SetCurrentUser, asana.OnError);
	};


	asana.getMyTasks = function(workspace)
	{
		var res = $resource('https://app.asana.com/api/1.0/tasks?assignee=me&workspace=:wid&opt_fields=assignee_status,name');
		return res.get({wid:workspace.id}).$promise.then(asana.AddTodayTasks, asana.OnError);
	};

    
	asana.getProjects = function(workspace)
	{
		
		var res = $resource('https://app.asana.com/api/1.0/workspaces/:wid/projects');
		return res.get({wid:workspace.id}).$promise.then(asana.AddProjects, asana.OnError);
	};
    
    asana.getTaskDetails = function(task)
    {
        //console.log('loading task ' + task.id + ' - name:' + task.name);
        var res = $resource('https://app.asana.com/api/1.0/tasks/:tid');
        res.get({tid:task.id}).$promise.then(asana.AddTaskDetail, asana.OnError);
    };
	
	asana.getProjectTasks = function(project)
	{
		var res = $resource('https://app.asana.com/api/1.0/projects/:pid/tasks');
		return res.get({pid:project.id}).$promise.then(asana.AddTasks, asana.OnError);
	};
    

	
    asana.LoadSomeTasks = function()
    {
        //console.log(asana.TasksSummary);
		var limit = Math.min(10, asana.PendingTasks.length);
		var promises = asana.PendingTasks.splice(0,limit).map(asana.getTaskDetails);
        return $q.all(promises);

    };
    
    asana.LoadSomeProjects = function()
    {
        //console.log(asana.Projects);
		var limit = Math.min(10, asana.PendingProjects.length);
		var promises = asana.PendingProjects.splice(0,limit).map(asana.getProjectTasks);
        return $q.all(promises);
    };
    
    asana.LoadWorkspaces = function()
    {
        //console.log(asana.Workspaces);
        var promises = asana.Workspaces.map(asana.getProjects);
		asana.Workspaces.map(asana.getMyTasks);
        return $q.all(promises);
    };
	
	asana.IsLoaded = function(obj)
	{
		return (obj.isLoaded == true);	
	};
	
	asana.PrepareObjects = function(arr)
	{
		function ClearLoaded(item) { item.isLoaded = false; }
		arr.forEach(ClearLoaded);	
		return arr;
	};
    
    asana.Load = function()
    {
        return asana.getCurrentUser()
		.then(asana.LoadWorkspaces);
//		.then(asana.ForEachProject)
//		.then(asana.ForEachTask)	
    };
	
	asana.More = function()
	{
		asana.LoadSomeProjects();
		asana.LoadSomeTasks();
	};

    asana.GetProgress = function()
    {
		return asana.nProcessedTasks * 100 / (asana.nTasksCount+ asana.nProcessedTasks);
    };
	
	return asana;
	
}
