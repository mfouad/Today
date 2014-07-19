
// Declare app level module which depends on filters, and services
var calApp = angular.module('calApp', ['ngRoute', 'ngResource', 'ngCookies', 'ng', 'ngStorage']);


var Router = function($routeProvider) {
  $routeProvider.when('/cal', {templateUrl: 'partials/cal.html'});
  $routeProvider.otherwise({redirectTo: '/cal'});
};

calApp.config(['$routeProvider', Router]);

calApp.controller('agLoader', ['$scope', 'config', 'asana', '$location', agLoader]);
calApp.controller('agDownloader', ['$scope', 'config', 'asana', '$interval', agDownloader]);

calApp.service('Base64', Base64Service);
calApp.factory('asana', ['Base64', '$http', '$resource', '$q', '$localStorage', AsanaService]);
calApp.factory('config', ['$cookies', ConfigService]);