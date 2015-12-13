angular.module('qhack').directive('gmapsPlacesAutoc', [function(){
	// Runs during compile

	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// {} = isolate, true = child, false/undefined = no change
		scope: true,
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		restrict: 'A',
		// template: '',
		// templateUrl: 'dir/templ.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			var inputField = document.getElementById(iElm.attr('id'));
			var autocomplete = new google.maps.places.Autocomplete(inputField, {types:['(regions)']});
			
			google.maps.event.addListener(autocomplete, 'place_changed', function() {
				var place = autocomplete.getPlace();
				$scope.survey.user.loc.lat = place.geometry.location.lat();
				$scope.survey.user.loc.lng = place.geometry.location.lng();
				$scope.survey.user.loc.addr = place.formatted_address;
				$scope.$apply();
			});

		}
	};
}]);