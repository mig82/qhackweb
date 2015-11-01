"use strict";

angular.module('qhack').controller('StatusCtrl', ['$scope', 'Survey', 'SessionSrv', function($scope, Survey, SessionSrv){

	$scope.survey = SessionSrv.getSurvey();

	//Simulate answered as invited-1
	var guestsSummary = $scope.survey.guestsSummary;
	for (var property in guestsSummary) {
		if (guestsSummary.hasOwnProperty(property)) {
			
			var invited = guestsSummary[property]['invited'];
			var answered = Math.floor(Math.random()*10)%(invited+1);

			guestsSummary[property]['answered'] = answered;

			$scope.survey.guestsTotals.answered += answered;
		}
	}

	$scope.writeReminderIsCollapsed = true;

	//window.$scope = $scope;

}]);


	