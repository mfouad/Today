'use strict';


function AsanaService(Base64, $http, $resource)
{
	var asana = {};
	asana.login = function(apikey)
		{
			// modify the Authorization header to send the username & password
			$http.defaults.headers.common.Authorization = 'Basic ' + 
				Base64.encode(apikey + ":");

		};
	
		asana.getMyTasks = function ()
		{
			asana.login(asana.apikey);
			// get the Resource object.
			var res = $resource('https://app.asana.com/api/1.0/tasks?workspace=10639840794081&assignee=me');
			//$scope.res = $resource('https://app.asana.com/api/1.0/users/me');

			// need to actually execute the request; do whatever with this
			return res.get();
			// restore old defaults
			// $http.defaults.headers.common.Authorization = 'Basic ';	
		};
	
	return asana;
	
}
