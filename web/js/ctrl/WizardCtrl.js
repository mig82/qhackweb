"use strict";

angular.module('qhack').controller('WizardCtrl',
	['$scope', '$document', '$state', '$timeout', 'Survey', 'SessionSrv',
	function($scope, $document, $state, $timeout, Survey, SessionSrv){

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

	$scope.showSteps = {
		info: true,
		career: false,
		skills: false,
		colleagues: false,
		invitation: false,
		summary: false
	};

	var currentStep = 0;

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

	$scope.scrollToElm = function(elmId){
		var elm = angular.element(  document.getElementById(elmId)  );

		$timeout(function(){

			var diff = getWindowHeight() - Math.ceil10(getComputedHeight(elmId),1);
			console.log("dif for %s: %o", elmId, diff);

			if(diff>0){
				document.getElementById('crollHeightPatch').style.height = diff + 'px';
			}
			else{
				document.getElementById('crollHeightPatch').style.height = '0px';
			}

			$document.scrollToElementAnimated(   elm, 0, 1000   );
		},500);
			
	};

}]);


