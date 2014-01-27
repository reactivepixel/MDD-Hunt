'use strict';

angular.module('tradeWindsApp')
	.controller('CtrlUser', function ($scope, FireUsers) {
		
		// 3Way Bind it!
		FireUsers.$bind($scope, 'info');

		$scope.addUser = function(){

			// if first user in system
			if( $scope.info.users === undefined ){
				$scope.info.users = [];
			}

			$scope.info.users[1001] = {fbid:1001, name:'Chris'};
		};
	});