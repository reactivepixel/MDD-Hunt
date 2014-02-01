'use strict';

angular.module('gravityApp')
	.controller('CtrlUser', function ($scope, FireBind, $firebaseSimpleLogin, $http, $timeout,FireLog,$rootScope) {
	
		// 3Way Bind it!
		FireBind.$bind($scope, 'info');

		$rootScope.$on('$firebaseSimpleLogin:login', function(){
			$scope.processUserLogin({ user : FireLog.user });
		});
		
		
		$scope.createEvent = function(){
			if(!$scope.info.events){
			//	$scope.info.events = [];
			}
			//$scope.newEvent.id = 1001;// Math.round((new Date()).getTime() / 1000);

			//$scope.info.events[$scope.newEvent.id] = $scope.newEvent;
			console.log($scope.newEvent);
		};
		$scope.beaconExtinguish = function(){
			$scope.info.lockbox.lockedStatus = false;
		};
		//beaconing
		$scope.activateBeacon = function(){
			$scope.info.githubUsers[$scope.user.id].beaconStatus = true;
			var falseBeacons = 0;
			for(var index in $scope.info.githubUsers){
				if(!$scope.info.githubUsers[index].beaconStatus){
					falseBeacons++;
				}
			}

			if(falseBeacons === 0 ){
				$scope.beaconExtinguish();
			}

			// needed incase the user logsout while timeout is in progress
			var targetUserID = $scope.user.id;

			$timeout(function() {
				$scope.info.githubUsers[targetUserID].beaconStatus = false;
			}, 3000);
		};
		$scope.processUserLogin = function(args){
			if(args.user.provider === 'github'){

				args.user.beaconStatus = false;

				$scope.user = args.user;
				
			} else if(args.user.provider === 'facebook'){
				$scope.user = args.user;
				$scope.user.picture = 'https://graph.facebook.com/' + args.user.id + '/picture';
				$scope.addUser(args.user);
			}
		};
		//Github Simple Auth
		$scope.githubLogin = function(){
			FireLog.$login('github', {
				scope: 'user,repo'
			})

			// If login success
			.then(function(user){
				// Add user to list of active users
				$scope.addGithubUser(user);

				// Process Login
				$scope.processUserLogin({ user : user });

			//if login error
			}, function(error){
				console.log('Error Logging in:', error);
			});
		};
		$scope.facebookLogin = function(){
			FireLog.$login('facebook', {
				scope: 'email,user_photos,rsvp_event,create_event'
			})

			// If login success
			.then(function(user){

				$scope.processUserLogin({ user : user });

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
			FireLog.$logout();
			delete $scope.user;
		};
		$scope.addUser = function(fbUser){

			// if first user in system
			if( $scope.info.users === undefined ){
				$scope.info.users = [];
			}

			$scope.info.users[fbUser.id] = fbUser;
		};

		$scope.addGithubUser = function(user){

			// if first user in system
			if( $scope.info.githubUsers === undefined ){
				$scope.info.githubUsers = [];
			}

			// Add the user to Firebase
			$scope.info.githubUsers[user.id] = user;
		};
		$scope.forceUnlock = function(){
			$scope.info.lockbox.lockedStatus = false;
		};
		$scope.forceLock = function(){
			$scope.info.lockbox.lockedStatus = true;
		};
	});