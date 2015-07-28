define(['backbone', 'hbs!app/templates/trail_instructions', 'underscore', 'app/views/vcentre'],
        function(Backbone, trailInstructionsTemplate, _, CentreMixin) {

    var TrailInstructionsView = Backbone.View.extend({

        template: trailInstructionsTemplate,

        initialize: function(params) {
            this.trail = params.trail;
	        this.nextURL = params.nextURL;
        },

        serialize: function() {
            var out = this.trail.toJSON();
	        out.nextURL = this.nextURL;
	        return out;
        },

		afterRender: function() {
			//for some reason the dimensions aren't yet final in this function. Need a short delay.
			setTimeout(this.centreContent.bind(this), 20);
		},

	    centreContent: function() {
		    this.moveToCentre($('.instructions'));
	    }


    });

    _.extend(TrailInstructionsView.prototype, CentreMixin);

    return TrailInstructionsView;

});