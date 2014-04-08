'use strict';


// Declare app level module which depends on filters, and services
var agApp = angular.module('agApp', ['ngRoute', 'ngResource', 'ngCookies']);

/*
var Router = function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'agController'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'agController'});
  $routeProvider.otherwise({redirectTo: '/view1'});
};

agApp.config(['$routeProvider', Router]);
*/