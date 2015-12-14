"use strict";

angular.module('qhack').controller('SkillSelectCtrl', ['$scope', 'Skill', function($scope, Skill){

	$scope.max = 5;
	$scope.firstNToCheck = 5;

	$scope.skills = _.sortBy([
		new Skill( 1, 2, 'i', { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } }, "communication" 						),
		new Skill( 2, 2, 'i', { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "leadership" 							),
		new Skill( 3, 2, 'i', { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "teamwork" 							),
		new Skill( 4, 2, 'i', { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "effective presentations" 			),
		new Skill( 5, 2, 'i', { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } }, "results orientation" 				),
		new Skill( 6, 2, 'i', { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } }, "time management"						),
		new Skill( 7, 2, 'i', { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } }, "thinks outside the box" 				),
		new Skill( 8, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "attention to detail" 				),
		new Skill( 9, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } }, "analytical thinking" 				),
		new Skill(10, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "applies technology to tasks" 		),
		new Skill(11, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "change management" 					),
		new Skill(12, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "conflict management" 				),
		new Skill(13, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "creative thinking" 					),
		new Skill(14, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "customer focus" 						),
		new Skill(15, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "decision making" 					),
		new Skill(16, 2, 'i', { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "developing others" 					),
		new Skill(17, 2, 'i', { rank1: {value: 2, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } }, "diagnostic information gathering"	),
		new Skill(18, 2, 'i', { rank1: {value: 2, percent: 0, labelClass: '' }, rank2: {value: 3, percent: 0, labelClass: '' } }, "empowering others" 					),
		new Skill(19, 2, 'i', { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 3, percent: 0, labelClass: '' } }, "ethics and integrity" 				),
		new Skill(20, 2, 'i', { rank1: {value: 1, percent: 0, labelClass: '' }, rank2: {value: 3, percent: 0, labelClass: '' } }, "flexibility" 						)
	], function(skill){
		return -skill.rankings.rank2.value;
	});

	for (var i = 0; i < $scope.firstNToCheck; i++) {
		$scope.skills[i].selected = true;
		//$scope.survey.skills.push($scope.skills[i]);
		$scope.survey.addSkill($scope.skills[i]);
	};

	$scope.toggleSkillSelect = function(skill){

		var selected = skill.selected;

		if(selected){
			//$scope.survey.skills.push(skill);
			$scope.survey.addSkill(skill);
		}
		else{
			/*var index = _.findIndex($scope.survey.skills, function(s){
				return s.id === skill.id;
			});
			if(index >= 0){
				$scope.survey.skills.splice(index, 1);
			}*/
			$scope.survey.removeSkill(skill);
		}

		//console.log(_.pluck($scope.survey.skills, 'name'))
	};

	$scope.$watchCollection('survey.skills.length', function(newLength, oldLength){
		$scope.showDoneBtn = newLength > 0;
	});

	$scope.showNextStep = function(){
		$scope.showSteps.colleagues = true;
		$scope.scrollToElm('colleaguesStepDiv');
	}

}]);


	