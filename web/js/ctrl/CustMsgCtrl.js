"use strict";

angular.module('qhack').controller('CustMsgCtrl', ['$scope', '$sce', function($scope, $sce){

	$scope.save = function(){
		$scope.trustedCustMsg = $sce.trustAsHtml($scope.survey.custMsg);
	};
	

}]);


	