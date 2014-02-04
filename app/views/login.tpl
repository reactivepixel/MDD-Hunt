<div ng-show="error" class="col-sm-12 alert alert-danger">
	{{error}} Howdy!
</div>

<div class="col-sm-12 btn-group">
	<!-- <button ng-hide="user" ng-click="facebookLogin()" type="button" class="btn btn-info btn-active active">Login with Facebook</button> -->
	<button ng-hide="user" ng-click="githubLogin()" type="button" class="btn btn-info">Login with Github</button>
	<button ng-show="user" ng-click="facebookLogout()" type="button" class="btn btn-default">Logout</button>
	<!-- <button ng-click="attendFacebookEvent({eventID:'651165088259218', accessToken:user.accessToken})" type="button" class="btn btn-default">attend Event</button> -->
</div>

<div ng-hide="info.lockbox.lockedStatus" class="col-sm-12">
	<p class="alert alert-success">
		{{info.lockbox.url}}
	</p>
</div>

<div ng-show="info.lockbox.lockedStatus" class="col-sm-6">

	<div class="well-sm alert alert-warning" ng-show="proxFailure">
		<p><strong>Proximity Threshold Failure:</strong> Good work getting all users activating simaltaniously; each needs to be more than 10 meters away from each other.</p>
	</div>

	<p class="well">
		{{instructions}}
	</p>
	


	<button ng-show="user" class="btn btn-info" ng-click="activateBeacon()">Activate</button>
	<!-- <button class="btn" ng-click="forceUnlock()">Unlock</button>
	<button class="btn" ng-click="forceLock()">Lock</button>
	<button class="btn" ng-click="proximityCheck()">Proximity</button> -->
</div>
<div ng-show="info.lockbox.lockedStatus" class="col-sm-6">
	<div ng-show="user.picture">
		<img class="userThumb" src="{{user.picture}}">
		{{user.displayName}}
	</div>

	<div>
		<h4>
			Authenticated Users
		</h4>
		<span ng-repeat="activeUser in info.githubUsers">
			<a href="{{activeUser.profileUrl}}"><img src="http://gravatar.com/avatar/{{activeUser.gravatar_id}}" ng-class="{btnsuccess: activeUser.beaconStatus === true, btndanger: activeUser.beaconStatus === false }"/></a>
		</span>
	</div>
</div>