<div class="col-md-12 btn-group">
	<button ng-hide="user" ng-click="facebookLogin()" type="button" class="btn btn-info btn-active active">Login with Facebook</button>
	<button ng-hide="user" ng-click="githubLogin()" type="button" class="btn btn-info">Github</button>
	<button ng-click="facebookLogout()" type="button" class="btn btn-default">Log Out</button>
	<!-- <button ng-click="attendFacebookEvent({eventID:'651165088259218', accessToken:user.accessToken})" type="button" class="btn btn-default">attend Event</button> -->
	<button ng-show="user" class="btn btn-info" ng-click="activateBeacon()">Activate</button>
</div>
<div ng-show="info.lockbox.lockedStatus" class="col-md-12">
	<div ng-show="user.picture">
		<img class="userThumb" src="{{user.picture}}">
		{{user.displayName}}
	</div>

	<div ng-repeat="activeUser in info.githubUsers">
		<div class="well well-sm" ng-class="{btnsuccess: activeUser.beaconStatus === true, btndanger: activeUser.beaconStatus === false }">
			<img src="http://gravatar.com/avatar/{{activeUser.gravatar_id}}" />
		</div>
	</div>
</div>

<div ng-hide="info.lockbox.lockedStatus" class="col-md-12">
	<p class="well">
		{{info.lockbox.url}}
	</p>
</div>

<button ng-click="forceUnlock()">Unlock</button>
<button ng-click="forceLock()">Lock</button>
<button ng-click="proximityCheck()">Proximity</button>
<!-- 
<form ng-submit="createEvent()" role="form">
	<div class="form-group">
		<label>Event Name
			<input ng-model="newEvent.name" type="text" class="form-control" placeholder="Enter email" />
		</label>
	</div>

	<div class="form-group">
		<label>Date
			<input ng-model="newEvent.date" type="text" class="form-control" placeholder="Date">
		</label>
	</div>

	<div class="form-group">
		<label>Time
			<input ng-model="newEvent.time" type="text" class="form-control" placeholder="Time">
		</label>
	</div>

	<div class="form-group">
		<label>Location
			<input ng-model="newEvent.loc" type="text" class="form-control" placeholder="Location">
		</label>
	</div>

	<button type="submit" class="btn btn-default">Create Event</button>
</form>


 -->