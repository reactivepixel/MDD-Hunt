'use strict';

/*global Firebase */
angular.module('gravityApp')
	.factory('FireBind', function($firebase) {
		var ref = new Firebase('https://gravityapp.firebaseio.com');
		return $firebase(ref);
	});