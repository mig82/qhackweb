
"use strict";

var app = angular.module('qhack', ['ui.router', 'ui.bootstrap', 'ui.tinymce', 'ui.select', 'ngSanitize', 'ngCookies', 'ngAnimate', 'ngTouch'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");

	// Now set up the states
	$stateProvider
	
	.state('login', {
		url: "/login",
		templateUrl: "views/login.html"
	})

	.state('main', {
		url: "/main?access_token",
		templateUrl: "views/main.html",
		controller: function($rootScope, $stateParams) {
			console.log("0) Received access_token %o", $stateParams.access_token);
			$rootScope.token = $stateParams.access_token;
		}
	})

	.state('main.home', {
		url: "/home",
		templateUrl: "views/home.html"
	})

	.state('main.wizard', {
		url: "/wizard",
		templateUrl: "views/wizard.html"
	})

	.state('main.status', {
		url: "/status",
		templateUrl: "views/status.html"
	})

	.state('main.report', {
		url: "/report",
		templateUrl: "views/report.html"
	});


}])

.run(['$state', function ($state) {

	console.log('Starting QHack...');

	//gettextCatalog.setCurrentLanguage('en');
	//gettextCatalog.debug = true;
}]);
