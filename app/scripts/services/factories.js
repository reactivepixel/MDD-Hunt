'use strict';

/*global Firebase */
angular.module('gravityApp')
	.factory('FireBind', function($firebase) {
		var ref = new Firebase('https://gravityapp.firebaseio.com');
		return $firebase(ref);
	})
	.factory('FireLog', function($firebaseSimpleLogin) {
		var ref = new Firebase('https://gravityapp.firebaseio.com');
		return $firebaseSimpleLogin( ref );
	});