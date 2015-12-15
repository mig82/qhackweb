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

	$scope.showWizardSteps = true;
	$scope.submit = function(){
		
		// 1. Submit the survey
		$scope.survey.submit();
		SessionSrv.setSurvey($scope.survey);
		console.log("updatfded");
		
		// 2. Scroll down to confirmation message
		$scope.showStep(6);

		// 3. Collapse all other wizard steps.
		$timeout(function collapseAllPrevSteps() {
			$scope.showWizardSteps = !$scope.survey.isSent();
		}, 1510);

		// 4. Scroll back up to have main menu in view.
		$timeout(function scrollBackToTop() {
			$document.scrollToElementAnimated(  angular.element( '#main' ), 0, 750  );
		}, 1550);
	};

window.$scope = $scope;

	$scope.gotoStatus = function(){
		$state.go('main.status');
	}

	$scope.steps = [
		{stepId: 'info', 		divId: 'infoStepDiv', 		show: true},
		{stepId: 'career', 		divId: 'careerStepDiv', 	show: false},
		{stepId: 'skills', 		divId: 'skillsStepDiv', 	show: false},
		{stepId: 'colleagues', 	divId: 'colleaguesStepDiv', show: false},
		{stepId: 'invitaiton', 	divId: 'invitaitonStepDiv', show: false},
		{stepId: 'summary', 	divId: 'summaryStepDiv', 	show: false},
		{stepId: 'sent', 		divId: 'sentStepDiv', 		show: false}
	];

	$scope.showStep = function(stepIndex){

		var step = $scope.steps[stepIndex];

		if(step.show){ //If it has already been displayed just scroll down to it.
			$document.scrollToElementAnimated(  angular.element(  '#'+step.divId  ), 0, 1000  ); //Animated scroll-down.
		}
		else{ //If it has not yet been displayed...
			
			//1. Make space for scrolling down.
			var windowHeight = getWindowHeight();
			document.getElementById('scrollHeightPatch').style.height = windowHeight + 'px'; 
			
			//2. Scroll down with animation
			$document.scrollToElementAnimated(  angular.element(  '#scrollHeightPatch'  ), 0, 1000  );
			
			//3. Display next step.
			$timeout(function displayNextStep() { 
				step.show = true; // Display next step.
			}, 1000); //Wait for scroll-down to complete
			
			//4. Adjust the height of the filling below content so that user can't scroll down further.
			$timeout(function adjustScrollHeightPatch(){
				var diff = windowHeight - Math.ceil10(getComputedHeight(step.divId),1); //Calculate height difference between content and window.
				//console.log("height diff for %s: %o", step.divId, diff);

				if(diff>0){
					document.getElementById('scrollHeightPatch').style.height = diff + 'px'; // Reduce filling height to bare minimum.
				}
				else{
					document.getElementById('scrollHeightPatch').style.height = '0px'; // Reduce filling to 0 height as content is big enough.
				}
			}, 1500); //Wait for scroll-down + uncollapse to complete
		}

		
	}
}]);


