'use strict';


function AsanaService(Base64, $http, $resource)
{
	var asana = {};
	
    // A success function for the resource promise
    asana.SetProjects = function(val, responseHeaders)
    {
        asana.Projects = val.data;
    };
    
    asana.SetTasks = function(val, responseHeaders)
    {
        asana.Tasks = val.data;
        var promises = asana.Tasks.map(asana.LoadTask);
        return $q.all(promises);
    };
    
    asana.SetTaskDetails = function(val, responseHeaders)
    {
        console.log(val.data);
    };
    
    asana.LoadTask = function(task)
    {
        var res = $resource('https://app.asana.com/api/1.0/tasks/:tid');
		return res.get({tid:task.id}, asana.SetTaskDetails, asana.OnError);
    }   

    asana.SetWorkspaces = function(val, responseHeaders)
    {
        asana.Workspaces = val.data;
    };
    
    
    // an error handler for resource promise failure 
    asana.OnError = function(httpResponse)
    {
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

	asana.getMyTasks = function ()
	{

		var res = $resource('https://app.asana.com/api/1.0/tasks?workspace=10639840794081&assignee=me');
		return res.get();	
	};

	asana.getMe = function()
	{
		 var res = $resource('https://app.asana.com/api/1.0/users/me');
		return res.get();
	};

	asana.getWorkspaces = function()
	{
		var res = $resource('https://app.asana.com/api/1.0/tasks?workspace=10639840794081&assignee=me');
		return res.get({}, asana.SetWorkspaces, asana.OnError);	
	};

	asana.getProjects = function(workspace_id)
	{
		var res = $resource('https://app.asana.com/api/1.0/workspaces/:wid/projects');
		return res.get({wid:workspace_id}, asana.SetProjects, asana.OnError);
	};
	
	asana.getTasks = function(project_id)
	{
		var res = $resource('https://app.asana.com/api/1.0/projects/:pid/tasks');
		var tasksPromise = res.get({pid:project_id}, asana.SetTasks, asana.OnError);
        //var tasksDetailsPromise = 
	};
	
	return asana;
	
}
