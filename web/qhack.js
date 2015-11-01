(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

"use strict";

var app = angular.module('qhack', ['ui.router', 'ui.bootstrap', 'ui.tinymce', 'ui.select', 'ngSanitize', 'ngCookies', 'ngAnimate', 'ngTouch'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/login");

	// Now set up the states
	$stateProvider
	
	.state('login', {
		url: "/login",
		templateUrl: "views/login.html"
	})

	.state('main', {
		url: "/main?access_token",
		templateUrl: "views/main.html",
		controller: function($rootScope, $stateParams) {
			console.log("0) Received access_token %o", $stateParams.access_token);
			$rootScope.token = $stateParams.access_token;
		}
	})

	.state('main.home', {
		url: "/home",
		templateUrl: "views/home.html"
	})

	.state('main.wizard', {
		url: "/wizard",
		templateUrl: "views/wizard.html"
	})

	.state('main.status', {
		url: "/status",
		templateUrl: "views/status.html"
	})

	.state('main.report', {
		url: "/report",
		templateUrl: "views/report.html"
	});


}])

.run(['$state', function ($state) {

	console.log('Starting QHack...');

	//gettextCatalog.setCurrentLanguage('en');
	//gettextCatalog.debug = true;
}]);

},{}],2:[function(require,module,exports){
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
	
}]);


	
},{}],3:[function(require,module,exports){
"use strict";

angular.module('qhack').controller('CustMsgCtrl', ['$scope', '$sce', function($scope, $sce){

	$scope.save = function(){
		$scope.trustedCustMsg = $sce.trustAsHtml($scope.survey.custMsg);
	};
	

}]);


	
},{}],4:[function(require,module,exports){
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

	$scope.calcGuestsSummary = function() {
		/*$scope.survey.gSumm = _.countBy($scope.survey.guests, function(guest){
			if(guest.type.name)
			return guest.type.name;
		});*/
		$scope.survey.recalcGuestsSummary();
	};

	$scope.calcGuestsSummary();

}]);


	
},{}],5:[function(require,module,exports){
"use strict";

angular.module('qhack').controller('LoginCtrl', ['$scope', '$state', function($scope, $state){

	$scope.authUrls = {};
	
	/*ConfigSrv.getConfig().then(function(config){
		$scope.authUrls.facebook =	config.nodeServerUrl + config.authPaths.facebook;
		$scope.authUrls.google =	config.nodeServerUrl + config.authPaths.google;
		$scope.authUrls.twitter =	config.nodeServerUrl + config.authPaths.twitter;
	});*/
	

	$scope.login = function(){

		console.log("Requesting authentication...4");

		/*SessionSrv.getUserByUserPassword().then(function(user){
			
			if(user){
				console.log("Authentication accepted for %o", user);
				$state.go('main.home');
			}
			else{
				console.log("Authentication denied for %o", $scope.user);
				//$location.path('/login');
			}
		});*/
	};
}]);


	
},{}],6:[function(require,module,exports){
"use strict";
angular.module('qhack').controller('NavBarCtrl', ['$scope', '$document', '$timeout', 'SessionSrv', function($scope, $document, $timeout, SessionSrv){

	var HIDE_CLASS = "collapsable-navbar";
	var SHOW_CLASS = "";

	$scope.user = SessionSrv.getUser();
	$scope.navbarClass = HIDE_CLASS;
	var isOpen = 0;

	//if (window.matchMedia('screen and (max-width: 768px)').matches) {}

	var openNavbar = function(){
		//console.log("1 openNavbar %o", isOpen);
		if(!isOpen){
			$scope.navbarClass = SHOW_CLASS;
			isOpen = 0;
			$document.bind('click', closeNavbar);
		}
	};

	var closeNavbar = function(){
		//console.log("2 closeNavbar");
		//isOpen > 1
		if(isOpen){
			//console.log("   3.b Will close %s", isOpen);
			$scope.navbarClass = HIDE_CLASS;
			isOpen = 0;
			$scope.$apply();
			$document.unbind('click', closeNavbar);
		}
		//isOpen == 0
		else{
			//console.log("   3.a Will not close %s", isOpen);
			isOpen++;
		}
	};

	$scope.openNavbar = openNavbar;
	//window.$document = $document;
	//window.$scope = $scope;


	/************************************************/

	$scope.menu = [
		{title: "home", 	gotoState: "main.home", 	activeClass: "active"},
		{title: "new", 		gotoState: "main.wizard", 	activeClass: ""},
		{title: "settings", gotoState: "main.settings", activeClass: ""},
	];
	//TODO: query $state or NavigationSrv to add active class to current tab.

	$scope.toggleActiveClass = function(index){
		var l = $scope.menu.length;
		for (var i = 0; i < l; i++) {
			
			if(i == index){
				$scope.menu[i].activeClass = "active";
			}
			else{
				$scope.menu[i].activeClass = "";
			}
		};
	}


}]);


	
},{}],7:[function(require,module,exports){
"use strict";

angular.module('qhack').controller('ReportCtrl', ['$scope', 'SessionSrv', function($scope, SessionSrv){

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
	$scope.survey = survey;

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
	}
	$scope.dataSets = dataSets;
	$scope.diffs = diffs;

}]);


	
},{}],8:[function(require,module,exports){
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


	
},{}],9:[function(require,module,exports){
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


	
},{}],10:[function(require,module,exports){
"use strict";

angular.module('qhack').controller('UsrInfoCtrl', ['$scope', function($scope){

}]);


	
},{}],11:[function(require,module,exports){
"use strict";

angular.module('qhack').controller('WizardCtrl', ['$scope', '$state', 'Survey', 'SessionSrv', function($scope, $state, Survey, SessionSrv){

	/*$scope.survey = {
		user:		{},
		career:		"",
		level:		"",
		custMsg:		"I'm a custom message",
		skills:		[],
		guests:		[],
	};*/

	$scope.user = {
		name: "",
		email: ""
	};

	$scope.survey = new Survey(
		$scope.user, //user
		"", // career
		"", //level
		"I'm a custom message" //custMsg
	);

	//window.$scope = $scope;
	SessionSrv.setUser($scope.user);
	
	$scope.$watchCollection( 'survey', function(newSurvey, oldSurvey){
		//console.log("Survey: %o", $scope.survey);
		SessionSrv.setSurvey($scope.survey);
	});

	$scope.submit = function(){
		$scope.survey.submit();
		SessionSrv.setSurvey($scope.survey);
		$state.go('main.status');
	};
}]);



},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
"use strict";
angular.module('qhack').directive('spiderwebChart', [function(){
	// Runs during compile

	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// {} = isolate, true = child, false/undefined = no change
		scope: {
			data: '=',
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		//require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div id="chart1" class="chart"></div>',
		// templateUrl: 'views/dir/spiderweb-chart.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			var w = 400;
			var h = 400;

			var cfg = {
				//containerClass: 'radar-chart', // target with css, default stylesheet targets .radar-chart
				w: w,
				h: h,
				factor: 1,//0.95,
				factorLegend: 1,
				levels: 5,
				maxValue: 5,
				radians: 2 * Math.PI,
				//color: d3.scale.category10(), // pass a noop (function() {}) to decide color via css
				color: function(){},
				opacityArea: 0.3,
				axisLine: true,
				axisText: true,
				circles: true,
				radius: 5,
				axisJoin: function(d, i) {
					return d.className || i;
				},
				transitionDuration: 300,
				ExtraWidthX: 200,
				ExtraWidthY: 80,
				TranslateX: 90,
			};

			RadarChart.draw("#chart1", $scope.data, cfg);
			

			
		}
	};
}]);
},{}],14:[function(require,module,exports){
"use strict";
angular.module('qhack').directive('vertGroupBarChart', [function(){
	// Runs during compile

	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// {} = isolate, true = child, false/undefined = no change
		scope: {
			chartId: '=',
			data: '=',
		},
		// controller: function($scope, $element, $attrs, $transclude) {},
		//require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div id="{{chartId}}" class="chart"></div>',
		// templateUrl: 'views/dir/spiderweb-chart.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			var data = $scope.data;

			var chartWidth			 = 200,
					barHeight		 = 20,
					groupHeight		 = barHeight * data.series.length,
					gapBetweenGroups = 10,
					spaceForLabels	 = 0, //150,
					spaceForLegend	 = 100,
					scaleMax		 = 5,
					barTextOffset	 = 25; //-3

			// Zip the series data together (first values, second values, etc.)
			var zippedData = [];
			var zippedClasses = [];
			for (var i=0; i<data.labels.length; i++) {
				for (var j=0; j<data.series.length; j++) {
					zippedData.push(data.series[j].values[i]);
					zippedClasses.push(data.series[j].class);
				}
			}

			// Color scale
			var color = d3.scale.category20();
			var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

			var x = d3.scale.linear()
					.domain([0, d3.max( zippedData.concat(scaleMax) )])
					.range([0, chartWidth]);

			var y = d3.scale.linear()
					.range([chartHeight + gapBetweenGroups, 0]);

			var yAxis = d3.svg.axis()
					.scale(y)
					.tickFormat('')
					.tickSize(0)
					.orient("left");

			// Specify the chart area and dimensions
			var chart = d3.select(iElm[0])
				.append("svg")
				.attr("class", "vert-group-bar-chart")
					//.attr("width", spaceForLabels + chartWidth + spaceForLegend)
					//.attr("height", chartHeight)
					.attr("viewBox", "0 0 " + parseInt(spaceForLabels + chartWidth + spaceForLegend) + " " + parseInt(chartHeight))

			// Create bars
			var bar = chart.selectAll("g")
					.data(zippedData)
					.enter().append("g")
					.attr("transform", function(d, i) {
						return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
					});

			// Create bars of the correct width
			bar.append("rect")
					//.attr("fill", function(d,i) { return color(i % data.series.length); })
					.attr("class", function (d, i) {
						return "bar " + zippedClasses[i];
					})
					.attr("width", x)
					.attr("height", barHeight - 1);

			// Add text label in bar
			bar.append("text")
					.attr("x", function(d) { return x(d) + barTextOffset; })
					.attr("y", barHeight / 2)
					//.attr("fill", "red")
					.attr("dy", ".35em")
					.text(function(d) { return d; });

			// Draw labels
			bar.append("text")
					.attr("class", "label")
					.attr("x", function(d) { return - 10; })
					.attr("y", groupHeight / 2)
					.attr("dy", ".35em")
					.text(function(d,i) {
						if (i % data.series.length === 0)
							return data.labels[Math.floor(i/data.series.length)];
						else
							return "";
					});

			chart.append("g")
						.attr("class", "y axis")
						.attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
						.call(yAxis);

			// Draw legend
			var legendRectSize = barHeight-1,
					legendSpacing	= 1;

			var legend = chart.selectAll('.legend')
					.data(data.series)
					.enter()
					.append('g')
					.attr('transform', function (d, i) {
							var height = legendRectSize + legendSpacing;
							var offset = -gapBetweenGroups/2;
							var horz = spaceForLabels + chartWidth + 45 - legendRectSize;
							var vert = i * height - offset;
							return 'translate(' + horz + ',' + vert + ')';
					});

			/*legend.append('rect')
					.attr('width', legendRectSize)
					.attr('height', legendRectSize)
					.attr('class', function (d, i) {
						return d.class;
					});*/
					//.style('fill', function (d, i) { return color(i); });
					//.style('stroke', function (d, i) { return color(i); });

			legend.append('text')
					.attr('class', 'legend')
					//.attr('x', legendRectSize + legendSpacing + 5)
					.attr('x', legendSpacing + 5)
					.attr('y', legendRectSize - legendSpacing - 5)
					.text(function (d) { return d.label; });

		}
	};
}]);
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
"use strict";

