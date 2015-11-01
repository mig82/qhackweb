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