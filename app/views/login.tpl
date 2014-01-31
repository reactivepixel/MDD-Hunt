<div class="btn-group">
	<button ng-click="facebookLogin()" type="button" class="btn btn-info btn-active active">Login with Facebook</button>
	<button ng-click="githubLogin()" type="button" class="btn btn-info">Github</button>
	<button ng-click="facebookLogout()" type="button" class="btn btn-default">Log Out</button>
	<button ng-click="attendFacebookEvent({eventID:'651165088259218', accessToken:user.accessToken})" type="button" class="btn btn-default">attend Event</button>
</div>
<div ng-show="user.picture">
	<img class="userThumb" src="{{user.picture}}">
	{{user.displayName}}
</div>
<ul class="list-group">
	<li class="list-group-item list-group-item-warning" ng-repeat="activeUser in info.githubUsers">
		<img src="http://gravatar.com/avatar/{{activeUser.gravatar_id}}" />
		<button class="btn btn-danger" ng-class="{btnsuccess: activeUser.beaconStatus === true }">Status: {{activeUser.beaconStatus}}</button>
	</li>
</ul>

<button ng-click="activateBeacon()">Activate</button>

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