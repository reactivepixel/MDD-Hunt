'use strict';

angular.module('tradeWindsApp')
	.controller('CtrlUser', function ($scope) {
		$scope.facebookLogin = function(){
			console.log( 'Logmein!' );
		};
	});