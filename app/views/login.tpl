<div class="col-md-12 btn-group">
	<button ng-click="facebookLogin()" type="button" class="btn btn-info btn-active active">Login with Facebook</button>
	<button ng-click="githubLogin()" type="button" class="btn btn-info">Github</button>
	<button ng-click="facebookLogout()" type="button" class="btn btn-default">Log Out</button>
	<button ng-click="attendFacebookEvent({eventID:'651165088259218', accessToken:user.accessToken})" type="button" class="btn btn-default">attend Event</button>
</div>
<div class="col-md-12">
	<div ng-show="user.picture">
		<img class="userThumb" src="{{user.picture}}">
		{{user.displayName}}
	</div>

		<div ng-repeat="activeUser in info.githubUsers">
			<div class="well well-sm col-md-3" ng-class="{btnsuccess: activeUser.beaconStatus === true, btndanger: activeUser.beaconStatus === false }">
				<img src="http://gravatar.com/avatar/{{activeUser.gravatar_id}}" />
			</div>
			
			
		</div>
</div>
	<div class="col-md-12">
		<button class="btn btn-info" ng-click="activateBeacon()">Activate</button>
	</div>
</div>


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