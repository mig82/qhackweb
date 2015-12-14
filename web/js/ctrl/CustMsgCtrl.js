"use strict";

angular.module('qhack').controller('CustMsgCtrl', ['$scope', '$sce', function($scope, $sce){

	$scope.save = function(){
		$scope.trustedCustMsg = $sce.trustAsHtml($scope.survey.custMsg);
	};
	
	$scope.$watchCollection('survey.custMsg.length', function(newLength, oldLength){
		$scope.showDoneBtn = newLength > 0;
	});

	$scope.showNextStep = function(){
		$scope.showSteps.summary = true;
		$scope.scrollToElm('summaryStepDiv');
	}


}]);


	