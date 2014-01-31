'use strict';

angular.module('gravityApp', [
	'ngRoute',
	'firebase'
])
.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.tpl',
			controller: 'MainCtrl'
		})
		.when('/dash', {
			templateUrl: 'views/login.tpl',
			controller: 'CtrlUser'
		})
		.otherwise({
			redirectTo: '/'
		});
});