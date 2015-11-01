"use strict";

angular.module('qhack').controller('SkillSelectCtrl', ['$scope', 'Skill', function($scope, Skill){

	$scope.max = 5;
	$scope.firstNToCheck = 5;

	/*	Assume rank1 to be the ranking among people in the same career,
		and rank2 the ranking among people with the same career and seniority.
	*/
	/*$scope.skills = _.sortBy([
		{ id:  1, etc: 2, type: 'i', rankings: { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } },	name: "communication", 						},
		{ id:  2, etc: 2, type: 'i', rankings: { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "leadership", 						},
		{ id:  3, etc: 2, type: 'i', rankings: { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "teamwork", 							},
		{ id:  4, etc: 2, type: 'i', rankings: { rank1: {value: 5, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "effective presentations", 			},
		{ id:  5, etc: 2, type: 'i', rankings: { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } },	name: "results orientation", 				},
		{ id:  6, etc: 2, type: 'i', rankings: { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } },	name: "time management", 					},
		{ id:  7, etc: 2, type: 'i', rankings: { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } },	name: "thinks outside the box", 			},
		{ id:  8, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "attention to detail", 				},
		{ id:  9, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 5, percent: 0, labelClass: '' } },	name: "analytical thinking", 				},
		{ id: 10, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "applies technology to tasks", 		},
		{ id: 11, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "change management", 					},
		{ id: 12, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "conflict management", 				},
		{ id: 13, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "creative thinking", 					},
		{ id: 14, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "customer focus", 					},
		{ id: 15, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "decision making", 					},
		{ id: 16, etc: 2, type: 'i', rankings: { rank1: {value: 3, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "developing others", 					},
		{ id: 17, etc: 2, type: 'i', rankings: { rank1: {value: 2, percent: 0, labelClass: '' }, rank2: {value: 4, percent: 0, labelClass: '' } },	name: "diagnostic information gathering",	},
		{ id: 18, etc: 2, type: 'i', rankings: { rank1: {value: 2, percent: 0, labelClass: '' }, rank2: {value: 3, percent: 0, labelClass: '' } },	name: "empowering others", 					},
		{ id: 19, etc: 2, type: 'i', rankings: { rank1: {value: 4, percent: 0, labelClass: '' }, rank2: {value: 3, percent: 0, labelClass: '' } },	name: "ethics and integrity", 				},
		{ id: 20, etc: 2, type: 'i', rankings: { rank1: {value: 1, percent: 0, labelClass: '' }, rank2: {value: 3, percent: 0, labelClass: '' } },	name: "flexibility", 						}
	], function(skill){
		return -skill.rankings.rank2.value;
	});*/

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

}]);


	