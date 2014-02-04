'use strict';

angular.module('gravityApp')
	.controller('CtrlUser', function ($scope, FireBind, $firebaseSimpleLogin, $http, $timeout,FireLog,$rootScope) {
	
		$scope.instructions = 'Logging into Github is required to continue down this rabbit hole.';

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
			$scope.forceUnlock();
		};
		
		//beaconing
		$scope.activateBeacon = function(){
			$scope.info.githubUsers[$scope.user.id].beaconStatus = true;


			$scope.falseBeacons = 0;
			for(var index in $scope.info.githubUsers){
				if(!$scope.info.githubUsers[index].beaconStatus){
					$scope.falseBeacons++;
				}
			}

			// needed incase the user logsout while timeout is in progress
			var targetUserID = $scope.user.id;

			$timeout(function() {
				$scope.info.githubUsers[targetUserID].beaconStatus = false;
			}, 10000);



			// Geoloc
			$scope.findLoc({userID : targetUserID});



		};
		$scope.findLoc = function(args){
			console.log('setup');
			if (navigator.geolocation) {
				$scope.GeoLoc = navigator.geolocation.getCurrentPosition(function(data){
					
					$scope.info.githubUsers[ args.userID ].geoLoc = data;
					console.log('setting data', data);
					
					if($scope.falseBeacons === 0 ){
						// Check all distances
						$scope.proximityCheck();
					}

				}, function(error){
					$scope.error = 'Geolocation Failure. Make certain you this service is not disabled within your settings. Please refresh your browser.';
					console.log('error', error);
				});
			} else {
				console.log('not supported');
				$scope.error = 'Geolocation Failure';
			}
		};

		$scope.proximityCheck = function(){
			var threshHold = 0.01;
			$scope.proxFailure = false;

			for(var index in $scope.info.githubUsers){
				var userA = $scope.info.githubUsers[ index ];
				if(!userA.geoLoc){
					$scope.proxFailure = true;
					break;
				}
				for(var innerIndex in $scope.info.githubUsers){
					
					var userB = $scope.info.githubUsers[ innerIndex ];


					var distance = $scope.distance( userA.geoLoc.coords.longitude, userA.geoLoc.coords.latitude, userB.geoLoc.coords.longitude, userB.geoLoc.coords.latitude );
					console.log('diff',distance);
					if(distance <= threshHold && distance !== 0) {
						
						$scope.proxFail();
					}
				}
			}

			console.log('$scope.proxFailure',$scope.proxFailure, (!$scope.proxFailure));
			if(!$scope.proxFailure){
				$scope.forceUnlock();
			}
			return $scope.proxFailure;
		};
		$scope.proxFail = function(){
			$scope.proxFailure = true;
		};
		$scope.distance = function (lon1, lat1, lon2, lat2) {



			/** Converts numeric degrees to radians */
			if (typeof(Number.prototype.toRad) === 'undefined') {
				Number.prototype.toRad = function() {
					return this * Math.PI / 180;
				};
			}



			var R = 6371; // Radius of the earth in km
			var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
			var dLon = (lon2-lon1).toRad();
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * Math.sin(dLon/2) * Math.sin(dLon/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			var d = R * c; // Distance in km
			return d;
		};

			


		$scope.processUserLogin = function(args){
			if(args.user.provider === 'github'){

				args.user.beaconStatus = false;

				$scope.user = args.user;

				//establish Loc
				$scope.findLoc({ userID: $scope.user.id });
				$scope.instructions = 'Complex interfaces without instructions can be annoying. Try and lead your users with affordiances... visual clues.';
				
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
			delete $scope.info.githubUsers[$scope.user.id];
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