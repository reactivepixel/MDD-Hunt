'use strict';
/*global Firebase */

angular.module('gravityApp')
	.controller('CtrlUser', function ($scope, FireBind, $firebaseSimpleLogin, $http) {
		// Instantiate Simple Login with Firebase ref
		var dataRef = new Firebase('https://gravityapp.firebaseio.com');
		$scope.auth = $firebaseSimpleLogin(dataRef);

		// 3Way Bind it!
		FireBind.$bind($scope, 'info');
		

		$scope.facebookLogin = function(){
			$scope.auth.$login('facebook', {
				scope: 'email,user_photos,rsvp_event,create_event'
			})

			// If login success
			.then(function(user){
				$scope.user = user;
				$scope.user.picture = 'https://graph.facebook.com/' + user.id + '/picture';
				$scope.addUser(user);
				console.log('AuthData', $scope.auth);

			//if login error
			}, function(error){
				console.log('Error Logging in:', error);
			});
		};
		$scope.attendFacebookEvent = function(args){
			var str = 'https://graph.facebook.com/' + args.eventID + '/attending/' + '?callback=JSON_CALLBACK&access_token=' + args.accessToken;
			
			$http({method: 'post', url: str})
				.success(function(data, status) {
					console.log('success', data, status);
				})
				.error(function(data, status) {
					console.log('error', data, status);
				});


		};
		$scope.facebookLogout = function(){
			$scope.auth.$logout();
		};
		$scope.addUser = function(fbUser){

			// if first user in system
			if( $scope.info.users === undefined ){
				$scope.info.users = [];
			}

			$scope.info.users[fbUser.id] = fbUser;
		};
	});