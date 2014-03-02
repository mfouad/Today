'use strict';

/* Controllers */

var x = angular.module('agApp.controllers', []);


var controllers = {};

  controllers.agController = function($scope)
  {
  	$scope.customers = [{name:'mohammad fouad', city:'cairo'}, {name:'ahmed fouad',city:'october'}, {name:'heba siad', city:'alex'}];

  	$scope.addCustomer = function()
  	{
  		$scope.customers.push({name: $scope.newCustomer.name, city: $scope.newCustomer.city});
  	};
  };



  x.controller(controllers);




