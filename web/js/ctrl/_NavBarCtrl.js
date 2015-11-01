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


	