//Backbone view mixin to vertically centre elements with a given class in the screen
// Only copes with a single element on the page.
define(["jquery", "underscore"], function($, _) {

	var CentreMixin = {

		moveToCentre: function($target) {
			var h = $target.height();
			var w = $target.width();
			var wHeight = $(window).height();
			var wWidth = $(window).width();
			console.log("h=" + h + "; w= " + w);
			var top = (wHeight-h)/2;
			var left = (wWidth-w)/2;
			$target.css('top', top + "px");
			$target.css('left', left + "px");
		}
	};

	return CentreMixin;

});