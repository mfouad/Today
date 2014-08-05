
// Declare app level module which depends on filters, and services
var calApp = angular.module('calApp', ['ngRoute', 'ngResource', 'ngCookies', 'ng', 'ngStorage']);

/*
var Router = function($routeProvider) {
  $routeProvider.when('/cal', {templateUrl: 'partials/calendar.html'});
  $routeProvider.otherwise({redirectTo: '/cal'});
};

calApp.config(['$routeProvider', Router]);
*/

//calApp.service('Base64', Base64Service);
//calApp.factory('asana', ['Base64', '$http', '$resource', '$q', '$localStorage', AsanaService]);
//calApp.factory('config', ['$cookies', ConfigService]);