'use strict';


//agApp.value('auth_key', '');



function ConfigService($cookies)
{
	var config = {};
	
	$cookies.auth_key = '';
	config.auth_key = $cookies.auth_key;
	config.selected_workspace = $cookies.selected_workspace;
	config.selected_project = $cookies.selected_project;
	
	config.Save = function()
	{
		$cookies.selected_workspace = config.selected_workspace;
	};
	
	return config;
	
}
