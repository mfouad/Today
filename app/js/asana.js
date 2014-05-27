'use strict';


function AsanaService(Base64, $http, $resource, $q)
{
	var asana = {};

    asana.Projects = [];
    asana.TasksSummary = [];
    asana.Tasks = [];
    asana.Workspaces = [];
    asana.CurrentUser = {};
    asana.nTasksCount = 100;
    asana.nProcessedTasks = 0;
    
    asana.SetCurrentUser = function(val)
    {
        asana.CurrentUser = val.data;
        asana.Workspaces = val.data.workspaces;
    };
    
    asana.AddProjects = function(val)
    {
        asana.Projects = asana.Projects.concat(val.data);
    };
    
    asana.AddTasks = function(val)
    {
        asana.TasksSummary = asana.TasksSummary.concat(val.data);
        asana.nProcessedTasks++;
    };
    
    asana.AddTaskDetail = function(val)
    {
        asana.Tasks.push(val.data);
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
		return res.get().$promise.then(asana.SetCurrentUser, asana.OnError);;
	};

    asana.getMyTasks = function ()
	{

		var res = $resource('https://app.asana.com/api/1.0/tasks?workspace=10639840794081&assignee=me');
		return res.get();	
	};


    
	asana.getProjects = function(workspace)
	{
		var res = $resource('https://app.asana.com/api/1.0/workspaces/:wid/projects');
		return res.get({wid:workspace.id}).$promise.then(asana.AddProjects, asana.OnError);
	};
    
    asana.getTaskDetails = function(task)
    {
        console.log('loading task ' + task.id + ' - name:' + task.name);
        var res = $resource('https://app.asana.com/api/1.0/tasks/:tid');
        res.get({tid:task.id}).$promise.then(asana.AddTaskDetail, asana.OnError);
    };
	
	asana.getProjectTasks = function(project)
	{
		var res = $resource('https://app.asana.com/api/1.0/projects/:pid/tasks');
		return res.get({pid:project.id}).$promise.then(asana.AddTasks, asana.OnError);
	};
    
    asana.ForEachTask = function()
    {
        if (asana.TasksSummary.length > 0)
            asana.nTasksCount = asana.TasksSummary.length;
        
        //console.log(asana.TasksSummary);
        var promises = asana.TasksSummary.map(asana.getTaskDetails);
        return $q.all(promises);

    };
    
    asana.ForEachProject = function()
    {
        //console.log(asana.Projects);
        var promises = asana.Projects.map(asana.getProjectTasks);
        return $q.all(promises);
    };
    
    asana.ForEachWorkspace = function()
    {
        //console.log(asana.Workspaces);
        var promises = asana.Workspaces.map(asana.getProjects);
        return $q.all(promises);
    };
    
    asana.Load = function(workspace)
    {
        return asana.getCurrentUser()
            .then(asana.ForEachWorkspace)
            .then(asana.ForEachProject)
            .then(asana.ForEachTask)
    };

    asana.GetProgress = function()
    {
        return asana.nProcessedTasks * 100 / asana.nTasksCount;
    };
	
	return asana;
	
}
