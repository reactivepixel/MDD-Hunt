<div class="btn-group">
	<button ng-click="facebookLogin()" type="button" class="btn btn-info">Login with Facebook</button>
	<button ng-click="facebookLogout()" type="button" class="btn btn-default">Log Out</button>
</div>
<div ng-show="user.picture">
	<img class="userThumb" src="{{user.picture}}">
	{{user.displayName}}
</div>