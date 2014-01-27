'use strict';

angular.module('tradeWindsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.tpl',
        controller: 'MainCtrl'
      })
      .when('/dash', {
        templateUrl: 'views/login.tpl',
        controller: 'CtrlUser'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
