'use strict';


function AsanaService(Base64, $http, $resource)
{
	var asana = {};
	
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
		return res.get();	
	};

	asana.getProjects = function(workspace_id)
	{
		var res = $resource('https://app.asana.com/api/1.0/workspaces/:wid/projects');
		return res.get({wid:workspace_id});
	};
	
	asana.getTasks = function(project_id)
	{
		var res = $resource('https://app.asana.com/api/1.0/projects/:pid/tasks');
		return res.get({pid:project_id});
	};
	
	

	return asana;
	
}
