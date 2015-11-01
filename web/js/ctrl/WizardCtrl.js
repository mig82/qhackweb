"use strict";

angular.module('qhack').controller('WizardCtrl', ['$scope', '$state', 'Survey', 'SessionSrv', function($scope, $state, Survey, SessionSrv){

	/*$scope.survey = {
		user:		{},
		career:		"",
		level:		"",
		custMsg:		"I'm a custom message",
		skills:		[],
		guests:		[],
	};*/

	$scope.user = {
		name: "",
		email: ""
	};

	$scope.survey = new Survey(
		$scope.user, //user
		"", // career
		"", //level
		"I'm a custom message" //custMsg
	);

	//window.$scope = $scope;
	SessionSrv.setUser($scope.user);
	
	$scope.$watchCollection( 'survey', function(newSurvey, oldSurvey){
		//console.log("Survey: %o", $scope.survey);
		SessionSrv.setSurvey($scope.survey);
	});

	$scope.submit = function(){
		$scope.survey.submit();
		SessionSrv.setSurvey($scope.survey);
		$state.go('main.status');
	};
}]);


