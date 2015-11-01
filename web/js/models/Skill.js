"use strict";

angular.module('qhack').factory('Skill', [function(){

	function Skill(id, etc, type, rankings, name, desc, indicators){
		
		this.id = id;
		this.etc = etc;
		this.type = type;
		this.rankings = rankings;
		this.name = name;
		this.desc = desc;
		this.indicators = indicators;

		for(var property in rankings){
			var rank;
			if (rankings.hasOwnProperty(property)) {
				rank = rankings[property];
				rank.percent = 100 * (rank.value / 5);
		
				if(rank.percent < 30){
					rank.labelClass = 'label-warning';
				}
				else if(rank.percent >= 30 && rank.percent<70){
					rank.labelClass = 'label-info';
				}
				else{// if($scope.percent>=70)
					rank.labelClass = 'label-success';
				}
			}
		}

	}

	return Skill;
}]);