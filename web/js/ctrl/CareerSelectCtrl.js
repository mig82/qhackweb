"use strict";

angular.module('qhack').controller('CareerSelectCtrl', ['$scope', function($scope){

	$scope.careers = [
		{title: "Consulting"},
		{title: "Sales"},
		{title: "Human Resources"},
		{title: "Marketing"}
	];

	$scope.levels = [
		{title: "junior"},
		{title: "senior"},
		{title: "mid management"},
		{title: "management"},
		{title: "senior management"},
		{title: "executive leadership"}
	];

	$scope.industries = ['financial services', 'energy', 'telecomunications', 'internet'];

	$scope.$watchCollection('survey.career', function(newCareer, oldCareer){
		$scope.showDoneBtn = $scope.careerForm.$valid && newCareer.trim() !== "";
	});

	$scope.showNextStep = function(){
		$scope.showSteps.skills = true;
	}
	
}]);


	