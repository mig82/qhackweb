"use strict";

angular.module('qhack').controller('UsrInfoCtrl', ['$scope', function($scope){

	$scope.$watchCollection('survey.user', function(newUser, oldUser){
		$scope.showDoneBtn = $scope.infoForm.$valid && newUser.name.trim() !== "" && newUser.email.trim() !== "";
	});

}]);


	