'use strict';

/* Services */



agApp.service('Base64', Base64Service);

agApp.factory('asana', ['Base64', '$http', '$resource', '$q', '$localStorage', AsanaService]);

agApp.factory('config', ['$cookies', ConfigService]);