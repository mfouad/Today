'use strict';

/* Services */



agApp.service('Base64', Base64Service);

agApp.factory('asana', ['Base64', '$http', '$resource', AsanaService]);

