"use strict";
angular.module('qhack').directive('skillsList', ['$filter', '$timeout', function($filter, $timeout){
	// Runs during compile

	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// {} = isolate, true = child, false/undefined = no change
		scope: {
			survey: '=',
			placeholder: '=',
			label: '=',
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		//require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'views/dir/skills-list.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			/*$scope.newTag = "";

			$scope.addTag = function(){
		
				if(!$scope.tags){
					$scope.tags = [];
				}

				if($scope.newTag.trim() != "" && !_.contains($scope.tags, $scope.newTag, 0)){
					$scope.tags.push($scope.newTag);
					$scope.newTag = "";
				}
			};*/

			$scope.removeSkill = function(skill){
				skill.selected = false;
				$scope.survey.removeSkill(skill);
			};
			
		}
	};
}]);