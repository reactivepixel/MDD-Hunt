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
	// .factory('GeoLoc', function($rootScope) {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.watchPosition(function(data){
	// 			console.log(data);
	// 		}, function(error){

	// 		});
	// 	} else {
	// 		console.log('not supported');
	// 	}
	// });