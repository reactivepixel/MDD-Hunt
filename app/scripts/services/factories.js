'use strict';

/*global Firebase */
angular.module('tradeWindsApp')
	.factory('FireBind', function($firebase) {
		var ref = new Firebase('https://gravityapp.firebaseio.com');
		return $firebase(ref);
	});