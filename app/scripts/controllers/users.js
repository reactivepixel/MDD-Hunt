'use strict';

/*global Firebase */

angular.module('tradeWindsApp')
	.controller('CtrlUser', function ($scope, FireBind, $firebaseSimpleLogin) {
		// Instantiate Simple Login with Firebase ref
		var dataRef = new Firebase('https://gravityapp.firebaseio.com');
		$scope.auth = $firebaseSimpleLogin(dataRef);

		// 3Way Bind it!
		FireBind.$bind($scope, 'info');
		

		$scope.facebookLogin = function(){
			$scope.auth.$login('facebook', {
				scope: 'email,user_likes'
			})

			// If login success
			.then(function(user){
				$scope.user = user;

			//if login error
			}, function(error){
				console.log('Error Logging in:', error);
			});
		};
		$scope.facebookLogout = function(){
			$scope.auth.$logout();
		};
		$scope.addUser = function(){

			// if first user in system
			if( $scope.info.users === undefined ){
				$scope.info.users = [];
			}

			$scope.info.users[1001] = {fbid:1001, name:'Chris'};
		};
	});