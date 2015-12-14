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


	$scope.steps = [
		{stepId: 'info', 		divId: 'infoStepDiv', 		show: true},
		{stepId: 'career', 		divId: 'careerStepDiv', 	show: false},
		{stepId: 'skills', 		divId: 'skillsStepDiv', 	show: false},
		{stepId: 'colleagues', 	divId: 'colleaguesStepDiv', show: false},
		{stepId: 'invitaiton', 	divId: 'invitaitonStepDiv', show: false},
		{stepId: 'summary', 	divId: 'summaryStepDiv', 	show: false},
	];

	$scope.showNextStep = function(stepIndex){

		var step = $scope.steps[stepIndex + 1];

		if(step.show){ //If it has already been displayed just scroll down to it.
			$document.scrollToElementAnimated(  angular.element(  '#'+step.divId  ), 0, 1000  ); //Animated scroll-down.
		}
		else{ //If it has not yet been displayed...
			
			var windowHeight = getWindowHeight();
			document.getElementById('scrollHeightPatch').style.height = windowHeight + 'px'; //Make space for scrolling down.
			$document.scrollToElementAnimated(  angular.element(  '#scrollHeightPatch'  ), 0, 1000  ); //Animated scroll-down.
			

			$timeout(function displayNextStep() { //Wait for scroll-down to complete
				step.show = true; // Display next step.
			}, 1000);
			
			$timeout(function adjustScrollHeightPatch(){ //Wait for scroll-down + uncollapse to complete
				var diff = windowHeight - Math.ceil10(getComputedHeight(step.divId),1); //Calculate height difference between content and window.
				console.log("height diff for %s: %o", step.divId, diff);

				if(diff>0){
					document.getElementById('scrollHeightPatch').style.height = diff + 'px'; // Reduce filling height to bare minimum.
				}
				else{
					document.getElementById('scrollHeightPatch').style.height = '0px'; // Reduce filling to 0 height as content is big enough.
				}
			}, 1500);
		}

		
	}
}]);


