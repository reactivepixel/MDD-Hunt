'use strict';

angular.module('gravityApp', [
	'ngRoute',
	'firebase'
])
	.config(function($routeProvider) {
		$routeProvider
			.when('/standard', {
				templateUrl: 'views/main.tpl',
				controller: 'MainCtrl'
			})
			.when('/', {
				templateUrl: 'views/login.tpl',
				controller: 'CtrlUser'
			})
			.otherwise({
				redirectTo: '/'
			});
	});