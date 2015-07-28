define(['backbone', 'hbs!app/templates/trail_instructions1', 'hbs!app/templates/trail_instructions2',
		'underscore', 'app/views/vcentre'],
        function(Backbone, trailInstructionsTemplate1, trailInstructionsTemplate2, _, CentreMixin) {

    var TrailInstructionsView = Backbone.View.extend({
        //
        //template: trailInstructionsTemplate,

        initialize: function(params) {
            this.trail = params.trail;
	        this.nextURL = params.nextURL;
	        if(this.num == 1) {
		        this.template = trailInstructionsTemplate1;
	        } else if (this.num ==2) {
		        this.template = trailInstructionsTemplate2;
	        } else {
		        console.log("trail instructions index not recognised");
	        }
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