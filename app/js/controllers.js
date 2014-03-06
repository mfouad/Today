'use strict';

/* Controllers */

//var x = angular.module('agApp.controllers', []);


var controllers = {};

controllers.agController = function($scope)
{
    $scope.customers = [{name:'mohammad fouad', city:'cairo'}, {name:'ahmed fouad',city:'october'}, {name:'heba siad', city:'alex'}];

    $scope.addCustomer = function()
    {
        $scope.customers.push({name: $scope.newCustomer.name, city: $scope.newCustomer.city});
    };
};

controllers.asanaController = function($scope, Base64, $http, $resource)
{

    $scope.Login = function()
    {
        // modify the Authorization header to send the username & password
        $http.defaults.headers.common.Authorization = 'Basic ' + 
            Base64.encode($scope.apikey + ":");
        // get the Resource object.
        $scope.res = $resource('https://app.asana.com/api/1.0/users/me');
        // need to actually execute the request; do whatever with this
        $scope.result = $scope.res.get();
        // restore old defaults
        // $http.defaults.headers.common.Authorization = 'Basic ';	
    }
};



agApp.controller(controllers);




