//Backbone view mixin to vertically centre elements with a given class in the screen
// Only copes with a single element on the page.
define(["jquery", "underscore"], function($, _) {

	var CentreMixin = {

		moveToCentre: function($target) {
			this._moveToCentre($target, true, true)
		},

		_moveToCentre: function($target, vertical, horizontal) {
			if(vertical) {
				var h = $target.height();
				var wHeight = $(window).height();
				var top = (wHeight - h) / 2;
				$target.css('top', top + "px");
			}

			if(horizontal) {
				var w = $target.width();
				var wWidth = $(window).width();
				var left = (wWidth - w) / 2;
				$target.css('left', left + "px");
			}
		},

		moveToVerticalCentre: function($target) {
			this._moveToCentre($target, true, false);
		}
	};

	return CentreMixin;

});