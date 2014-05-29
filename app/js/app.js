'use strict';


// Declare app level module which depends on filters, and services
var agApp = angular.module('agApp', ['ngRoute', 'ngResource', 'ngCookies', 'ng']);


var Router = function($routeProvider) {
  $routeProvider.when('/loader', {templateUrl: 'partials/loader.html', controller: 'agLoader'});
  $routeProvider.when('/overview', {templateUrl: 'partials/overview.html', controller: 'agOverview'});
  $routeProvider.otherwise({redirectTo: '/loader'});
};

agApp.config(['$routeProvider', Router]);
