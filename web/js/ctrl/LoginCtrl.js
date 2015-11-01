"use strict";

angular.module('qhack').controller('LoginCtrl', ['$scope', '$state', function($scope, $state){

	$scope.authUrls = {};
	
	/*ConfigSrv.getConfig().then(function(config){
		$scope.authUrls.facebook =	config.nodeServerUrl + config.authPaths.facebook;
		$scope.authUrls.google =	config.nodeServerUrl + config.authPaths.google;
		$scope.authUrls.twitter =	config.nodeServerUrl + config.authPaths.twitter;
	});*/
	

	$scope.login = function(){

		console.log("Requesting authentication...4");

		/*SessionSrv.getUserByUserPassword().then(function(user){
			
			if(user){
				console.log("Authentication accepted for %o", user);
				$state.go('main.home');
			}
			else{
				console.log("Authentication denied for %o", $scope.user);
				//$location.path('/login');
			}
		});*/
	};
}]);


	