angular.module('qhack').factory('Survey', ['Skill', function(Skill){

	function Survey(user, career, level, custMsg){

		this.user = user;
		this.career = career;
		this.level = level;
		this.custMsg = custMsg;
		
		this.status = {}

		this.etc = 0;

		this.skills = [];
		this.guests = [];

		this.guestsSummary = {};
		this.guestsTotals = {};

		this.status = Survey.STATUS_NEW;
	}

	//var STATUS_NEW	= {id: 01, desc: gettext('STATUS_NEW')};
	var STATUS_NEW	= {id: 0, desc: 'STATUS_NEW'};
	var STATUS_SENT	= {id: 1, desc: 'STATUS_SENT'};
	//Use angular.copy to prevent unwanted modifcations of these constants.
	Survey.STATUS_NEW = angular.copy(STATUS_NEW);
	Survey.STATUS_SENT = angular.copy(STATUS_SENT);

	Survey.prototype.calcEtc = function(){
		this.skills.forEach(function(skill){

			if(skill instanceof Skill && skill.etc && !isNaN(skill.etc)){
				this.etc += skill.etc;
			}
			
		});
	};

	Survey.prototype.addSkill = function(skill){
		//console.log("pushing %o into %o", skill, this.skills);
		
		if(skill instanceof Skill){
			//if(!this.skills){this.skills = new Array()}
			this.skills.push(skill);
			this.etc += skill.etc;
		}
		else{
			throw Error("Can't add object %o to Skills structure. It is not of type Skill", skill);
		}
		//console.log(_.pluck(this.skills, 'name'))
	}

	Survey.prototype.removeSkill = function(skill){
		var index = _.findIndex(this.skills, function(s){
			return s.id === skill.id;
		});
		if(index >= 0){
			this.skills.splice(index, 1);
			this.etc -= skill.etc;
		}
		console.log(_.pluck(this.skills, 'name'))
	};

	Survey.prototype.addGuest = function(guest){
		this.guests.push(guest);
		this.recalcGuestsSummary();
	};

	Survey.prototype.removeGuest = function(guest){
		this.guests = _.without(this.guests, guest);
		this.recalcGuestsSummary();
	};

	Survey.prototype.recalcGuestsSummary = function(){
		
		var l = this.guests.length;
		
		this.guestsTotals = {
			answered: 0,
			invited: l
		};

		this.guestsSummary = {}; //Reset it before recalculating.

		for (var i = 0; i < l; i++) {
			var guest = this.guests[i];
			var typeName = guest.type.name;
			
			var typeTotals = this.guestsSummary[typeName]; //{answered: 0, invited:0}
			if(typeTotals){
				typeTotals.invited++;
			}
			else{
				this.guestsSummary[typeName] = {
					answered: 0,
					invited: 1
				};
			}
		};
	};

	Survey.prototype.submit = function(){
		this.status = Survey.STATUS_SENT;
	}

	Survey.prototype.isSent = function(){
		return this.status.id === Survey.STATUS_SENT.id;
	};

	Survey.fromObj = function(obj){
		
		var survey = new Survey();

		for(var prop in obj){
			if(obj.hasOwnProperty(prop)){
				//console.log("%o:%o", prop, obj[prop]);
				survey[prop] = obj[prop];
			}
		}
	
		return survey;
	};

	return Survey;
}]);
},{}],17:[function(require,module,exports){
"use strict";
//angular.module('qhack').factory('SessionSrv', ['$q', 'RestCliSrv', function($q, RestCliSrv){
angular.module('qhack').factory('SessionSrv', [ '$cookies', 'Survey', function($cookies, Survey){
	
	var _user; //Object
	var _survey = Survey.fromObj($cookies.getObject('survey')); //Survey
	console.log("    Initialized _survey from cookie: %o", _survey);

	return {

		setUser: function(user){
			_user = user;
		},

		getUser: function(){
			return _user;
		},

		setSurvey: function(survey){
			_survey = survey;
			$cookies.putObject('survey', _survey);
		},

		getSurvey: function(){
			console.log("getSurvey: %o", _survey);
			return _survey;
		},

		/*_getUser: function(){

			if(!_user){
				console.log("2) SessionSrv _user is undefined, will GET it from server");
				return RestCliSrv.getUser().then(function(user){
					_user = user;
					console.log("3) Session attached to _user %o", _user);
					return _user;
				});
			}
			else{
				console.log("2) SessionSrv _user is already defined");
				return $q.when(_user);
			}
		},

		getUserByUserPassword: function(userId, password){
			if(!_user){
				//console.log("SessionSrv _user is undefined");
				return RestCliSrv.getUserByUserPassword().then(function(user){
					_user = user;
					return _user;
				});
			}
			else{
				//console.log("SessionSrv _user is already defined");
				return $q.when(_user);
			}
		},*/
		
		
	};
}]);
},{}],18:[function(require,module,exports){
var app = require('./js/app');

var WizardCtrl = require('./js/ctrl/WizardCtrl');
var LoginCtrl = require('./js/ctrl/LoginCtrl');
var UsrInfoCtrl = require('./js/ctrl/UsrInfoCtrl');
var CareerSelectCtrl = require('./js/ctrl/CareerSelectCtrl');
var SkillSelectCtrl = require('./js/ctrl/SkillSelectCtrl');
var GuestSelectCtrl = require('./js/ctrl/GuestSelectCtrl');
var CustMsgCtrl = require('./js/ctrl/CustMsgCtrl');
var ReportCtrl = require('./js/ctrl/ReportCtrl');
var StatusCtrl = require('./js/ctrl/StatusCtrl');
var NavBarCtrl = require('./js/ctrl/NavBarCtrl');

var skillsList = require('./js/dir/skillsList');
var spiderwebChart = require('./js/dir/spiderweb-chart');
var vertGroupBarChart = require('./js/dir/vert-group-bar-chart');

var SessionSrv = require('./js/srv/SessionSrv');

var Skill = require('./js/models/Skill');
var Survey = require('./js/models/Survey');



},{"./js/app":1,"./js/ctrl/CareerSelectCtrl":2,"./js/ctrl/CustMsgCtrl":3,"./js/ctrl/GuestSelectCtrl":4,"./js/ctrl/LoginCtrl":5,"./js/ctrl/NavBarCtrl":6,"./js/ctrl/ReportCtrl":7,"./js/ctrl/SkillSelectCtrl":8,"./js/ctrl/StatusCtrl":9,"./js/ctrl/UsrInfoCtrl":10,"./js/ctrl/WizardCtrl":11,"./js/dir/skillsList":12,"./js/dir/spiderweb-chart":13,"./js/dir/vert-group-bar-chart":14,"./js/models/Skill":15,"./js/models/Survey":16,"./js/srv/SessionSrv":17}]},{},[18])
//# sourceMappingURL=qhack.js.map
