"use strict";

angular.module('qhack').controller('ReportCtrl', ['$scope', 'SessionSrv', function($scope, SessionSrv){

	window.$scope = $scope;

	//Let's assume we get the survey results form the server...

	function getRandomFloat(){
		return Math.ceil10((Math.random()*10)%5, -2);
	}

	var tolerance = 0.5;
	function calcRagMap(diff){
		
		var rag = {
			r: false,
			a: false,
			g: false,
		};

		if(Math.abs(diff) < tolerance) rag.a = true;
		else if(diff > 0) rag.g = true;
		else rag.r = true;

		return rag;
	}

	/*var data2 = [
		{
			className: "self",
			axes: [
				{axis: "strength", value: 13}, 
				{axis: "intelligence", value: 1}, 
				{axis: "charisma", value: 8}
			]
		},
		{
			className: "rest",
			axes: [
				{axis: "strength", value: 3}, 
				{axis: "intelligence", value: 15}, 
				{axis: "charisma", value: 4}
			]
		}
	];*/

	//var data = [ [],[] ];
	
	/*******************************************/
	/*****This is for the spiderweb charts******/
	/*******************************************/
	var data = [{
			className: "self",
			axes: []
		},{
			className: "rest",
			axes: []
		}
	];

	var survey = SessionSrv.getSurvey();
	var skills = survey.skills;
	var l = skills.length;

	for (var i = 0; i < l; i++) {
		var skill = skills[i];
		
		var scoreYou	= { axis: skill.name, value: getRandomFloat() };
		data[0].axes.push(scoreYou);

		var scoreRest = { axis: skill.name, value: getRandomFloat() };
		data[1].axes.push(scoreRest);
	};
	$scope.data = data;


	var ragClasses = {};
	var skillCount = data[0].axes.length;
	var tolerance = 0.5;
	for(var k = 0; k < skillCount; k++){
		var selfScore = data[0].axes[k].value;
		var restScore = data[1].axes[k].value;
		var diff = selfScore - restScore;
		var axis = data[0].axes[k].axis;

		if( diff > tolerance ){
			//ragClasses[axis] = "rag-green";
			ragClasses[axis] = "bg-success text-success";
		}
		else if ( diff < -tolerance ) {
			//ragClasses[axis] = "rag-red"
			ragClasses[axis] = "bg-danger text-danger"
		}
		else{
			//ragClasses[axis] = "rag-amber"
			ragClasses[axis] = "bg-warning text-warning"
		}
	}
	$scope.ragClasses = ragClasses;



	/*******************************************/
	/********This is for the bar charts*********/
	/*******************************************/
	var skills = _.pluck(survey.skills, 'name');
	/*var data1 = {
		labels: skills,
		series: [
			{
				label: 'seniors',
				values: [4, 8, 15, 16, 23, 12]
			},
			{
				label: 'peers',
				values: [12, 33, 22, 11, 13, 25]
			}
		]
	};*/

	
	survey.comments = {};
	var dataSets = [];
	var diffs = {};
	var skillsCount = skills.length;

	for(var k = 0; k < skillsCount; k++){
		var skill = skills[k];
		var d0 = {
			labels: [skill],
			series: [
				{
					label: 'seniors',
					class: 'bar-seniors',
					values: [getRandomFloat()]
				},
				{
					label: 'peers',
					class: 'bar-peers',
					values: [getRandomFloat()]
				},
				{
					label: 'others',
					class: 'bar-others',
					values: [getRandomFloat()]
				},
				{
					label: 'juniors',
					class: 'bar-juniors',
					values: [getRandomFloat()]
				}
			]
		};

		var d1 = {
			labels: [skill],
			series: [ 
				{
					label: 'you',
					class: 'bar-you',
					values: [getRandomFloat()]
				},
				{
					label: 'others like you',
					class: 'bar-rest',
					values: [getRandomFloat()]
				}
			]
		};

		dataSets.push( [ d0, d1 ] );
		var you = d1.series[0].values[0];
		var others = d1.series[1].values[0];
		var diff = Math.round10( you - others, -2 );
		var rag = calcRagMap(diff);

		diffs[skill] = {
			value: diff, //IMPORTANT: This is assuming series[0] is 'you' and series[1] is 'others'.
			rag: rag
		};

		survey.comments[skill] = {
			show: false,
			entries: [
				{author: "Peter", show: true, comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. "},
				{author: "Maria", show: true, comment: "Vivamus fermentum semper porta. Nunc diam velit, adipiscing ut tristique vitae, sagittis vel odio. Maecenas convallis ullamcorper ultricies. Curabitur ornare, ligula semper consectetur sagittis, nisi diam iaculis velit, id fringilla sem nunc vel mi. Nam dictum, odio nec pretium volutpat, arcu ante placerat erat, non tristique elit urna et turpis. Quisque mi metus, ornare sit amet fermentum et, tincidunt et orci. "},
			]
		};
	}
	$scope.dataSets = dataSets;
	$scope.diffs = diffs;
	$scope.survey = survey;
}]);


	