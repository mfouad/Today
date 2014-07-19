'use strict';


// Declare app level module which depends on filters, and services
var agApp = angular.module('agApp', ['ngRoute', 'ngResource', 'ngCookies', 'ng', 'ngStorage']);


var Router = function($routeProvider) {
  $routeProvider.when('/loader', {templateUrl: 'partials/loader.html'});
  $routeProvider.when('/overview', {templateUrl: 'partials/overview.html'});
  $routeProvider.otherwise({redirectTo: '/loader'});
};

agApp.config(['$routeProvider', Router]);


agApp.controller('agOverview', ['$scope', 'config', 'asana', agOverview]);
agApp.controller('agLoader', ['$scope', 'config', 'asana', '$location', agLoader]);
agApp.controller('agDownloader', ['$scope', 'config', 'asana', '$interval', agDownloader]);

agApp.service('Base64', Base64Service);
agApp.factory('asana', ['Base64', '$http', '$resource', '$q', '$localStorage', AsanaService]);
agApp.factory('config', ['$cookies', ConfigService]);