'use strict';


// Declare app level module which depends on filters, and services
var agApp = angular.module('agApp', ['ngRoute', 'ngResource', 'ngCookies', 'ng', 'ngStorage']);


var Router = function($routeProvider) {
  $routeProvider.when('/loader', {templateUrl: 'partials/loader.html'});
  $routeProvider.when('/overview', {templateUrl: 'partials/overview.html'});
  $routeProvider.otherwise({redirectTo: '/loader'});
};

agApp.config(['$routeProvider', Router]);
