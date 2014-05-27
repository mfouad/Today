'use strict';


function AsanaService(Base64, $http, $resource, $q)
{
	var asana = {};

    asana.Projects = [];
    asana.TasksSummary = [];
    asana.Tasks = [];
    
    asana.AddProjects = function(val)
    {
        asana.Projects = asana.Projects.concat(val.data);
    };
    
    asana.AddTasks = function(val)
    {
        asana.TasksSummary = asana.TasksSummary.concat(val.data);
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
		return res.get();
	};

    asana.getMyTasks = function ()
	{

		var res = $resource('https://app.asana.com/api/1.0/tasks?workspace=10639840794081&assignee=me');
		return res.get();	
	};


    
	asana.getProjects = function(workspace)
	{
		var res = $resource('https://app.asana.com/api/1.0/workspaces/:wid/projects');
		return res.get({wid:workspace}).$promise.then(asana.AddProjects, asana.OnError);
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
        console.log(asana.TasksSummary);
        var promises = asana.TasksSummary.map(asana.getTaskDetails);
        return $q.all(promises);

    };
    
    asana.ForEachProject = function()
    {
        console.log(asana.Projects);
        var promises = asana.Projects.map(asana.getProjectTasks);
        return $q.all(promises);
    };
    
    asana.Load = function(workspace)
    {
        asana.getProjects(workspace)
            .then(asana.ForEachProject)
            .then(asana.ForEachTask)
    };

	
	return asana;
	
}
