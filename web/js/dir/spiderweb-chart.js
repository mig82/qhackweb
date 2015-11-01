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