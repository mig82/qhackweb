"use strict";

angular.module('qhack').controller('GuestSelectCtrl', ['$scope', function($scope){

	$scope.feedbackTypes = [
		{id: 1, name: "self"	, desc: "This is you"},
		{id: 2, name: "senior"	, desc: "Someone with a professional category or seniority level above yours. Not necessarily someone you reported to but who had good visibility of your work."},
		{id: 3, name: "peer"	, desc: "Someone with the same level of seniority as you. Maybe someone in your team or in a team collaborating with yours."},
		{id: 4, name: "junior"	, desc: "Someone with less seniority than you. Not necessarily reporting to you but with good visibility of your work."},
		{id: 5, name: "other"	, desc: "Someone external to your team and hierarchy but who had a stake in the work you did. A client, partner, vendor, an area who depended on your work, etc."},
	];

	$scope.guestOptions = [
		{name: "María Montes", 		type: {id: 1, name: "senior"}, email: "foo@bar.com", selected: false},
		{name: "Carlos Cuevas", 	type: {id: 1, name: "peer"},   email: "foo@bar.com", selected: false},
		{name: "Carmen Conde", 		type: {id: 1, name: "junior"}, email: "foo@bar.com", selected: false}
	];
	
	$scope.addGuestOption = function(){
		$scope.guestOptions.push({
			name: "",
			type: {},
			email: "",
			selected: false
		});
	};

	$scope.removeGuestOptionAt = function(index){
		var guest = $scope.guestOptions[index]
		$scope.survey.removeGuest(guest);
		$scope.guestOptions.splice(index, 1);
		$scope.calcGuestsSummary();
	}

	$scope.toggleGuestSelection = function(guest, index){
		
		console.log("toggling %o %o", guest, index)
		if(guest.selected){
			$scope.survey.addGuest(guest);
		}
		else{
			$scope.survey.removeGuest(guest);
		}
	};

	$scope.save = function(){
		//Ojo:, pueden haber guests vacíos en la lista.
	}

	$scope.$watchCollection('survey.guests.length', function(newLength, oldLength){
		$scope.showDoneBtn = newLength > 0;
	});

	$scope.calcGuestsSummary = function() {
		/*$scope.survey.gSumm = _.countBy($scope.survey.guests, function(guest){
			if(guest.type.name)
			return guest.type.name;
		});*/
		$scope.survey.recalcGuestsSummary();
	};
	$scope.calcGuestsSummary();

	/*$scope.showNextStep = function(){
		$scope.showSteps.invitation = true;
		$scope.scrollToElm('invitationStepDiv');
	}*/

}]);


	